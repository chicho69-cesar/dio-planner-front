import { Stack } from 'native-base'
import React, { useEffect } from 'react'

import Logo from '../components/Logo'
import { useAuth } from '../hooks/useAuth'

export default function SplashScreen({ navigation }) {
  const { user } = useAuth()

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigation.navigate('Home')
      } else {
        navigation.navigate('Login')
      }
    }, 1000)
  }, [user, navigation])

  return (
    <Stack w="100%" h="100%" justifyContent="center" alignItems="center">
      <Logo />
    </Stack>
  )
}
