import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import AppButton from '../../components/AppButton';

const Welcome = ({navigation }) => {
  return (
   <ImageBackground
  source={require('../../../assets/images/welcome.png')}
  style={styles.container}
  resizeMode="cover"
>
  <View style={styles.content}>
    
    <View/>

    <Text style={styles.title}>
      You want{'\n'}Authentic, here{'\n'}you go!
    </Text>

    <Text style={styles.subtitle}>
      Find it here, buy it now!
    </Text>

    <AppButton
      title="Get Started"
      onPress={() => navigation.replace('MainTabs')}
      buttonStyle={styles.button}
      textStyle={styles.buttonText}
    />
  </View>
</ImageBackground>

  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  content: {
    paddingBottom:50,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.26)', 
    paddingVertical: 20,flexDirection:"column",justifyContent:"flex-end",height:"100%"
  },

 

  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: 0.5,
    fontFamily: 'Montserrat-SemiBold',
    zIndex: 1,
  },

  subtitle: {
    color: '#F2F2F2',
    fontSize: 14,
    marginTop: 8,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 1,
    zIndex: 1,
  },

  button: {
    width: '75%',
    marginTop: 24,
    borderRadius: 12,
    zIndex: 1,
  },

  buttonText: {
    fontSize: 17,
  },
});
