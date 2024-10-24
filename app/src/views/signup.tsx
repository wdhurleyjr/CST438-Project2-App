import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      // Make the API request to create an account
      const response = await axios.post('https://cst438-project2-f6f54a22acfa.herokuapp.com/api/auth/register', {
        username: name,
        email,
        password,
        roles: ['ROLE_USER'], // Default role for new users
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login'); // Navigate to the login screen after successful signup
      } else {
        Alert.alert('Error', 'Failed to create account');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during signup');
      console.error('Signup error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

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

      <Button title="Sign Up" onPress={handleSignup} color="#6A5ACD" />
    </View>
  );
};

// Styles for the Signup screen
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
  loginText: {
    marginTop: 20,
    color: '#6A5ACD',
  },
});

export default Signup;
