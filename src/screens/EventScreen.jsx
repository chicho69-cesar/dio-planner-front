import { MaterialIcons } from '@expo/vector-icons'
import {
  HStack,
  Heading,
  Icon,
  Pressable,
  ScrollView,
  Stack,
  Text,
  VStack
} from 'native-base'
import React from 'react'
import { useRecoilState } from 'recoil'
import BottomNavigationBar from '../components/BottomNavigationBar'
import Countdown from '../components/Countdown'
import { selectedEventState } from '../providers/event-state'

const cards = [
  {
    id: 1,
    title: 'Lista de invitados',
    icon: 'supervised-user-circle',
    color: 'cards.100',
    route: 'Guests'
  },
  {
    id: 2,
    title: 'Lista de tareas',
    icon: 'add-task',
    color: 'cards.200',
    route: 'TodoList'
  },
  {
    id: 3,
    title: 'Compras',
    icon: 'add-shopping-cart',
    color: 'cards.300',
    route: 'Purchases'
  },
  {
    id: 4,
    title: 'Recuerdos',
    icon: 'insert-photo',
    color: 'cards.400',
    route: 'Memories'
  },
  {
    id: 5,
    title: 'Calificar evento',
    icon: 'star-border',
    color: 'cards.500',
    route: 'EventGrade'
  }
]

export default function EventScreen({ navigation, route }) {
  const [selectedEvent] = useRecoilState(selectedEventState)

  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack h="100%" w="100%" pt={16} pb={0}>
        <ScrollView
          w="100%"
          h="100%"
          bg="white"
          showsVerticalScrollIndicator={false}
        >
          <Heading color="black" size="md" mt={4} textAlign="center">
            Tiempo restante para el evento
          </Heading>

          <Countdown targetDate={selectedEvent.date} />

          <Heading color="black" size="md" mt={4} textAlign="center">
            Acciones de interés
          </Heading>

          <VStack
            w="100%"
            my={4}
            alignItems="center"
            justifyContent="center"
            space={4}
          >
            {cards.map((card) => (
              <Pressable
                w="90%"
                rounded="md"
                borderWidth={1}
                borderColor="coolGray.400"
                bg={card.color}
                p={4}
                key={card.id}
                onPress={() => navigation.navigate(card.route)}
              >
                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  w="100%"
                >
                  <HStack
                    space={2}
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Icon
                      as={<MaterialIcons name={card.icon} />}
                      size={8}
                      fontWeight="bold"
                      color="coolGray.800"
                    />

                    <Text color="coolGray.800" fontSize="md" fontWeight="bold">
                      {card.title}
                    </Text>
                  </HStack>

                  <Icon
                    as={<MaterialIcons name="chevron-right" />}
                    size={8}
                    fontWeight="bold"
                    color="coolGray.800"
                  />
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </ScrollView>
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
