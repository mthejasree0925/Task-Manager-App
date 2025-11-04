import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyButton from '../components/Button';

export default function Tasks() {
  const navigation = useNavigation();

  const navigateToTaskDetails = () => {
    navigation.navigate('TaskDetails');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tasks screen with tabs!! Go to task details by clicking on Tasks!!</Text>
      <MyButton
        title="TASKS"
        onPress={navigateToTaskDetails}
        buttonStyle={styles.button}
        textStyle={styles.buttonText}
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
  text: {
    textAlign: 'center',
    padding: 20
  },
  button: { backgroundColor: '#4caf50' },
  buttonText: {
    color: '#fff'
  }
});
