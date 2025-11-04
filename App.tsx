import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation';
import StorybookUIRoot from './storybook';
import { SHOW_STORYBOOK } from './storybook/toggle';

export default function App() {
  // if (SHOW_STORYBOOK) {
  //   return <StorybookUIRoot />;
  // }

  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
    </SafeAreaProvider>
  );
}
