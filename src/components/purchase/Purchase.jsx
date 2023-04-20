import React from 'react'
import { HStack, VStack, Text } from 'native-base'
import { getCurrencyFormat } from '../../utilities/getCurrencyFormat'
import Action from '../Action'

export default function Purchase({ purchase, onEdit, onDelete }) {
  return (
    <HStack
      w="100%"
      justifyContent="space-between"
      bg="white"
      my={2}
      p={3}
      borderWidth={1}
      borderColor="coolGray.600"
      rounded="md"
    >
      <VStack w="72.5%" justifyContent="flex-start" alignItems="flex-start">
        <Text fontSize="md" color="green.700" w="100%" fontStyle="italic">
          {getCurrencyFormat(purchase.price)}
        </Text>

        <Text fontSize="sm" color="black" noOfLines={4}>
          {purchase.title}
        </Text>
      </VStack>

      <HStack w="25%" alignItems="center" justifyContent="space-between">
        <Action
          bg="amber.100"
          color="amber.600"
          icon="mode-edit"
          onPress={() => onEdit(purchase.id)}
        />

        <Action
          bg="red.100"
          color="red.900"
          icon="delete"
          onPress={() => onDelete(purchase.id)}
        />
      </HStack>
    </HStack>
  )
}
