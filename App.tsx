import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Calendar } from './components/Calendar.component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    height: "100%",
  },
  scroller: {
    height: 500,
  }
});

// TODO
/*
 * - add time to dates
 * - open days to see event details
 * - add dates
 * - ???
 */

function App() {
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} style="light" />
      <View style={{flex: 1}}>
      </View>
      <ScrollView horizontal={true} style={styles.scroller}>
        <Calendar />
      </ScrollView>
      <View style={{flex: 1}}>
      </View>
    </View>
  );
}

export default App;