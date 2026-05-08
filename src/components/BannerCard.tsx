import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { normalizeImageSource } from '../shared/utlis/normalizeImageSource';

interface Props {
  image: string;
  title?: string;
  subtitle?: string;
  onPress?: () => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const BannerCard: React.FC<Props> = ({
  image,
  title = '50-40% OFF',
  subtitle = 'Now in (product)\n All colours',
  onPress,
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image source={normalizeImageSource(image)} style={styles.image} />

        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle?.replace(/All colours/i, '\nAll colours').trim()}</Text>

          <View style={styles.button}>
            <Text style={styles.buttonText}>Shop Now →</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BannerCard;

const styles = StyleSheet.create({
  wrapper: {
    width: SCREEN_WIDTH,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    width: SCREEN_WIDTH - 40,
    overflow: 'hidden',
    borderRadius: 12,
  },

  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  overlay: {
    position: 'absolute',
    left: 16,
    top: 24,
  },

  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Montserrat',
    paddingTop:20
  },

  subtitle: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 6,
    lineHeight: 20,
    fontFamily: 'Montserrat',
  },

  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 5,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },

  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});