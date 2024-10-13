import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.centeredTitleContainer}>
        <Text style={styles.logoTitle}>
          Bestsellers
        </Text>
        <Text style={styles.welcomeTitle}>
          Welcome, user!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 25,
    marginTop: 25,
  },
  centeredTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  logoTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Judson-bold', // NEED TO FIX !!!
    color: '#000',
    lineHeight: 50,
  },
  welcomeTitle: {
    fontSize: 20,
    lineHeight: 40,
  },
});