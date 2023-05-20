import {
  HStack,
  Heading,
  ScrollView,
  Spinner,
  Stack,
  Text,
  View
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { getAllMemories } from '../api/memory'
import BottomNavigationBar from '../components/BottomNavigationBar'
import ButtonAction from '../components/ButtonAction'
import ColumnMemories from '../components/memories/ColumnMemories'
import { selectedEventState } from '../providers/event-state'

export default function MemoriesScreen({ navigation }) {
  const [selectedEvent] = useRecoilState(selectedEventState)

  const [memories, setMemories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMemoriesFunc = async (ID) => {
    const response = await getAllMemories(ID)

    if (response) {
      setMemories([
        ...response.map((memory) => {
          return {
            id: memory.id,
            title: memory.title,
            picture: memory.picture,
            eventID: memory.eventID
          }
        })
      ])

      setIsLoading(false)
    }
  }

  useEffect(() => {
    getMemoriesFunc(selectedEvent.id)
  }, [selectedEvent])

  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack w="100%" h="100%" pt={16} pb={0}>
        <ScrollView w="100%" h="100%" showsVerticalScrollIndicator={false}>
          <Heading
            w="100%"
            textAlign="center"
            fontSize="xl"
            my={4}
            px={2}
            color="black"
          >
            Los recuerdos de{' '}
            <Text fontStyle="italic">{selectedEvent.name}</Text>
          </Heading>

          <HStack w="100%" justifyContent="center" alignItems="flex-start">
            {isLoading ? (
              <View w="100%" h="96" justifyContent="center">
                <Spinner size="lg" color="amber.400" />
              </View>
            ) : memories.length === 0 ? (
              <Heading fontSize="2xl" color="black" textAlign="center" mt={12}>
                No hay recuerdos en {selectedEvent.name}
              </Heading>
            ) : (
              <>
                <ColumnMemories
                  memories={memories.filter((_, index) => index % 2 === 0)}
                />

                <ColumnMemories
                  memories={memories.filter((_, index) => index % 2 !== 0)}
                />
              </>
            )}
          </HStack>

          <ButtonAction
            text="Comparte un recuerdo"
            icon="share-variant"
            onPress={() => navigation.navigate('ShareMemory')}
          />
        </ScrollView>
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
