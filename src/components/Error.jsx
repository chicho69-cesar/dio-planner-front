import { HStack, Text } from 'native-base'
import React from 'react'

export default function Error({ error }) {
  return (
    <HStack w="100%" justifyContent="center">
      <Text color="red.700" fontSize="md">
        {error}
      </Text>
    </HStack>
  )
}
