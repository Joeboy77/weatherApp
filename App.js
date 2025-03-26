import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';

// Weather App Project Structure:
//
// src/
//  ├── screens/
//  │   └── HomeScreen.js
//  ├── components/
//  │   ├── CitySearch.js
//  │   └── WeatherInfo.js
//  └── App.js

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
