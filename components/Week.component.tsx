import { View } from 'react-native';
import { DayCard } from './DayCard.component';
import * as dateRefine from './dateRefine';

export function Week({startFrom} : {startFrom: Date}) {
  const week = [];

  for(var i = 0; i < 7; i++) {
    week[i] = new Date(startFrom);
    week[i].setDate(startFrom.getDate() + i);
  }

  return(
    <View style={style}>
      {week.map(val => {
        return <DayCard key={dateRefine.short(val)} day={val} />
      })}
    </View>
  )
}

const style = {
  flex: 1,
  flexDirection: "column" as const,
}