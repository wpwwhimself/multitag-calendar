import { View, Text, Touchable, TouchableOpacity, TouchableHighlight } from 'react-native';
import * as clr from '../assets/colors';
import * as dateRefine from './dateRefine';

const style = {
  box: {
    flex: 1,
    alignItems: "center" as const,
    backgroundColor: clr.workday,
    // borderRadius: 10,
    margin: 1,
    height: 80,
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
}

export function DayCard({day} : {day: Date}) {
  const today = new Date();
  today.setHours(0,0,0,0);

  const weekend = (day.getDay() == 0 || day.getDay() == 6);
  const past = (day < today);

  return(
    <TouchableHighlight style={[
      style.box,
      weekend && style.weekend,
      past && style.past,
    ]}>
        <Text style={style.date}>{dateRefine.short(day)}</Text>
    </TouchableHighlight>
  )
}