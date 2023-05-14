import * as WebBrowser from 'expo-web-browser'
import { Button, HStack, Text } from 'native-base'
import React from 'react'
import { Image, StyleSheet } from 'react-native'

WebBrowser.maybeCompleteAuthSession()

export default function GoogleLogin({ onPress }) {
  return (
    <Button
      w="45%"
      bg="white"
      variant="subtle"
      shadow={1}
      colorScheme="light"
      borderWidth={1}
      rounded="lg"
      borderColor="gray.100"
      _text={{ fontSize: 'md', fontWeight: 'semibold', color: 'black' }}
      onPress={onPress}
    >
      <HStack w="100%" space={1} justifyContent="center" alignItems="center">
        <Image
          source={require('../../../assets/svg/google.png')}
          style={styles.image}
        />

        <Text fontSize="md" fontWeight="semibold" color="black">
          Google
        </Text>
      </HStack>
    </Button>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 25,
    width: 25
  }
})
