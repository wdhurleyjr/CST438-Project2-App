import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateUser = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [allUsers, setAllUsers] = useState([]); // Store all users
  const [modalVisible, setModalVisible] = useState(false);

  const roles = ['ROLE_USER', 'ROLE_ADMIN'];

 useEffect(() => {
   const fetchUsers = async () => {
     try {
       const token = await AsyncStorage.getItem('authToken');
       const response = await axios.get('https://cst438-project2-f6f54a22acfa.herokuapp.com/api/admin', {
         headers: { Authorization: `Bearer ${token}` },
       });
       if (response.status === 200) {
         setAllUsers(response.data);

         // Display users in table format
         console.table(response.data);

         // Pretty-print all users with JSON.stringify for deeper inspection
         console.log('All Users (formatted):', JSON.stringify(response.data, null, 2));
       }
     } catch (error) {
       Alert.alert('Error', 'Failed to fetch users');
       console.error('Fetch users error:', error);
     }
   };
   fetchUsers();
 }, []);



  const handleUpdateUser = async () => {
    console.log('Attempting update for User ID:', userId); // Log the entered user ID
    console.table(allUsers); // Display all users in a table for clarity

    const userExists = allUsers.some((user) => user.id === userId);

    if (!userExists) {
      Alert.alert('Error', 'User ID does not exist');
      console.log(`User ID ${userId} does not exist in fetched users`);
      return;
    }

    try {
      const token = await AsyncStorage.getItem('authToken');

      // Update email
      console.log(`Updating email for User ID ${userId} with email: ${email}`);
      const updateEmailResponse = await axios.put(
        `https://cst438-project2-f6f54a22acfa.herokuapp.com/api/admin/${userId}`,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (updateEmailResponse.status === 200) {
        Alert.alert('Success', 'User email updated successfully');
        console.log(`User ID ${userId} email updated to: ${email}`);
      }

      // Assign role if provided
      if (role) {
        console.log(`Assigning role ${role} to User ID ${userId}`);
        const assignRoleResponse = await axios.put(
          `https://cst438-project2-f6f54a22acfa.herokuapp.com/api/admin/${userId}/${role}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (assignRoleResponse.status === 200) {
          Alert.alert('Success', `Role ${role} assigned to user successfully`);
          console.log(`Role ${role} assigned to User ID ${userId}`);
        } else {
          Alert.alert('Error', `Failed to assign role ${role}`);
          console.error(`Failed to assign role ${role} to User ID ${userId}`);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while updating the user');
      console.error('Update user error:', error);
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
      <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
        <Text>{role || 'Select Role'}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={roles}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.roleOption} onPress={() => {
                setRole(item);
                setModalVisible(false);
              }}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

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
  dropdown: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  roleOption: {
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#EEE',
    width: 200,
    alignItems: 'center',
  },
});

export default UpdateUser;
