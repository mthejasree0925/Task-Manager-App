import React from 'react';
import { View, Text } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignOut() {
const navigation = useNavigation();

  React.useEffect(() => {
    const signOut = async () => {
       // remove stored login data
       await AsyncStorage.removeItem('@user_email');
       await AsyncStorage.removeItem('@user_role');
       await AsyncStorage.removeItem('@user_logged_in');
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

