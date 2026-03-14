import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, CommonActions } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Successfully: React.FC = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'MainTabs',
              state: {
                routes: [{ name: 'Home' }],
              },
            },
          ],
        })
      );
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.overlay}>
      <View style={styles.popup}>
        <View style={styles.iconWrapper}>
          <View style={styles.dotSmallLeft} />
          <View style={styles.dotSmallRight} />
          <View style={styles.dotTinyLeft} />
          <View style={styles.dotTinyRight} />

          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={38} color="#fff" />
          </View>
        </View>

        <Text style={styles.successText}>Payment done successfully.</Text>
      </View>
    </View>
  );
};

export default Successfully;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  popup: {
    width: width * 0.88,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 10,
  },

  iconWrapper: {
    width: 110,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F83758',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dotSmallLeft: {
    position: 'absolute',
    left: 18,
    top: 22,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F8A5B5',
  },

  dotSmallRight: {
    position: 'absolute',
    right: 18,
    top: 18,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F8A5B5',
  },

  dotTinyLeft: {
    position: 'absolute',
    left: 28,
    top: 44,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F8A5B5',
  },

  dotTinyRight: {
    position: 'absolute',
    right: 28,
    top: 42,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F8A5B5',
  },

  successText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
});