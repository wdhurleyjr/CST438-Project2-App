import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text, StatusBar, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ViewBook from '../src/views/viewBook';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../src/context/UserContext';
import { useFocusEffect } from 'expo-router';

const Stack = createStackNavigator();

export default function Lists() {
  return (
    <Stack.Navigator initialRouteName="Wishlist" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ViewBook" component={ViewBook} options={{headerShown: true, title: 'Book Info',}} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
    </Stack.Navigator>
  );
}

function Wishlist({ navigation }: any) {
  const [books, setBooks] = useState([]);
  const { username } = useUser();

  useFocusEffect(
    useCallback(() => {
      fetchBooks();
    }, [])
  );

  const fetchBooks = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      const response = await axios.get(`https://cst438-project2-f6f54a22acfa.herokuapp.com/api/users/${username}/wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      });

      if (response.status === 200) {
      setBooks(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const renderBookItem = ({ item }) => (
    <TouchableOpacity style={styles.cardBook} onPress={() => navigation.navigate('ViewBook', {book: item})}>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardText}>{item.author}</Text>
      </View>
      <Image style={styles.cardThumb} source={
        {uri: item.imageUrl,}
      } />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Your Wishlist</Text>
        <FlatList
          data={books}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookItem}

        />

      <View style={styles.scrollEnd}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginTop: StatusBar.currentHeight,
},
scrollEnd: {
  height: 25,
},
listContainer: {
  flexDirection: 'column',
  marginTop: 25,
  paddingHorizontal: 25,
},
listTitle: {
  fontWeight: 'bold',
  textTransform: 'uppercase',
  fontSize: 16,
  width: '100%',
},
cardBook: {
  borderRadius: 10,
  borderWidth: 1.5,
  borderColor: '#ccc',
  height: 90,
  width: '100%',
  backgroundColor: '#f8f8fa',
  marginTop: 15,
  flexDirection: 'row',
  justifyContent: 'space-between',
},
cardBody: {
  height: '100%',
  padding: 15,
  justifyContent: 'space-evenly',
},
cardTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  lineHeight: 1.44 * 16,
},
cardText: {
  fontSize: 16,
  lineHeight: 1.44 * 16,
},
cardThumb: {
  backgroundColor: '#222',
  height: '100%',
  width: 90,
  borderTopRightRadius: 8.5,
  borderBottomRightRadius: 8.5,
},
});
