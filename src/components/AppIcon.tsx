import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AppIcon = ({ name, size = 20, color = '#999' }: any) => {
  return <Ionicons name={name} size={size} color={color} />;
};

export default AppIcon;
