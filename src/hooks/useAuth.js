import * as SecureStore from 'expo-secure-store'
import { useContext } from 'react'
import { useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'

import { AuthContext } from '../context/context'
import { userLoggedState } from '../providers/user-state'

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext)
  const [, setUserLogged] = useRecoilState(userLoggedState)
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
