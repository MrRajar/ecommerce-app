import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import AppIcon from '../../src/shared/utlis/AppIcon';

interface SearchBarProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder, onFocus }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <AppIcon name="search" type="material" size={22} color="#999" />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#BBBBBB"
          style={styles.input}
          onFocus={onFocus} 
        />

        <TouchableOpacity>
          <AppIcon name="mic" type="material" size={22} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginBottom: 15 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
    color: '#000',
  },
});
