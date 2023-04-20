import React from 'react'
import { HStack, VStack, Heading, Text } from 'native-base'
import { getCurrencyFormat } from '../utilities/getCurrencyFormat'

export default function Budget({ budget }) {
  return (
    <HStack w="100%" justifyContent="center" alignItems="center">
      <VStack
        w="90%"
        justifyContent="center"
        alignItems="center"
        borderWidth={1}
        borderColor="coolGray.600"
        bg="coolGray.100"
        shadow={2}
        rounded="lg"
        my={3}
        p={4}
      >
        <Heading w="100%" textAlign="left" color="black" size="md">
          Presupuesto
        </Heading>

        <Text fontSize="5xl" color="green.700" w="100%" textAlign="center">
          {getCurrencyFormat(budget)}
        </Text>
      </VStack>
    </HStack>
  )
}
