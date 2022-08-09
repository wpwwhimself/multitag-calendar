import eventsJSON from '../calendar-events/events.json';
import * as dateRefine from './dateRefine';

export type Event = {
  id: number,
  title: string,
  datein: string,
  dateout?: string,
  hours?: string,
  cat1: string,
  cat2?: string,
  cat3?: string,
  repeat?: string
}

const events = eventsJSON.events; //get events one level higher

export function timeDiff(repeat_mode: string, from: Date, to: Date) : number | undefined {
  switch(repeat_mode){
    case "d":
      return Math.ceil((from.getTime() - to.getTime()) / (1000 * 60 * 60 * 24));
    case "w":
      return Math.ceil((from.getTime() - to.getTime()) / (1000 * 60 * 60 * 24 * 7));
    case "m":
      return dateRefine.diffInMonths(dateRefine.long(from), dateRefine.long(to));
    case "y":
      return dateRefine.diffInYears(dateRefine.long(from), dateRefine.long(to));
  }
}

export function eventsOfToday(day: Date) : Event[]{
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

      if(time.now >= time.start && time.now < time.end){
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
  return eventToday;
}

export function eventInfo(id: number) : Event {
  let x : Event;
  for(x of events){
    if(x.id == id){
      return x;
    }
  }
  return {} as Event;
}