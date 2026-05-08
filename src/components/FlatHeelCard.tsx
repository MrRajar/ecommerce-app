import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { normalizeImageSource } from '../shared/utlis/normalizeImageSource';

interface FlatHeelCardProps {
  title: string;
  subTitle?: string;
  buttonText: string;
  image: string;
  onPress?: () => void;
}

const FlatHeelCard: React.FC<FlatHeelCardProps> = ({
  title,
  subTitle = '',
  buttonText,
  image,
  onPress,
}) => {
  return (
    <View style={styles.cardBox}>
      <View style={styles.yellowDotsContainer}>
        {Array.from({ length: 50 }).map((_, i) => (
          <View key={i} style={styles.yellowDot} />
        ))}
      </View>

      <Image source={normalizeImageSource(image)} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>

        {subTitle !== '' && (
          <Text style={styles.subTitle}>{subTitle}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlatHeelCard;

const styles = StyleSheet.create({
  cardBox: {
    width: '88%',
    alignSelf: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: 12,
    minHeight: 130,
  },

  yellowDotsContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  yellowDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFD700',
    margin: 1,
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    textAlign: 'center',
  },

  subTitle: {
    fontSize: 14,
    fontWeight: '300',
    color: '#333',
    marginVertical: 4,
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },

  button: {
    marginTop: 6,
    backgroundColor: '#F83758',
    paddingVertical: 8,
    borderRadius: 3,
    width: '50%',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginLeft: 10,
  },
});