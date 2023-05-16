import { Heading, Stack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { getGuests } from '../api/guest'
import BottomNavigationBar from '../components/BottomNavigationBar'
import GuestsList from '../components/guests/GuestsList'
import GuestsLoading from '../components/guests/GuestsLoading'
import { selectedEventState } from '../providers/event-state'

const guests = [
  { id: 0 },
  {
    id: 1,
    name: 'Hector Felipe',
    picture:
      'https://i.pinimg.com/originals/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg',
    status: 'Aceptada'
  },
  {
    id: 2,
    name: 'Luis Angel',
    picture:
      'https://i.pinimg.com/originals/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg',
    status: 'Pendiente'
  },
  {
    id: 3,
    name: 'Manuel Alejandro',
    picture:
      'https://i.pinimg.com/originals/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg',
    status: 'Aceptada'
  },
  {
    id: 4,
    name: 'Yulissa Thaily',
    picture:
      'https://i.pinimg.com/originals/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg',
    status: 'Pendiente'
  },
  {
    id: 5,
    name: 'Aranzazu Jimena',
    picture:
      'https://i.pinimg.com/originals/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg',
    status: 'Cancelada'
  }
]

export default function GuestsScreen({ navigation, route }) {
  const [selectedEvent] = useRecoilState(selectedEventState)

  const [eventGuests, setEventGuests] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getGuestsFunc = async (ID) => {
    const response = await getGuests(ID)

    if (response) {
      console.log(response)
      setEventGuests([
        { id: 0 },
        ...response.map((guest) => {
          return {
            id: guest.id,
            name: guest.name,
            description: guest.description,
            picture: guest.picture,
            status: guest.status
          }
        })
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
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack w="100%" h="100%" px={4} pt={16} pb={0}>
        {isLoading ? (
          <GuestsLoading />
        ) : eventGuests.length === 0 ? (
          <Heading fontSize="2xl" color="black" textAlign="center" mt={12}>
            No hay ningún invitado en el evento
          </Heading>
        ) : (
          <GuestsList guests={eventGuests} />
        )}
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
