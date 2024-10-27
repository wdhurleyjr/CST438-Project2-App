import { Image, StyleSheet, Platform, SafeAreaView, ScrollView, View, Text, StatusBar, Alert, FlatList, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { Linking } from 'react-native';
import { useUser } from '../context/UserContext';

export default function HomeScreen({route, navigation}) {
  const { username } = useUser();
  const { book } = route.params;
  const [inList, setInList] = useState(false);
  
    useEffect(() => {
        checkList();
    }, []);

    const checkList = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const response = await axios.get(`https://cst438-project2-f6f54a22acfa.herokuapp.com/api/users/`+username+`/wishlist`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setInList(response.data.some((item) => item.isbn === book.isbn));
            }
        } catch (error) {
            console.error(error);
        }
    }
    
  return (
    <SafeAreaView style={styles.flex}>
    <Image style={styles.bookImg} source={
        {uri: book.imageUrl,}
      }/>
    <View style={styles.container}>
    
    <Text style={styles.bookTitle}>{book.title}</Text>
    <Text style={styles.bookSubtitle}>{book.author}</Text>
    <Text style={styles.bookDesc}>{book.description}</Text>
  </View>
  <View style={styles.buttonContainer}>
    {inList ? 
    <Button color='#222' title="Remove from List" onPress={() => {}} />
         : 
         <Button color='#222' title="Add to List" onPress={() => {}} />
    }
    <Button color='#222' title="Find on Amazon" onPress={() => Linking.openURL(`https://www.amazon.com/s?k=`+book.isbn)} />
  </View>
  </SafeAreaView>
    );

}


const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      padding: 25,
  },
  bookImg: {
    width: '100%',
    height: 300,
    backgroundColor: '#222',
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookSubtitle: {
    fontSize: 18,
    color: '#222',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  bookDesc: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
  }

  });