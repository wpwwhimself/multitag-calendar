import { View, Text, StyleSheet } from 'react-native';
import cat from '../calendar-events/categories.json';

type Props = {
  tag: string | undefined
}

export function EventTag({tag}: Props){
  if(tag === undefined) return null;

  const color = StyleSheet.create({
    border: {borderColor: cat[tag as keyof typeof cat].color},
    text: {color: cat[tag as keyof typeof cat].color},
  });

  return(
    <View style={[styles.box, color.border]}>
      <Text style={color.text}>{tag}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: 7,
    padding: 2,
    margin: 2,
  }
});