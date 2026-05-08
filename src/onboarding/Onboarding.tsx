import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onboardingdata } from './onboardingdata';

const { width } = Dimensions.get('window');

const ONBOARDING_DONE_KEY = 'onboarding_done';

const Onboarding = ({ navigation }: any) => {
  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_DONE_KEY, '1');

      // replace use kiya taake onboarding stack me na rahe
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', 'Unable to save onboarding status');
      navigation.replace('Login'); // fallback
    }
  };

  const handleNext = async () => {
    if (index < onboardingdata.length - 1) {
      ref.current?.scrollToIndex({ index: index + 1 });
    } else {
      // ✅ last slide par onboarding complete mark karo
      await completeOnboarding();
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      ref.current?.scrollToIndex({ index: index - 1 });
    }
  };

  const handleSkip = async () => {
    // ✅ skip par bhi onboarding complete mark karo
    await completeOnboarding();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.topBar}>
        <View style={styles.counterContainer}>
          <Text style={styles.counterActive}>{index + 1}</Text>
          <Text style={styles.counterLight}>/{onboardingdata.length}</Text>
        </View>

        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={ref}
        data={onboardingdata}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onMomentumScrollEnd={e =>
          setIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        )}
      />

      <View style={styles.bottomSection}>
        {index > 0 ? (
          <TouchableOpacity onPress={handlePrev}>
            <Text style={styles.prev}>Prev</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}

        <View style={styles.dotsWrapper}>
          {onboardingdata.map((_, i) => (
            <View key={i} style={[styles.dot, index === i && styles.activeDot]} />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.next}>
            {index === onboardingdata.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 35,
  },

  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  counterActive: {
    fontSize: 14,
    color: '#000',
    fontWeight: '800',
    fontFamily: 'Montserrat-SemiBold',
  },

  counterLight: {
    fontSize: 14,
    color: '#B0B0B0',
    fontWeight: '800',
    fontFamily: 'Montserrat-SemiBold',
  },

  skip: {
    fontSize: 14,
    color: '#000',
    fontWeight: '800',
    fontFamily: 'Montserrat-SemiBold',
  },

  slide: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  image: {
    width: 260,
    height: 260,
    resizeMode: 'contain',
    marginBottom: 30,
  },

  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-ExtraBold',
    color: '#0000',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.5,
  },

desc: {
  fontSize: 14,
  fontFamily: 'Montserrat-SemiBold',
  color: '#A8A8A9',
  textAlign: 'center',
  lineHeight: 24,
  letterSpacing: 0.5,
  width:"100%",
},

  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  dotsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 6,
    overflow: 'hidden',
  },

  activeDot: {
    backgroundColor: '#17223B',
    width: 40,
    height: 8,
    borderRadius: 4,
  },

  next: {
    fontSize: 16,
    color: '#F83758',
    fontWeight: '600',
  },

  prev: {
    fontSize: 16,
    color: '#C4C4C4',
    fontWeight: '700',
    marginLeft: '5%',
  },
});