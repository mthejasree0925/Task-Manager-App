// SignOutScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignOut() {
const navigation = useNavigation();

  React.useEffect(() => {
    const signOut = async () => {
      await AsyncStorage.clear(); // remove stored login data

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SignIn' }], // root Stack must have SignIn
        })
      );
    };

    signOut();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Signing out...</Text>
    </View>
  );
}

