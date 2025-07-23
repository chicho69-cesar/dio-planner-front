import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { getTopEvents } from '../api/event'
import EventList from '../components/home/event-list'
import LoadingEvents from '../components/home/loading-events'
import BottomNavigationBar from '../components/shared/bottom-navigation-bar'
import { FABCreate } from '../components/shared/fab-create'

export default function TopEventsScreen() {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getTopEventsFunc = async () => {
    const response = await getTopEvents()

    if (response) {
      setEvents([
        ...response.map((event) => {
          return {
            id: event.id,
            avg: event.avg,
            name: event.name,
            date: new Date(event.date),
            description: event.description,
            img: event.img,
            location: event.location,
            userID: event.user_id,
            accessibility: event.accessibility
          }
        })
      ])

      setIsLoading(false)
    }
  }

  useEffect(() => {
    getTopEventsFunc()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isLoading ? (
          <LoadingEvents />
        ) : events.length === 0 ? (
          <Text style={styles.heading}>No hay eventos top</Text>
        ) : (
          <EventList events={events} />
        )}
      </View>

      <FABCreate />
      <BottomNavigationBar active="Tops" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0
  },
  heading: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginTop: 48
  }
})
