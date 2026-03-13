import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";

import ProductImageSlider from "../../productdetail/component/ProductlmageSlider";
import SizeSelector from "../component/SizeSelector";
import SortModal from "../../../components/SortModal";
import FilterModal from "../../../components/FilterModal";

import { Products } from "../../../data/Products";
import DetailHeader from "../component/DetailHeader";
import { cartStore } from "../../cart/cart/CartStore";
import type { ImageInput, Product } from "../../../types/Products";

type Filters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
};

interface Props {
  navigation: any;
  route: any;
}

const ProductDetail: React.FC<Props> = ({ navigation, route }) => {
  const { product } = route.params as { product: Product };

  const [selectedSize, setSelectedSize] = useState<string>("7 UK");
  const [quantity] = useState<number>(1);
  const [showMore, setShowMore] = useState(false);

  const [sortVisible, setSortVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const [similarOffsetY, setSimilarOffsetY] = useState(0);

  const [filters, setFilters] = useState<Filters>({});
  const [sortKey, setSortKey] = useState<"low" | "high" | "rating" | null>(null);

  const sliderImages: ImageInput[] =
    product?.images && product.images.length > 0
      ? product.images
      : product?.image
      ? [product.image, product.image, product.image]
      : [];

  const baseSimilar = useMemo(() => {
    return Products.filter((p) => {
      const sameCategory = product?.category ? p.category === product.category : true;
      return sameCategory && p.id !== product.id;
    });
  }, [product?.category, product?.id]);

  const shownSimilar = useMemo(() => {
    let list = [...baseSimilar];

    if (filters.category) {
      list = list.filter((p) => p.category === filters.category);
    }

    if (filters.minPrice !== undefined) {
      list = list.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      list = list.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters.minRating !== undefined) {
      list = list.filter((p) => (p.rating ?? 0) >= filters.minRating!);
    }

    if (sortKey === "low") list.sort((a, b) => a.price - b.price);
    if (sortKey === "high") list.sort((a, b) => b.price - a.price);
    if (sortKey === "rating") list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

    return list;
  }, [baseSimilar, filters, sortKey]);

  const ratingValue = Number(product?.rating ?? 4);
  const ratingCount = Number(product?.ratingCount ?? 56890);

  const oldPrice = Math.round(
    Number(product?.oldPrice ?? (product?.price ? product.price * 2 : 0))
  );
  const price = Number(product?.price ?? 0);
  const discountText = "50% Off";

  const subtitle = product?.subtitle || "Vision Alta Men’s Shoes Size (All Colours)";

  const detailsText =
    product?.description ||
    `Perhaps the most iconic sneaker of all-time, this original "Chicago" colorway is the cornerstone to any sneaker collection.
Made famous in 1985, the shoe has stood the test of time, becoming one of the most legendary styles ever made.`;

  const stars = (val: number) => {
    const full = Math.max(0, Math.min(5, Math.floor(val)));
    return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
  };

  const handleAddToCart = () => {
    const cartImage: ImageInput =
      (product.image as ImageInput) ??
      (product.images?.[0] as ImageInput) ??
      sliderImages[0];

    cartStore.addItem({
      ...product,
      image: cartImage,
      subtitle: product.subtitle || product.description,
      size: selectedSize,
      qty: quantity,
      sizes: product.sizes ?? ["6 UK", "7 UK", "8 UK", "9 UK", "10 UK"],
    });

    navigation.replace("Cart");
  };

  const handleBuyNow = () => {
    navigation.replace("PlaceOrder", {
      product: {
        ...product,
        subtitle: product.subtitle || product.description,
        size: selectedSize,
        qty: quantity,
      },
    });
  };

  const scrollToSimilar = () => {
    scrollRef.current?.scrollTo({
      y: similarOffsetY,
      animated: true,
    });
  };

  const onPressCompare = () => {
    Alert.alert("Compare", "Added to compare (demo).");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 25 }}>
        <DetailHeader />
      </View>

      <ScrollView
        ref={scrollRef}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 10 }}>
          <ProductImageSlider images={sliderImages} height={300} />
        </View>

        <View style={styles.content}>
          <SizeSelector
            sizes={product?.sizes || ["6 UK", "7 UK", "8 UK", "9 UK", "10 UK"]}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
          />

          <Text style={styles.title}>{product?.title || product?.name}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.starText}>{stars(ratingValue)}</Text>
            <Text style={styles.ratingCount}>{ratingCount.toLocaleString()}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.oldPrice}>₹{oldPrice}</Text>
            <Text style={styles.newPrice}>₹{price}</Text>
            <Text style={styles.discount}>{discountText}</Text>
          </View>

          <Text style={styles.sectionTitle}>Product Details</Text>
          <Text style={styles.detailsText} numberOfLines={showMore ? undefined : 4}>
            {detailsText}
          </Text>

          <TouchableOpacity onPress={() => setShowMore((prev) => !prev)}>
            <Text style={styles.moreText}>{showMore ? "Less" : "…More"}</Text>
          </TouchableOpacity>

          <View style={styles.chipsRow}>
            <View style={styles.chip}>
              <Text style={styles.chipIcon}>📍</Text>
              <Text style={styles.chipLabel}>Nearest Store</Text>
            </View>

            <View style={styles.chip}>
              <Text style={styles.chipIcon}>🔒</Text>
              <Text style={styles.chipLabel}>VIP</Text>
            </View>

            <View style={styles.chip}>
              <Text style={styles.chipIcon}>🔄</Text>
              <Text style={styles.chipLabel}>Return policy</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.cartBtn]}
              onPress={handleAddToCart}
              activeOpacity={0.9}
            >
              <View style={[styles.btnIconCircle, styles.blueCircle]}>
                <Text style={styles.btnIcon}>🛒</Text>
              </View>
              <Text style={styles.actionText}>Go to cart</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.buyBtn]}
              onPress={handleBuyNow}
              activeOpacity={0.9}
            >
              <View style={[styles.btnIconCircle, styles.greenCircle]}>
                <Text style={styles.btnIcon}>🧾</Text>
              </View>
              <Text style={styles.actionText}>Buy Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.deliveryBanner}>
            <Text style={styles.deliverySmall}>Delivery in</Text>
            <Text style={styles.deliveryBig}>1 within Hour</Text>
          </View>

          <View style={styles.secondaryRow}>
            <TouchableOpacity style={styles.outlineBtn} onPress={scrollToSimilar}>
              <Text style={styles.outlineIcon}>👁️</Text>
              <Text style={styles.outlineText}>View Similar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.outlineBtn} onPress={onPressCompare}>
              <Text style={styles.outlineIcon}>🏷️</Text>
              <Text style={styles.outlineText}>Add to Compare</Text>
            </TouchableOpacity>
          </View>

          <View
            onLayout={(e) => setSimilarOffsetY(e.nativeEvent.layout.y)}
            style={styles.similarHeaderRow}
          >
            <View>
              <Text style={styles.similarHeading}>Similar To</Text>
              <Text style={styles.similarCount}>{shownSimilar.length}+ Items</Text>
            </View>

            <View style={styles.sortFilterBtns}>
              <TouchableOpacity
                style={styles.smallBtn}
                onPress={() => setSortVisible(true)}
              >
                <Text style={styles.smallBtnText}>Sort ⇅</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.smallBtn}
                onPress={() => setFilterVisible(true)}
              >
                <Text style={styles.smallBtnText}>Filter ⛃</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.similarGrid}>
          {shownSimilar.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.similarCard}
              activeOpacity={0.9}
              onPress={() => navigation.replace("ProductDetail", { product: item })}
            >
              {item.image ? (
                <Image source={item.image as any} style={styles.similarCardImage} />
              ) : (
                <View style={styles.similarCardImage} />
              )}

              <View style={styles.similarCardContent}>
                <Text style={styles.similarCardTitle} numberOfLines={1}>
                  {item.title}
                </Text>

                <Text style={styles.similarCardDesc} numberOfLines={2}>
                  {item.description || "Comfortable & stylish everyday wear sneaker."}
                </Text>

                <Text style={styles.similarCardPrice}>₹{item.price}</Text>

                <View style={styles.similarCardRatingRow}>
                  <Text style={styles.similarStarText}>
                    {stars(Number(item.rating ?? 4))}
                  </Text>
                  <Text style={styles.similarCardRatingCount}>
                    {(item.ratingCount ?? 46890).toLocaleString()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <SortModal
          visible={sortVisible}
          onClose={() => setSortVisible(false)}
          onSortLowToHigh={() => {
            setSortKey("low");
            setSortVisible(false);
          }}
          onSortHighToLow={() => {
            setSortKey("high");
            setSortVisible(false);
          }}
          onSortByRating={() => {
            setSortKey("rating");
            setSortVisible(false);
          }}
        />

        <FilterModal
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          onReset={() => {
            setFilters({});
            setFilterVisible(false);
          }}
          onApply={(f) => {
            setFilters(f);
            setFilterVisible(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  sizeText: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#111",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 10,
    color: "#000",
  },

  subtitle: {
    fontSize: 16,
    color: "#444",
    marginTop: 6,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },

  starText: {
    fontSize: 16,
    color: "#f4b400",
  },

  ratingCount: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
  },

  oldPrice: {
    fontSize: 16,
    color: "#999",
    textDecorationLine: "line-through",
  },

  newPrice: {
    fontSize: 20,
    color: "#000",
    fontWeight: "800",
  },

  discount: {
    fontSize: 18,
    color: "#ff3b5c",
    fontWeight: "800",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
    marginTop: 16,
  },

  detailsText: {
    fontSize: 14,
    color: "#444",
    marginTop: 8,
    lineHeight: 20,
  },

  moreText: {
    color: "#ff3b5c",
    fontWeight: "700",
    marginTop: 4,
  },

  chipsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },

  chipIcon: {
    fontSize: 16,
  },

  chipLabel: {
    fontSize: 13,
    color: "#444",
    fontWeight: "600",
  },

  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },

  actionBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  cartBtn: {
    backgroundColor: "#2D7FF9",
  },

  buyBtn: {
    backgroundColor: "#36D07F",
  },

  actionText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },

  btnIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  blueCircle: {},

  greenCircle: {},

  btnIcon: {
    fontSize: 16,
  },

  deliveryBanner: {
    marginTop: 14,
    backgroundColor: "#ffd6dc",
    borderRadius: 14,
    padding: 16,
  },

  deliverySmall: {
    fontSize: 16,
    fontFamily: "Monsterrat",
    fontWeight: "700",
    color: "#111",
  },

  deliveryBig: {
    fontSize: 30,
    fontFamily: "Monsterrat",
    fontWeight: "700",
    color: "#111",
    marginTop: 2,
  },

  secondaryRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },

  outlineBtn: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  outlineIcon: {
    fontSize: 16,
  },

  outlineText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111",
  },

  similarHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 18,
    paddingBottom: 10,
  },

  similarHeading: {
    fontSize: 25,
    fontWeight: "900",
    fontFamily: "Montserrat",
    color: "#000",
  },

  similarCount: {
    fontSize: 24,
    fontWeight: "900",
    fontFamily: "Montserrat",
    color: "#000",
    marginTop: 6,
  },

  sortFilterBtns: {
    flexDirection: "row",
    gap: 10,
  },

  smallBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
  },

  smallBtnText: {
    fontSize: 13,
    fontFamily: "Montserrat",
    color: "#111",
    fontWeight: "700",
  },

  similarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  similarCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 14,
  },

  similarCardImage: {
    width: "100%",
    height: 180,
    backgroundColor: "#f2f2f2",
    resizeMode: "cover",
  },

  similarCardContent: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 12,
  },

  similarCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },

  similarCardDesc: {
    fontSize: 12,
    color: "#444",
    lineHeight: 18,
    minHeight: 36,
    marginBottom: 8,
  },

  similarCardPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
  },

  similarCardRatingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  similarStarText: {
    fontSize: 13,
    color: "#f4b400",
  },

  similarCardRatingCount: {
    fontSize: 12,
    color: "#9a9a9a",
    marginLeft: 6,
  },
});