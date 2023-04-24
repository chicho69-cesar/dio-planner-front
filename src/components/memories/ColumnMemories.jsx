import React from 'react'
import { AspectRatio, Image, Text, VStack } from 'native-base'

export default function ColumnMemories({ memories }) {
  return (
    <VStack w="50%">
      {memories.map((memory) => (
        <VStack key={memory.id} w="100%" p={2}>
          <AspectRatio
            width="100%"
            ratio={{
              base: 3 / 4,
              md: 3 / 4
            }}
          >
            <Image
              rounded="lg"
              resizeMode="cover"
              alt={memory.title}
              source={{
                uri: memory.picture
              }}
            />
          </AspectRatio>

          <Text
            fontSize="lg"
            fontWeight="bold"
            mb={2}
            color="coolGray.800"
            w="100%"
          >
            {memory.title}
          </Text>
        </VStack>
      ))}
    </VStack>
  )
}
