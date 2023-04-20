import React from 'react'
import { HStack, VStack, Text } from 'native-base'
import { getPickedDate } from '../../utilities/getTextDateES.js'
import Action from '../Action.jsx'

export default function Todo({ todo, onComplete, onEdit, onDelete }) {
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
      <VStack w="65%" justifyContent="flex-start" alignItems="flex-start">
        <Text fontSize="xs" color="amber.500">
          {getPickedDate(todo.date)}
        </Text>

        <Text
          fontSize="sm"
          color="black"
          noOfLines={4}
          strikeThrough={todo.complete}
        >
          {todo.text}
        </Text>
      </VStack>

      <HStack w="32.5%" alignItems="center" justifyContent="space-between">
        <Action
          bg="green.100"
          color="green.900"
          icon={todo.complete ? 'check-box' : 'check-box-outline-blank'}
          onPress={() => onComplete(todo.id)}
        />

        <Action
          bg="amber.100"
          color="amber.600"
          icon="mode-edit"
          onPress={() => onEdit(todo.id)}
        />

        <Action
          bg="red.100"
          color="red.900"
          icon="delete"
          onPress={() => onDelete(todo.id)}
        />
      </HStack>
    </HStack>
  )
}
