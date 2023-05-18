import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'
import {
  CheckIcon,
  HStack,
  Heading,
  Input,
  Radio,
  ScrollView,
  Select,
  Stack,
  TextArea,
  View
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

import { createEvent } from '../api/event'
import BottomNavigationBar from '../components/BottomNavigationBar'
import ButtonAction from '../components/ButtonAction'
import Error from '../components/Error'
import FormAction from '../components/FormAction'
import FormWrapper from '../components/create-event/FormWrapper'
import {
  createEventState,
  errorsCreateEventState
} from '../providers/event-state'
import { userLoggedState } from '../providers/user-state'
import { getPickedDate } from '../utilities/getTextDateES'
import { uploadImage } from '../utilities/uploadImage'
import { createEventSchema } from '../validations/event-validations'

export default function CreateEventScreen({ navigation }) {
  const [userLogged] = useRecoilState(userLoggedState)
  const [errors, setErrors] = useRecoilState(errorsCreateEventState)
  const [data, setData] = useRecoilState(createEventState)

  const [userId] = useState(userLogged.ID)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [topic, setTopic] = useState('fiesta')
  const [pickedDate, setPickedDate] = useState(new Date())
  const [accessibilityValue, setAccessibilityValue] = useState('1')
  const [location, setLocation] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)
  const [image, setImage] = useState(null)
  const [imageFileName, setImageFileName] = useState(null)

  const createEventMut = useMutation(async (values) => {
    const event = await createEvent(
      values.name,
      values.date,
      values.description,
      values.img,
      values.location,
      values.topic,
      values.accessibility,
      values.userID
    )

    if (!event) {
      setErrors({
        error: true,
        message: 'Error al crear el evento en la base de datos'
      })
    }
  })

  useEffect(() => {
    setData({
      name: name,
      description: description,
      topic: topic,
      date: pickedDate,
      accessibility: accessibilityValue === '1' ? 'publico' : 'privado',
      location: location
    })
  }, [
    setData,
    name,
    description,
    topic,
    pickedDate,
    accessibilityValue,
    location
  ])

  const onChangeName = (text) => {
    setName(text)
    setData({ ...data, name: text })
  }

  const onChangeDescription = (text) => {
    setDescription(text)
    setData({ ...data, description: text })
  }

  const onChangeTopic = (itemValue) => {
    setTopic(itemValue)
    setData({ ...data, topic: itemValue })
  }

  const onChangeDate = (event, date) => {
    if (date) {
      setShowCalendar(false)
      setPickedDate(date)
    }

    setData({ ...data, date: date })
  }

  const onChangeAccessibility = (value) => {
    setAccessibilityValue(value || '')
    setData({ ...data, accessibility: value })
  }

  const onChangeLocation = (text) => {
    setLocation(text)
    setData({ ...data, location: text })
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

  const validate = async (eventData) => {
    try {
      await createEventSchema.validate({
        name: eventData.name,
        topic: eventData.topic,
        location: eventData.location
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
    if (!image) {
      setErrors({
        error: true,
        message: 'Imagen no seleccionada'
      })
    }

    await validate(data)

    const uri = image
    const type = 'image/jpeg'
    const file = imageFileName || 'image.jpg'

    if (!errors.error) {
      const response = await uploadImage(uri, type, file)

      if (response) {
        createEventMut.mutate({
          name: data.name,
          date: data.date,
          description: data.description,
          img: response,
          location: data.location,
          topic: data.topic,
          accessibility: data.accessibility,
          userID: userId
        })

        navigation.push('Home')
      } else {
        setErrors({
          error: true,
          message: 'Error al subir la imagen'
        })
      }
    }
  }

  const onCancel = () => {
    setData({})
    navigation.goBack()
  }

  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack h="100%" w="100%" pt={16} pb={0}>
        <ScrollView w="100%" h="100%" showsVerticalScrollIndicator={false}>
          <View w="100%" alignItems="center" justifyContent="center" mt="6">
            <Heading size="md" color="black" w="90%">
              Datos del evento
            </Heading>
          </View>

          <FormWrapper to="name" isRequired={true}>
            <Input
              w={{ base: '90%', md: '25%' }}
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

          <FormWrapper to="description" isRequired={true}>
            <TextArea
              w={{ base: '90%', md: '25%' }}
              h={20}
              color="gray.800"
              fontSize="md"
              placeholder="Descripción"
              onChangeText={onChangeDescription}
              variant="outline"
              rounded="md"
              py="2"
              px="3"
              focusOutlineColor="gray.800"
            />
          </FormWrapper>

          <FormWrapper to="topic" isRequired={true}>
            <Select
              selectedValue={topic}
              w={{ base: '90%', md: '25%' }}
              color="gray.800"
              fontSize="md"
              placeholder="Temática"
              variant="outline"
              rounded="md"
              py="2"
              px="3"
              focusOutlineColor="gray.800"
              _selectedItem={{
                bg: 'tahiti.600',
                endIcon: <CheckIcon size="5" color="white" />
              }}
              onValueChange={onChangeTopic}
            >
              <Select.Item label="Boda" value="boda" />
              <Select.Item label="Fiesta" value="fiesta" />
              <Select.Item label="Despedida de soltero" value="despedida" />
              <Select.Item label="Noche de antro" value="antro" />
              <Select.Item label="Reunion" value="reunion" />
            </Select>
          </FormWrapper>

          <ButtonAction
            text={getPickedDate(pickedDate)}
            icon="calendar"
            onPress={() => setShowCalendar(true)}
          />

          {showCalendar && (
            <DateTimePicker
              value={pickedDate}
              mode="date"
              onChange={onChangeDate}
            />
          )}

          <FormWrapper to="accessibility" isRequired={true}>
            <Radio.Group
              w="100%"
              name="accessibilityGroup"
              defaultValue={accessibilityValue}
              onChange={onChangeAccessibility}
            >
              <View w="100%" alignItems="center" justifyContent="center">
                <Stack
                  direction="row"
                  space={1}
                  w="90%"
                  justifyContent="space-evenly"
                >
                  <Radio
                    value="1"
                    colorScheme="amber"
                    _text={{ color: 'black' }}
                  >
                    Publico
                  </Radio>
                  <Radio
                    value="2"
                    colorScheme="amber"
                    _text={{ color: 'black' }}
                  >
                    Privado
                  </Radio>
                </Stack>
              </View>
            </Radio.Group>
          </FormWrapper>

          <FormWrapper to="location" isRequired={true}>
            <TextArea
              w={{ base: '90%', md: '25%' }}
              h={16}
              color="gray.800"
              fontSize="md"
              placeholder="Ubicación"
              onChangeText={onChangeLocation}
              variant="outline"
              rounded="md"
              py="2"
              px="3"
              focusOutlineColor="gray.800"
            />
          </FormWrapper>

          <ButtonAction
            text={image ? 'Imagen seleccionada' : 'Selecciona imagen'}
            icon="folder-image"
            onPress={pickImage}
          />

          {errors.error && <Error error={errors.message} />}

          <View w="100%" alignItems="center" justifyContent="center" my="3">
            <HStack w="90%" justifyContent="space-between">
              <FormAction
                bg="amber.400"
                color="black"
                text="Crear"
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
