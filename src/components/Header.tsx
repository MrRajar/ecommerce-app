import React, { useCallback, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppIcon from '../shared/utlis/AppIcon';
import { AppImages } from '../shared/utlis/AppImages';

const PROFILE_IMAGE_KEY = '@profile_image_uri';

interface HeaderProps {
  onAvatarPress?: () => void;
  onMenuPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAvatarPress, onMenuPress }) => {
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadProfileImage = async () => {
        try {
          const savedUri = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);

          if (isActive) {
            setProfileImageUri(savedUri || null);
          }
        } catch (error) {
          console.log('Failed to load profile image in header', error);
        }
      };

      loadProfileImage();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleAvatarPress = () => {
    if (onAvatarPress) {
      onAvatarPress();
      return;
    }

    navigation.navigate('SettingsScreen');
  };

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
      return;
    }
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMenuPress} activeOpacity={0.8}>
        <AppIcon name="menu" type="material" size={26} />
      </TouchableOpacity>

      <View style={styles.center}>
        <Image source={AppImages.appLogo} style={styles.logo} />
        <Text style={styles.title}>Stylish</Text>
      </View>

      <View style={styles.right}>
        <TouchableOpacity onPress={handleAvatarPress} activeOpacity={0.8}>
          <Image
            source={profileImageUri ? { uri: profileImageUri } : AppImages.avatar}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  center: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  logo: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4392F9',
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
});