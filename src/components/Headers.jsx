import React from 'react'
import { HStack, Text, Pressable, Icon, Input, Button } from 'native-base'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'

export function HomeHeader({ navigation, route }) {
  return (
    <HStack w="100%" justifyContent="space-between" alignItems="center">
      <Text fontSize="lg" fontWeight="bold" color="black">
        Próximos eventos
      </Text>

      <Pressable onPress={() => navigation.navigate('Search')}>
        <Icon
          as={<MaterialIcons name="search" />}
          size={6}
          mr="2"
          color="gray.600"
          fontWeight="bold"
        />
      </Pressable>
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
