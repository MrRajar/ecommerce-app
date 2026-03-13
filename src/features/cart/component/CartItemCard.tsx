import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TEXT = "#111";
const MUTED = "#8d8d8d";
const BORDER = "#ededed";

import { CartItem } from "../cart/CartStore";

const CartItemCard: React.FC<{
  item: CartItem;
  size?: string;
  qty?: number;
  onPressSize: () => void;
  onPressQty: () => void;
}> = ({ item, size, qty, onPressSize, onPressQty }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <Image source={item.image} style={styles.image} />

        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>

          <View style={styles.variantRow}>
            <Text style={styles.variantLabel}>Variations : </Text>
            <View style={styles.variantChip}>
              <Text style={styles.variantText}>{size || "—"}</Text>
            </View>
            <View style={styles.variantChip}>
              <Text style={styles.variantText}>Qty {qty || 1}</Text>
            </View>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>4.8</Text>
            {[1, 2, 3, 4].map(i => <Ionicons key={i} name="star" size={12} color="#FFD700" />)}
            <Ionicons name="star-half" size={12} color="#FFD700" />
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${item.price}.00</Text>
            <View>
              <Text style={styles.discountText}>upto 33% off</Text>
              <Text style={styles.oldPrice}>${Math.round(item.price * 1.5)}.00</Text>
            </View>
          </View>

        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>Total Order (1) :</Text>
        <Text style={styles.footerPrice}>${item.price * (qty || 1)}.00</Text>
      </View>
    </View>
  );
};

export default CartItemCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardContent: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  variantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  variantLabel: {
    fontSize: 12,
    color: '#666',
  },
  variantChip: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
  },
  variantText: {
    fontSize: 10,
    color: '#333',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  discountText: {
    fontSize: 10,
    color: '#e74c3c',
  },
  oldPrice: {
    fontSize: 10,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 13,
    color: '#000',
  },
  footerPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
});
