import { useQueryClient } from '@tanstack/react-query'
import * as SecureStore from 'expo-secure-store'
import { useContext } from 'react'

import { AuthContext } from '../context/context'
import { useUserLoggedStore } from '../providers/user-state'

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext)
  const setUserLogged = useUserLoggedStore((state) => state.setUserLogged)
  const queryClient = useQueryClient()

  const login = (userData) => {
    let stringUser = JSON.stringify(userData)
    setUser(userData)
    setUserLogged(userData)
    SecureStore.setItemAsync('user', stringUser)
    queryClient.refetchQueries()
  }

  const logout = () => {
    setUser(null)
    setUserLogged({ ID: 1 })
    SecureStore.deleteItemAsync('user')
    queryClient.clear()
  }

  return { user, login, logout }
}
