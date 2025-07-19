import { StyleSheet, Text } from 'react-native'

export default function Logo() {
  return (
    <Text style={styles.logo}>
      dio<Text style={styles.logoPart}>Planner</Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  logo: {
    marginBottom: 24,
    color: '#f59e0b',
    fontSize: 36,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  logoPart: {
    color: 'black',
  }
})
