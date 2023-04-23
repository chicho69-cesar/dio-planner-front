import React from 'react'
import {
  VStack,
  HStack,
  Box,
  Image,
  AspectRatio,
  Heading,
  Text
} from 'native-base'
import { getPickedDate } from '../../utilities/getTextDateES'
import CustomDivider from '../CustomDivider'
import FormAction from '../FormAction'

export default function Invitation({ event }) {
  const onHandleAccept = (id) => {}

  const onHandleReject = (id) => {}

  return (
    <VStack
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      my={3}
      bg="white"
      rounded="md"
      borderWidth={1}
      borderColor="coolGray.600"
    >
      <HStack w="100%" justifyContent="space-between" alignItems="center">
        <AspectRatio
          ratio={{
            base: 1 / 1,
            md: 1 / 1
          }}
          height={{
            base: 100,
            md: 100
          }}
        >
          <Image
            rounded="full"
            resizeMode="cover"
            alt={event.name}
            source={{
              uri: event.img
            }}
          />
        </AspectRatio>

        <Box w="65%" p={2} h="100%" borderRightRadius="lg">
          <Heading size="md" bold color="black" w="100%" isTruncated>
            {event.name}
          </Heading>

          <Text fontSize="sm" color="amber.500" mb={1} w="100%">
            {getPickedDate(event.date)}
          </Text>

          <Text noOfLines={4} color="black" fontSize="md" w="100%">
            {event.description}
          </Text>
        </Box>
      </HStack>

      <CustomDivider />

      <HStack w="100%" justifyContent="space-evenly" alignItems="center">
        <FormAction
          bg="amber.400"
          color="black"
          text="Aceptar"
          w="45%"
          onPress={() => onHandleAccept(event.id)}
        />

        <FormAction
          bg="coolGray.800"
          color="white"
          text="Rechazar"
          w="45%"
          onPress={() => onHandleReject(event.id)}
        />
      </HStack>
    </VStack>
  )
}
