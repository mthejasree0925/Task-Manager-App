import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import MyButton from '../components/Button';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Tasks({route}) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);
  console.log("routeeeeeeeeeeeee-------", route);

  const navigateToTaskDetails = () => {
    navigation.navigate('TaskDetails');
  };
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('@user_email');
        const role = await AsyncStorage.getItem('@user_role');
        console.log("email=------------", email);
        // if (email !== null) {
        //   // user is already logged in
        //   navigation.navigate("BottomTabs");
        // } else {
        //   // show sign in screen
        //   navigation.navigate("SignIn")
        // }
      } catch (e) {
        console.error("Error loading user data", e);
      }
    };
    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{textAlign:'center', padding: 20}}>Tasks screen with tabs!! Go to task details by clicking on Tasks!!</Text>
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
