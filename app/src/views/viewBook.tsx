import { Image, StyleSheet, Platform, SafeAreaView, ScrollView, View, Text, StatusBar, Alert, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewBook from '../src/views/viewBook';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({route, navigation}) {

  const { book } = route.params;
    
  return (
    <View style={styles.container}>
    <Text>{book.title}</Text>
  </View>
    );

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      padding: 25,
  },
  });