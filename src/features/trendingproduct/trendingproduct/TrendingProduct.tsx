import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Header from '../../../components/Header';
import SearchBar from '../../../components/SearchBar';
import ProductCard from '../../../components/ProductCard';
import SortModal from '../../../components/SortModal';
import FilterModal from '../../../components/FilterModal';
import { Products } from '../../../data/Products';
import { RootStackParamList } from '../../../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'TrendingProduct'>;

type Filters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
};

const TrendingProduct: React.FC<Props> = ({ navigation, route }) => {
  const { filter } = route.params || {};

  const getBaseProducts = () => {
    switch (filter) {
      case 'deals':
        return Products.filter(p => p.isDeal || p.tags?.includes('deal') || p.tags?.includes('deals'));
      case 'trending':
        return Products.filter(p => p.isTrending || p.tags?.includes('trending'));
      default:
        return Products;
    }
  };

  const [baseProductList, setBaseProductList] = useState(getBaseProducts);
  const [searchText, setSearchText] = useState('');
  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const filteredProducts = useMemo(() => {
    return baseProductList.filter(p =>
      p.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [baseProductList, searchText]);

  const sortLowToHigh = () => {
    const sorted = [...baseProductList].sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
    setBaseProductList(sorted);
    setSortVisible(false);
  };

  const sortHighToLow = () => {
    const sorted = [...baseProductList].sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
    setBaseProductList(sorted);
    setSortVisible(false);
  };

  const sortByRating = () => {
    const sorted = [...baseProductList].sort(
      (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
    );
    setBaseProductList(sorted);
    setSortVisible(false);
  };

  const handleFilterApply = (filters: Filters) => {
    let filtered = getBaseProducts();

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      filtered = filtered.filter(
        p =>
          Number(p.price) >= (filters.minPrice ?? 0) &&
          Number(p.price) <= (filters.maxPrice ?? Infinity)
      );
    }

    if (filters.minRating !== undefined) {
      filtered = filtered.filter(
        p => Number(p.rating || 0) >= filters.minRating!
      );
    }

    setBaseProductList(filtered);
    setFilterVisible(false);
  };

  const handleFilterReset = () => {
    setBaseProductList(getBaseProducts());
    setSearchText('');
    setFilterVisible(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerWrap}>
        <Header onAvatarPress={() => navigation.navigate('Settings')} />
      </View>

      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search any product..."
      />

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => <ProductCard product={item} />}
        ListHeaderComponent={
          <View style={styles.topSection}>
            <View style={styles.topRow}>
              <Text style={styles.itemCount}>
                {filteredProducts.length.toLocaleString()}+ Items
              </Text>

              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setSortVisible(true)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.actionText}>Sort</Text>
                  <Ionicons name="swap-vertical" size={14} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setFilterVisible(true)}
                  activeOpacity={0.8}
                >
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
    paddingBottom:45,
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
    fontFamily:"Montserrat-SemiBold"
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
});