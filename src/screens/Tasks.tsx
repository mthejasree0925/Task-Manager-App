import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyButton from '../components/Button';
import { t } from 'i18next';

export default function Tasks() {
  const navigation = useNavigation();

  const navigateToTaskDetails = () => {
    navigation.navigate('TaskDetails');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('signin.taskTitle')}</Text>
      <MyButton
        title={t('signin.tasks')}
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
