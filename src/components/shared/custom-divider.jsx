import { StyleSheet, View } from 'react-native'

export default function CustomDivider() {
  return <View style={styles.divider} />
}

const styles = StyleSheet.create({
  divider: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#475569',
    marginVertical: 12,
  }
})
