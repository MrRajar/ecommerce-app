import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
}

const SizeSelector: React.FC<Props> = ({
  sizes,
  selectedSize,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Size: {selectedSize}</Text>
      <View style={styles.row}>
        {(sizes || []).map(size => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeBox,
              selectedSize === size && styles.active,
            ]}
            onPress={() => onSelect(size)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.sizeText,
                selectedSize === size && styles.activeText,
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SizeSelector;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeBox: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#fa6682',
    backgroundColor: '#fff',
    minWidth: 48,
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#fa6682',
    borderColor: '#fa6682',
  },
  sizeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fa6682',
  },
  activeText: {
    color: '#fff',
  },
});
