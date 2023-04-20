import React from 'react'
import { VStack, Text, HStack, Icon } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

export default function Opinion({ opinion }) {
  return (
    <VStack
      w="100%"
      justifyContent="space-between"
      bg="white"
      my={2}
      p={3}
      borderWidth={1}
      borderColor="coolGray.600"
      rounded="md"
    >
      <HStack w="100%" justifyContent="space-between">
        <Text fontSize="sm" color="coolGray.600" fontStyle="italic">
          {opinion.autor}
        </Text>

        <HStack justifyContent="center" space={1} alignItems="center">
          {[1, 2, 3, 4, 5].map((totalGrade) => (
            <Icon
              key={totalGrade}
              as={<MaterialIcons name="star-rate" />}
              size={4}
              color={totalGrade <= opinion.grade ? 'yellow.600' : 'black'}
              fontWeight="bold"
            />
          ))}
        </HStack>
      </HStack>

      <Text w="100%" fontSize="md" color="black">
        {opinion.opinion}
      </Text>
    </VStack>
  )
}
