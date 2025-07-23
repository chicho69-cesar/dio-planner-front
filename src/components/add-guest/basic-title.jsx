import { StyleSheet, Text } from 'react-native'

export default function BasicTitle() {
  return (
    <Text style={styles.title}>
      Busca personas...
    </Text>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: '#374151',
    marginTop: 16,
    width: '100%',
    textAlign: 'center',
  }
})
