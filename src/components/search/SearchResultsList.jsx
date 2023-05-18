import { FlatList } from 'native-base'
import React from 'react'
import SearchResult from './SearchResult'

export default function SearchResultsList({ results }) {
  return (
    <FlatList
      data={results}
      ItemSeparatorComponent={<></>}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      numColumns={2}
      renderItem={({ item }) => <SearchResult item={item} />}
    />
  )
}
