import { View, StyleSheet } from 'react-native';
import { Week } from './Week.component';
import * as dateRefine from './dateRefine';

export function Calendar(){
  const monday = new Date();
  monday.setDate(monday.getDate() - monday.getDay() + 1);

  const month = [];

  for(var i = 0; i < 60; i++) {
    month[i] = new Date(monday);
    month[i].setDate(monday.getDate() + 7*i);
  }

  return(
    <View style={style.calendar}>
      {month.map(val => {
        return <Week key={dateRefine.short(val)} startFrom={val} />
      })}
    </View>
  )
}

const style = StyleSheet.create({
  calendar: {
    flex: 1,
    flexDirection: "row" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    width: "100%",
  }
});