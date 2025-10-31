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


export default function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");;


  const validate = () => {
    let valid = true;

    // reset errors
    setEmailError("");
    setPasswordError("");

    // email empty?
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else {
      // simple email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Enter a valid email");
        valid = false;
      }
    }

    // password empty?
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) {
      Alert.alert("invalid credentials!")
      return; // stop if validation fails
    }

    // mock login logic
    const user = USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      Alert.alert("Invalid login", "Email or password is incorrect");
      return;
    }
    // after validating user login
    // const { email, role } = user;
    try {
      await AsyncStorage.setItem('@user_email', user.email);
      await AsyncStorage.setItem('@user_role', user.role);
      await AsyncStorage.setItem('@user_logged_in', 'true');
      // navigate to authenticated screen
      if (user) {
        navigation.navigate("Tasks", { role: user.role })
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

        <Text style={styles.title} accessibilityLabel='title'>Sign In!! Please use your tietoevry credentials to login into the app!!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
          accessibilityLabel='email-textinput'
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          accessibilityLabel='password-textinput'

        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <MyButton
          title="Submit"
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
