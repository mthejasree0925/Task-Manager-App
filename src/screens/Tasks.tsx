import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import MyButton from '../components/Button';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Tasks() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const navigateToTaskDetails = () => {
    navigation.navigate('TaskDetails');
  };
  // useEffect(() => {
  //   const loadUserData = async () => {
  //     try {
  //       const email = await AsyncStorage.getItem('@user_email');
  //       const role = await AsyncStorage.getItem('@user_role');
  //       console.log("eeeeeeeeeeeeeeeeeeee-------",email);
  //       console.log("role------------", role);
  //       if (email && role) {
  //         // user is already logged in
  //         navigation.navigate("Tasks", { role });
  //       } else {
  //         // show sign in screen
  //         navigation.navigate("SignIn", { role })
  //       }
  //     } catch (e) {
  //       console.error("Error loading user data", e);
  //     }
  //   };
  //   loadUserData();
  // }, []);

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
