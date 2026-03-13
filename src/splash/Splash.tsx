import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_DONE_KEY = 'onboarding_done';

const Splash = ({ navigation }: any) => {
  useEffect(() => {
    let timeoutId: any;

    const boot = async () => {
      // wait for firebase auth
      const unsub = auth().onAuthStateChanged(async (user) => {
        const onboardingDone = await AsyncStorage.getItem(ONBOARDING_DONE_KEY);

        timeoutId = setTimeout(() => {
          if (user) {
            // ✅ user already logged in (even after days)
            navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
          } else {
            // ✅ not logged in
            if (onboardingDone === '1') {
              navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
            } else {
              navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
            }
          }
        }, 2000);

        unsub(); // only once on splash
      });
    };

    boot();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Stylish</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'gradient', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  logo: { width: 124, height: 100, marginBottom: 20 },
  text: { fontSize: 40, color: '#F83758', fontWeight: 'bold', marginLeft: '5%', fontFamily: 'Montserrat-italic.ttf' },
});