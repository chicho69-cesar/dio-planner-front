import * as ImagePicker from 'expo-image-picker'
import {
  AspectRatio,
  Button,
  FormControl,
  HStack,
  Heading,
  Image,
  Pressable,
  Stack,
  TextArea,
  View
} from 'native-base'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

import { shareMemory as shareMemoryApi } from '../api/memory'
import BottomNavigationBar from '../components/BottomNavigationBar'
import { selectedEventState } from '../providers/event-state'
import { uploadImage } from '../utilities/uploadImage'

export default function ShareMemoryScreen({ navigation, route }) {
  const [selectedEvent] = useRecoilState(selectedEventState)

  const [image, setImage] = useState(null)
  const [imageFileName, setImageFileName] = useState(null)
  const [description, setDescription] = useState('')
  const [errorUpload, setErrorUpload] = useState(false)
  const [isUpload, setIsUpload] = useState(false)

  const shareMemoryMut = useMutation(async (values) => {
    const memory = await shareMemoryApi(
      values.title,
      values.picture,
      values.eventID
    )

    if (memory) {
      setErrorUpload(false)
    } else {
      setErrorUpload(true)
    }
  })

  const onChangeDescription = (text) => {
    setDescription(text)
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setImageFileName(result.assets[0].fileName)
    }
  }

  const shareMemory = async () => {
    if (!image && description.length === 0) {
      return
    }

    const uri = image
    const type = 'image/jpeg'
    const name = imageFileName || 'image.jpg'

    const response = await uploadImage(uri, type, name)
    setIsUpload(true)

    if (response) {
      shareMemoryMut.mutate({
        title: description,
        picture: response,
        eventID: selectedEvent.id
      })
    } else {
      setErrorUpload(true)
    }
  }

  const goBack = () => {
    navigation.navigate('Event')
  }

  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack w="100%" h="100%" px={4} pt={16} pb={0}>
        <Heading size="md" color="black" mt={5} w="100%" textAlign="center">
          Comparte un recuerdo
        </Heading>

        <HStack
          w="100%"
          my={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <AspectRatio
            w="48%"
            ratio={{
              base: 3 / 4,
              md: 3 / 4
            }}
          >
            {image ? (
              <Image
                w="100%"
                h="100%"
                rounded="lg"
                resizeMode="cover"
                alt="Imagen"
                source={{
                  uri: image
                }}
              />
            ) : (
              <Pressable w="100%" h="100%" onPress={pickImage}>
                <View
                  w="100%"
                  h="100%"
                  p={2}
                  bg="white"
                  borderWidth={3}
                  borderColor="coolGray.800"
                  borderStyle="dotted"
                  rounded="md"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Heading size="sm" color="green.500" textAlign="center">
                    Selecciona una imagen
                  </Heading>
                </View>
              </Pressable>
            )}
          </AspectRatio>

          <AspectRatio
            w="48%"
            ratio={{
              base: 3 / 4,
              md: 3 / 4
            }}
          >
            <FormControl w="100%" h="100%">
              <TextArea
                w="100%"
                h="100%"
                py="2"
                px="3"
                bg="white"
                color="coolGray.800"
                fontSize="md"
                placeholder="El evento estuvo..."
                variant="outline"
                rounded="md"
                focusOutlineColor="coolGray.800"
                onChangeText={onChangeDescription}
              />
            </FormControl>
          </AspectRatio>
        </HStack>

        {!isUpload ? (
          <></>
        ) : errorUpload ? (
          <Heading size="sm" color="red.500" mt={5} w="100%" textAlign="center">
            Error al subir la imagen
          </Heading>
        ) : (
          <Heading
            size="sm"
            color="green.500"
            mt={5}
            w="100%"
            textAlign="center"
          >
            Recuerdo compartido con éxito
          </Heading>
        )}

        <Button
          w="100%"
          py={2}
          px={4}
          my={2}
          textAlign="center"
          size="md"
          bg={isUpload ? 'red.700' : 'coolGray.800'}
          rounded="2xl"
          _text={{
            fontSize: 'md',
            fontWeight: 'semibold',
            color: 'white'
          }}
          onPress={() => {
            isUpload ? goBack() : shareMemory()
          }}
        >
          {isUpload ? 'Volver' : 'Agregar recuerdo'}
        </Button>
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
