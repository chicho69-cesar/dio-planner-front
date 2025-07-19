import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

export default function EventGrade({ grade }) {
  return (
    <View style={styles.container}>
      <Text style={styles.gradeText}>{grade}</Text>
      <MaterialIcons name="star-rate" size={32} color="#d97706" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  gradeText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: 'black',
  }
})
