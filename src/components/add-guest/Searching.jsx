import React from 'react'
import { HStack, Spinner } from 'native-base'

export default function Searching() {
  return (
    <HStack w="100%" h="96" mt="4" justifyContent="center" alignItems="center">
      <Spinner size="lg" color="amber.400" />
    </HStack>
  )
}
