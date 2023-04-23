import React, { useState } from 'react'
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
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function ProfileInformation({ nOfEvents }) {
  const navigation = useNavigation()

  const [profileInfo] = useState({
    id: '111',
    name: 'Cesar Villalobos Olmos',
    email: 'cesarvillalobosolmos.01@gmail.com',
    description:
      'Officia minim consequat officia do enim exercitation excepteur in incididunt incididunt pariatur ut ea velit.',
    picture:
      'https://i.pinimg.com/originals/2c/4c/67/2c4c67f144c8ed1600be38d06d8d1765.jpg'
  })

  return (
    <Box w="100%">
      <HStack w="100%" px={1} pt={3} space={3} justifyContent="space-between">
        <VStack justifyContent="center" alignItems="center">
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
              alt={profileInfo.name}
              source={{
                uri: profileInfo.picture
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

        <VStack justifyContent="center" alignItems="flex-start">
          <Text fontSize="lg" fontWeight="bold" color="black">
            {profileInfo.name}
          </Text>

          <Text fontSize="sm" color="coolGray.900" isTruncated>
            {profileInfo.email}
          </Text>

          <Text numberOfLines={3} color="coolGray.700" fontSize="sm" w="32%">
            {profileInfo.description}
          </Text>

          <HStack
            mt={2}
            justifyContent="space-between"
            alignContent="center"
            w="30%"
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
        </VStack>
      </HStack>

      <Heading color="coolGray.900" size="md" mt={3}>
        Mis eventos
      </Heading>
    </Box>
  )
}
