import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../src/views/login';
import Signup from '../src/views/signup';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabLayout() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setUser(!!token);
    };
    checkLogin();
  }, []);

  if (!user) {
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
          tabBarStyle: {
            paddingTop: 5,
            paddingBottom: 5,
            height: 55,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'home' : 'home-outline'}
                color={color}
                size={28}
              />
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
            title: 'Wishlist',
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                name={focused ? 'bookmark' : 'bookmark-outline'}
                color={color}
                size={28}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'account' : 'account-outline'}
                color={color}
                size={28}
              />
            ),
          }}
        />
      </Tabs>
    );
  }
}

function Landing({ navigation }: any) {
  return (
    <LinearGradient
      colors={['#e0e0e0', '#b8b8b8', '#8e8e8e']}
      style={styles.container}
    >
      <View style={styles.centeredTitleContainer}>
        <Text style={styles.logoTitle}>Bestsellers</Text>
      </View>

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
    </LinearGradient>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'space-between',
  },
  centeredTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, 
  },
  logoTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Judson-bold',
    color: '#000', 
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)', 
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 12, 
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 40, 
  },
  button: {
    width: width * 0.9, 
    maxWidth: 400, 
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  signupButton: {
    backgroundColor: '#1c1c1c',
  },
  loginButton: {
    backgroundColor: '#4e4e4e',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
