import { FlatList, StyleSheet, View } from 'react-native'
import LoadingEvent from '../shared/loading-event'
import ProfileInformation from './profile-information'

export default function LoadingEvents({ nOfEvents }) {
  const skeletons = [0, 1, 2, 3, 4]

  return (
    <FlatList
      style={styles.list}
      data={skeletons}
      keyExtractor={(item) => `${item}`}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        item === 0 ? (
          <ProfileInformation nOfEvents={nOfEvents} />
        ) : (
          <LoadingEvent item={item} />
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
