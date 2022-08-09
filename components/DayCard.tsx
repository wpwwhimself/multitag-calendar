import { StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, View } from 'react-native';
import { bigStyles, clr } from '../assets/bigStyles';
import * as dateRefine from './dateRefine';

import categories from '../calendar-events/categories.json';
import { Event, eventsOfToday } from './eventsOfToday';

type Props = {
  day: Date,
  detailsPopUp: any
}

export function DayCard({day, detailsPopUp} : Props) {
  const eventToday = eventsOfToday(day);

  /* flags for coloring weekdays */
  const today = new Date();
  today.setHours(0,0,0,0);
  const weekend = (day.getDay() == 0 || day.getDay() == 6);
  const past = (day < today);
  
  return(
    <>
      <TouchableNativeFeedback
        style={{flex: 1}}
        onPress={() => detailsPopUp(dateRefine.long(day))}
        >
        <View style={[
          style.box,
          weekend && style.weekend,
          past && style.past,
        ]}>
          <Text style={bigStyles.header}>{dateRefine.short(day)}</Text>
          {eventToday.map((val: Event, ind: number) => {return(
            <View key={ind} style={style.event}>
              <Text numberOfLines={1} style={style.eventText}>{val.title}</Text>
              <View style={style.catContainer}>
                <View style={[style.cat, {backgroundColor: categories[val.cat1 as keyof typeof categories].color}]} />
                {val.cat2 !== undefined && <View style={[style.cat, {backgroundColor: categories[val.cat2 as keyof typeof categories].color}]} />}
                {val.cat3 !== undefined && <View style={[style.cat, {backgroundColor: categories[val.cat3 as keyof typeof categories].color}]} />}
              </View>
            </View>
          )})}
        </View>
      </TouchableNativeFeedback>
    </>
  )
}

const style = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: "center" as const,
    backgroundColor: clr.workday,
    // borderRadius: 10,
    margin: 1,
    height: 80
  },
  weekend: {
    backgroundColor: clr.weekend,
  },
  past: {
    opacity: 0.2,
  },
  event: {
    // flexDirection: "row",
    width: "100%",
  },
  eventText: {
    ...bigStyles.text
  },
  catContainer: {
    height: 2,
    flexDirection: "row"
  },
  cat: {
    flex: 1,
  }
});