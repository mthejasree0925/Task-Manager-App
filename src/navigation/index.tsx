import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskDetails from "../screens/TaskDetails";
import SignIn from "../screens/SignIn";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabs from "../navigation/BottomTabs";

const Stack = createNativeStackNavigator();


export function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userLoggedIn, setuserLoggedIn] = useState<string | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userRole = await AsyncStorage.getItem('@user_role');
        const loggedIn = await AsyncStorage.getItem('@user_logged_in');
        setUserRole(userRole)
        setuserLoggedIn(loggedIn);
      } catch (e) {
        console.error("Error checking login state:", e);
      }
      setIsLoading(false);
    };
    checkLogin();
  }, []);
  if (isLoading) {
    // Optionally return a splash/loading screen here
    return null;
  }



  return (

    <Stack.Navigator >
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="Tasks">
        {(props) => <BottomTabs {...props} userRole={userRole} />}
      </Stack.Screen>
      <Stack.Screen name="TaskDetails" component={TaskDetails}
        options={{
          headerStyle: { backgroundColor: '#0066cc' },
          headerTintColor: '#fff',

        }} />

    </Stack.Navigator>

  );
}