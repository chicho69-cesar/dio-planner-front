import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function GuestsListHeader() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate('AddGuest')}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Agregar invitado</Text>
          <MaterialIcons name="add" size={24} color="#1e293b" />
        </View>
      </Pressable>
      <Text style={styles.title}>Lista de invitados</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: '90%',
    backgroundColor: '#f59e0b',
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 6,
  },
  buttonContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    width: '100%',
    textAlign: 'center',
  }
})
