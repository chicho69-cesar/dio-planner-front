import React from 'react'
import { HStack, Text, Icon, Input, Button } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

export function HomeHeader({ navigation, route }) {
  return (
    <HStack w="100%" justifyContent="space-between" alignItems="center">
      <Text fontSize="lg" fontWeight="bold" color="black">
        Próximos eventos
      </Text>

      <HeaderLogo />
    </HStack>
  )
}

export function SearchHeader({ navigation, route }) {
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
        onChangeText={(text) => {}}
      />

      <Button
        size="lg"
        rounded="full"
        shadow={2}
        colorScheme="amber"
        bg="amber.600"
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
