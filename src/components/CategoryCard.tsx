import React, { useMemo, useState } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { normalizeImageSource } from '../shared/utlis/normalizeImageSource';

interface Props {
  title: string;
  image: string;
  onPress?: () => void;
}

const CategoryCard: React.FC<Props> = ({ title, image, onPress }) => {
  const [hasError, setHasError] = useState(false);

  const imageSource = useMemo(() => normalizeImageSource(image), [image]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      {!hasError && imageSource ? (
        <Image
          source={imageSource}
          style={styles.image}
          onError={() => setHasError(true)}
        />
      ) : (
        <View style={styles.fallbackCircle}>
          <Text style={styles.fallbackLetter}>
            {title?.charAt(0)?.toUpperCase() || '?'}
          </Text>
        </View>
      )}

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 64,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginBottom: 6,
    backgroundColor: '#f2f2f2',
  },
  fallbackCircle: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginBottom: 6,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackLetter: {
    fontSize: 18,
    fontWeight: '700',
    color: '#666',
  },
  title: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
  },
});