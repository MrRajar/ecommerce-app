import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';

interface Props {
  title: string;
  image: string | number | ImageSourcePropType;
  onPress?: () => void;
}

const normalizeImageSource = (
  img: string | number | ImageSourcePropType
): ImageSourcePropType | undefined => {
  if (!img) return undefined;

  if (typeof img === 'string') {
    const clean = img.trim();
    if (!clean) return undefined;

    const finalUrl = clean.startsWith('//')
      ? `https:${clean}`
      : clean;

    return { uri: encodeURI(finalUrl) };
  }

  return img as ImageSourcePropType;
};

const CategoryCard: React.FC<Props> = ({ title, image, onPress }) => {
  const imageSource = normalizeImageSource(image);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {imageSource ? <Image source={imageSource} style={styles.image} /> : null}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
});