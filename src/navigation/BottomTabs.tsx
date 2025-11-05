import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBarIcon } from "../components/TabBarIcon";
import { MaterialIcons } from "@expo/vector-icons";
import Tasks from "../screens/Tasks";
import Errors from "../screens/Errors";
import SignOut from "../screens/SignOut";
import { t } from "i18next";
const Tab = createBottomTabNavigator();

const BottomTabs = ({ userRole }: any) => {
  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          //representing icons 
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
      <Tab.Screen name={t('signin.bottomtab1')} component={Tasks} />
      {userRole === 'admin' && (
        <Tab.Screen  name ={t('signin.bottomtab2')} component={Errors} />
      )}
      <Tab.Screen
        name={t('signin.bottomtab3')} component={SignOut} />

    </Tab.Navigator>
  );
}

export default BottomTabs;