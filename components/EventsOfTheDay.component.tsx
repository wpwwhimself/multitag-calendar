import { View, Text, StyleSheet } from 'react-native';
import eventsJSON from '../calendar-events/events.json';
import categories from '../calendar-events/categories.json';
import * as dateRefine from './dateRefine';

/* get events one level shallower */
const events = eventsJSON.events;

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
  let x : Event;
  for(x of events) {
    /*
     * repeats every:
     * d? -- ? days
     * w? -- ? weeks
     * m? -- ? months
     * y? -- ? years
     */
    if("repeat" in x || "dateout" in x) {
      const repeat = {
        mode: ("repeat" in x) ? x.repeat?.substring(0,1)! : "d",
        interval: ("repeat" in x) ? parseInt(x.repeat?.substring(1)!) : 1,
        multiplier: 1
      }
      if(repeat.mode == "w") repeat.multiplier = 7;
      const time = {
        now: Math.ceil(day.getTime()),
        start: Math.ceil(dateRefine.longToDate(x.datein).getTime()),
        end: ("dateout" in x) ? Math.ceil(dateRefine.longToDate(x.dateout!).getTime()) : Infinity
      }

      if(time.now > time.start && time.now < time.end){
        let diff : number | undefined;
        switch(repeat.mode){
          case "d":
          case "w":
            diff = Math.ceil((time.start - time.now) / (1000 * 60 * 60 * 24)); break;
          case "m":
            diff = dateRefine.diffInMonths(x.datein, dateRefine.long(day)); break;
          case "y":
            diff = dateRefine.diffInYears(x.datein, dateRefine.long(day)); break;
        }
        if(diff !== undefined && diff % (repeat.multiplier*repeat.interval) == 0) eventToday.push(x);
      }
    }else if(dateRefine.long(day) == x.datein) eventToday.push(x);
  }

  return(
    <>
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
