import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation';
import StorybookUIRoot from './storybook';
import { SHOW_STORYBOOK } from './storybook/toggle';
import './src/i18n/i18n';
export default function App() {
  if (SHOW_STORYBOOK) {
    return <StorybookUIRoot />;
  }
  else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}