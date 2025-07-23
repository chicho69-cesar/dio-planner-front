import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { addGuest } from '../../api/guest'
import { useSelectedEventStore } from '../../providers/event-state'
import Loading from '../shared/loading'

export default function CompletedSearch({ results }) {
  const navigation = useNavigation()
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)

  const addGuestMut = useMutation({
    mutationFn: async (values) => {
      const response = await addGuest(values.userID, values.eventID, values.status)
      if (!response) {
        console.error('Error al invitar a la persona')
      }
    }
  })

  const invite = (id) => {
    addGuestMut.mutate({
      userID: id,
      eventID: selectedEvent.id,
      status: 'Pendiente'
    })
    navigation.navigate('Event')
  }

  if (addGuestMut.isLoading) {
    return <Loading />
  }

  return (
    <>
      <Text style={styles.title}>Personas encontradas</Text>
      {results.map((result) => (
        <View style={styles.resultContainer} key={result.id}>
          <View style={styles.userInfo}>
            <Image
              style={styles.userImage}
              source={{ uri: result.picture }}
              alt={result.name}
            />
            <Text style={styles.userName} numberOfLines={1}>
              {result.name}
            </Text>
          </View>
          <Pressable
            style={styles.inviteButton}
            onPress={() => invite(result.id)}
          >
            <Text style={styles.inviteText}>Invitar</Text>
          </Pressable>
        </View>
      ))}
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: '#374151',
    marginTop: 16,
    width: '100%',
    textAlign: 'center',
  },
  resultContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 6,
    gap: 8,
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#9ca3af',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  userImage: {
    width: 100,
    height: 120,
    borderRadius: 6,
  },
  userName: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    flexShrink: 1,
  },
  inviteButton: {
    backgroundColor: '#1e293b',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  inviteText: {
    color: 'white',
  }
})
