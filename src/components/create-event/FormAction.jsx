import React from 'react'
import { Box, Pressable, Text } from 'native-base'

export default function FormAction({ bg, color, text, w, onPress }) {
  return (
    <Pressable w={w} onPress={onPress}>
      {({ isPressed }) => {
        return (
          <Box
            w="100%"
            py="2"
            px="3"
            shadow={isPressed ? 0 : 2}
            bg={bg}
            rounded="md"
          >
            <Text
              w="100%"
              textAlign="center"
              fontSize="md"
              color={color}
              fontWeight="bold"
            >
              {text}
            </Text>
          </Box>
        )
      }}
    </Pressable>
  )
}
