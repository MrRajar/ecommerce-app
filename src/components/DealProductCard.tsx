import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-ratings';

interface Props {
  title: string;
  description: string;
  price: string;
  image: any;
  rating?: number;
  onPress?: () => void;
}

const DealProductCard: React.FC<Props> = ({
  title,
  description,
  price,
  image,
  rating = 4,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} />

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>

      <Text style={styles.price}>{price}</Text>

      <Rating
        type="star"
        ratingCount={4}
        imageSize={14}
        readonly
        startingValue={rating}
        style={styles.rating}
      />
    </TouchableOpacity>
  );
};

export default DealProductCard;

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    marginBottom: 10,
    alignItems: 'center',
    // shadow
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF4B26',
    marginBottom: 4,
  },
  rating: {
    alignSelf: 'flex-start',
  },
});
