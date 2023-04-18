import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Pressable,
  Box,
  HStack,
  AspectRatio,
  Image,
  Heading,
  Text
} from 'native-base'
import { useRecoilState } from 'recoil'
import { getPickedDate } from '../utilities/getTextDateES'
import { selectedEventState } from '../providers/event-state'

export default function Event({ item }) {
  const navigation = useNavigation()
  const [, setSelectedEvent] = useRecoilState(selectedEventState)

  const navigateToEvent = () => {
    setSelectedEvent({ ...item })
    navigation.navigate('Event')
  }

  return (
    <Pressable key={item.id} onPress={() => navigateToEvent()}>
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
                  {getPickedDate(item.date)}
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
