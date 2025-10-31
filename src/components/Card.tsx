import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Card: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: { padding: 12, margin: 8, borderRadius: 8, backgroundColor: 'white', shadowColor: '#000', shadowOpacity: 0.1, elevation: 2 }
});
