import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteUser = () => {
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]); // To store the fetched users

  // Fetch users on component mount to verify the user ID exists
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await axios.get('https://cst438-project2-f6f54a22acfa.herokuapp.com/api/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUsers(response.data);
          console.log('Fetched users:', JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    const userExists = users.some(user => user.id === userId);

    if (!userExists) {
      Alert.alert('Error', 'User ID does not exist');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.delete(
        `https://cst438-project2-f6f54a22acfa.herokuapp.com/api/users/${userId}`, // Corrected URL
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        Alert.alert('Success', 'User deleted successfully');
        setUsers(users.filter(user => user.id !== userId));
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        Alert.alert('Forbidden', 'You do not have permission to delete users');
      } else {
        Alert.alert('Error', 'Failed to delete user');
      }
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Delete User</Text>
      <TextInput
        placeholder="User ID"
        style={styles.input}
        value={userId}
        onChangeText={setUserId}
      />
      <Button title="Delete User" onPress={handleDeleteUser} color="#FF6347" />
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

export default DeleteUser;
