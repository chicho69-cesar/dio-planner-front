import { createContext } from 'react'

export const AuthContext = createContext({
  user: null,
  setUser: (user) => {
    //
  }
})

export const LoadingContext = createContext({
  loading: false,
  setLoading: (loading) => {
    //
  }
})

