import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import Logo from '../components/shared/logo'
import { useAuth } from '../hooks/use-auth'
import { useUserLoggedStore } from '../providers/user-state'

export default function SplashScreen({ navigation }) {
  const { user } = useAuth()
  const setUserLogged = useUserLoggedStore((state) => state.setUserLogged)

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
    <View style={styles.container}>
      <Logo />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
