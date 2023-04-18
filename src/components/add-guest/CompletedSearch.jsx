import React from 'react'
import {
  Heading,
  HStack,
  Image,
  AspectRatio,
  Pressable,
  Text
} from 'native-base'
import { useNavigation } from '@react-navigation/native'

export default function CompletedSearch({ results }) {
  const navigation = useNavigation()

  const invite = (id) => {
    console.log(id)
    navigation.navigate('Event')
  }

  return (
    <>
      <Heading
        size="md"
        color="coolGray.700"
        mt="4"
        w="100%"
        textAlign="center"
      >
        Personas encontradas
      </Heading>

      {results.map((result) => (
        <HStack
          w="100%"
          key={result.id}
          alignItems="center"
          justifyContent="space-between"
          rounded="md"
          space={2}
          my={2}
          p={2}
          borderWidth={1}
          borderColor="coolGray.400"
        >
          <HStack alignItems="center" justifyContent="space-between" space={2}>
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
                alt={result.name}
                source={{
                  uri: result.picture
                }}
              />
            </AspectRatio>

            <Heading size="sm" color="black" isTruncated>
              {result.name}
            </Heading>
          </HStack>

          <Pressable
            bg="coolGray.800"
            py={2}
            px={3}
            rounded="md"
            onPress={() => invite(result.id)}
          >
            <Text>Invitar</Text>
          </Pressable>
        </HStack>
      ))}
    </>
  )
}
