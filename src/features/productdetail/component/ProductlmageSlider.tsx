// src/features/productdetail/component/ProductImageSlider.tsx
import React, { useRef, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import type { ImageInput } from "../../../types/Products";

const { width } = Dimensions.get("window");

interface Props {
  images: ImageInput[];
  height?: number;
  showArrow?: boolean;
}

const ProductImageSlider: React.FC<Props> = ({
  images,
  height = 250,
  showArrow = true,
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const normalizeSource = (img: ImageInput) => {
    return typeof img === "string" ? { uri: img } : img;
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const goNext = () => {
    if (activeIndex < images.length - 1) {
      scrollRef.current?.scrollTo({
        x: (activeIndex + 1) * width,
        animated: true,
      });
    }
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      scrollRef.current?.scrollTo({
        x: (activeIndex - 1) * width,
        animated: true,
      });
    }
  };

  const showPrev = showArrow && activeIndex > 0;
  const showNext = showArrow && activeIndex < images.length - 1;

  return (
    <View>
      <View style={[styles.sliderWrap, { height }]}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={10}
        >
          {images.map((img, idx) => (
            <Image
              key={idx}
              source={normalizeSource(img)}
              style={[styles.image, { height }]}
            />
          ))}
        </ScrollView>

        {/* Left Arrow - shows on 2nd image onwards */}
        {showPrev && (
          <TouchableOpacity
            style={styles.prevBtn}
            onPress={goPrev}
            activeOpacity={0.85}
          >
            <Text style={styles.arrow}>‹</Text>
          </TouchableOpacity>
        )}

        {/* Right Arrow - shows on all except last image */}
        {showNext && (
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={goNext}
            activeOpacity={0.85}
          >
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Dots */}
      <View style={styles.dots}>
        {images.map((_, idx) => (
          <View
            key={idx}
            style={[styles.dot, idx === activeIndex && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default ProductImageSlider;

const styles = StyleSheet.create({
  sliderWrap: {
    width: "90%",
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignSelf: "center",
  },
  image: {
    width,
    resizeMode: "cover",
    justifyContent: "center",
    alignSelf: "center",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d6d6d6",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#ff3b5c",
  },
  prevBtn: {
    position: "absolute",
    left: 14,
    top: "45%",
    backgroundColor: "rgba(255,255,255,0.85)",
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  nextBtn: {
    position: "absolute",
    right: 14,
    top: "45%",
    backgroundColor: "rgba(255,255,255,0.85)",
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    color: "#111",
    fontSize: 26,
    fontWeight: "700",
    marginTop: -5,
  },
});