import React from 'react'
import { FlatList } from 'native-base'
import ProfileInformation from './ProfileInformation'
import LoadingEvent from '../LoadingEvent'

export default function LoadingEvents({ nOfEvents }) {
  const skeletons = [0, 1, 2, 3, 4]

  return (
    <FlatList
      data={skeletons}
      ItemSeparatorComponent={<></>}
      keyExtractor={(item) => `${item}`}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return item === 0 ? (
          <ProfileInformation nOfEvents={nOfEvents} />
        ) : (
          <LoadingEvent item={item} />
        )
      }}
    />
  )
}
