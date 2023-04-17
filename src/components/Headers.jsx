import React, { useState } from 'react'
import { HStack, Text, Icon, Input, Button } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

export function HomeHeader() {
  return (
    <HStack w="100%" justifyContent="space-between" alignItems="center">
      <Text fontSize="lg" fontWeight="bold" color="black">
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
        bg="amber.600"
        onPress={handleSearch}
      >
        <Icon
          as={<Ionicons name="ios-search" />}
          size={5}
          color="gray.900"
          fontWeight="bold"
        />
      </Button>
    </HStack>
  )
}

export function ProfileHeader() {
  return (
    <HStack w="100%" justifyContent="space-between" alignItems="center">
      <Text fontSize="lg" fontWeight="bold" color="black">
        Mi perfil publico
      </Text>

      <HeaderLogo />
    </HStack>
  )
}

export function CreateEventHeader() {
  return (
    <HStack w="100%" justifyContent="space-between" alignItems="center">
      <Text fontSize="lg" fontWeight="bold" color="black">
        Crear evento
      </Text>

      <HeaderLogo />
    </HStack>
  )
}

function HeaderLogo() {
  return (
    <Text
      fontSize="2xl"
      paddingX="2"
      color="black"
      fontStyle="italic"
      fontWeight="bold"
    >
      D
    </Text>
  )
}
