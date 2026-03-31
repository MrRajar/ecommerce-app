import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  onSortLowToHigh: () => void;
  onSortHighToLow: () => void;
  onSortByRating: () => void;
}

const SortModal: React.FC<SortModalProps> = ({
  visible,
  onClose,
  onSortLowToHigh,
  onSortHighToLow,
  onSortByRating,
}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
    >
      <Pressable style={styles.overlay} onPress={onClose} />

      <View style={styles.container}>
        <Text style={styles.title}>Sort By</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={onSortLowToHigh}
        >
          <Text style={styles.optionText}>Price: Low to High</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={onSortHighToLow}
        >
          <Text style={styles.optionText}>Price: High to Low</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={onSortByRating}
        >
          <Text style={styles.optionText}>Rating</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancel}
          onPress={onClose}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default SortModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FDFDFD',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    color: '#000',
  },
  option: {
    paddingVertical: 14,
  },
  optionText: {
    fontSize: 15,
    color: '#000',
  },
  cancel: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 14,
    color: '#FF4B26',
    fontWeight: '600',
  },
});
