import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  TaskDetails  from "../screens/TaskDetails";
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Tasks from "../screens/Tasks";
import Error from "../screens/Error";
import SignOut from "../screens/SignOut";
import { TabBarIcon } from "../components/TabBarIcon";

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
      <Tab.Screen name="Error" component={Error} />
      <Tab.Screen name="SignOut" component={SignOut} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
        <Stack.Navigator>
             <Stack.Screen name="SignOut" component={AuthTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Tasks" component={Tasks} />
            <Stack.Screen name="TaskDetails" component={TaskDetails} />
        </Stack.Navigator>
  );
}