import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { Product } from "../types/Products";
import ProductCard from './ProductCard';

const { width } = Dimensions.get('window');

interface DealOfDayCardProps {
  products: Product[];
  timer?: string;
  onViewAll?: () => void;
}

const DealOfDayCard: React.FC<DealOfDayCardProps> = ({
  products,
  timer = '12:45:30',
  onViewAll
}) => {

  const flatListRef = useRef<FlatList>(null);

  // ⭐ Scroll Right Function
  const scrollRight = () => {
    flatListRef.current?.scrollToOffset({
      offset: width * 0.6,
      animated: true
    });
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.headerRow}>
        <View style={{marginLeft:"5%"}}>
          <Text style={styles.title}>Deal of the Day</Text>
          <View style={styles.timerRow}>
            <Ionicons name="alarm-outline" size={16} color="#fff" />
            <Text style={styles.timer}>{timer}</Text>
            <Text style={styles.remainingText}> Remaining</Text>
          </View>
        </View>
         <View style={{marginRight:"5%"}}>
        <TouchableOpacity style={styles.viewBtn} onPress={onViewAll}>
          <Text style={styles.viewAll}>View all</Text>
          <Ionicons name="chevron-forward" size={16} color="#fff" />
        </TouchableOpacity>
        </View>
      </View>

      {/* Product List */}
      <View>
        <FlatList
          ref={flatListRef}
          data={products}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingTop: 1 }}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProductCard product={item} />
            </View>
          )}
        />

        {/* ⭐ Arrow Scroll Button */}
        <TouchableOpacity style={styles.scrollBtn} onPress={scrollRight}>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default DealOfDayCard;

const styles = StyleSheet.create({

  container: {
    padding: 16,
  },

  headerRow: {
    backgroundColor: '#4392F9',
    flexDirection:"row",
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    height:90,width:"100%",
  },

  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  timer: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },

  remainingText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 4,
  },

  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },

  viewAll: {
    color: '#fff',
    fontSize: 14,
    marginRight: 4,
  },

  cardWrapper: {
    width: width * 0.42,
    marginRight: 12,
  },

  // ⭐ Scroll Arrow Style
  scrollBtn: {
    position: 'absolute',
    right: -5,
    top: '45%',
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
    elevation: 5,
  },

});
