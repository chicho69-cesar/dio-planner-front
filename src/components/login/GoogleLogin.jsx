import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Button, HStack, Text } from 'native-base'

export default function GoogleLogin() {
  const googleLogin = () => {
    console.log('Login con Google')
  }

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
      onPress={googleLogin}
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
