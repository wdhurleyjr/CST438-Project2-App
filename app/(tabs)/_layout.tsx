import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../src/views/login';
import Signup from '../src/views/signup';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';

export default function TabLayout() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const checkLogin = async() => {
      const token = await AsyncStorage.getItem('authToken');
      setUser(!!token);
    };
    checkLogin();
  });

  if(!user){
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Landing" component={Landing} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#222222',
          headerShown: false,
          tabBarStyle:{
            paddingTop: 5,
            paddingBottom: 5,
            height: 55,
          }
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons name='search' color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="lists"
          options={{
            title: 'Lists',
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons name={focused ? 'bookmark' : 'bookmark-outline'} color={color} size={28} />
              ),
            }}
          />
        <Tabs.Screen
           name="account"
           options={{
             title: 'Account',
             tabBarIcon: ({ color, focused }) => (
               <MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} color={color} size={28} />
               ),
             }}
           />
      </Tabs>
    );
  }
}

function Landing({ navigation }: any) {
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
  loginButton: {
    backgroundColor: '#B3B3B3',
  },
  signupButton: {
    backgroundColor: '#131313',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: 10, // Space for the icon in admin button
  },
});