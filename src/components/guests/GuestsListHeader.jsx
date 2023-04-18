import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Stack, Pressable, HStack, Heading, Icon, Text } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

export default function GuestsListHeader() {
  const navigation = useNavigation()

  return (
    <Stack w="100%" alignItems="center" justifyContent="center">
      <Pressable
        w="90%"
        onPress={() => navigation.navigate('AddGuest')}
        rounded="md"
        bg="amber.400"
        mt={4}
        py="2"
        px="3"
        borderWidth={1}
        borderColor="gray.800"
      >
        <HStack w="100%" alignItems="center" justifyContent="space-between">
          <Text fontSize="lg" fontWeight="bold" color="coolGray.800">
            Agregar invitado
          </Text>

          <Icon
            as={<MaterialIcons name="add" />}
            size={8}
            fontWeight="bold"
            color="coolGray.800"
          />
        </HStack>
      </Pressable>

      <Heading size="md" color="black" mt={5} w="100%" textAlign="center">
        Lista de invitados
      </Heading>
    </Stack>
  )
}
