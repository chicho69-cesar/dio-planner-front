import { StyleSheet, Text, View } from 'react-native'

export default function Error({ error }) {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 16,
  }
})
