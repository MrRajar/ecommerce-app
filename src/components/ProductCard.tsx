import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { Product } from '../types/Products';
import { RootStackParamList } from '../navigation/AppNavigator'; 

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - 40) / 2;

interface ProductCardProps {
  product: Product;

  onPress?: () => void;
  layout?: 'vertical' | 'horizontal';
  showAddToCart?: boolean;
  showWishlist?: boolean;

  showRating?: boolean;
}


const normalizeImageSource = (img?: string | number | ImageSourcePropType) => {
  if (!img) return undefined;
  if (typeof img === 'string') return { uri: img } as ImageSourcePropType;
  return img as ImageSourcePropType;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  showRating = true, // 
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    navigation.navigate('ProductDetail', { product } as any);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`Open details for ${product.title}`}
    >
      <Image
        source={normalizeImageSource(product.image)}
        style={styles.image}
        resizeMode="cover"
      />

      <Text numberOfLines={1} style={styles.name}>
        {product.title}
      </Text>

      {product.description ? (
        <Text numberOfLines={1} style={styles.description}>
          {product.description}
        </Text>
      ) : null}

      <Text style={styles.price}>${product.price}</Text>

      {showRating && !!product.rating && (
        <View
          style={styles.ratingContainer}
          accessible
          accessibilityLabel={`${product.rating} out of 5 stars`}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= product.rating ? 'star' : 'star-outline'}
              size={14}
              color="#EDB310"
              style={{ marginRight: 2 }}
            />
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    marginBottom: 16,
    elevation: 3,
    marginRight: 8,
  },
  image: {
    height: 190,
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#f3f3f3',
  },
  name: {
    fontSize: 13,
    marginTop: 8,
    fontWeight: '600',
    color: '#111',
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
  },
});