import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text, StatusBar, TextInput, SafeAreaView, Button, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewBook from '../src/views/viewBook';
import { Picker } from '@react-native-picker/picker';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Search() {
  return (
    <Stack.Navigator initialRouteName="SearchArea" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ViewBook" component={ViewBook} options={{headerShown: true, title: 'Book Info',}} />
      <Stack.Screen name="SearchArea" component={SearchArea} />
    </Stack.Navigator>
  );
}

function SearchArea({ navigation }: any) {
  const [selectedType, setSelectedType] = useState('title');
  const [searchResults, setSearchResults] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const searchBooks = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.get(`https://cst438-project2-f6f54a22acfa.herokuapp.com/api/books/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          [selectedType]: searchQuery,
        },
      });
      if (response.status === 200) {
        setSearchResults(response.data);
        setIsEmpty(response.data.length === 0);
      }
    } catch (error) {
      console.error(error);
    }
  }

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
      <View style={styles.searchContainer}>
        <Picker style={{ height: 50, width: 130 }}
        selectedValue={selectedType}
        onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}>
          <Picker.Item label="Title" value="title" />
          <Picker.Item label="Author" value="author" />
          <Picker.Item label="ISBN" value="isbn" />
        </Picker>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#A9A9A9"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button color='#222' title="Search" onPress={searchBooks} />
      </View>
      <View style={styles.listContainer}>
        {isEmpty ? (
          searchQuery === '' ? (
            <Text>Enter a search query</Text>
          ) : (
            <Text>No results found</Text>
          )
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderBookItem}
          />
        )}
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
  searchContainer: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 20,
    fontSize: 18,
    width: '55%',
    backgroundColor: '#fff',
  },
  listContainer: {
    flexDirection: 'column',
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
  scrollEnd: {
    height: 25,
  },
});