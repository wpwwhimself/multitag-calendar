import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal';
import { bigStyles, clr } from '../assets/bigStyles';
import { EventTag } from './EventTag';
import { eventInfo, timeDiff } from './eventsOfToday';
import * as dateRefine from './dateRefine';

type Props = {
  state: States,
  date: Date
}
type States = {
  eventDetailsVisible: boolean,
  eventID: number,
  eventDetailsPopUp: (arg0: number) => void
}

export function EventDetails({state, date}: Props) {
  const {eventDetailsVisible, eventID, eventDetailsPopUp} : States = state;
  const event = eventInfo(eventID);

  /* format of dates */
  let fromTo = event.datein;
  if(event.dateout !== undefined) fromTo += ` – ${event.dateout}`;
  if(event.repeat !== undefined) {
    const [r_unit, r_num] = [event.repeat.substring(0,1), parseInt(event.repeat.substring(1))];
    let [rep, rep_count] = ["", timeDiff(r_unit, date, dateRefine.longToDate(event.datein))! / r_num];
    switch(event.repeat.substring(0,1)){
      case "d":
        rep = "day";
        // rep_count = 
        break;
      case "w":
        rep = "week";
        break;
      case "m":
        rep = "month";
        break;
      case "y":
        rep = "year";
        break;
    }
    fromTo += ` every ${(r_num == 1) ? rep : `${r_num} ${rep}s`}`;
    switch(rep_count){
      case 0: break;
      case 1: fromTo += `, repeated once`; break;
      default: fromTo += `, repeated ${rep_count} times`;
    }
  }

  return(
    <>
      <Modal
        isVisible={eventDetailsVisible}
        animationIn={"zoomIn"}
        backdropOpacity={0.5}
        onBackdropPress={() => eventDetailsPopUp(-1)}
        onBackButtonPress={() => eventDetailsPopUp(-1)}>
        <View style={styles.popUp}>
          <Text style={[bigStyles.header, styles.header]}>{event.title}</Text>
          <Text style={[bigStyles.text, styles.fromTo]}>{fromTo}</Text>
          <View style={styles.catContainer}>
            <Text style={bigStyles.text}>Categorised as:</Text>
            <EventTag tag={event.cat1} />
            <EventTag tag={event.cat2} />
            <EventTag tag={event.cat3} />
          </View>
        </View>
      </Modal>
    </>
    );
}

const styles = StyleSheet.create({
  popUp: {
    // height: "50%",
    padding: 20,
    backgroundColor: clr.event,
  },
  header: {
    fontSize: 20
  },
  fromTo: {
    textAlign: "center",
  },
  catContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    borderTopWidth: 1,
    borderTopColor: "gray",
    marginTop: 10,
  }
})