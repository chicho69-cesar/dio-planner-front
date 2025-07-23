import { FlatList, StyleSheet } from 'react-native'
import Event from '../shared/event'

export default function EventList({ events }) {
  return (
    <FlatList
      style={styles.list}
      data={events}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <Event item={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    height: '100%',
  },
  separator: {
    height: 16,
  }
})
