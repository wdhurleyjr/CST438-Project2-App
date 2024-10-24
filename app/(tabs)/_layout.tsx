import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Tabs } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../src/views/login'; // Direct import of login
import Signup from '../src/views/signup'; // Direct import of signup
import Admin from '../src/views/admin'; // Admin screen
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function TabLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  // Check if user is logged in or not
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };

    checkAuthStatus();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </>
      ) : (
        // Show the Main Tabs when logged in
        <Stack.Screen name="MainTabs" component={MainTabs} />
      )}
    </Stack.Navigator>
  );
}

// Main Tabs Layout after Login
function MainTabs() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#222222',
        headerShown: false,
        tabBarStyle: {
          paddingTop: 5,
          paddingBottom: 5,
          height: 55,
        },
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
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
            <MaterialIcons name="search" color={color} size={28} />
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
