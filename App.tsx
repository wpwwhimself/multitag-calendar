import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import { DayDetails } from './components/DayDetails';
import { Calendar } from './components/Calendar';
import { useFonts } from 'expo-font';

// TODO
/*
 * - add new events
 * - tree of tags -- each cat has their own
 * - 
 */

export default function App() {
  let [loaded] = useFonts({
    Raleway: require('./assets/fonts/Raleway-Regular.ttf'),
    KronaOne: require('./assets/fonts/KronaOne-Regular.ttf'),
  });
  // if(!loaded) return null;

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [popUpContents, setPopUpContents] = useState("");
  const detailsPopUp = (whattoshow:string) : void => {
    setDetailsVisible(whattoshow !== "");
    setPopUpContents(whattoshow);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} style="light" />
      <View style={{flex: 1}}>
      </View>
      <ScrollView horizontal={false} style={styles.scroller}>
        <Calendar detailsPopUp={detailsPopUp} />
      </ScrollView>
      <View style={{flex: 1}}>
      </View>
      <View>
        <DayDetails state={{detailsVisible, popUpContents, detailsPopUp}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    height: "100%",
  },
  scroller: {
    height: 500,
  },
});