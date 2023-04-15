import React from 'react'
import { FlatList } from 'native-base'
import ProfileInformation from './ProfileInformation'
import LoadingEvent from '../LoadingEvent'

export default function LoadingEvents({ navigation, route, nOfEvents }) {
  const skeletons = [0, 1, 2, 3, 4]

  return (
    <FlatList
      data={skeletons}
      ItemSeparatorComponent={<></>}
      keyExtractor={(item) => `${item}`}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return item === 0 ? (
          <ProfileInformation
            navigation={navigation}
            route={route}
            nOfEvents={nOfEvents}
          />
        ) : (
          <LoadingEvent item={item} />
        )
      }}
    />
  )
}
