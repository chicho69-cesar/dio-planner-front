import React, { useEffect, useState } from 'react'
import {
  Heading,
  HStack,
  ScrollView,
  Spinner,
  Stack,
  Text,
  View
} from 'native-base'
import { useRecoilState } from 'recoil'
import { selectedEventState } from '../providers/event-state'
import BottomNavigationBar from '../components/BottomNavigationBar'
import ColumnMemories from '../components/memories/ColumnMemories'
import ButtonAction from '../components/ButtonAction'

const xd = [
  {
    id: 1,
    title: 'La piscina estaba espectacular',
    picture:
      'https://i.pinimg.com/564x/91/3c/c2/913cc25e601902dc6974731291bb5ed7.jpg'
  },
  {
    id: 2,
    title: 'Vaya noche jajaja',
    picture:
      'https://i.pinimg.com/564x/5e/4f/30/5e4f300d93aaa6b1035486028bae7881.jpg'
  },
  {
    id: 3,
    title: 'Cuando jugamos con los vasos',
    picture:
      'https://i.pinimg.com/564x/a7/8d/f9/a78df92cb495ea82cf38a8fbabf2a240.jpg'
  },
  {
    id: 4,
    title: 'La decoración es la mejor',
    picture:
      'https://i.pinimg.com/564x/a3/9a/0b/a39a0b8273026a260d0c0ac3e515dae1.jpg'
  },
  {
    id: 5,
    title: 'Los shotsssss',
    picture:
      'https://i.pinimg.com/564x/61/9c/4a/619c4ae2140d45123a6a907a631ee675.jpg'
  },
  {
    id: 6,
    title: 'Qué onda con la cerveza en la carretilla',
    picture:
      'https://i.pinimg.com/564x/97/73/20/977320281ce7b912b36b5bea7d71298b.jpg'
  }
]

export default function MemoriesScreen({ navigation, route }) {
  const [selectedEvent] = useRecoilState(selectedEventState)
  const [memories, setMemories] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setMemories([...xd])
    }, 3000)
  }, [])

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
            {memories.length === 0 ? (
              <View w="100%" h="96" justifyContent="center">
                <Spinner size="lg" color="amber.400" />
              </View>
            ) : (
              <>
                <ColumnMemories
                  mems={memories.filter((_, index) => index % 2 === 0)}
                />

                <ColumnMemories
                  mems={memories.filter((_, index) => index % 2 !== 0)}
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
