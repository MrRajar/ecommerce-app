import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface FlatHeelCardProps {
  title: string;
  subTitle?: string;
  buttonText: string;
  image: any;
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
      {/* Decorative yellow dots */}
      <View style={styles.yellowDotsContainer}>
        {Array.from({ length: 50, }).map((_, i) => (
          <View key={i} style={styles.yellowDot} />
        ))}
      </View>

        
      <Image source={image} style={styles.image} />
     
      <View style={styles.textContainer}>
       <Text style={styles.title}>Flat and Heels</Text>
        {subTitle !== '' && <Text style={styles.subTitle}>Stand a chance to get rewarded</Text>}
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Visit Now</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default FlatHeelCard;
const styles = StyleSheet.create({
  cardBox: {
    width: '88%',height:"7%",
    alignSelf: 'center',
    backgroundColor: '#F8F8F8', // white card background
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden', // to clip decorative dots
  },

  yellowDotsContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 40, // area for decorative dots
    justifyContent: 'center',
    alignItems: 'center',
  },

  yellowDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFD700', // yellow
    margin: 1,
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',alignItems:"center"
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    justifyContent:"center",textAlign:"center"
  },

  subTitle: {
    fontSize: 14,
    fontWeight: '300',
    color: '#333',
    marginVertical: 4,
    fontFamily:"Montserrat"
  },

  button: {
    marginTop:4,
    backgroundColor: '#F83758', // pink button like design
    paddingVertical: 8,
    borderRadius: 3,
    width:"50%",
    justifyContent:"flex-end",alignSelf:"flex-end"
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight:"600",
    textAlign: 'center',
  },

  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginLeft: 10,
  },
});
