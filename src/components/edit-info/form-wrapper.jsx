import { StyleSheet, Text, View } from 'react-native'
import { useErrorsEditInfoStore } from '../../providers/edit-info-state'

export default function FormWrapper({ children, to, isRequired = true }) {
  const errors = useErrorsEditInfoStore((state) => state.errorsEditInfo)
  const hasError = Object.keys(errors).includes(to)

  return (
    <View style={[
      styles.container,
    ]}>
      {children({ hasError })}
      {isRequired && <Text style={styles.requiredIndicator}>*</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  requiredIndicator: {
    color: 'red',
    fontSize: 16,
  }
})
