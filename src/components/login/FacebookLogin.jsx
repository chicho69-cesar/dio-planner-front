import * as WebBrowser from 'expo-web-browser'
import { Button, HStack, Text } from 'native-base'
import React from 'react'
import { Image, StyleSheet } from 'react-native'

WebBrowser.maybeCompleteAuthSession()

export default function FacebookLogin({ onPress }) {
  return (
    <Button
      w="45%"
      bg="facebook.100"
      variant="subtle"
      shadow={1}
      borderWidth={0}
      rounded="lg"
      colorScheme="darkBlue"
      _text={{ fontSize: 'md', fontWeight: 'semibold', color: 'white' }}
      onPress={onPress}
    >
      <HStack w="100%" space={1} justifyContent="center" alignItems="center">
        <Image
          source={require('../../../assets/svg/facebook.png')}
          style={styles.image}
        />

        <Text fontSize="md" fontWeight="semibold" color="white">
          Facebook
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
