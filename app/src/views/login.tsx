import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://cst438-project2-f6f54a22acfa.herokuapp.com/api/auth/login',
        { username: name, password: password }
      );

      if (response.status === 200 && response.data) {
        const { token } = response.data;

        await AsyncStorage.setItem('authToken', token);
        Alert.alert('Login Successful', 'Welcome back!');

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: '(tabs)' }],
          })
        );
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password');
      console.error('Login error:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#e0e0e0', '#b8b8b8', '#8e8e8e']}
      style={styles.container}
    >
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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    fontSize: 16,
  },
  loginButton: {
    width: '100%', 
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;

