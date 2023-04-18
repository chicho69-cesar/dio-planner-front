import React from 'react'
import { FlatList } from 'native-base'

import GuestsListHeader from './GuestsListHeader'
import Guest from './Guest'

export default function GuestsList({ guests }) {
  return (
    <FlatList
      h="100%"
      data={guests}
      ItemSeparatorComponent={<></>}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return item.id === 0 ? <GuestsListHeader /> : <Guest guest={item} />
      }}
    />
  )
}
