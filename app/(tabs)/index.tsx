import { Image, StyleSheet, Platform, SafeAreaView, ScrollView, View, Text, StatusBar, Alert, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks(); // Fetch users when the component mounts
  }, []);

  const fetchBooks = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      const response = await axios.get('https://cst438-project2-f6f54a22acfa.herokuapp.com/api/books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setBooks(response.data.slice(0, 6));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderBookItem = ({ item }) => (
    // WHEN BOOK VIEW READY, MAKE TOUCHABLE
    <View style={styles.cardBook}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>{item.author}</Text>
          </View>
          <Image style={styles.cardThumb} source={
            {uri: item.imageUrl,}
          } />
      </View>
  );


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredTitleContainer}>
        <Text style={styles.logoTitle}>
          Bestsellers
        </Text>
        <Text style={styles.welcomeTitle}>
          Welcome, user!
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Top Bestsellers</Text>
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
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#f0f0f0',
  },
  scrollEnd: {
    height: 25,
  },
  centeredTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  logoTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Judson-bold', // NEED TO FIX !!!
    color: '#000',
    lineHeight: 50,
    marginBottom: 5,
  },
  welcomeTitle: {
    fontSize: 20,
    lineHeight: 40,
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