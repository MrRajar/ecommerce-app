import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';

interface Props {
  image: string | number | ImageSourcePropType;
  label?: string;
  title?: string;
  onPress?: () => void;
}

const normalizeImageSource = (
  img: string | number | ImageSourcePropType
): ImageSourcePropType => {
  if (typeof img === 'string') return { uri: img };
  return img as ImageSourcePropType;
};

const SponsoredCard: React.FC<Props> = ({
  image,
  label = 'Sponsored',
  title = 'Up to 50% Off',
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
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
    marginBottom: '25%',
    overflow: 'hidden',
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