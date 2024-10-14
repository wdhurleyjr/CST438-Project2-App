import { Image, StyleSheet, Platform, SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native';
import React from 'react';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.centeredTitleContainer}>
        <Text style={styles.logoTitle}>
          Bestsellers
        </Text>
        <Text style={styles.welcomeTitle}>
          Welcome, user!
        </Text>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Fiction</Text>
        <View style={styles.cardBook}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Book title</Text>
            <Text style={styles.cardText}>Author | New this week</Text>
          </View>
          <Image style={styles.cardThumb} source={require('../../assets/images/partial-react-logo.png')} />
        </View>
        <View style={styles.cardBook}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Book title</Text>
            <Text style={styles.cardText}>Author | New this week</Text>
          </View>
          <Image style={styles.cardThumb} source={require('../../assets/images/partial-react-logo.png')} />
        </View>
        <View style={styles.cardBook}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Book title</Text>
            <Text style={styles.cardText}>Author | New this week</Text>
          </View>
          <Image style={styles.cardThumb} source={require('../../assets/images/partial-react-logo.png')} />
        </View>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Nonfiction</Text>
        <View style={styles.cardBook}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Book title</Text>
            <Text style={styles.cardText}>Author | New this week</Text>
          </View>
          <Image style={styles.cardThumb} source={require('../../assets/images/partial-react-logo.png')} />
        </View>
        <View style={styles.cardBook}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Book title</Text>
            <Text style={styles.cardText}>Author | New this week</Text>
          </View>
          <Image style={styles.cardThumb} source={require('../../assets/images/partial-react-logo.png')} />
        </View>
        <View style={styles.cardBook}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Book title</Text>
            <Text style={styles.cardText}>Author | New this week</Text>
          </View>
          <Image style={styles.cardThumb} source={require('../../assets/images/partial-react-logo.png')} />
        </View>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Cooking</Text>
        <View style={styles.cardBook}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Book title</Text>
            <Text style={styles.cardText}>Author | New this week</Text>
          </View>
          <Image style={styles.cardThumb} source={require('../../assets/images/partial-react-logo.png')} />
        </View>
        <View style={styles.cardBook}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Book title</Text>
            <Text style={styles.cardText}>Author | New this week</Text>
          </View>
          <Image style={styles.cardThumb} source={require('../../assets/images/partial-react-logo.png')} />
        </View>
        <View style={styles.cardBook}>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Book title</Text>
            <Text style={styles.cardText}>Author | New this week</Text>
          </View>
          <Image style={styles.cardThumb} source={require('../../assets/images/partial-react-logo.png')} />
        </View>
      </View>
      <View style={styles.scrollEnd}></View>
    </ScrollView>
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