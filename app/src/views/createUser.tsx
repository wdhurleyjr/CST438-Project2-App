import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken'); // Retrieve the token
      const response = await axios.post(
        'https://cst438-project2-f6f54a22acfa.herokuapp.com/api/users',
        { username, email, password, roles: ['ROLE_USER'] },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request header
          },
        }
      );
      if (response.status === 200) {
        Alert.alert('Success', 'User created successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create user');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create User</Text>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Create User" onPress={handleCreateUser} color="#6A5ACD" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default CreateUser;
