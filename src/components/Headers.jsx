import React, { useState } from 'react'
import {
  HStack,
  Text,
  Icon,
  Input,
  Button,
  AspectRatio,
  Image
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { selectedEventState } from '../providers/event-state'
import { useRecoilState } from 'recoil'

export function HomeHeader() {
  return (
    <HStack w="100%" justifyContent="space-between" alignItems="center">
      <Text fontSize="lg" fontWeight="bold" color="white">
        Próximos eventos
      </Text>

      <HeaderLogo />
    </HStack>
  )
}

export function SearchHeader() {
  const [textSearch, setTextSearch] = useState('')

  const handleWrite = (text) => {
    setTextSearch(text)
  }

  const handleSearch = () => {
    console.log(textSearch)
  }

  return (
    <HStack w="100%" justifyContent="space-between" alignItems="center">
      <Input
        w="80%"
        h="9"
        color="coolGray.800"
        fontSize="md"
        placeholder="Buscar evento"
        borderWidth={0}
        borderRadius="full"
        size="sm"
        focusOutlineColor="coolGray.800"
        bg="white"
        _focus={{ bg: 'coolGray.100' }}
        onChangeText={handleWrite}
      />

      <Button
        size="lg"
        rounded="full"
        shadow={2}
        colorScheme="amber"
        bg="amber.400"
        onPress={handleSearch}
      >
        <Icon
          as={<Ionicons name="ios-search" />}
          size={5}
          color="coolGray.800"
          fontWeight="bold"
        />
      </Button>
    </HStack>
  )
}

export function ProfileHeader() {
  return (
    <HStack w="100%" justifyContent="space-between" alignItems="center">
      <Text fontSize="lg" fontWeight="bold" color="white">
        Mi perfil publico
      </Text>

      <HeaderLogo />
    </HStack>
  )
}

export function CreateEventHeader() {
  return (
    <HStack w="100%" justifyContent="space-between" alignItems="center">
      <Text fontSize="lg" fontWeight="bold" color="white">
        Crear evento
      </Text>

      <HeaderLogo />
    </HStack>
  )
}

export function EventHeader() {
  const [selectedEvent] = useRecoilState(selectedEventState)

  return (
    <HStack w="100%" justifyContent="flex-start" space={3} alignItems="center">
      <AspectRatio
        ratio={{
          base: 1 / 1,
          md: 1 / 1
        }}
        height={{
          base: 60,
          md: 60
        }}
      >
        <Image
          rounded="full"
          resizeMode="cover"
          alt={selectedEvent.name}
          source={{
            uri: selectedEvent.img
          }}
        />
      </AspectRatio>

      <Text fontSize="xl" color="white" fontWeight="bold" isTruncated>
        {selectedEvent.name}
      </Text>
    </HStack>
  )
}

function HeaderLogo() {
  return (
    <Text
      fontSize="2xl"
      paddingX="2"
      color="white"
      fontStyle="italic"
      fontWeight="bold"
    >
      D
    </Text>
  )
}
