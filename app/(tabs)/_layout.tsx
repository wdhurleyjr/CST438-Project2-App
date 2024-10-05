import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../views/landing';
import Login from '../views/login';
import Signup from '../views/signup';
import Home from '../views/home';

const Stack = createStackNavigator();

const Layout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;
