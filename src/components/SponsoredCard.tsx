import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { normalizeImageSource } from '../shared/utlis/normalizeImageSource';

interface Props {
  image: string;
  label?: string;
  title?: string;
  onPress?: () => void;
}

const SponsoredCard: React.FC<Props> = ({
  image,
  label = 'Sponsored',
  title = 'Up to 50% Off',
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.label}>{label}</Text>

      <Image source={normalizeImageSource(image)} style={styles.image} />

      <View style={styles.footer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.arrow}>→</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SponsoredCard;

const styles = StyleSheet.create({
  container: {
    width: '88%',
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: '10%',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  label: {
    fontSize: 18,
    color: '#000',
    fontWeight: '800',
    margin: 10,
    fontFamily: 'Montserrat',
  },

  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    backgroundColor: '#f3f3f3',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Montserrat',
  },

  arrow: {
    fontSize: 16,
    color: '#000',
  },
});