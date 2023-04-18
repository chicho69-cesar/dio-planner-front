import React, { useEffect, useState } from 'react'
import { Stack } from 'native-base'
import BottomNavigationBar from '../components/BottomNavigationBar'
import GuestsList from '../components/guests/GuestsList'
import GuestsLoading from '../components/guests/GuestsLoading'

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
  const [eventGuests, setEventGuests] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setEventGuests([...guests])
    }, 3000)
  }, [])

  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack w="100%" h="100%" px={4} pt={16} pb={0}>
        {eventGuests.length === 0 ? (
          <GuestsLoading />
        ) : (
          <GuestsList guests={eventGuests} />
        )}
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
