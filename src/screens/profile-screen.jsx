import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { getUserEvents } from '../api/event'
import EventList from '../components/profile/event-list'
import LoadingEvents from '../components/profile/loading-events'
import BottomNavigationBar from '../components/shared/bottom-navigation-bar'
import { FABCreate } from '../components/shared/fab-create'
import { useUserLoggedStore } from '../providers/user-state'

export default function ProfileScreen() {
  const userLogged = useUserLoggedStore((state) => state.userLogged)

  const [userId] = useState(userLogged.ID)
  const [isLoading, setIsLoading] = useState(true)
  const [myEvents, setMyEvents] = useState([{ id: 0 }])

  const getUserEventsFunc = async (ID) => {
    const response = await getUserEvents(ID)

    if (response) {
      setMyEvents([
        { id: 0 },
        ...response.map((event) => ({
          id: event.id,
          name: event.name,
          date: new Date(event.date),
          description: event.description,
          img: event.img,
          location: event.location,
          topic: event.topic,
          userID: event.user_id
        }))
      ])
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserEventsFunc(userId)
  }, [userId])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isLoading ? (
          <LoadingEvents nOfEvents={0} />
        ) : (
          <EventList events={myEvents} />
        )}
      </View>

      <FABCreate />
      <BottomNavigationBar active="Profile" />
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
})
