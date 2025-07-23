import { FlatList, StyleSheet, View } from 'react-native'
import Guest from './guest'

import GuestsListHeader from './guest-list-header'

export default function GuestsList({ guests }) {
  return (
    <FlatList
      style={styles.list}
      data={guests}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        item.id === 0 ? <GuestsListHeader /> : <Guest guest={item} />
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
    height: 8,
  }
})
