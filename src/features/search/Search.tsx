import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ProductCard from '../../components/ProductCard'; // ✅ path check
import { Products } from '../../data/Products'; // ✅ path check

const SEARCH_HISTORY_KEY = '@search_history_v1';
const MAX_HISTORY_ITEMS = 10;

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // ✅ Load saved history
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const raw = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setSearchHistory(parsed);
        }
      } catch (e) {
        console.log('Failed to load search history', e);
      }
    };

    loadHistory();
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    if (!q) return [];

    return Products.filter((p: any) => {
      const title = String(p?.title ?? '').toLowerCase();
      const desc = String(p?.description ?? '').toLowerCase();
      const category = String(p?.category ?? '').toLowerCase();

      return (
        title.includes(q) ||
        desc.includes(q) ||
        category.includes(q)
      );
    });
  }, [searchText]);

  const persistHistory = async (items: string[]) => {
    try {
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(items));
    } catch (e) {
      console.log('Failed to save search history', e);
    }
  };

  const saveSearchToHistory = async (query: string) => {
    const clean = query.trim();
    if (!clean) return;

    const updated = [
      clean,
      ...searchHistory.filter(
        item => item.trim().toLowerCase() !== clean.toLowerCase()
      ),
    ].slice(0, MAX_HISTORY_ITEMS);

    setSearchHistory(updated);
    await persistHistory(updated);
  };

  const handleSubmitSearch = async () => {
    const clean = searchText.trim();
    if (!clean) return;

    await saveSearchToHistory(clean);
    Keyboard.dismiss();
  };

  const handleHistoryPress = async (item: string) => {
    setSearchText(item);
    await saveSearchToHistory(item);
  };

  const handleRemoveHistoryItem = async (item: string) => {
    const updated = searchHistory.filter(
      h => h.trim().toLowerCase() !== item.trim().toLowerCase()
    );
    setSearchHistory(updated);
    await persistHistory(updated);
  };

  const clearSearchHistory = async () => {
    setSearchHistory([]);
    try {
      await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (e) {
      console.log('Failed to clear search history', e);
    }
  };

  const renderHistoryItem = ({ item }: { item: string }) => (
    <View style={styles.historyItem}>
      <TouchableOpacity
        style={styles.historyLeft}
        activeOpacity={0.8}
        onPress={() => handleHistoryPress(item)}
      >
        <Ionicons name="time-outline" size={18} color="#777" />
        <Text style={styles.historyText} numberOfLines={1}>
          {item}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleRemoveHistoryItem(item)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close" size={18} color="#999" />
      </TouchableOpacity>
    </View>
  );

  const showHistory = searchText.trim().length === 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.headerWrap}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#666" />

          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search any product..."
            placeholderTextColor="#9CA3AF"
            returnKeyType="search"
            onSubmitEditing={handleSubmitSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {!!searchText && (
            <TouchableOpacity
              onPress={() => setSearchText('')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search History */}
      {showHistory ? (
        <View style={styles.sectionContainer}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>

            {searchHistory.length > 0 && (
              <TouchableOpacity onPress={clearSearchHistory}>
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>

          {searchHistory.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Ionicons name="search-outline" size={22} color="#B0B0B0" />
              <Text style={styles.emptyText}>No recent searches</Text>
              <Text style={styles.emptySubText}>
                Your searched items will appear here.
              </Text>
            </View>
          ) : (
            <FlatList
              data={searchHistory}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={renderHistoryItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </View>
      ) : (
        // Search Results
        <View style={styles.resultsContainer}>
          <View style={[styles.rowBetween, { paddingHorizontal: 16, marginBottom: 8 }]}>
            <Text style={styles.sectionTitle}>Results</Text>
            <Text style={styles.resultsCount}>{filteredProducts.length} items</Text>
          </View>

          {filteredProducts.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Ionicons name="search-outline" size={22} color="#B0B0B0" />
              <Text style={styles.emptyText}>No products found</Text>
              <Text style={styles.emptySubText}>
                Try another keyword or category.
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredProducts}
              numColumns={2}
              keyExtractor={(item: any, index) => String(item?.id ?? index)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.productListContent}
              columnWrapperStyle={styles.productRow}
              renderItem={({ item }: any) => (
                <ProductCard product={item} />
              )}
              keyboardShouldPersistTaps="handled"
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    paddingTop:"10%"
  },

  headerWrap: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },

  searchBox: {
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  searchInput: {
    flex: 1,
    height: 44,
    color: '#111827', // ✅ visible text fix
    fontSize: 14,
  },

  sectionContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  resultsContainer: {
    flex: 1,
    paddingTop: 8,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },

  clearAllText: {
    fontSize: 13,
    color: '#F83758',
    fontWeight: '600',
  },

  resultsCount: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },

  historyItem: {
    minHeight: 46,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    paddingHorizontal: 12,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  historyLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 10,
  },

  historyText: {
    flex: 1,
    fontSize: 14,
    color: '#222',
  },

  emptyWrap: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  emptyText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },

  emptySubText: {
    marginTop: 6,
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
  },

  productListContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // bottom tab se overlap avoid
  },

  productRow: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});