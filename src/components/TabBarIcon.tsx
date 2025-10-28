import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

type TabBarIconProps = {
  name: keyof typeof MaterialIcons.glyphMap;
  color: string;
  size: number;
  focused?: boolean;
};

export const TabBarIcon: React.FC<TabBarIconProps> = ({
  name,
  color,
  size,
  focused,
}) => {
  return (
    <MaterialIcons
      name={name}
      size={size}
      color={focused ? color : '#999'}
      style={{ opacity: focused ? 1 : 0.7 }}
    />
  );
};
