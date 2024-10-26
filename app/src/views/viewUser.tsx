import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]); // State to store all users

  useEffect(() => {
    fetchAllUsers(); // Fetch users when the component mounts
  }, []);

  const fetchAllUsers = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken'); // Retrieve the token

      const response = await axios.get('https://cst438-project2-f6f54a22acfa.herokuapp.com/api/admin', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.status === 200) {
        setUsers(response.data); // Set the list of users from the response
        Alert.alert('Success', 'All users retrieved successfully');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch users');
      console.error(error);
    }
  };

  // Render each user item
  const renderUserItem = ({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.userInfo}>Username: {item.username}</Text>
      <Text style={styles.userInfo}>Email: {item.email}</Text>
      <Text style={styles.userInfo}>Roles: {item.roles.join(', ')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Users</Text>
      <Button title="Refresh" onPress={fetchAllUsers} color="#4682B4" />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserItem}
        style={styles.userList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  userList: {
    marginTop: 20,
  },
});

export default ViewAllUsers;
