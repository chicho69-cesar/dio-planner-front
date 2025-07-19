import Constants from 'expo-constants'
import { StyleSheet, View } from 'react-native'

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
