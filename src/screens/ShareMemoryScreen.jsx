import React from 'react'
import { Stack } from 'native-base'
import BottomNavigationBar from '../components/BottomNavigationBar'

export default function ShareMemoryScreen({ navigation, route }) {
  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack w="100%" h="100%" px={4} pt={16} pb={0}>
        {/*  */}
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
