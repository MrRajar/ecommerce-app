import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

interface SpecialOfferCardProps {
  image: string | number | ImageSourcePropType;
  title: string;
  description: string;
  emoji?: string;
}

const normalizeImageSource = (
  img: string | number | ImageSourcePropType
): ImageSourcePropType => {
  if (typeof img === 'string') return { uri: img };
  return img as ImageSourcePropType;
};

const SpecialOfferCard: React.FC<SpecialOfferCardProps> = ({
  image,
  title,
  description,
  emoji = '😱',
}) => {
  return (
    <View style={styles.offerBox}>
      <Image source={normalizeImageSource(image)} style={styles.offerImage} />

      <View style={styles.offerContent}>
        <View style={styles.offerTitleRow}>
          <Text style={styles.offerTitle}>{title}</Text>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>

        <Text style={styles.offerDesc}>{description}</Text>
      </View>
    </View>
  );
};

export default SpecialOfferCard;

const styles = StyleSheet.create({
  offerBox: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    width: '88%',
    minHeight: 90,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  offerImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginLeft: 20,
    backgroundColor: '#f3f3f3',
  },

  offerContent: {
    flex: 1,
    marginLeft: 45,
    paddingRight: 12,
  },

  offerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  offerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    marginRight: 6,
  },

  emoji: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    borderWidth: 0.5,
    borderColor: '#00000026',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  offerDesc: {
    fontFamily: 'Montserrat',
    fontSize: 11,
    fontWeight: '300',
    color: '#000',
    marginTop: 4,
  },
});