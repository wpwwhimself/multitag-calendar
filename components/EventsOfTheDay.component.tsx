import { View, Text, StyleSheet } from 'react-native';
import events from '../calendar-events/calendar-events.json';
import categories from '../calendar-events/categories.json';
import * as dateRefine from './dateRefine';

type Event = {
  title: string,
  datein: string,
  dateout?: string,
  cat1: string,
  cat2?: string,
  cat3?: string,
  repeat?: string
}

export function EventsOfTheDay({day} : {day: Date}) {
  let eventToday : Event[] = [];
  let x : any;
  for(x in events) {
    if(dateRefine.long(day) == x["datein" as keyof typeof x]) {
      eventToday.push(x);
    }
  }

  return(
    <>
    <Text>{events}</Text>
    {eventToday.map((val: Event, ind: number) => {
      return(
        <View key={ind} style={style.event}>
          <Text numberOfLines={1} style={style.eventText}>{val.title}</Text>
          <View style={style.catContainer}>
            <View style={[style.cat, {backgroundColor: categories[val.cat1 as keyof typeof categories].color}]} />
            {"cat2" in val && 
              <View style={[style.cat, {backgroundColor: categories[val.cat2 as keyof typeof categories].color}]} />
            }
            {"cat3" in val && 
              <View style={[style.cat, {backgroundColor: categories[val.cat3 as keyof typeof categories].color}]} />
            }
          </View>
        </View>
      )
    })}
    </>
  )
}

const style = StyleSheet.create({
  event: {
    // flexDirection: "row",
    width: "100%",
  },
  eventText: {
    
  },
  catContainer: {
    height: 2,
    flexDirection: "row"
  },
  cat: {
    flex: 1,
  }
});
