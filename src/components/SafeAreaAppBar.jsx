import React from 'react'
import { View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default function SafeAreaAppBar() {
  return <View style={styles.appBar} />
}

const styles = StyleSheet.create({
  appBar: {
    width: '100%',
    paddingTop: Constants.statusBarHeight + 5,
    flexDirection: 'row'
  }
})
