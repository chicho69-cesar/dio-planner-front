import { FlatList, StyleSheet, View } from 'react-native'
import Event from '../shared/event'
import ProfileInformation from './profile-information'

export default function EventList({ events }) {
  return (
    <FlatList
      style={styles.list}
      data={events}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        item.id === 0 ? (
          <ProfileInformation
            nOfEvents={events.length === 0 ? 0 : events.length - 1}
          />
        ) : (
          <Event item={item} />
        )
      )}
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
