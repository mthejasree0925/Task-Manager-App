import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import MyButton from '../components/Button';
import { useState } from 'react';

export default function Tasks() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const navigateToTaskDetails = () => {
    navigation.navigate('TaskDetails');
  };

  return (
    <View style={styles.container}>
      <Text>Tasks screen</Text>
      <MyButton
        title="TASKS"
        onPress={navigateToTaskDetails}
        loading={loading}
        buttonStyle={{ backgroundColor: '#4caf50' }}
        textStyle={{ color: '#fff' }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
