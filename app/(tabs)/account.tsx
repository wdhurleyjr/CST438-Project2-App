import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import Landing from '../src/views/landing';
import Login from '../src/views/login';
import Signup from '../src/views/signup';

const Stack = createStackNavigator();

// Main component with navigation integrated
export default function AccountTab() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="AccountOverview" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AccountOverview" component={AccountOverview} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Overview screen displaying only Login and Signup buttons
function AccountOverview({ navigation }) {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}
    >
      {/* Center the Bestsellers title */}
      <ThemedView style={styles.centeredTitleContainer}>
        <ThemedText type="title" style={styles.centeredTitle}>
          Bestsellers
        </ThemedText>
      </ThemedView>

      {/* Only include buttons for navigation */}
      <ThemedView style={styles.buttonContainer}>
        {/* Login Button */}
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <ThemedText style={styles.buttonText}>Login</ThemedText>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() => navigation.navigate('Signup')}
        >
          <ThemedText style={styles.buttonText}>Sign up</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  centeredTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40, // Adjust the margin as necessary to control vertical position
    paddingHorizontal: 20,
  },
  centeredTitle: {
    fontSize: 35, // Larger font size for the title
    fontWeight: 'bold',
    color: '#000', // Black text color for the title
    lineHeight: 40,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, // Adjust to control distance between title and buttons
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 20, // Adjust spacing between buttons
    width: '70%',
  },
  loginButton: {
    backgroundColor: '#D3D3D3', // Gray color for Login button
  },
  signupButton: {
    backgroundColor: '#6A5ACD', // Purple color for Sign Up button
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
