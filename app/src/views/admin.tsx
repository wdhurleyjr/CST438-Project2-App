import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Admin = () => {
  const navigation = useNavigation();

  // Placeholder functions for button actions
  const handleCreateUser = () => {
    console.log('Create User button pressed');
    // Implement the create user action here
  };

  const handleViewUsers = () => {
    console.log('View Users button pressed');
    // Implement the view users action here
  };

  const handleUpdateUser = () => {
    console.log('Update User button pressed');
    // Implement the update user action here
  };

  const handleDeleteUser = () => {
    console.log('Delete User button pressed');
    // Implement the delete user action here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Controls</Text>

      {/* Create User Button */}
      <TouchableOpacity style={[styles.button, styles.createButton]} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Create User</Text>
      </TouchableOpacity>

      {/* View Users Button */}
      <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={handleViewUsers}>
        <Text style={styles.buttonText}>View Users</Text>
      </TouchableOpacity>

      {/* Update User Button */}
      <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdateUser}>
        <Text style={styles.buttonText}>Update User</Text>
      </TouchableOpacity>

      {/* Delete User Button */}
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteUser}>
        <Text style={styles.buttonText}>Delete User</Text>
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
});

export default Admin;
