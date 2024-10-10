import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Admin from '../src/views/admin';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State to track if entered info matches admin credentials
  const navigation = useNavigation();

  // Placeholder admin credentials for testing purposes
  const adminName = 'admin';
  const adminEmail = 'admin@example.com';
  const adminPassword = 'admin123';

  const handleLogin = () => {
    // Check if the entered credentials match the placeholder admin credentials
    if (name === adminName && email === adminEmail && password === adminPassword) {
      setIsAdmin(true); // Enable the admin button
    } else {
      setIsAdmin(false); // Disable the admin button if credentials don't match
    }

    console.log('Login attempted with:', { name, email, password });
    // Navigate to userAcc or other screen based on successful login if needed
  };

  const handleAdminNavigation = () => {
    navigation.navigate('Admin'); // Navigate to the Admin screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        placeholderTextColor="#A9A9A9"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor="#A9A9A9"
        value={email}
        onChangeText={setEmail}
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
    backgroundColor: '#FFF', // White background to match the mockups
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000', // Black text color for header
  },
  input: {
    width: '80%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    backgroundColor: '#F8F8F8', // Light background color for input fields
    fontSize: 16,
  },
  signupText: {
    marginTop: 20,
    color: '#6A5ACD', // Link-like text color
  },
  adminButton: {
    position: 'absolute',
    bottom: 30, // Positioning the button at the bottom right corner
    right: 30,
    backgroundColor: '#6A5ACD', // Matching background color of Login screen
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
  },
});

export default Login;
