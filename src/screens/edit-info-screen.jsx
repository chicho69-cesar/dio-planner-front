import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { updateUser } from '../api/user'
import FormWrapper from '../components/edit-info/form-wrapper'
import BottomNavigationBar from '../components/shared/bottom-navigation-bar'
import Error from '../components/shared/error'
import FormAction from '../components/shared/form-action'
import { useEditInfoStore, useErrorsEditInfoStore } from '../providers/edit-info-state'
import { useUserLoggedStore } from '../providers/user-state'
import { uploadImage } from '../utils/upload-image'
import { editInfoSchema } from '../validations/edit-info-validations'

export default function EditInfoScreen({ navigation }) {
  const userLogged = useUserLoggedStore((state) => state.userLogged)
  const editInfoData = useEditInfoStore((state) => state.editInfo)
  const setEditInfoData = useEditInfoStore((state) => state.setEditInfo)
  const errors = useErrorsEditInfoStore((state) => state.errorsEditInfo)
  const setErrors = useErrorsEditInfoStore((state) => state.setErrorsEditInfo)

  const [userId] = useState(userLogged.ID)
  const [image, setImage] = useState(null)
  const [imageFileName, setImageFileName] = useState(null)
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')

  const updateUserMut = useMutation({
    mutationFn: async (values) => {
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
    }
  })

  useEffect(() => {
    setEditInfoData({
      name: name,
      description: description
    })
  }, [name, description])

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
      setErrors({ error: false, message: '' })
    } catch (err) {
      setErrors({ error: true, message: err.errors[0] })
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
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Edita tu información</Text>

          <View style={styles.imageContainer}>
            {image ? (
              <Image
                style={styles.image}
                source={{ uri: image }}
                alt="Imagen de perfil"
              />
            ) : (
              <Pressable style={styles.imagePlaceholder} onPress={pickImage}>
                <MaterialCommunityIcons name="image-plus" size={48} color="#10b981" />
                <Text style={styles.placeholderText}>Selecciona una imagen</Text>
              </Pressable>
            )}
          </View>

          <FormWrapper to="name" isRequired={true}>
            {({ hasError }) => (
              <TextInput
                style={[
                  styles.input,
                  !!hasError && styles.inputError
                ]}
                placeholder="Nombre"
                value={name}
                onChangeText={onChangeName}
              />
            )}
          </FormWrapper>

          <FormWrapper to="description" isRequired={true}>
            {({ hasError }) => (
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  !!hasError && styles.inputError
                ]}
                placeholder="Soy una persona que..."
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={onChangeDescription}
              />
            )}
          </FormWrapper>

          {errors.error && <Error error={errors.message} />}

          <View style={styles.actions}>
            <FormAction
              bg="#f59e0b"
              color="black"
              text="Actualizar"
              w="45%"
              onPress={onSubmit}
            />

            <FormAction
              bg="#1e293b"
              color="white"
              text="Cancelar"
              w="45%"
              onPress={onCancel}
            />
          </View>

          <View style={{ height: 60 }} />
        </ScrollView>
      </View>

      <BottomNavigationBar active="Profile" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 24,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    borderWidth: 3,
    borderColor: '#1e293b',
    borderStyle: 'dotted',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  placeholderText: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: 'bold',
    marginTop: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
    color: 'red',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  actions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
})
