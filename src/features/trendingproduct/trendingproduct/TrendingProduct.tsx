import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../../../components/Header';
import SearchBar from '../../../components/SearchBar';
import ProductCard from '../../../components/ProductCard';
import SortModal from '../../../components/SortModal';
import FilterModal from '../../../components/FilterModal';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { getAllProducts } from '../../../services/Firestore';

type Filters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
};

type Props = NativeStackScreenProps<RootStackParamList, 'TrendingProduct'>;

const TrendingProduct: React.FC<Props> = ({ navigation, route }) => {
  const filter = route.params?.filter ?? 'all';
  const paramProducts = route.params?.products ?? [];
  const categoryId = (route.params as any)?.categoryId;
  const categoryTitle = (route.params as any)?.categoryTitle;

  const [allProducts, setAllProducts] = useState<any[]>(paramProducts);
  const [loading, setLoading] = useState(paramProducts.length === 0);
  const [baseProductList, setBaseProductList] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    if (paramProducts.length > 0 && filter !== 'category') {
      setAllProducts(paramProducts);
      setLoading(false);
      return;
    }
    let isMounted = true;
    getAllProducts().then(data => {
      if (!isMounted) return;
      setAllProducts(data);
      setLoading(false);
    }).catch(() => {
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, []);

  const getBaseProducts = (source: any[]) => {
    const normalizedProducts = source.map((p: any) => ({
      ...p,
      id: String(p.id ?? ''),
      title: String(p.title ?? ''),
      price: Number(p.price ?? 0),
      rating: p.rating !== undefined ? Number(p.rating) : 0,
    }));

    switch (filter) {
      case 'deal':
      case 'deals':
        return normalizedProducts.filter((p: any) => p.isDeal === true);
      case 'trending':
        return normalizedProducts.filter((p: any) => p.isTrending === true);
      case 'category':
        return normalizedProducts.filter((p: any) => 
          p.categoryId === categoryId ||
          p.category === categoryTitle || 
          p.category?.toLowerCase() === categoryTitle?.toLowerCase()
        );
      case 'all':
      default:
        return normalizedProducts;
    }
  };

  useEffect(() => {
    setBaseProductList(getBaseProducts(allProducts));
  }, [allProducts, filter]);

  // ✅ FIX: Search filters from baseProductList
  const filteredProducts = useMemo(() => {
    if (!searchText.trim()) return baseProductList;
    return baseProductList.filter((p: any) =>
      p.title?.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [baseProductList, searchText]);

  // ✅ Title based on filter
  const headerTitle = useMemo(() => {
    switch (filter) {
      case 'deal':
      case 'deals':
        return 'Deal of the Day';
      case 'trending':
        return 'Trending Products';
      case 'category':
        return categoryTitle || 'Category';
      case 'all':
      default:
        return `${filteredProducts.length}+ Items`;
    }
  }, [filter, categoryTitle, filteredProducts.length]);

  const sortLowToHigh = () => {
    const sorted = [...baseProductList].sort(
      (a, b) => Number(a.price) - Number(b.price),
    );
    setBaseProductList(sorted);
    setSortVisible(false);
  };

  const sortHighToLow = () => {
    const sorted = [...baseProductList].sort(
      (a, b) => Number(b.price) - Number(a.price),
    );
    setBaseProductList(sorted);
    setSortVisible(false);
  };

  const sortByRating = () => {
    const sorted = [...baseProductList].sort(
      (a, b) => Number(b.rating || 0) - Number(a.rating || 0),
    );
    setBaseProductList(sorted);
    setSortVisible(false);
  };

  const handleFilterApply = (filters: Filters) => {
    let filtered = getBaseProducts(allProducts);

    if (filters.category) {
      filtered = filtered.filter((p: any) => p.category === filters.category);
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      filtered = filtered.filter(
        (p: any) =>
          Number(p.price) >= (filters.minPrice ?? 0) &&
          Number(p.price) <= (filters.maxPrice ?? Infinity),
      );
    }

    if (filters.minRating !== undefined) {
      filtered = filtered.filter(
        (p: any) => Number(p.rating || 0) >= filters.minRating!,
      );
    }

    setBaseProductList(filtered);
    setFilterVisible(false);
  };

  const handleFilterReset = () => {
    setBaseProductList(getBaseProducts(allProducts));
    setSearchText('');
    setFilterVisible(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerWrap}>
        <Header onAvatarPress={() => navigation.navigate('SettingsScreen' as any)} />
      </View>

      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search any product..."
      />

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item: any) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <ProductCard
            product={item as any}
            onPress={() =>
              navigation.navigate('ProductDetail', {
                product: item as any,
                allProducts: allProducts,
              })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
        ListHeaderComponent={
          <View style={styles.topSection}>
            <View style={styles.topRow}>
              <Text style={styles.itemCount}>{headerTitle}</Text>

              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setSortVisible(true)}
                  activeOpacity={0.8}>
                  <Text style={styles.actionText}>Sort</Text>
                  <Ionicons name="swap-vertical" size={14} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setFilterVisible(true)}
                  activeOpacity={0.8}>
                  <Text style={styles.actionText}>Filter</Text>
                  <Ionicons name="options-outline" size={16} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      />

      <SortModal
        visible={sortVisible}
        onClose={() => setSortVisible(false)}
        onSortLowToHigh={sortLowToHigh}
        onSortHighToLow={sortHighToLow}
        onSortByRating={sortByRating}
      />

      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onReset={handleFilterReset}
        onApply={handleFilterApply}
      />
    </View>
  );
};

export default TrendingProduct;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    paddingBottom: 45,
  },

  headerWrap: {
    marginTop: '7%',
  },

  topSection: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 6,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemCount: {
    fontSize: 19,
    fontWeight: '800',
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
  },

  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 32,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
  },

  actionText: {
    fontSize: 13,
    color: '#111',
    fontWeight: '500',
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 18,
  },

  columnWrapper: {
    justifyContent: 'space-between',
  },

  emptyWrap: {
    paddingVertical: 40,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
