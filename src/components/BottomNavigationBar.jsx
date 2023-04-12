import React from 'react'
import { HStack, Icon, Pressable, Text, VStack } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

export default function BottomNavigationBar({ navigation, route, active }) {
  return (
    <HStack
      w="100%"
      h="32"
      bg="coolGray.800"
      shadow={2}
      justifyContent="space-between"
    >
      <NavBarElement
        navigation={navigation}
        route={route}
        to="Home"
        active={active === 'Home'}
        text="Inicio"
        icon="home"
      />

      <NavBarElement
        navigation={navigation}
        route={route}
        to="Search"
        active={active === 'Search'}
        text="Buscar"
        icon="search"
      />

      <NavBarElement
        navigation={navigation}
        route={route}
        to="Chat"
        active={active === 'Chat'}
        text="Chats"
        icon="chat-bubble-outline"
      />

      <NavBarElement
        navigation={navigation}
        route={route}
        to="Profile"
        active={active === 'Profile'}
        text="Perfil"
        icon="person-outline"
      />
    </HStack>
  )
}

function NavBarElement({ navigation, route, to, active, text, icon }) {
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
