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
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { getUser } from '../../api/user.js'
import { useAuth } from '../../hooks/useAuth.js'
import { userLoggedState } from '../../providers/user-state.js'

export default function ProfileInformation({ nOfEvents }) {
  const navigation = useNavigation()
  const { logout } = useAuth()

  const [userLogged] = useRecoilState(userLoggedState)
  const [userId] = useState(userLogged.ID)
  const [userInfo, setUserInfo] = useState({
    name: '',
    description: '',
    email: '',
    picture: 'https://dio-planner.s3.us-east-2.amazonaws.com/no-image.jpg'
  })

  const getUserFunc = async (ID) => {
    const response = await getUser(ID)

    if (response) {
      setUserInfo({
        name: response.name,
        description: response.description,
        email: response.email,
        picture: response.picture
      })
    }
  }

  useEffect(() => {
    getUserFunc(userId)
  }, [userId])

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
              alt={userInfo?.name}
              source={{
                uri: userInfo?.picture
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
            {userInfo?.name}
          </Text>

          <Text fontSize="sm" color="coolGray.900" isTruncated w="100%">
            {userInfo?.email ?? ''}
          </Text>

          <Text color="coolGray.700" fontSize="sm" w="100%">
            {userInfo?.description ?? ''}
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
