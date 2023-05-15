import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { theme } from './theme/theme'

// import SafeAreaAppBar from './components/SafeAreaAppBar'
import Router from './routes/Router'

export default function Main() {
  return (
    <NativeBaseProvider theme={theme}>
      {/* <SafeAreaAppBar/> */}
      <Router />
    </NativeBaseProvider>
  )
}
