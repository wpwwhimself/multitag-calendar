import { StyleSheet, Text, Touchable, View } from 'react-native';
import { EventsOfTheDay } from './EventsOfTheDay.component';
import * as clr from '../assets/colors';
import * as dateRefine from './dateRefine';

export function DayCard({day} : {day: Date}) {
  /* flags for coloring weekdays */
  const today = new Date();
  today.setHours(0,0,0,0);
  const weekend = (day.getDay() == 0 || day.getDay() == 6);
  const past = (day < today);
  
  return(
    <View style={[
      style.box,
      weekend && style.weekend,
      past && style.past,
    ]}>
        <Text style={style.date}>{dateRefine.short(day)}</Text>
        <EventsOfTheDay day={day} />
    </View>
  )
}

const style = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: "center" as const,
    backgroundColor: clr.workday,
    // borderRadius: 10,
    margin: 1,
    width: 80
  },
  weekend: {
    backgroundColor: clr.weekend,
  },
  past: {
    opacity: 0.2,
  },
  date: {
    fontWeight: "bold" as const,
  }
});