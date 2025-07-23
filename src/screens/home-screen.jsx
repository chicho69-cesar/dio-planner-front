import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { getMyEvents } from '../api/guest'
import EventList from '../components/home/event-list'
import LoadingEvents from '../components/home/loading-events'
import BottomNavigationBar from '../components/shared/bottom-navigation-bar'
import { FABCreate } from '../components/shared/fab-create'
import { useUserLoggedStore } from '../providers/user-state'

export default function HomeScreen() {
  const userLogged = useUserLoggedStore((state) => state.userLogged)

  const [userId] = useState(userLogged.ID)
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyEventsFunc = async (ID) => {
    const response = await getMyEvents(ID)

    if (response) {
      setEvents(response.map((event) => ({
        id: event.id,
        name: event.name,
        date: new Date(event.date),
        description: event.description,
        img: event.img,
        location: event.location,
        topic: event.topic,
        userID: event.user_id
      })))

      setIsLoading(false)
    }
  }

  useEffect(() => {
    getMyEventsFunc(userId)
  }, [userId])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isLoading ? (
          <LoadingEvents />
        ) : events.length === 0 ? (
          <Text style={styles.emptyText}>No tienes ningún evento registrado.</Text>
        ) : (
          <EventList events={events} />
        )}
      </View>

      <FABCreate />
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
