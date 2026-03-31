import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
  ActivityIndicator,
  RefreshControl,
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
import TrendingHeader from '../../../components/TrendingHeader';
import BannerCard from '../../../components/BannerCard';
import SponsoredCard from '../../../components/SponsoredCard';
import OfferCard from '../../../components/OfferCard';
import SortModal from '../../../components/SortModal';
import FilterModal from '../../../components/FilterModal';

import {
  getHomeData,
  AppProduct,
  AppCategory,
  AppBanner,
  AppOffer,
} from '../../../services/Firestore';

type Filters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
};

type BannerItem = {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
};

type CategoryItem = {
  id: string;
  title: string;
  image: string;
};

type OfferItem = {
  image: string;
  title: string;
  subtitle: string;
};

const Home = ({ navigation }: any) => {
  const [activeBanner, setActiveBanner] = useState(0);
  const [timeLeft, setTimeLeft] = useState(6 * 60 * 60);

  const [loading, setLoading] = useState(true);

  const [allProducts, setAllProducts] = useState<AppProduct[]>([]);
  const [homeProductList, setHomeProductList] = useState<AppProduct[]>([]);

  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [banners, setBanners] = useState<BannerItem[]>([]);

  const [specialOffer, setSpecialOffer] = useState<OfferItem | null>(null);
  const [mainOffer, setMainOffer] = useState<OfferItem | null>(null);
  const [heelBanner, setHeelBanner] = useState<OfferItem | null>(null);
  const [sponsoredOffer, setSponsoredOffer] = useState<OfferItem | null>(null);
  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const bannerRef = useRef<FlatList>(null);

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
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);

      const response = await getHomeData();

        const firestoreProducts = response.products || [];

        const firestoreCategories = (response.categories || []).map(
          (item: AppCategory) => ({
            id: item.id,
            title: item.title,
            image: item.image,
          })
        );

        const firestoreBanners = (response.banners || []).map(
          (item: AppBanner) => ({
            id: item.id,
            image: item.image,
            title: item.title,
            subtitle: item.subtitle,
          })
        );

        const activeOffers = (response.offers || []).filter(
          (item: AppOffer) => item.image && item.isActive !== false
        );

        const specialOfferData =
          activeOffers.find(
            (item: AppOffer) => item.key?.toLowerCase() === 'specialoffer'
          ) || null;

        const heelOfferData =
          activeOffers.find(
            (item: AppOffer) => item.key?.toLowerCase() === 'flatandheels'
          ) || null;

        const summerOfferData =
          activeOffers.find(
            (item: AppOffer) => item.key?.toLowerCase() === 'summeroffer'
          ) || null;

        const sponsoredOfferData =
        activeOffers.find(
        (item: AppOffer) => item.key?.toLowerCase().includes('sponsored')
         ) || null;

        setAllProducts(firestoreProducts);
        setHomeProductList(firestoreProducts);
        setCategories(firestoreCategories);
        setBanners(firestoreBanners);

        setSpecialOffer(
          specialOfferData
            ? {
                image: specialOfferData.image,
                title: specialOfferData.title,
                subtitle: specialOfferData.subtitle,
              }
            : null
        );

        setHeelBanner(
          heelOfferData
            ? {
                image: heelOfferData.image,
                title: heelOfferData.title,
                subtitle: heelOfferData.subtitle,
              }
            : null
        );

        setMainOffer(
          summerOfferData
            ? {
                image: summerOfferData.image,
                title: summerOfferData.title,
                subtitle: summerOfferData.subtitle,
              }
            : null
        );

        setSponsoredOffer(
  sponsoredOfferData
    ? {
        image: sponsoredOfferData.image,
        title: sponsoredOfferData.title,
        subtitle: sponsoredOfferData.subtitle,
      }
    : null
);

        console.log(
          'HOME BACKEND DATA =>',
          JSON.stringify(
            {
              products: firestoreProducts.slice(0, 3),
              categories: firestoreCategories.slice(0, 6),
              banners: firestoreBanners.slice(0, 3),
              offers: activeOffers.slice(0, 4),
            },
            null,
            2
          )
        );
      } catch (error) {
        console.log('HOME LOAD ERROR =>', error);

        setAllProducts([]);
        setHomeProductList([]);
        setCategories([]);
        setBanners([]);
        setSpecialOffer(null);
        setMainOffer(null);
        setHeelBanner(null);
        setSponsoredOffer(null);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  useEffect(() => {
    if (banners.length > 0) {
      const intervalId = setInterval(() => {
        setActiveBanner((prevActive) => {
          const nextIndex = (prevActive + 1) % banners.length;
          bannerRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          return nextIndex;
        });
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [banners.length]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadHomeData();
  }, []);

  const onBannerMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    if (!banners.length) return;

    const x = event.nativeEvent.contentOffset.x;
    const pageWidth = event.nativeEvent.layoutMeasurement.width || 1;

    const rawIndex = Math.round(x / pageWidth);
    const safeIndex = Math.max(0, Math.min(banners.length - 1, rawIndex));

    setActiveBanner(safeIndex);
  };

  const trendingProducts = useMemo(() => {
    return homeProductList.filter((p) => p.isTrending);
  }, [homeProductList]);

  const dealProducts = useMemo(() => {
    return homeProductList.filter((p) => p.isDeal);
  }, [homeProductList]);

  const sortLowToHigh = () => {
    const sorted = [...homeProductList].sort((a, b) => a.price - b.price);
    setHomeProductList(sorted);
    setSortVisible(false);
  };

  const sortHighToLow = () => {
    const sorted = [...homeProductList].sort((a, b) => b.price - a.price);
    setHomeProductList(sorted);
    setSortVisible(false);
  };

  const sortByRating = () => {
    const sorted = [...homeProductList].sort((a, b) => b.rating - a.rating);
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
          p.price >= (filters.minPrice ?? 0) &&
          p.price <= (filters.maxPrice ?? Infinity)
      );
    }

    if (filters.minRating !== undefined) {
      filtered = filtered.filter((p) => p.rating >= filters.minRating!);
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
        <Header onAvatarPress={() => navigation.navigate('SettingsScreen')} />
      </View>

      <SearchBar
        onFocus={() => navigation.navigate('TrendingProduct', { filter: 'all' })}
        value=""
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

        {categories.length > 0 && (
          <View style={styles.categoryWrapper}>
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => String(item.id)}
              initialNumToRender={10}
              renderItem={({ item }) => (
                <CategoryCard
                  title={item.title}
                  image={item.image}
                  onPress={() => {
                    navigation.navigate('TrendingProduct', {
                      filter: 'category',
                      categoryId: item.id,
                      categoryTitle: item.title,
                    });
                  }}
                />
              )}
            />
          </View>
        )}
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4392F9" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {banners.length > 0 && (
            <View style={styles.bannerSection}>
              <FlatList
                ref={bannerRef}
                data={banners}
                horizontal
                pagingEnabled
                bounces={false}
                overScrollMode="auto"
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                onMomentumScrollEnd={onBannerMomentumEnd}
                scrollEventThrottle={8}
                renderItem={({ item }) => (
                  <BannerCard
                    image={item.image}
                    title={item.title}
                    subtitle={item.subtitle}
                  />
                )}
              />

              <View style={styles.dotsContainer}>
                {banners.map((_, index) => (
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
          )}

          {dealProducts.length > 0 && (
            <View>
              <DealOfDayCard
                products={dealProducts}
                timer={`${hours}:${minutes}:${seconds}`}
                onViewAll={() =>
                  navigation.navigate('TrendingProduct', { filter: 'deal' })
                }
              />
            </View>
          )}

          {specialOffer && (
            <SpecialOfferCard
              image={specialOffer.image}
              title={specialOffer.title}
              description={specialOffer.subtitle}
              emoji="😱"
            />
          )}

          {heelBanner && (
            <FlatHeelCard
              image={heelBanner.image}
              title={heelBanner.title}
              subTitle={heelBanner.subtitle}
              buttonText="Visit now →"
            />
          )}

          {trendingProducts.length > 0 && (
            <>
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
                contentContainerStyle={{ paddingHorizontal: 15, gap: 13, top: 5 }}
              />
            </>
          )}

          {mainOffer && (
            <View style={{ marginTop: '5%' }}>
              <OfferCard
                image={mainOffer.image}
                title={mainOffer.title}
                subtitle={mainOffer.subtitle}
              />
           
            </View>
            
          )}
     
          {sponsoredOffer && (
            <SponsoredCard
              image={sponsoredOffer.image}
              title={sponsoredOffer.subtitle || sponsoredOffer.title}
              label={sponsoredOffer.title || "Sponsored"}
            />
          )}

          {!banners.length &&
            !categories.length &&
            !dealProducts.length &&
            !trendingProducts.length &&
            !specialOffer &&
            !mainOffer &&
            !heelBanner &&
            !sponsoredOffer && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No backend data found.</Text>
              </View>
            )}
        </ScrollView>
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
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDFD' ,paddingBottom:40},

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

  categoryWrapper: {
    backgroundColor: '#ffff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

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

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});