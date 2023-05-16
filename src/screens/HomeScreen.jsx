import { Heading, Stack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { getMyEvents } from '../api/guest'
import BottomNavigationBar from '../components/BottomNavigationBar'
import { FABCreate } from '../components/FABCreate'
import EventList from '../components/home/EventList'
import LoadingEvents from '../components/home/LoadingEvents'
import { useAuth } from '../hooks/useAuth'
import { userLoggedState } from '../providers/user-state'

export default function HomeScreen({ navigation, route }) {
  const { user } = useAuth()
  const [userLogged] = useRecoilState(userLoggedState)

  const [userId] = useState(user.ID ?? userLogged.ID)
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
    console.log('USUARIO EN SESIÓN')
    console.log(userLogged)
    console.log('USUARIO QUE SE VA A USAR PARA LA PETICIÓN')
    console.log(userId)
    getMyEventsFunc(userId)
  }, [userId, userLogged])

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
