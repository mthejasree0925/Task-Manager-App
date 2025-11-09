import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from 'react-native';
import USERS from "../assets/login-credentials.json"
import MyButton from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';


export default function SignIn() {
   const { t, i18n } = useTranslation();

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");;
  const navigation = useNavigation();

  const validate = () => {
    let valid = true;

    // reset errors
    setEmailError("");
    setPasswordError("");

    // email empty?
    if (!email.trim()) {
      setEmailError(t('signin.errorEmail'));
      valid = false;
    } else {
      // simple email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError(t('signin.errorEmail'));
        valid = false;
      }
    }

    // password empty?
    if (!password) {
      setPasswordError(t('signin.errorPassword'));
      valid = false;
    } else if (password.length < 6) {
      setPasswordError(t('signin.errorSignInConditionsForPassword'));
      valid = false;
    }

    return valid;
  };


  const handleLogin = async () => {
    if (!validate()) {
      Alert.alert(t("signin.invalidCredentials"))
      return; // stop if validation fails
    }
    const user = USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return;
    }
    // after validating user login
    try {
      await AsyncStorage.setItem('@user_email', user.email);
      await AsyncStorage.setItem('@user_role', user.role);
      await AsyncStorage.setItem('@user_logged_in', 'true');
      // navigate to authenticated screen
      if (user) {
        console.log("user================",user);
        navigation.navigate("Tasks", { role: user })
      }
    } catch (e) {
      console.error("Error saving user data", e);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      extraScrollHeight={100}
      enableOnAndroid={true}
    >
      <View style={styles.container}>
        <Text style={styles.title} accessibilityLabel='title'>{t('signin.mainTitle')}</Text>
        <TextInput
          style={styles.input}
          placeholder= {t('signin.email')}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
          accessibilityLabel='email-textinput'
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder={t('signin.password')}
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          accessibilityLabel='password-textinput'
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <MyButton
          title={t('signin.title')}
          onPress={handleLogin}
          buttonStyle={{ backgroundColor: '#4caf50' }}
          textStyle={{ color: '#fff' }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 5
  },
  errorText: {
    color: 'red',
    marginBottom: 10
  }
});
