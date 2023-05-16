import { Stack } from 'native-base'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import Logo from '../components/Logo'
import { useAuth } from '../hooks/useAuth'
import { userLoggedState } from '../providers/user-state'

export default function SplashScreen({ navigation }) {
  const { user } = useAuth()
  const [, setUserLogged] = useRecoilState(userLoggedState)

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        setUserLogged(user)
        navigation.navigate('Home')
      } else {
        setUserLogged({ ID: 1 })
        navigation.navigate('Login')
      }
    }, 1000)
  }, [user, setUserLogged, navigation])

  return (
    <Stack w="100%" h="100%" justifyContent="center" alignItems="center">
      <Logo />
    </Stack>
  )
}
