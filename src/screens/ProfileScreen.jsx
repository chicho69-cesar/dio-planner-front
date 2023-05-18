import { Stack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { getUserEvents } from '../api/event'
import BottomNavigationBar from '../components/BottomNavigationBar'
import { FABCreate } from '../components/FABCreate'
import EventList from '../components/profile/EventList'
import LoadingEvents from '../components/profile/LoadingEvents'
import { userLoggedState } from '../providers/user-state'

export default function ProfileScreen({ navigation, route }) {
  const [userLogged] = useRecoilState(userLoggedState)

  const [userId] = useState(userLogged.ID)
  const [isLoading, setIsLoading] = useState(true)
  const [myEvents, setMyEvents] = useState([{ id: 0 }])

  const getUserEventsFunc = async (ID) => {
    const response = await getUserEvents(ID)

    if (response) {
      setMyEvents([
        { id: 0 },
        ...response.map((event) => {
          return {
            id: event.id,
            name: event.name,
            date: new Date(event.date),
            description: event.description,
            img: event.img,
            location: event.location,
            topic: event.topic,
            userID: event.user_id
          }
        })
      ])

      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserEventsFunc(userId)
  }, [userId])

  return (
    <Stack w="100%" h="100%" justifyContent="center" alignItems="center">
      <Stack w="100%" h="100%" px={4} pt={16} pb={0}>
        {isLoading ? (
          <LoadingEvents nOfEvents={0} />
        ) : (
          <EventList events={myEvents} />
        )}
      </Stack>

      <FABCreate />

      <BottomNavigationBar active="Profile" />
    </Stack>
  )
}
