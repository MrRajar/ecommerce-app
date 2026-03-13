import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { AppImages } from '../shared/utlis/AppImages';

interface SocialButtonProps {
  type: 'google' | 'facebook' | 'apple';
  onPress?: () => void | Promise<void>; // ✅ parent se action receive karne ke liye
}

const SocialButton: React.FC<SocialButtonProps> = ({ type, onPress }) => {
  const getImage = () => {
    if (type === 'google') return AppImages.google;
    if (type === 'facebook') return AppImages.facebook;
    return AppImages.apple;
  };

  return (
    <TouchableOpacity
      style={styles.circle}
      onPress={onPress}           // ✅ yahan connect kiya
      activeOpacity={0.8}
    >
      <Image source={getImage()} style={styles.icon} />
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },

  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});