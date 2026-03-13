import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../settings.styles';

type Props = {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  rightIcon?: React.ReactNode;
  onPressField?: () => void;
  editable?: boolean;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

const SettingsInputField: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  rightIcon,
  onPressField,
  editable = true,
  maxLength,
  autoCapitalize,
}) => {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>

      {onPressField ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressField}
          style={styles.inputBox}
        >
          <Text style={styles.inputText}>{value}</Text>
          {rightIcon}
        </TouchableOpacity>
      ) : (
        <View style={styles.inputBox}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            editable={editable}
            style={styles.textInput}
            placeholderTextColor="#9CA3AF"
            maxLength={maxLength}
            autoCapitalize={autoCapitalize}
          />
          {rightIcon}
        </View>
      )}
    </View>
  );
};

export default SettingsInputField;