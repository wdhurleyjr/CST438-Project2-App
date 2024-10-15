import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // To track if the user has admin role
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
        const userRoles = parseJwt(token).roles;

        // Store the token for future API requests using AsyncStorage
        await AsyncStorage.setItem('authToken', token);

        // Check if the user has admin role
        if (userRoles.includes('ROLE_ADMIN')) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        console.log('Login successful:', token);
        Alert.alert('Login Successful', 'Welcome back!');
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password');
      console.error('Login error:', error);
    }
  };
  // Function to parse JWT and extract roles
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return { roles: [] };
    }
  };

  const handleAdminNavigation = () => {
    navigation.navigate('Admin'); // Navigate to Admin screen
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

      <Text style={styles.signupText}>Don't have an account? Sign up</Text>

      {isAdmin && (
        <TouchableOpacity style={styles.adminButton} onPress={handleAdminNavigation}>
          <Ionicons name="star" size={40} color="#FFD700" />
        </TouchableOpacity>
      )}
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
  adminButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#6A5ACD',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Login;
