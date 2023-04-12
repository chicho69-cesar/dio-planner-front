import React from 'react'
import { FlatList, Column, VStack, Skeleton } from 'native-base'

export default function LoadingResults() {
  const skeletons = [1, 2, 3, 4, 5, 6]

  return (
    <FlatList
      data={skeletons}
      ItemSeparatorComponent={<></>}
      keyExtractor={(item) => `${item}`}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      numColumns={2}
      renderItem={({ item }) => (
        <Column w="47%" mx="1%" my={2} key={item}>
          <VStack rounded="lg" borderWidth={1}>
            <Skeleton h={200} startColor="coolGray.500" borderTopRadius="lg" />

            <Skeleton
              h="4"
              rounded="full"
              m={2}
              w="90%"
              startColor="amber.300"
            />
          </VStack>
        </Column>
      )}
    />
  )
}
