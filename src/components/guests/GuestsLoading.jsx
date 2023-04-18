import React from 'react'
import { HStack, VStack, Skeleton } from 'native-base'
import { FlatList } from 'native-base'
import GuestsListHeader from './GuestsListHeader'

export default function GuestsLoading() {
  const skeletons = [0, 1, 2, 3, 4]

  return (
    <FlatList
      h="100%"
      data={skeletons}
      ItemSeparatorComponent={<></>}
      keyExtractor={(item) => `${item}`}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        if (item === 0) {
          return <GuestsListHeader />
        } else {
          return (
            <HStack
              w="100%"
              rounded="md"
              space={2}
              my={2}
              p={2}
              borderWidth={1}
              borderColor="coolGray.400"
            >
              <Skeleton h="100" w="20" rounded="md" startColor="coolGray.600" />

              <VStack alignItems="flex-start" justifyContent="center" w="70%">
                <Skeleton rounded="lg" mb={2} />
                <Skeleton
                  h="3"
                  w="100%"
                  rounded="full"
                  startColor="amber.400"
                />
              </VStack>
            </HStack>
          )
        }
      }}
    />
  )
}
