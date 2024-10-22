import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Admin = () => {
  const navigation = useNavigation();

  // Navigate to Create User screen
  const handleCreateUser = () => {
    navigation.navigate('CreateUser');
  };

  // Navigate to View Users screen
  const handleViewUsers = () => {
    navigation.navigate('ViewUser');
  };

  // Navigate to Update User screen
  const handleUpdateUser = () => {
    navigation.navigate('UpdateUser');
  };

  // Navigate to Delete User screen
  const handleDeleteUser = () => {
    navigation.navigate('DeleteUser');
  };

  // Logout function to clear token and navigate to Login
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken'); // Remove the token from AsyncStorage
      Alert.alert('Logged Out', 'You have been successfully logged out.');
      navigation.navigate('Login'); // Navigate to the Login screen
    } catch (error) {
      Alert.alert('Error', 'An error occurred during logout.');
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Controls</Text>

      <TouchableOpacity style={[styles.button, styles.createButton]} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Create User</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={handleViewUsers}>
        <Text style={styles.buttonText}>View Users</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdateUser}>
        <Text style={styles.buttonText}>Update User</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteUser}>
        <Text style={styles.buttonText}>Delete User</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the Admin screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000', // Black text color for header
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 20,
    width: '80%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: '#6A5ACD', // Purple color for Create button
  },
  viewButton: {
    backgroundColor: '#4682B4', // Steel blue color for View button
  },
  updateButton: {
    backgroundColor: '#FFA500', // Orange color for Update button
  },
  deleteButton: {
    backgroundColor: '#FF6347', // Red color for Delete button
  },
  logoutButton: {
    backgroundColor: '#A9A9A9', // Grey color for Logout button
  },
});

export default Admin;
