import React from 'react'
import { Box, FlatList, HStack, Skeleton } from 'native-base'

export default function LoadingEvents() {
  const skeletons = [1, 2, 3, 4]

  return (
    <FlatList
      data={skeletons}
      ItemSeparatorComponent={<></>}
      keyExtractor={(item) => `${item}`}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <Box my={4} rounded="lg" borderWidth={1} key={item}>
          <HStack justifyContent="flex-start">
            <Skeleton
              h="200"
              w="150"
              borderLeftRadius="lg"
              startColor="coolGray.600"
            />

            <Box w="54%" p={2} h="100%" borderRightRadius="lg">
              <Skeleton startColor="coolGray.600" rounded="md" mb={2} />
              <Skeleton h="5" rounded="full" startColor="amber.400" mb={8} />
              <Skeleton.Text startColor="coolGray.600" />
            </Box>
          </HStack>
        </Box>
      )}
    />
  )
}
