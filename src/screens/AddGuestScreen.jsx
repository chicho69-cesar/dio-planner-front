import React, { useState } from 'react'
import {
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  ScrollView,
  Stack,
  WarningOutlineIcon
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'

import BottomNavigationBar from '../components/BottomNavigationBar'
import BasicTitle from '../components/add-guest/BasicTitle'
import Searching from '../components/add-guest/Searching'
import CompletedSearch from '../components/add-guest/CompletedSearch'

const searchResults = [
  {
    id: 1,
    name: 'Hector Felipe',
    picture:
      'https://i.pinimg.com/originals/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg',
    status: 'Aceptada'
  },
  {
    id: 2,
    name: 'Luis Angel',
    picture:
      'https://i.pinimg.com/originals/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg',
    status: 'Pendiente'
  },
  {
    id: 3,
    name: 'Manuel Alejandro',
    picture:
      'https://i.pinimg.com/originals/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg',
    status: 'Aceptada'
  },
  {
    id: 4,
    name: 'Yulissa Thaily',
    picture:
      'https://i.pinimg.com/originals/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg',
    status: 'Pendiente'
  },
  {
    id: 5,
    name: 'Aranzazu Jimena',
    picture:
      'https://i.pinimg.com/originals/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg',
    status: 'Cancelada'
  }
]

export default function AddGuestScreen({ navigation, route }) {
  const [state, setState] = useState('basic') // basic | searching | completed
  const [search, setSearch] = useState('')
  const [results, setResults] = useState(searchResults)

  const onSearchHandle = (text) => {
    setSearch(text)
  }

  const handleSearch = () => {
    setState('searching')

    setTimeout(() => {
      setState('completed')
    }, 1000)
  }

  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack w="100%" h="100%" px={4} pt={16} pb={0}>
        <ScrollView w="100%" h="100%" showsVerticalScrollIndicator={false}>
          <HStack
            w="100%"
            mt={4}
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControl
              width="80%"
              alignItems="center"
              mt="3"
              mb="3"
              isRequired
            >
              <Input
                w={{ base: '100%', md: '25%' }}
                color="gray.800"
                fontSize="md"
                placeholder="John..."
                variant="outline"
                rounded="md"
                py="2"
                px="3"
                focusOutlineColor="gray.800"
                onFocus={() => setState('basic')}
                onChangeText={onSearchHandle}
              />

              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Escribe un nombre
              </FormControl.ErrorMessage>
            </FormControl>

            <Button
              w="12"
              h="12"
              mr={1}
              rounded="full"
              shadow={2}
              colorScheme="amber"
              bg="amber.400"
              isLoading={state === 'searching'}
              onPress={handleSearch}
            >
              <Icon
                as={<Ionicons name="ios-search" />}
                size={6}
                color="coolGray.800"
                fontWeight="bold"
              />
            </Button>
          </HStack>

          {state === 'basic' && <BasicTitle />}
          {state === 'searching' && <Searching />}
          {state === 'completed' && <CompletedSearch results={results} />}
        </ScrollView>
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
