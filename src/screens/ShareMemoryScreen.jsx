import * as ImagePicker from 'expo-image-picker'
import { AspectRatio, Button, Image, Stack } from 'native-base'
import React, { useState } from 'react'
/* import { S3 } from 'aws-sdk'
import mime from 'mime-types' */
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '@env'
import BottomNavigationBar from '../components/BottomNavigationBar'

export default function ShareMemoryScreen({ navigation, route }) {
  const [image, setImage] = useState(null)

  const uploadImage = async (uri, type, name) => {
    console.log({ AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)

      const uri = result.assets[0].uri
      const type = 'image/jpeg'
      const name = result.assets[0].fileName || 'image.jpg'

      console.log({ uri, type, name })
      await uploadImage(uri, type, name)
    }
  }

  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack w="100%" h="100%" px={4} pt={16} pb={0}>
        <Button
          size="lg"
          rounded="full"
          shadow={2}
          colorScheme="coolGray"
          bg="coolGray.800"
          _text={{
            fontSize: 'lg',
            color: 'white',
            fontWeight: 'semibold'
          }}
          onPress={pickImage}
        >
          Agregar imagen
        </Button>

        {image && (
          <AspectRatio
            mt={4}
            ratio={{
              base: 3 / 4,
              md: 3 / 4
            }}
            height={{
              base: 200,
              md: 200
            }}
          >
            <Image
              rounded="lg"
              resizeMode="cover"
              alt="Imagen"
              source={{
                uri: image
              }}
            />
          </AspectRatio>
        )}
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
