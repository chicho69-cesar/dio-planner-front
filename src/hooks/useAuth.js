import * as SecureStore from 'expo-secure-store'
import { useContext } from 'react'
import { useQueryClient } from 'react-query'

import { AuthContext } from '../context/context'

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext)
  const queryClient = useQueryClient()

  const login = (userData) => {
    let stringUser = JSON.stringify(userData)
    setUser(userData)
    SecureStore.setItemAsync('user', stringUser)
    queryClient.refetchQueries()
  }

  const logout = () => {
    setUser(null)
    SecureStore.deleteItemAsync('user')
    queryClient.clear()
  }

  return { user, login, logout }
}
