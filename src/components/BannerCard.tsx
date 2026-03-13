import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

interface Props {
  image: any;
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  showDots?: boolean;
  activeDotIndex?: number;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const BannerCard: React.FC<Props> = ({
  image,
  title = '50-40% OFF',
  subtitle = 'Now in (product)\nAll colours',
  onPress,
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image source={image} style={styles.image} />

        {/* Text Overlay */}
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

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
  // ✅ each banner item = exact one page width (important for correct dots)
  wrapper: {
    width: SCREEN_WIDTH,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    width: SCREEN_WIDTH - 40, // 20 left + 20 right visual margin
    overflow: 'hidden',
    borderRadius: 12,
  },

  image: {
    width: '100%',
    height: 180,
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
  },

  subtitle: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 6,
    lineHeight: 18,
    fontFamily: 'Montserrat',
  },

  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },

  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  // (unused in this component now, dots Home.tsx handles)
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: '#FFA3B3',
  },
});