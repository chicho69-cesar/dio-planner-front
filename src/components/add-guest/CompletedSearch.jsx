import { useNavigation } from '@react-navigation/native'
import {
  AspectRatio,
  HStack,
  Heading,
  Image,
  Pressable,
  Text
} from 'native-base'
import React from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

import { addGuest } from '../../api/guest'
import { selectedEventState } from '../../providers/event-state'
import Loading from '../Loading'

export default function CompletedSearch({ results }) {
  const navigation = useNavigation()
  const [selectedEvent] = useRecoilState(selectedEventState)

  const addGuestMut = useMutation(async (values) => {
    var response = await addGuest(values.userID, values.eventID, values.status)

    if (response) {
      console.log(response)
    } else {
      console.error('Error al invitar a la persona')
    }
  })

  const invite = (id) => {
    addGuestMut.mutate({
      userID: id,
      eventID: selectedEvent.id,
      status: 'Pendiente'
    })

    navigation.navigate('Event')
  }

  if (addGuestMut.isLoading) {
    return <Loading />
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
