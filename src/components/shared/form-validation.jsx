import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

import { useErrorsLoginStateStore } from '../../providers/login-state.js'

export default function FormValidation({ to }) {
  const errors = useErrorsLoginStateStore((state) => state.errorsLoginState)

  if (!(`${to}` in errors)) return null

  return (
    <View style={styles.container}>
      <MaterialIcons name="warning" size={16} color="red" />
      <Text style={styles.errorText}>{errors[`${to}`]}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    marginLeft: 4,
  }
})
