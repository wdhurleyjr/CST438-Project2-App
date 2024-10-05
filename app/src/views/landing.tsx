import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Landing = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bestsellers</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF', // Background color matching the mockup
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000', // Black text color for the title
    marginBottom: 50, // Adjust spacing as needed
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'space-between',
    height: 100, // Adjust height to create spacing between buttons
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 30,
  },
  signupButton: {
    backgroundColor: '#6A5ACD', // Purple color for Sign up button
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#D3D3D3', // Gray color for Login button
  },
  buttonText: {
    color: '#FFF', // White text for buttons
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Landing;
