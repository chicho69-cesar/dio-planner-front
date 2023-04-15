import React from 'react'
import { FlatList } from 'native-base'
import Event from '../Event'
import ProfileInformation from './ProfileInformation'

export default function EventList({ navigation, route, events }) {
  return (
    <FlatList
      h="100%"
      data={events}
      ItemSeparatorComponent={<></>}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return item.id === 0 ? (
          <ProfileInformation
            navigation={navigation}
            route={route}
            nOfEvents={events.length === 0 ? 0 : events.length - 1}
          />
        ) : (
          <Event navigation={navigation} route={route} item={item} />
        )
      }}
    />
  )
}
