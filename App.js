import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

import Main from './src/Main'
import { AuthContext, LoadingContext } from './src/context/context'

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
    <RecoilRoot>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <AuthContext.Provider value={{ user, setUser }}>
          <QueryClientProvider client={queryClient}>
            <StatusBar style="light" />
            <Main />
          </QueryClientProvider>
        </AuthContext.Provider>
      </LoadingContext.Provider>
    </RecoilRoot>
  )
}
