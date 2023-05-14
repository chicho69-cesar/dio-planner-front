import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {
  AspectRatio,
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  Pressable,
  Text,
  VStack
} from 'native-base'
import React from 'react'

import { useAuth } from '../../hooks/useAuth.js'

export default function ProfileInformation({ nOfEvents }) {
  const navigation = useNavigation()
  const { user, logout } = useAuth()

  return (
    <Box w="100%">
      <HStack w="100%" px={1} pt={3} space={3} justifyContent="space-between">
        <VStack justifyContent="center" alignItems="center" w="30%">
          <AspectRatio
            ratio={{
              base: 1 / 1,
              md: 1 / 1
            }}
            height={{
              base: 100,
              md: 100
            }}
          >
            <Image
              rounded="full"
              resizeMode="cover"
              alt={user?.name}
              source={{
                uri: user?.picture
              }}
            />
          </AspectRatio>

          <Link onPress={() => navigation.navigate('Invitations')} mt={3}>
            <Box
              px={2}
              py={1}
              bg="coolGray.200"
              rounded="md"
              _text={{
                fontSize: 'sm',
                color: 'coolGray.800',
                fontWeight: 'medium'
              }}
            >
              Invitaciones
            </Box>
          </Link>
        </VStack>

        <VStack justifyContent="center" alignItems="flex-start" w="60%">
          <Text fontSize="lg" fontWeight="bold" color="black" w="100%">
            {user?.name}
          </Text>

          <Text fontSize="sm" color="coolGray.900" isTruncated w="100%">
            {user?.email ?? ''}
          </Text>

          <Text color="coolGray.700" fontSize="sm" w="100%">
            {user?.description ?? ''}
          </Text>

          <HStack
            mt={2}
            justifyContent="space-between"
            alignContent="center"
            w="100%"
          >
            <Text color="black" fontSize="lg">
              {nOfEvents} eventos
            </Text>

            <Pressable
              bg="coolGray.200"
              p={1.5}
              rounded="full"
              onPress={() => navigation.navigate('EditInfo')}
            >
              <Icon
                as={<MaterialCommunityIcons name="pencil-outline" />}
                size={6}
                fontWeight="bold"
                color="coolGray.700"
              />
            </Pressable>
          </HStack>

          <Pressable
            w="100%"
            mt={4}
            bg="red.700"
            py={2}
            px={6}
            rounded="lg"
            onPress={() => {
              logout()
              navigation.navigate('Login')
            }}
          >
            <HStack w="100%" justifyContent="space-between" alignItems="center">
              <Icon
                as={<MaterialCommunityIcons name="power" />}
                size={6}
                fontWeight="bold"
                color="white"
              />

              <Text fontSize="lg" color="white" fontWeight="bold">
                Logout
              </Text>
            </HStack>
          </Pressable>
        </VStack>
      </HStack>

      <Heading color="coolGray.900" size="md" mt={3}>
        Mis eventos
      </Heading>
    </Box>
  )
}
