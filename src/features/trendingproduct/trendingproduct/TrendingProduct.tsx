import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
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
  
  const [productList, setProductList] = useState(() => {
    // Initialize with filtered products based on route params
    switch (filter) {
      case 'deals':
        return Products.filter(p => p.isDeal);
      case 'trending':
        return Products.filter(p => p.isTrending);
      default:
        return Products;
    }
  });
  const [searchText, setSearchText] = useState('');
  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const wishlistProducts = Products.filter(p => p.isWishlist);

  const filteredProducts = productList.filter(p =>
    p.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortLowToHigh = () => {
    const sorted = [...filteredProducts].sort((a, b) => Number(a.price) - Number(b.price));
    setProductList(sorted);
    setSortVisible(false);
  };

  const sortHighToLow = () => {
    const sorted = [...filteredProducts].sort((a, b) => Number(b.price) - Number(a.price));
    setProductList(sorted);
    setSortVisible(false);
  };

  const sortByRating = () => {
    const sorted = [...filteredProducts].sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    setProductList(sorted);
    setSortVisible(false);
  };

  const handleFilterApply = (filters: Filters) => {
    let filtered = [...Products]; // always start from full list

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
      filtered = filtered.filter(p => Number(p.rating || 0) >= filters.minRating!);
    }

    setProductList(filtered);
    setFilterVisible(false);
  };

  const handleFilterReset = () => {
    // Reset to the original filtered list based on route params
    switch (filter) {
      case 'deals':
        setProductList(Products.filter(p => p.isDeal));
        break;
      case 'trending':
        setProductList(Products.filter(p => p.isTrending));
        break;
      default:
        setProductList(Products);
        break;
    }
    setSearchText('');
    setFilterVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ffff' }}>
      <View style={{ marginTop: '7%' }}>
        <Header />
      </View>

        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search any product..."
        />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.itemCount}>{filteredProducts.length}+ Items</Text>

          <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>
            {filter === 'deals' ? 'Deal Products' : 'Trending Products'}
          </Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.actionRow} onPress={() => setSortVisible(true)}>
                <Text style={styles.actionText}>Sort</Text>
                <Ionicons name="swap-vertical" size={14} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionRow} onPress={() => setFilterVisible(true)}>
                <Text style={styles.actionText}>Filter</Text>
                <Ionicons name="options-outline" size={14} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingBottom: 16, paddingTop: 10 }}
          renderItem={({ item }) => <ProductCard product={item} />}
          scrollEnabled={false} // Disable FlatList scrolling since parent ScrollView handles it
        />

        {wishlistProducts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Wishlist</Text>
            <FlatList
              data={wishlistProducts}
              horizontal
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10 }}
              renderItem={({ item }) => <ProductCard product={item} />}
              scrollEnabled={false} // Disable FlatList scrolling since parent ScrollView handles it
            />
          </View>
        )}

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
      </ScrollView>
    </View>
  );
};

export default TrendingProduct;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  section: { paddingHorizontal: 16, marginTop: 10 },
  itemCount: { fontSize: 12, color: '#666', marginBottom: 6 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#000' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  row: { flexDirection: 'row', gap: 10 },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 28,
    backgroundColor: '#FDFDFD',
    justifyContent: 'center',
  },
  actionText: { fontSize: 13, color: '#000' },
});