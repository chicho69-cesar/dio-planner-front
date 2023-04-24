import React from 'react'
import { VStack, HStack, Box, Skeleton } from 'native-base'
import CustomDivider from '../CustomDivider'

export default function LoadingInvitations() {
  return (
    <VStack
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      mb={4}
      bg="white"
      rounded="md"
      borderWidth={1}
      borderColor="coolGray.600"
    >
      <HStack w="100%" justifyContent="space-between" alignItems="center">
        <Skeleton w={100} h={100} rounded="full" startColor="coolGray.800" />

        <Box w="65%" p={2} h="100%" borderRightRadius="lg">
          <Skeleton startColor="coolGray.600" rounded="md" mb={2} />
          <Skeleton h="5" rounded="full" startColor="amber.400" mb={8} />
          <Skeleton.Text startColor="coolGray.600" />
        </Box>
      </HStack>

      <CustomDivider />

      <HStack w="100%" justifyContent="space-evenly" alignItems="center">
        <Skeleton w="45%" h={8} startColor="amber.400" rounded="md" />
        <Skeleton w="45%" h={8} startColor="coolGray.800" rounded="md" />
      </HStack>
    </VStack>
  )
}
