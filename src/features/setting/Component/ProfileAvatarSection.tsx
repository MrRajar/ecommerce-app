import React from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppImages from '../../../shared/utlis/AppImages';
import { styles } from '../settings.styles';

type Props = {
  imageUri: string | null;
  isPickingImage: boolean;
  onPressEdit: () => void;
};

const ProfileAvatarSection: React.FC<Props> = ({
  imageUri,
  isPickingImage,
  onPressEdit,
}) => {
  return (
    <View style={styles.avatarWrapper}>
      <Image
        source={imageUri ? { uri: imageUri } : AppImages.avatar}
        style={styles.avatar}
      />

      <TouchableOpacity
        style={styles.avatarEdit}
        onPress={onPressEdit}
        activeOpacity={0.9}
        disabled={isPickingImage}
      >
        {isPickingImage ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Ionicons name="pencil" size={16} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileAvatarSection;