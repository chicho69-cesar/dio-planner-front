import React from 'react'
import { HStack, Icon, Text } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

export default function EventGrade({ grade }) {
  return (
    <HStack w="100%" justifyContent="center" alignItems="center">
      <Text fontSize="7xl" fontWeight="bold" color="black">
        {grade}
      </Text>

      <Icon
        as={<MaterialIcons name="star-rate" />}
        size={8}
        color="yellow.600"
        fontWeight="bold"
      />
    </HStack>
  )
}
