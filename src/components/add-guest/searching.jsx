import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default function Searching() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#f59e0b" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 384,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
