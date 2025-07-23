import { FlatList, StyleSheet, View } from 'react-native'
import LoadingEvent from '../shared/loading-event'

export default function LoadingEvents() {
  const skeletons = [1, 2, 3, 4]

  return (
    <FlatList
      data={skeletons}
      keyExtractor={(item) => `${item}`}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <LoadingEvent item={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  )
}

const styles = StyleSheet.create({
  separator: {
    height: 16,
  }
})
