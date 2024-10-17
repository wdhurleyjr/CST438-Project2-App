import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteUser = () => {
  const [userId, setUserId] = useState('');

  const handleDeleteUser = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken'); // Retrieve the token

      const response = await axios.delete(`https://cst438-project2-f6f54a22acfa.herokuapp.com/api/admin/${userId}/roles`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.status === 204) {
        Alert.alert('Success', 'User deleted successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete user');
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
