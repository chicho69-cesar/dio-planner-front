import { FlatList, StyleSheet, View } from 'react-native'
import GuestsListHeader from './guest-list-header'

export default function GuestsLoading() {
  const skeletons = [0, 1, 2, 3, 4]

  return (
    <FlatList
      style={styles.list}
      data={skeletons}
      keyExtractor={(item) => `${item}`}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        item === 0 ? <GuestsListHeader /> : <GuestSkeleton />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  )
}

function GuestSkeleton() {
  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonInfo}>
        <View style={styles.skeletonText} />
        <View style={styles.skeletonStatus} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    height: '100%',
  },
  separator: {
    height: 8,
  },
  skeletonContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    marginVertical: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 6,
  },
  skeletonImage: {
    width: 100,
    height: 120,
    borderRadius: 6,
    backgroundColor: '#4b5563',
  },
  skeletonInfo: {
    width: '65%',
    justifyContent: 'center',
  },
  skeletonText: {
    height: 20,
    borderRadius: 4,
    backgroundColor: '#4b5563',
    marginBottom: 8,
  },
  skeletonStatus: {
    height: 16,
    borderRadius: 8,
    backgroundColor: '#f59e0b',
  }
})
