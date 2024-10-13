import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform, TouchableOpacity, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
//DISCUSS HOME SCREEN HANDLING LATER
//import Landing from '../src/views/landing';
import Login from '../src/views/login';
import Signup from '../src/views/signup';
import Admin from '../src/views/admin';

const Stack = createStackNavigator();

// Main component with navigation integrated
export default function AccountTab() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="AccountOverview" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AccountOverview" component={AccountOverview} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: true }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: true, title: 'Sign Up' }} />
        <Stack.Screen name="Admin" component={Admin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Overview screen displaying only Login and Signup buttons
function AccountOverview({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Center the Bestsellers title */}
      <View style={styles.centeredTitleContainer}>
        <Text style={styles.centeredTitle}>
          Bestsellers
        </Text>
      </View>

      {/* Only include buttons for navigation */}
      <View style={styles.buttonContainer}>
        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 25,
    marginTop: 25,
  },
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
