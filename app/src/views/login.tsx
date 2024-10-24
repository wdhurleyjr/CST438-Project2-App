import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabLayout from '../../(tabs)/_layout';
import axios from 'axios';


const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://cst438-project2-f6f54a22acfa.herokuapp.com/api/auth/login', {
        username: name,
        password: password,
      });

      // Check if the login is successful and get the JWT token
      if (response.status === 200 && response.data) {
        const { token } = response.data; // JWT token

        // Store the token for future API requests using AsyncStorage
        await AsyncStorage.setItem('authToken', token);

        console.log('Login successful:', token);
        Alert.alert('Login Successful', 'Welcome back!');

        // Reset the navigation stack and navigate to TabLayout
        navigation.reset({
          index: 0,
          routes: [{ name: 'TabLayout' }],
        });
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password');
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        placeholderTextColor="#A9A9A9"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#A9A9A9"
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} color="#6A5ACD" />
    </View>
  );
};

// Styles for the Login screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '80%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    fontSize: 16,
  },
  signupText: {
    marginTop: 20,
    color: '#6A5ACD',
  },
});

export default Login;
