import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Fab, Icon } from 'native-base'
import { AntDesign } from '@expo/vector-icons'

export function FABCreate() {
  const navigation = useNavigation()

  return (
    <Fab
      renderInPortal={false}
      shadow={2}
      right={5}
      bottom={70}
      size="16"
      colorScheme="amber"
      bg="amber.400"
      icon={
        <Icon
          as={<AntDesign name="plus" />}
          size={8}
          fontWeight="bold"
          color="black"
        />
      }
      onPress={() => navigation.navigate('CreateEvent')}
    />
  )
}
