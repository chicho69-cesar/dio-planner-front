import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '@env'
import { S3 } from 'aws-sdk'
import * as ImagePicker from 'expo-image-picker'
import { AspectRatio, Button, Image, Stack } from 'native-base'
import React, { useState } from 'react'
import BottomNavigationBar from '../components/BottomNavigationBar'

const s3 = new S3({
  region: 'us-east-2',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
})

export default function ShareMemoryScreen({ navigation, route }) {
  const [image, setImage] = useState(null)

  // TODO: Remember that "fileNameInBucket" is the name of the image that we need to save in db
  // NOTE: The structure of the link will be: https://dio-planner.s3.us-east-2.amazonaws.com/${fileNameInBucket}
  const uploadImage = async (uri, type, name) => {
    const response = await fetch(uri)
    const blob = await response.blob()
    const fileNameInBucket = `images/${Date.now().toString()}-${name}`

    const options = {
      Bucket: 'dio-planner',
      Key: fileNameInBucket,
      ContentType: type,
      Body: blob
    }

    s3.putObject(options, (error, data) => {
      if (error) {
        console.error(error)
      } else {
        console.log('Image uploaded successfully:', data)
      }
    })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)

      const uri = result.assets[0].uri
      const type = 'image/jpeg'
      const name = result.assets[0].fileName || 'image.jpg'

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
