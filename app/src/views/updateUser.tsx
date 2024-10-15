import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateUser = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState('');

  const handleUpdateUser = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken'); // Retrieve the token

      const response = await axios.put(
        `https://cst438-project2-f6f54a22acfa.herokuapp.com/api/users/${userId}`,
        {
          email,
          roles: roles.split(','), // Update roles
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'User updated successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update user');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update User</Text>
      <TextInput
        placeholder="User ID"
        style={styles.input}
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        placeholder="New Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Roles (comma-separated)"
        style={styles.input}
        value={roles}
        onChangeText={setRoles}
      />
      <Button title="Update User" onPress={handleUpdateUser} color="#FFA500" />
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

export default UpdateUser;
