import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import AppIcon from '../shared/utlis/AppIcon';

const AppInput = ({
  placeholder,
  icon,
  iconType = 'material',
  secureTextEntry,
  value,
  onChangeText,
  error,
}: any) => {
  const [hide, setHide] = useState(!!secureTextEntry);

  return (
    <View style={{ marginBottom: 14 }}>
      <View style={[styles.box, error && styles.err]}>
        {/* LEFT ICON */}
        {icon && (
          <AppIcon name={icon} type={iconType} size={22} color="#626262" />
        )}

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry ? hide : false}
          value={value}
          onChangeText={onChangeText}
        />

        {/* RIGHT ICON (EYE) — ONLY FOR PASSWORD */}
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setHide(!hide)}>
            <AppIcon
              name={hide ? 'visibility-off' : 'visibility'}
              type="material"
              size={22}
              color="#626262"
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={styles.errText}>{error}</Text> : null}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 60,
    backgroundColor: '#F3F3F3',
  },
  input: { flex: 1, marginHorizontal: 10 },
  err: { borderColor: 'red' },
  errText: { color: 'red', fontSize: 12, marginTop: 6, paddingLeft: 4 },
});
