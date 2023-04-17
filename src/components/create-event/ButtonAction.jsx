import React from 'react'
import { View, Text, Pressable, HStack, Icon } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function ButtonAction({ text, icon, onPress }) {
  return (
    <View width="100%" alignItems="center" mt="3" mb="3">
      <Pressable
        w="90%"
        rounded="md"
        py="2"
        px="3"
        borderWidth={1}
        borderColor="gray.800"
        onPress={onPress}
      >
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <Text fontSize="md" color="gray.800">
            {text}
          </Text>

          <Icon
            as={<MaterialCommunityIcons name={icon} />}
            size={6}
            fontWeight="bold"
            color="gray.600"
          />
        </HStack>
      </Pressable>
    </View>
  )
}
