import { StyleSheet, Text, View } from 'react-native'
import { getCurrencyFormat } from '../../utils/currency-formatter'
import Action from '../shared/action'

export default function Purchase({ purchase, onEdit, onDelete }) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.price}>
          {getCurrencyFormat(purchase.price)}
        </Text>
        <Text style={styles.title} numberOfLines={4}>
          {purchase.title}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <Action
          bg="#fef3c7"
          color="#b45309"
          icon="mode-edit"
          onPress={() => onEdit(purchase.id)}
        />
        <Action
          bg="#fee2e2"
          color="#7f1d1d"
          icon="delete"
          onPress={() => onDelete(purchase.id)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginVertical: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 6,
  },
  infoContainer: {
    width: '72.5%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  price: {
    fontSize: 16,
    color: '#15803d',
    width: '100%',
    fontStyle: 'italic',
  },
  title: {
    fontSize: 14,
    color: 'black',
  },
  actionsContainer: {
    width: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})
