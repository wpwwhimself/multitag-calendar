import { View } from 'react-native';
import { DayCard } from './DayCard';
import * as dateRefine from './dateRefine';

type Props = {
  startFrom: Date,
  detailsPopUp: any
}

export function Week({startFrom, detailsPopUp} : Props) {
  const week = [];

  for(var i = 0; i < 7; i++) {
    week[i] = new Date(startFrom);
    week[i].setDate(startFrom.getDate() + i);
  }

  return(
    <View style={style}>
      {week.map(val => {
        return(
          <DayCard
            key={dateRefine.short(val)}
            day={val}
            detailsPopUp={detailsPopUp}
            />
        )
      })}
    </View>
  )
}

const style = {
  flex: 1,
  flexDirection: "column" as const,
}