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
import { Role } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function AuthTabs() {
  const [admin, setAdmin]= useState('');
  // const isAdmin = user?.role === Role.ADMIN;
  
//  const readUserRole = async () => {
//   try {
//     const value = await AsyncStorage.getItem('@user_role');
//     if (value !== null) {
//       // value exists
//       console.log('User role:', value);
//       setAdmin(value);
//       return value;
//     } else {
//       // no value for this key
//       console.log('No user role found in storage');
//       return null;
//     }
//   } catch (e) {
//     // error reading value
//     console.error('Error reading user role from AsyncStorage', e);
//     return null;
//   }
// };
  
  return (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          // Map routes to icons 
          const iconMap: Record<string, keyof typeof MaterialIcons.glyphMap> = {
            Tasks: 'list',
            Error: 'error',
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
      {/* {isAdmin && <Tab.Screen name="Errors" component={Errors} />} */}
       <Stack.Screen name="Errors" component={Errors}/>
      <Tab.Screen name="SignOut" component={SignOut} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
    const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 useEffect(() => {
    const checkLogin = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('@user_logged_in');
        setIsLoggedIn(loggedIn === 'true');
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
      <Stack.Screen name="SignIn"  component={SignIn} />
      <Stack.Screen name="SignOut" component={SignIn}/>
      <Stack.Screen name="Tasks"   component={AuthTabs}  />
      <Stack.Screen name="TaskDetails" component={TaskDetails}
        options={{
          headerStyle: { backgroundColor: '#0066cc' },
          headerTintColor: '#fff',
          
        }} />
    </Stack.Navigator>
      //  <Stack.Navigator screenOptions={{ headerShown: false }}>
      //   {isLoggedIn ? (
      //     <>
      //       <Stack.Screen name="Tasks" component={AuthTabs} />
      //       <Stack.Screen name="SignOut" component={SignIn}/>
      //       <Stack.Screen
      //         name="TaskDetails"
      //         component={TaskDetails}
      //         options={{
      //           headerShown: true,
      //           headerStyle: { backgroundColor: '#0066cc' },
      //           headerTintColor: '#fff',
      //         }}
      //       />
      //     </>
      //   ) : (
      //     <Stack.Screen name="SignIn" component={SignIn} />
      //   )}
      // </Stack.Navigator>
  );
}