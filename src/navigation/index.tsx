import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskDetails from "../screens/TaskDetails";
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Tasks from "../screens/Tasks";
import SignOut from "../screens/SignOut";
import { TabBarIcon } from "../components/TabBarIcon";
import Errors from "../screens/Errors";
import SignIn from "../screens/SignIn";
import React from "react";
import { Role } from "../types";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function AuthTabs() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const isAdmin = user?.role === Role.ADMIN;

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
      {isAdmin && <Tab.Screen name="Errors" component={Errors} />}
      <Tab.Screen name="SignOut" component={SignOut} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
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
  );
}