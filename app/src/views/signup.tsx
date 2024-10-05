import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Signup = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <TextInput
        placeholder="Full Name"
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

      <Button title="Sign Up" onPress={() => {}} color="#6A5ACD" />
      <Text style={styles.loginText}>Already have an account? Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '80%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    fontSize: 16,
  },
  loginText: {
    marginTop: 20,
    color: '#6A5ACD',
  },
});

export default Signup;
