import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import { Calendar } from './components/Calendar';
import Modal from 'react-native-modal';
import { bigStyles } from './assets/bigStyles';
import { useFonts } from 'expo-font';
import { Event, eventsOfToday } from './components/eventsOfToday';
import * as dateRefine from './components/dateRefine';
import { EventTag } from './components/EventTag';

// TODO
/*
 * - add time to dates
 * - open days to see event details
 * - add dates
 * - ???
 */

export default function App() {
  const [loaded] = useFonts({
    Raleway: require('./assets/fonts/Raleway-Regular.ttf'),
    KronaOne: require('./assets/fonts/KronaOne-Regular.ttf'),
  });

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [popUpHeader, setPopUpHeader] = useState("");
  const detailsPopUp = (date:string) => {
    setDetailsVisible(date !== "");
    setPopUpHeader(date);
  };

  /* load events */
  let eventToday : Event[] = [];
  if(popUpHeader != "") {
    eventToday = eventsOfToday(dateRefine.longToDate(popUpHeader));
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} style="light" />
      <View style={{flex: 1}}>
      </View>
      <ScrollView horizontal={true} style={styles.scroller}>
        <Calendar detailsPopUp={detailsPopUp} />
      </ScrollView>
      <View style={{flex: 1}}>
      </View>
      <View>
        <Modal
          isVisible={detailsVisible}
          onBackdropPress={() => detailsPopUp("")}
          onBackButtonPress={() => detailsPopUp("")}
        >
          <View style={styles.popUp}>
            <Text style={[bigStyles.header, styles.popUpHeader]}>{popUpHeader}</Text>
            {eventToday.map((val: Event, ind: number) => {return(
              <View key={ind} style={styles.popUpEvent}>
                <Text>{val.title}</Text>
                <View style={{flexDirection: "row"}}>
                  <EventTag tag={val.cat1} />
                  <EventTag tag={val.cat2} />
                  <EventTag tag={val.cat3} />
                </View>
              </View>
            )})}
          </View>
        </Modal>
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
  popUp: {
    height: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20
  },
  popUpHeader: {
    fontSize: 20
  },
  popUpEvent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    width: "100%",
    marginBottom: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  }
});