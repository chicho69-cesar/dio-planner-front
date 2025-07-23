import { StyleSheet, Text, View } from 'react-native'
import { getPickedDate } from '../../utils/dates.js'
import Action from '../shared/action.jsx'

export default function Todo({ todo, onComplete, onEdit, onDelete }) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.date}>
          {getPickedDate(todo.date)}
        </Text>
        <Text
          style={[
            styles.text,
            todo.complete && styles.completedText
          ]}
          numberOfLines={4}
        >
          {todo.text}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <Action
          bg="#dcfce7"
          color="#14532d"
          icon={todo.complete ? 'check-box' : 'check-box-outline-blank'}
          onPress={() => onComplete(todo.id)}
        />
        <Action
          bg="#fef3c7"
          color="#b45309"
          icon="mode-edit"
          onPress={() => onEdit(todo.id)}
        />
        <Action
          bg="#fee2e2"
          color="#7f1d1d"
          icon="delete"
          onPress={() => onDelete(todo.id)}
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
    width: '65%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  date: {
    fontSize: 12,
    color: '#f59e0b',
  },
  text: {
    fontSize: 14,
    color: 'black',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  actionsContainer: {
    width: '32.5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})
