import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../../components/Header';
import SearchBar from '../../../components/SearchBar';
import CategoryCard from '../../../components/CategoryCard';
import ProductCard from '../../../components/ProductCard';
import DealOfDayCard from '../../../components/DealofdayCard';
import SpecialOfferCard from '../../../components/SpecialOfferCard';
import FlatHeelCard from '../../../components/FlatHeelCard';
import TrendingHeader from '../../../components/TrendingHeader.tsx';
import BannerCard from '../../../components/BannerCard';
import SponsoredCard from '../../../components/SponsoredCard';
import OfferCard from '../../../components/OfferCard';
import SortModal from '../../../components/SortModal';
import FilterModal from '../../../components/FilterModal';

import { Products } from '../../../data/Products';
import { Categories } from '../../../data/Categories';
import {
  HomePageBanners,
  SummerOffer,
  HeelBanner,
} from '../../../data/Banners';
import AppImages from '../../../shared/utlis/AppImages';
import { getAllProducts } from '../../../services/Firestore';

type Filters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
};

const Home = ({ navigation }: any) => {
  const [activeBanner, setActiveBanner] = useState(0);
  const [timeLeft, setTimeLeft] = useState(6 * 60 * 60);

  const [allProducts, setAllProducts] = useState<any[]>(Products);
  const [homeProductList, setHomeProductList] = useState<any[]>(Products);

  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const firestoreProducts = await getAllProducts();

        console.log(
          'HOME FIRESTORE PRODUCTS =>',
          JSON.stringify(firestoreProducts.slice(0, 5), null, 2)
        );

        const source =
          firestoreProducts && firestoreProducts.length > 0
            ? firestoreProducts
            : Products;

        if (isMounted) {
          setAllProducts(source);
          setHomeProductList(source);
        }
      } catch (error) {
        console.log('HOME PRODUCTS LOAD ERROR =>', error);

        if (isMounted) {
          setAllProducts(Products);
          setHomeProductList(Products);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  const onBannerMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const x = event.nativeEvent.contentOffset.x;
    const pageWidth = event.nativeEvent.layoutMeasurement.width || 1;

    const rawIndex = Math.round(x / pageWidth);
    const safeIndex = Math.max(
      0,
      Math.min(HomePageBanners.length - 1, rawIndex)
    );

    setActiveBanner(safeIndex);
  };

  const trendingProducts = useMemo(() => {
    const tagged = homeProductList.filter(
      (p) => p.isTrending || p.tags?.includes('trending')
    );

    if (tagged.length >= 2) return tagged;
    return homeProductList.slice(0, 8);
  }, [homeProductList]);

  const dealProducts = useMemo(() => {
    const tagged = homeProductList.filter(
      (p) => p.isDeal || p.tags?.includes('deal') || p.tags?.includes('deals')
    );

    if (tagged.length >= 2) return tagged;
    return homeProductList.slice(0, 8);
  }, [homeProductList]);

  const sortLowToHigh = () => {
    const sorted = [...homeProductList].sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
    setHomeProductList(sorted);
    setSortVisible(false);
  };

  const sortHighToLow = () => {
    const sorted = [...homeProductList].sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
    setHomeProductList(sorted);
    setSortVisible(false);
  };

  const sortByRating = () => {
    const sorted = [...homeProductList].sort(
      (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
    );
    setHomeProductList(sorted);
    setSortVisible(false);
  };

  const handleFilterApply = (filters: Filters) => {
    let filtered = [...allProducts];

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      filtered = filtered.filter(
        (p) =>
          Number(p.price) >= (filters.minPrice ?? 0) &&
          Number(p.price) <= (filters.maxPrice ?? Infinity)
      );
    }

    if (filters.minRating !== undefined) {
      filtered = filtered.filter(
        (p) => Number(p.rating || 0) >= filters.minRating!
      );
    }

    setHomeProductList(filtered);
    setFilterVisible(false);
  };

  const handleFilterReset = () => {
    setHomeProductList(allProducts);
    setFilterVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: '7%' }}>
      <Header onAvatarPress={() => navigation.navigate('Settings')} />
      </View>

      <SearchBar
        onFocus={() => navigation.navigate('TrendingProduct', { filter: 'all' })}
        value={''}
        onChangeText={() => {}}
        placeholder="Search any product..."
      />

      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>All Featured</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.actionRow}
              onPress={() => setSortVisible(true)}
            >
              <Text style={styles.actionText}>Sort</Text>
              <Ionicons name="swap-vertical" size={14} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionRow}
              onPress={() => setFilterVisible(true)}
            >
              <Text style={styles.actionText}>Filter</Text>
              <Ionicons name="options-outline" size={14} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{backgroundColor:"#ffff",paddingVertical:15,paddingHorizontal:10,borderRadius:10}}>
        <FlatList
          data={Categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryCard title={item.title} image={item.image} />
          )}
        />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bannerSection}>
          <FlatList
            data={HomePageBanners}
            horizontal
            pagingEnabled
            bounces={false}
            overScrollMode="auto"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onMomentumScrollEnd={onBannerMomentumEnd}
            scrollEventThrottle={8}
            renderItem={({ item }) => <BannerCard image={item.image} />}
          />

          <View style={styles.dotsContainer}>
            {HomePageBanners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeBanner === index && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>
         <View>
        <DealOfDayCard
          products={dealProducts}
          timer={`${hours}:${minutes}:${seconds}`}
          onViewAll={() =>
            navigation.navigate('TrendingProduct', { filter: 'deals' })
          }
        />
</View>
        <SpecialOfferCard
          image={AppImages.specialoffer}
          title="Special Offers"
          description="We make sure you get the best prices"
          emoji="😱"
        />

        <FlatHeelCard
          image={HeelBanner.image}
          title={HeelBanner.title}
          subTitle={HeelBanner.subtitle}
          buttonText="Visit now →"
        />

        <View style={{ marginTop: '3%' }}>
          <TrendingHeader
            title="Trending Products"
            subtitle="Last Date 29/02/22"
            onPressViewAll={() =>
              navigation.navigate('TrendingProduct', { filter: 'trending' })
            }
          />
        </View>

        <FlatList
          data={trendingProducts}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ProductCard product={item} showRating={false} />
          )}
          contentContainerStyle={{ paddingHorizontal: 15, gap: 13,top:5 }}
        />

        <View style={{ marginTop: '5%' }}>
          <OfferCard
            image={SummerOffer[0].image}
            title={SummerOffer[0].title}
            subtitle={SummerOffer[0].subtitle}
          />
        </View>

        <SponsoredCard image={AppImages.sponsored1} />
      </ScrollView>

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

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDFD' },

  section: { paddingHorizontal: 20, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  row: { flexDirection: 'row', gap: 10 },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFF',
    paddingHorizontal: 8,
    height: 26,
    borderRadius: 8,
  },
  actionText: { fontSize: 13, color: '#000' },

  bannerSection: { paddingVertical: 15 },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 16,
    backgroundColor: '#FFA3B3',
  },
});