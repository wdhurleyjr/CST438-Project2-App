import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform, TouchableOpacity, View, Text, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
//DISCUSS HOME SCREEN HANDLING LATER
//import Landing from '../src/views/landing';
import Login from '../src/views/login';
import Signup from '../src/views/signup';
import Admin from '../src/views/admin';
import CreateUser from '../src/views/createUser';
import ViewUser from '../src/views/viewUser';
import UpdateUser from '../src/views/updateUser'
import DeleteUser from '../src/views/deleteUser';
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
        <Stack.Screen name="CreateUser" component={CreateUser} />
        <Stack.Screen name="ViewUser" component={ViewUser} />
        <Stack.Screen name="UpdateUser" component={UpdateUser} />
        <Stack.Screen name="DeleteUser" component={DeleteUser} />
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
        <Text style={styles.logoTitle}>
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
    marginTop: StatusBar.currentHeight,
    justifyContent: 'center',
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
    marginTop: 40,
    paddingHorizontal: 20,
  },
  logoTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Judson-bold', // NEED TO FIX !!!
    color: '#000',
    lineHeight: 50,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 20,
    width: 'auto',
  },
  loginButton: {
    backgroundColor: '#B3B3B3',
  },
  signupButton: {
    backgroundColor: '#131313',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});
