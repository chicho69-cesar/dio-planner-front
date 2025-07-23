import { FlatList, StyleSheet, View } from 'react-native'

export default function LoadingResults() {
  const skeletons = [1, 2, 3, 4, 5, 6]

  return (
    <FlatList
      data={skeletons}
      keyExtractor={(item) => `${item}`}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.itemContainer} key={item}>
          <View style={styles.skeletonContainer}>
            <View style={styles.imagePlaceholder} />
            <View style={styles.textPlaceholder} />
          </View>
        </View>
      )}
      columnWrapperStyle={styles.columnWrapper}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '47%',
    marginHorizontal: '1.5%',
    marginVertical: 8,
  },
  skeletonContainer: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: '#6b7280',
  },
  textPlaceholder: {
    height: 16,
    borderRadius: 8,
    backgroundColor: '#f59e0b',
    margin: 8,
    width: '90%',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  }
})
