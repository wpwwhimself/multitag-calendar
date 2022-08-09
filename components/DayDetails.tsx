import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { clr, bigStyles } from '../assets/bigStyles';
import { EventTag } from './EventTag';
import { Event, eventsOfToday } from './eventsOfToday';
import * as dateRefine from './dateRefine';
import { EventDetails } from './EventDetails';

type Props = {
  state: any
}
type States = {
  detailsVisible: boolean,
  popUpContents: string,
  detailsPopUp: (arg0: string) => void
}

export function DayDetails({state}: Props) {
  const {detailsVisible, popUpContents, detailsPopUp} : States = state;

  const [eventDetailsVisible, setEventDetailsVisible] = useState(false);
  const [eventID, setEventID] = useState(-1);
  const eventDetailsPopUp = (id: number) => {
    setEventDetailsVisible(id != -1);
    setEventID(id);
  }

  const bckgColor = ([0, 6].includes(dateRefine.longToDate(popUpContents).getDay())) ? {backgroundColor: clr.weekend} : {backgroundColor: clr.workday};
  
  /* load events */
  let eventToday : Event[] = [];
  if(popUpContents != "") {
    eventToday = eventsOfToday(dateRefine.longToDate(popUpContents));
  }

  return(
    <>
      <Modal isVisible={detailsVisible} onBackdropPress={() => detailsPopUp("")} onBackButtonPress={() => detailsPopUp("")}>
        <View style={[styles.popUp, bckgColor]}>
          <Text style={styles.popUpHeader}>{popUpContents}</Text>
          {eventToday.length == 0 && 
          <Text style={styles.noEvents}>There are no events on that day.</Text>
          }
          {eventToday.map((val: Event, ind: number) => {
          return(
            <TouchableNativeFeedback
              key={ind}
              onPress={() => eventDetailsPopUp(val.id)}
              >
              <View style={styles.popUpEvent}>
                <Text>{val.title}</Text>
                <View style={{
                  flexDirection: "row"
                }}>
                  <EventTag tag={val.cat1} />
                  <EventTag tag={val.cat2} />
                  <EventTag tag={val.cat3} />
                </View>
              </View>
            </TouchableNativeFeedback>);
          })}
        </View>
      </Modal>
      <EventDetails
        state={{eventDetailsVisible, eventID, eventDetailsPopUp}}
        date={dateRefine.longToDate(popUpContents)}
        />
    </>
    );
}

const styles = StyleSheet.create({
  popUp: {
    height: "60%",
    padding: 20,
    borderRadius: 20
  },
  popUpHeader: {
    ...bigStyles.header,
    fontSize: 20,
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  popUpEvent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 5,
    padding: 10,
    backgroundColor: clr.event,
    // borderBottomWidth: 1,
    // borderBottomColor: "gray",
  },
  noEvents: {
    ...bigStyles.text,
    textAlign: "center",
    color: "gray",
  }
})