import * as ImagePicker from 'expo-image-picker'
import {
  AspectRatio,
  FormControl,
  HStack,
  Heading,
  Image,
  Input,
  Pressable,
  ScrollView,
  Stack,
  TextArea,
  View
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

import { updateUser } from '../api/user'
import BottomNavigationBar from '../components/BottomNavigationBar'
import Error from '../components/Error'
import FormAction from '../components/FormAction'
import FormWrapper from '../components/edit-info/FormWrapper'
import {
  editInfoState,
  errorsEditInfoState
} from '../providers/edit-info-state'
import { userLoggedState } from '../providers/user-state'
import { uploadImage } from '../utilities/uploadImage'
import { editInfoSchema } from '../validations/edit-info-validations'

export default function EditInfoScreen({ navigation }) {
  const [userLogged] = useRecoilState(userLoggedState)
  const [editInfoData, setEditInfoData] = useRecoilState(editInfoState)
  const [errors, setErrors] = useRecoilState(errorsEditInfoState)

  const [userId] = useState(userLogged.ID)
  const [image, setImage] = useState(null)
  const [imageFileName, setImageFileName] = useState(null)
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')

  const updateUserMut = useMutation(async (values) => {
    const userUpdated = await updateUser(
      values.name,
      values.description,
      values.picture,
      values.userID
    )

    if (!userUpdated) {
      setErrors({
        error: true,
        message: 'Error al actualizar el usuario en la base de datos'
      })
    }
  })

  useEffect(() => {
    setEditInfoData({
      name: name,
      description: description
    })
  }, [setEditInfoData, name, description])

  const onChangeDescription = (text) => {
    setDescription(text)
    setEditInfoData({ ...editInfoData, description: text })
  }

  const onChangeName = (text) => {
    setName(text)
    setEditInfoData({ ...editInfoData, name: text })
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

  const validate = async (userData) => {
    try {
      await editInfoSchema.validate({
        name: userData.name,
        description: userData.description
      })

      setErrors({
        error: false,
        message: ''
      })
    } catch (err) {
      setErrors({
        error: true,
        message: err.errors[0]
      })
    }
  }

  const onSubmit = async () => {
    let response = 'https://dio-planner.s3.us-east-2.amazonaws.com/no-image.jpg'
    const uri = image
    const type = 'image/jpeg'
    const file = imageFileName || 'image.jpg'

    await validate(editInfoData)

    if (image && !errors.error) {
      response = await uploadImage(uri, type, file)
    }

    if (!errors.error) {
      updateUserMut.mutate({
        name: editInfoData.name,
        description: editInfoData.description,
        picture: response,
        userID: userId
      })

      navigation.push('Profile')
    } else {
      setErrors({
        error: true,
        message: 'Error al actualizar la información'
      })
    }
  }

  const onCancel = () => {
    setEditInfoData({})
    navigation.goBack()
  }

  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack w="100%" h="100%" px={4} pt={16} pb={0}>
        <ScrollView w="100%" h="100%" showsVerticalScrollIndicator={false}>
          <Heading size="md" color="black" mt={5} w="100%" textAlign="center">
            Edita tu información
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
                  placeholder="Soy una persona que..."
                  variant="outline"
                  rounded="md"
                  focusOutlineColor="coolGray.800"
                  onChangeText={onChangeDescription}
                />
              </FormControl>
            </AspectRatio>
          </HStack>

          <FormWrapper to="name" isRequired={true}>
            <Input
              w={{ base: '100%', md: '25%' }}
              color="gray.800"
              fontSize="md"
              placeholder="Nombre"
              onChangeText={onChangeName}
              variant="outline"
              rounded="md"
              py="2"
              px="3"
              focusOutlineColor="gray.800"
            />
          </FormWrapper>

          {errors.error && <Error error={errors.message} />}

          <View w="100%" alignItems="center" justifyContent="center" my="3">
            <HStack w="90%" justifyContent="space-between">
              <FormAction
                bg="amber.400"
                color="black"
                text="Actualizar"
                w="45%"
                onPress={onSubmit}
              />

              <FormAction
                bg="coolGray.800"
                color="white"
                text="Cancelar"
                w="45%"
                onPress={onCancel}
              />
            </HStack>
          </View>
        </ScrollView>
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
