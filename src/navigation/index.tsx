import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskDetails from "../screens/TaskDetails";
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Tasks from "../screens/Tasks";
import SignOut from "../screens/SignOut";
import { TabBarIcon } from "../components/TabBarIcon";
import Errors from "../screens/Errors";
import SignIn from "../screens/SignIn";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function AuthTabs() {

  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          // Map routes to icons 
          const iconMap: Record<string, keyof typeof MaterialIcons.glyphMap> = {
            Tasks: 'list',
            Error: 'error-outline',
            SignOut: 'logout',
          };
          const iconName = iconMap[route.name] || 'circle';
          return (
            <TabBarIcon
              name={iconName}
              size={size}
              color={color}
              focused={focused}
            />
          );
        },
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: '#757575',
      })}
    >
      <Tab.Screen name="Tasks" component={Tasks} />
      <Tab.Screen name="Errors" component={Errors} />
      <Tab.Screen name="SignOut" component={SignIn} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);


  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userRole = await AsyncStorage.getItem('@user_role');
        const loggedIn = await AsyncStorage.getItem('@user_logged_in');
        setIsLoggedIn(loggedIn);
        setUserRole(userRole)
        console.log("role----------", userRole, loggedIn)
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

    <Stack.Navigator>
      <Stack.Screen name="SignOut" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="Tasks" component={AuthTabs} />
      <Stack.Screen name="TaskDetails" component={TaskDetails}
        options={{
          headerStyle: { backgroundColor: '#0066cc' },
          headerTintColor: '#fff',

        }} />


    </Stack.Navigator>

  );
}