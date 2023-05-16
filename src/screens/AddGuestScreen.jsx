import { Ionicons } from '@expo/vector-icons'
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
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'

import { searchTheGuests } from '../api/guest'
import BottomNavigationBar from '../components/BottomNavigationBar'
import BasicTitle from '../components/add-guest/BasicTitle'
import CompletedSearch from '../components/add-guest/CompletedSearch'
import Searching from '../components/add-guest/Searching'
import { userLoggedState } from '../providers/user-state'

export default function AddGuestScreen({ navigation, route }) {
  const [userLogged] = useRecoilState(userLoggedState)

  const [userId] = useState(userLogged.ID)
  const [state, setState] = useState('basic') // basic | searching | completed
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  const doSearch = async (name) => {
    const response = await searchTheGuests(name)

    if (response) {
      console.log(response)
      setResults([
        ...response.filter((result) => {
          if (result.id === userId) {
            return null
          }

          return {
            id: result.id,
            name: result.name,
            description: result.description,
            picture: result.picture
          }
        })
      ])

      setState('completed')
    } else {
      console.error('ERROR AL BUSCAR')
    }
  }

  const onSearchHandle = (text) => {
    setSearch(text)
  }

  const handleSearch = async () => {
    setState('searching')
    await doSearch(search)
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
