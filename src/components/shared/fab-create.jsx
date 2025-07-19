import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, TouchableOpacity } from 'react-native'

export function FABCreate() {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate('CreateEvent')}
    >
      <AntDesign name="plus" size={32} color="black" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 70,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})
