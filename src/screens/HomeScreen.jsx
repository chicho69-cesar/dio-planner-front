import { Heading, Stack } from 'native-base'
import React, { useEffect, useState } from 'react'

import { getMyEvents } from '../api/guest'
import BottomNavigationBar from '../components/BottomNavigationBar'
import { FABCreate } from '../components/FABCreate'
import EventList from '../components/home/EventList'
import LoadingEvents from '../components/home/LoadingEvents'
import { useAuth } from '../hooks/useAuth'

export default function HomeScreen({ navigation, route }) {
  const { user } = useAuth()

  const [userId] = useState(user.ID)
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyEventsFunc = async (ID) => {
    const response = await getMyEvents(ID)

    if (response) {
      setEvents([
        ...response.map((event) => {
          return {
            id: event.id,
            name: event.name,
            date: new Date(event.date),
            description: event.description,
            img: event.img,
            location: event.location,
            userID: event.user_id
          }
        })
      ])

      setIsLoading(false)
    }
  }

  useEffect(() => {
    getMyEventsFunc(userId)
  }, [userId])

  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack h="100%" w="100%" px={4} pt={16} pb={0}>
        {isLoading ? (
          <LoadingEvents />
        ) : events.length === 0 ? (
          <Heading fontSize="2xl" color="black" textAlign="center" mt={12}>
            No tienes ningún evento registrado.
          </Heading>
        ) : (
          <EventList events={events} />
        )}
      </Stack>

      <FABCreate />

      <BottomNavigationBar active="Home" />
    </Stack>
  )
}
