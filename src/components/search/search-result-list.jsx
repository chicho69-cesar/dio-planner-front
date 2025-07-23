import { FlatList, StyleSheet } from 'react-native'
import SearchResult from './search-result'

export default function SearchResultsList({ results }) {
  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      numColumns={2}
      renderItem={({ item }) => <SearchResult item={item} />}
      columnWrapperStyle={styles.columnWrapper}
    />
  )
}

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
  }
})
