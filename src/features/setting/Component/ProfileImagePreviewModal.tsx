import React from 'react';
import { Modal, View, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppImages from '../../../shared/utlis/AppImages';
import { styles } from '../settings.styles';

type Props = {
  visible: boolean;
  imageUri: string | null;
  onClose: () => void;
};

const ProfileImagePreviewModal: React.FC<Props> = ({
  visible,
  imageUri,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.previewBackdrop}>
        <TouchableOpacity
          style={styles.previewCloseBtn}
          onPress={onClose}
          activeOpacity={0.9}
        >
          <Ionicons name="close" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.previewImageWrap}>
          <Image
            source={imageUri ? { uri: imageUri } : AppImages.avatar}
            style={styles.previewImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </Modal>
  );
};

export default ProfileImagePreviewModal;