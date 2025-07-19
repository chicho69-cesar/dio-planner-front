import { StyleSheet, Text, View } from 'react-native'
import { useErrorsLoginStateStore } from '../../providers/login-state.js'

export default function FormElement({ children, to, label, isRequired, mb }) {
  const errors = useErrorsLoginStateStore((state) => state.errorsLoginState)
  const hasError = to in errors

  return (
    <View style={[styles.container, { marginBottom: mb || 12 }]}>
      {label && (
        <Text style={styles.label}>
          {isRequired && <Text style={styles.required}>* </Text>}
          {label}
        </Text>
      )}

      {children}

      {hasError && <View style={styles.errorIndicator} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    width: '75%',
    marginLeft: 16,
    fontSize: 18,
    color: '#4b5563',
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  errorIndicator: {
    borderColor: 'red',
    borderWidth: 1,
  }
})
