import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Column, Pressable, VStack, Image, Text } from 'native-base'
import { StyleSheet } from 'react-native'

export default function SearchResult({ item }) {
  const navigation = useNavigation()

  const navigateToResult = (id) => {
    console.log('Hola')
  }

  return (
    <Column w="47%" mx="1%" my={2} key={item.id}>
      <Pressable w="100%" onPress={() => navigateToResult(item.id)}>
        {({ isPressed }) => {
          return (
            <VStack
              rounded="lg"
              borderWidth={1}
              borderColor={isPressed ? 'gray.400' : 'black'}
            >
              <Image
                borderTopRadius="lg"
                style={styles.image}
                resizeMode="cover"
                alt={item.id.toString()}
                source={{
                  uri: item.img
                }}
              />

              <Text
                fontSize="lg"
                color="black"
                w="100%"
                textAlign="center"
                my={1}
                numberOfLines={2}
              >
                {item.name}
              </Text>
            </VStack>
          )
        }}
      </Pressable>
    </Column>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: '100%'
  }
})
