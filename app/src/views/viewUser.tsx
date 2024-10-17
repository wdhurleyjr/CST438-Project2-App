import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewUser = () => {
  const [userId, setUserId] = useState(''); // To store the user ID input
  const [user, setUser] = useState(null);   // To store the fetched user data

  const handleViewUser = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken'); // Retrieve the token

      const response = await axios.get(`https://cst438-project2-f6f54a22acfa.herokuapp.com/api/admin/${userId}/roles`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.status === 200) {
        setUser(response.data); // Set the user data from the response
        Alert.alert('Success', 'User data retrieved successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'User not found or failed to fetch');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>View User</Text>
      <TextInput
        placeholder="User ID"
        style={styles.input}
        value={userId}
        onChangeText={setUserId}
      />
      <Button title="View User" onPress={handleViewUser} color="#4682B4" />

      {user && (
        <View style={styles.userInfo}>
          <Text>Username: {user.username}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Roles: {user.roles.join(', ')}</Text>
        </View>
      )}
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
  userInfo: {
    marginTop: 20,
  },
});

export default ViewUser;
