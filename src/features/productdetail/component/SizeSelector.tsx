// src/components/SizeSelector.tsx

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
      <Text style={styles.label}>Size : {selectedSize}</Text>
      <View style={styles.row}>
        {(sizes || []).map(size => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeBox,
              selectedSize === size && styles.active,
            ]}
            onPress={() => onSelect(size)}
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
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeBox: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  active: {
    backgroundColor: '#ff3b5c',
    borderColor: '#ff3b5c',
  },
  sizeText: {
    fontSize: 13,
    color: '#000',
  },
  activeText: {
    color: '#fff',
  },
});
