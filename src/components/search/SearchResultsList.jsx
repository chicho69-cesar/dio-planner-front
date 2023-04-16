import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'native-base'
import SearchResult from './SearchResult'

export default function SearchResultsList({ results }) {
  const navigation = useNavigation()

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
