import React from 'react'
import { HStack, Icon, Pressable, Text, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

export default function BottomNavigationBar({ active }) {
  return (
    <HStack
      w="100%"
      h="32"
      bg="coolGray.800"
      shadow={2}
      justifyContent="space-between"
    >
      <NavBarElement
        to="Home"
        active={active === 'Home'}
        text="Inicio"
        icon="home"
      />

      <NavBarElement
        to="Search"
        active={active === 'Search'}
        text="Buscar"
        icon="search"
      />

      <NavBarElement
        to="Chats"
        active={active === 'Chats'}
        text="Chats"
        icon="chat-bubble-outline"
      />

      <NavBarElement
        to="Profile"
        active={active === 'Profile'}
        text="Perfil"
        icon="person-outline"
      />
    </HStack>
  )
}

function NavBarElement({ to, active, text, icon }) {
  const navigation = useNavigation()

  return (
    <Pressable onPress={() => navigation.navigate(to)}>
      <VStack w="20" h="16" alignItems="center" justifyContent="center">
        <Icon
          as={<MaterialIcons name={icon} />}
          size={7}
          mr="2"
          fontWeight="bold"
          color={active ? 'amber.400' : 'white'}
        />

        <Text
          fontSize="xs"
          color="white"
          rounded="lg"
          px={2.5}
          bg={active ? 'amber.400:alpha.70' : 'coolGray.800'}
        >
          {text}
        </Text>
      </VStack>
    </Pressable>
  )
}
