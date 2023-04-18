import React from 'react'
import { Image, AspectRatio, VStack, Heading, Text, HStack } from 'native-base'

export default function Guest({ guest }) {
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
      <AspectRatio
        ratio={{
          base: 5 / 6,
          md: 5 / 6
        }}
        height={{
          base: 100,
          md: 100
        }}
      >
        <Image
          rounded="md"
          resizeMode="cover"
          alt={guest.name}
          source={{
            uri: guest.picture
          }}
        />
      </AspectRatio>

      <VStack alignItems="flex-start" justifyContent="center" w="65%">
        <Heading size="md" color="black" w="100%" isTruncated>
          {guest.name}
        </Heading>

        <Text fontSize="md" color="amber.400" fontWeight="bold">
          {guest.status}
        </Text>
      </VStack>
    </HStack>
  )
}
