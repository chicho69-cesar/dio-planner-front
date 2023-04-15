import React from 'react'
import { FlatList } from 'native-base'
import LoadingEvent from '../LoadingEvent'

export default function LoadingEvents() {
  const skeletons = [1, 2, 3, 4]

  return (
    <FlatList
      data={skeletons}
      ItemSeparatorComponent={<></>}
      keyExtractor={(item) => `${item}`}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <LoadingEvent item={item} />}
    />
  )
}
