import React from 'react';
import { Modal, Pressable, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../settings.styles';

type Props = {
  visible: boolean;
  hasPicture: boolean;
  onClose: () => void;
  onView: () => void;
  onChooseGallery: () => void;
  onTakePhoto: () => void;
  onRemove: () => void;
};

const AvatarOptionsSheet: React.FC<Props> = ({
  visible,
  hasPicture,
  onClose,
  onView,
  onChooseGallery,
  onTakePhoto,
  onRemove,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.sheetCard} onPress={() => {}}>
          <View style={styles.sheetHandle} />

          <Text style={styles.sheetTitle}>Profile Picture</Text>
          <Text style={styles.sheetSubtitle}>Choose an action</Text>

          {hasPicture && (
            <TouchableOpacity style={styles.sheetOption} activeOpacity={0.85} onPress={onView}>
              <View style={styles.sheetOptionLeft}>
                <View style={styles.sheetIconWrap}>
                  <Ionicons name="eye-outline" size={20} color="#111827" />
                </View>
                <Text style={styles.sheetOptionText}>View Profile Picture</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.sheetOption} activeOpacity={0.85} onPress={onTakePhoto}>
            <View style={styles.sheetOptionLeft}>
              <View style={styles.sheetIconWrap}>
                <Ionicons name="camera-outline" size={20} color="#111827" />
              </View>
              <Text style={styles.sheetOptionText}>Take from Camera</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sheetOption}
            activeOpacity={0.85}
            onPress={onChooseGallery}
          >
            <View style={styles.sheetOptionLeft}>
              <View style={styles.sheetIconWrap}>
                <Ionicons name="images-outline" size={20} color="#111827" />
              </View>
              <Text style={styles.sheetOptionText}>Choose from Gallery</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {hasPicture && (
            <TouchableOpacity style={styles.sheetOption} activeOpacity={0.85} onPress={onRemove}>
              <View style={styles.sheetOptionLeft}>
                <View style={[styles.sheetIconWrap, styles.sheetIconDangerWrap]}>
                  <Ionicons name="trash-outline" size={20} color="#DC2626" />
                </View>
                <Text style={[styles.sheetOptionText, styles.sheetDangerText]}>
                  Remove Profile Picture
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#FCA5A5" />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.sheetCancelBtn} activeOpacity={0.9} onPress={onClose}>
            <Text style={styles.sheetCancelText}>Cancel</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AvatarOptionsSheet;