import React from 'react'
import {
  Pressable,
  Box,
  HStack,
  AspectRatio,
  Image,
  Heading,
  Text
} from 'native-base'

export default function Event({ navigation, route, item }) {
  return (
    <Pressable key={item.id} onPress={() => console.log('Hola')}>
      {({ isPressed }) => {
        return (
          <Box
            my={4}
            rounded="lg"
            borderWidth={1}
            borderColor={isPressed ? 'gray.400' : 'black'}
          >
            <HStack justifyContent="space-between">
              <AspectRatio
                ratio={{
                  base: 3 / 4,
                  md: 3 / 4
                }}
                height={{
                  base: 200,
                  md: 200
                }}
              >
                <Image
                  borderLeftRadius="lg"
                  resizeMode="cover"
                  alt={item.name}
                  source={{
                    uri: item.img
                  }}
                />
              </AspectRatio>

              <Box w="55%" p={2} h="100%" borderRightRadius="lg">
                <Heading size="md" bold color="black" isTruncated>
                  {item.name}
                </Heading>

                <Text fontSize="sm" color="amber.500" mb={5}>
                  {item.date}
                </Text>

                <Text noOfLines={4} color="black" fontSize="md">
                  {item.description}
                </Text>
              </Box>
            </HStack>
          </Box>
        )
      }}
    </Pressable>
  )
}
