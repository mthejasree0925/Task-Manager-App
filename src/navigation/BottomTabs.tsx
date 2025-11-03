import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBarIcon } from "../components/TabBarIcon";
import { MaterialIcons } from "@expo/vector-icons";
import Tasks from "../screens/Tasks";
import Errors from "../screens/Errors";
import SignOut from "../screens/SignOut";
const Tab = createBottomTabNavigator();

const BottomTabs = ({ userRole }: any) => {
  console.log("user---------", userRole, )
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
      {userRole === 'admin' && (
        <Tab.Screen name="Errors" component={Errors} />
      )}
      <Tab.Screen
        name="SignOut" component={SignOut} />

    </Tab.Navigator>
  );
}

export default BottomTabs;