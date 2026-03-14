import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text, ImageSourcePropType } from 'react-native';

interface OfferCardProps {
  image: ImageSourcePropType;  // Proper type for images
  title: string;
  subtitle: string;
  onPress?: () => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ image, title, subtitle, onPress }) => {
  return (
    <View style={styles.container}>
      {/* Top Image */}
      <Image source={image} style={styles.image} />

      {/* Bottom Content */}
      <View style={styles.contentRow}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>View all →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  container: {
    width: '93%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Montserrat',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    fontFamily: 'Montserrat',
  },
  button: {
    backgroundColor: '#FF4B6E',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
