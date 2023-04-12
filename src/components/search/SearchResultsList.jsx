import React from 'react'
import { FlatList } from 'native-base'
import SearchResult from './SearchResult'

export default function SearchResultsList({ navigation, route, results }) {
  return (
    <FlatList
      data={results}
      ItemSeparatorComponent={<></>}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      numColumns={2}
      renderItem={({ item }) => (
        <SearchResult navigation={navigation} route={route} item={item} />
      )}
    />
  )
}
