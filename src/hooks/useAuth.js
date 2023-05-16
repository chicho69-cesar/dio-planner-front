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
    SecureStore.setItemAsync('user', stringUser)
    queryClient.refetchQueries()
    setUserLogged(userData)
  }

  const logout = () => {
    setUser(null)
    SecureStore.deleteItemAsync('user')
    queryClient.clear()
    setUserLogged({ ID: 1 })
  }

  return { user, login, logout }
}
