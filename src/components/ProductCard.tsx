import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type { Product } from '../types/Products';
import { RootStackParamList } from '../navigation/AppNavigator';
import { normalizeImageSource } from '../shared/utlis/normalizeImageSource';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - 56) / 2;

interface ProductCardProps {
  product: Product & {
    imageUrl?: string;
  };
  onPress?: () => void;
  showRating?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  showRating = true,
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

  const productImage =
    typeof product.image === 'string'
      ? product.image
      : typeof product.imageUrl === 'string'
      ? product.imageUrl
      : '';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      <Image
        source={normalizeImageSource(productImage)}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {product.title}
        </Text>

        {product.description ? (
          <Text numberOfLines={2} style={styles.description}>
            {product.description}
          </Text>
        ) : (
          <View style={styles.descriptionSpacer} />
        )}

        <Text style={styles.price}>₨{product.price}</Text>

        {!!product.oldprice && (
          <Text style={styles.oldPrice}>₨{product.oldprice}</Text>
        )}

        {showRating && !!product.rating && (
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= Number(product.rating) ? 'star' : 'star-outline'}
                size={14}
                color="#EDB310"
                style={styles.starIcon}
              />
            ))}

            {!!product.ratingcount && (
              <Text style={styles.ratingCount}>{product.ratingcount}</Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 16,
    elevation: 3,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 120,
    backgroundColor: '#f3f3f3',
  },

  content: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 12,
  },

  name: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111',
  },

  description: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    lineHeight: 13,
    minHeight: 34,
  },

  descriptionSpacer: {
    height: 34,
  },

  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    paddingTop: 4,
  },

  oldPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginTop: 2,
  },

  ratingContainer: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  starIcon: {
    marginRight: 2,
  },

  ratingCount: {
    marginLeft: 6,
    fontSize: 11,
    color: '#999',
  },
});