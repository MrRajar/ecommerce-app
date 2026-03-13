import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  name: string;
  type?: 'ion' | 'material';
  size?: number;
  color?: string;
}

const AppIcon: React.FC<Props> = ({
  name,
  type = 'ion',
  size = 22,
  color = '#000',
}) => {
  switch (type) {
    case 'material':
      return <MaterialIcons name={name} size={size} color={color} />;
    default:
      return <Ionicons name={name} size={size} color={color} />;
  }
};

export default AppIcon;
