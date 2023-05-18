import { Heading, Stack } from 'native-base'
import React, { useEffect, useState } from 'react'

import { getTopEvents } from '../api/event'
import BottomNavigationBar from '../components/BottomNavigationBar'
import { FABCreate } from '../components/FABCreate'
import EventList from '../components/home/EventList'
import LoadingEvents from '../components/home/LoadingEvents'

export default function TopEventsScreen({ navigation, route }) {
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
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack h="100%" w="100%" px={4} pt={16} pb={0}>
        {isLoading ? (
          <LoadingEvents />
        ) : events.length === 0 ? (
          <Heading fontSize="2xl" color="black" textAlign="center" mt={12}>
            No hay eventos top
          </Heading>
        ) : (
          <EventList events={events} />
        )}
      </Stack>

      <FABCreate />

      <BottomNavigationBar active="Tops" />
    </Stack>
  )
}
