import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { getGuests } from '../api/guest'
import GuestsList from '../components/guests/guest-list'
import GuestsLoading from '../components/guests/guest-loading'
import BottomNavigationBar from '../components/shared/bottom-navigation-bar'
import { useSelectedEventStore } from '../providers/event-state'

export default function GuestsScreen() {
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)
  const [eventGuests, setEventGuests] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getGuestsFunc = async (ID) => {
    const response = await getGuests(ID)

    if (response) {
      setEventGuests([
        { id: 0 },
        ...response.map((guest) => ({
          id: guest.id,
          name: guest.name,
          description: guest.description,
          picture: guest.picture,
          status: guest.status
        }))
      ])

      setIsLoading(false)
    } else {
      console.error('Error al obtener los invitados')
    }
  }

  useEffect(() => {
    getGuestsFunc(selectedEvent.id)
  }, [selectedEvent])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isLoading ? (
          <GuestsLoading />
        ) : eventGuests.length === 1 ? (
          <Text style={styles.emptyText}>No hay ningún invitado en el evento</Text>
        ) : (
          <GuestsList guests={eventGuests} />
        )}
      </View>

      <BottomNavigationBar active="Home" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  emptyText: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginTop: 48,
  },
})
