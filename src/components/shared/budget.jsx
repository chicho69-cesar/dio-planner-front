import { StyleSheet, Text, View } from 'react-native'
import { getCurrencyFormat } from '../../utils/currency-formatter'

export default function Budget({ budget }) {
  return (
    <View style={styles.container}>
      <View style={styles.budgetContainer}>
        <Text style={styles.title}>Presupuesto</Text>
        <Text style={styles.amount}>{getCurrencyFormat(budget)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  budgetContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#475569',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    marginVertical: 12,
    padding: 16,
  },
  title: {
    width: '100%',
    textAlign: 'left',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 36,
    color: '#15803d',
    width: '100%',
    textAlign: 'center',
  }
})
