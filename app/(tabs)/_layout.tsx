import { Tabs } from 'expo-router';
import React from 'react';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {

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