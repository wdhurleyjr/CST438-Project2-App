import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

            <TextInput
              placeholder="Name"
              style={styles.input}
              placeholderTextColor="#A9A9A9"
            />

            <TextInput
              placeholder="Email"
              style={styles.input}
              placeholderTextColor="#A9A9A9"
            />

            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#A9A9A9"
            />

      <Button title="Login" onPress={() => {}} color="#6A5ACD" />
      <Text style={styles.signupText}>Don't have an account? Sign up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF', // White background to match the mockups
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000', // Black text color for header
  },
  input: {
    width: '80%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    backgroundColor: '#F8F8F8', // Light background color for input fields
    fontSize: 16,
  },
  signupText: {
    marginTop: 20,
    color: '#6A5ACD', // Link-like text color
  },
});

export default Login;
