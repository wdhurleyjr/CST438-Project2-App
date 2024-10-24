import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity, View, Text, StatusBar, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import Login from '../src/views/login';
import Admin from '../src/views/admin';
import CreateUser from '../src/views/createUser';
import ViewUser from '../src/views/viewUser';
import UpdateUser from '../src/views/updateUser';
import DeleteUser from '../src/views/deleteUser';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Stack = createStackNavigator();

// Main component without a NavigationContainer, as it's already provided in layout.tsx
export default function AccountTab() {
  return (
    <Stack.Navigator initialRouteName="AccountOverview" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AccountOverview" component={AccountOverview} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="CreateUser" component={CreateUser} />
      <Stack.Screen name="ViewUser" component={ViewUser} />
      <Stack.Screen name="UpdateUser" component={UpdateUser} />
      <Stack.Screen name="DeleteUser" component={DeleteUser} />
    </Stack.Navigator>
  );
}

// Overview screen displaying Logout and Admin Mode buttons
function AccountOverview({ navigation }: any) {
  const [isAdmin, setIsAdmin] = useState(false); // Manage admin state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
  const rootNavigation = useNavigation(); // Use root navigation to reset the stack

  // Check the token on component mount
  useEffect(() => {
    const checkUserRole = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        const parsedToken = parseJwt(token);
        setIsAdmin(parsedToken.roles.includes('ROLE_ADMIN'));
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false);
      }
    };
    checkUserRole();
  }, []);

  // Function to parse JWT
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return { roles: [] };
    }
  };

// Handle Logout
const handleLogout = async () => {
  await AsyncStorage.removeItem('authToken'); // Clear the token
  setIsLoggedIn(false);

  // Reset the navigation stack and go back to the Login or Home (layout.tsx)
  rootNavigation.reset({
    index: 0,
    routes: [{ name: 'Login' }], // Or route to another screen without the tabs
  });

  Alert.alert('Logout Successful', 'You have been logged out.');
};


  // Handle Admin Mode Navigation
  const handleAdminNavigation = () => {
    if (isAdmin) {
      navigation.navigate('Admin'); // Navigate to Admin screen
    }
  };

  return (
    <View style={styles.container}>
      {/* Center the Bestsellers title */}
      <View style={styles.centeredTitleContainer}>
        <Text style={styles.logoTitle}>Bestsellers</Text>
      </View>

      {/* Buttons for Logout and Admin */}
      <View style={styles.buttonContainer}>
        {/* Logout Button */}
        {isLoggedIn && (
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        )}

        {/* Admin Mode Button (only visible for admins) */}
        {isAdmin && (
          <TouchableOpacity style={[styles.button, styles.adminButton]} onPress={handleAdminNavigation}>
            <Ionicons name="shield-checkmark" size={28} color="#FFF" />
            <Text style={styles.buttonText}>Admin Mode</Text>
          </TouchableOpacity>
        )}
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
  centeredTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  logoTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Judson-bold',
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
  logoutButton: {
    backgroundColor: '#FF6347',
  },
  adminButton: {
    backgroundColor: '#6A5ACD',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 10, // Space for the icon in admin button
  },
});
