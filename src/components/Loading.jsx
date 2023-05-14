import { Heading, HStack, Spinner, Stack } from 'native-base'
import React from 'react'

export default function Loading({ text = 'Loading' }) {
  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <HStack w="100%" space={2} justifyContent="center" alignItems="center">
        <Spinner accessibilityLabel={text} color="amber.500" size="lg" />
        <Heading fontSize="xl" color="amber.500">
          {text}
        </Heading>
      </HStack>
    </Stack>
  )
}
