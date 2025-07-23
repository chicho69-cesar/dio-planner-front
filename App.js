import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'

import { AuthContext, LoadingContext } from './src/context/context'
import Router from './src/router'

const queryClient = new QueryClient()

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getUser() {
      const userSaved = await SecureStore.getItemAsync('user')
      if (userSaved) {
        setUser(JSON.parse(userSaved))
      }
    }

    getUser()
  }, [])

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style='light' />
          <Router />
        </QueryClientProvider>
      </AuthContext.Provider>
    </LoadingContext.Provider>
  )
}
