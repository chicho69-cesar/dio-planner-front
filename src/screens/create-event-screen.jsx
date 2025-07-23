import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { createEvent } from '../api/event'
import FormWrapper from '../components/create-event/form-wrapper'
import BottomNavigationBar from '../components/shared/bottom-navigation-bar'
import ButtonAction from '../components/shared/button-action'
import Error from '../components/shared/error'
import FormAction from '../components/shared/form-action'
import { useCreateEventStore, useErrorsCreateEventStore } from '../providers/event-state'
import { useUserLoggedStore } from '../providers/user-state'
import { getPickedDate } from '../utils/dates'
import { uploadImage } from '../utils/upload-image'
import { createEventSchema } from '../validations/event-validations'

export default function CreateEventScreen() {
  const navigation = useNavigation()

  const userLogged = useUserLoggedStore((state) => state.userLogged)
  const errors = useErrorsCreateEventStore((state) => state.errorsCreateEvent)
  const setErrors = useErrorsCreateEventStore((state) => state.setErrorsCreateEvent)
  const data = useCreateEventStore((state) => state.createEvent)
  const setData = useCreateEventStore((state) => state.setCreateEvent)

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

  const createEventMut = useMutation({
    mutationFn: async (values) => {
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
  }, [name, description, topic, pickedDate, accessibilityValue, location])

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
      setErrors({ error: false, message: '' })
    } catch (err) {
      setErrors({ error: true, message: err.errors[0] })
    }
  }

  const onSubmit = async () => {
    if (!image) {
      setErrors({ error: true, message: 'Imagen no seleccionada' })
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
        setErrors({ error: true, message: 'Error al subir la imagen' })
      }
    }
  }

  const onCancel = () => {
    setData({})
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Datos del evento</Text>
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
                placeholder="Descripción"
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={onChangeDescription}
              />
            )}
          </FormWrapper>

          <FormWrapper to="topic" isRequired={true}>
            {({ hasError }) => (
              <TextInput
                style={[
                  styles.input,
                  !!hasError && styles.inputError
                ]}
                placeholder="Temática"
                multiline
                value={topic}
                onChangeText={onChangeTopic}
              />
            )}
          </FormWrapper>

          <ButtonAction
            text={getPickedDate(pickedDate)}
            icon="calendar"
            onPress={() => setShowCalendar(true)}
          />

          {showCalendar && (
            <DateTimePicker
              value={pickedDate || new Date()}
              mode="date"
              display='default'
              onChange={onChangeDate}
            />
          )}

          <View style={styles.radioGroup}>
            <Pressable
              style={styles.radioOption}
              onPress={() => onChangeAccessibility('1')}
            >
              <View style={[
                styles.radioCircle,
                accessibilityValue === '1' && styles.radioSelected,
              ]} />
              <Text>Publico</Text>
            </Pressable>

            <Pressable
              style={styles.radioOption}
              onPress={() => onChangeAccessibility('2')}
            >
              <View style={[
                styles.radioCircle,
                accessibilityValue === '2' && styles.radioSelected
              ]} />
              <Text>Privado</Text>
            </Pressable>
          </View>

          <FormWrapper to="location" isRequired={true}>
            {({ hasError }) => (
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  !!hasError && styles.inputError
                ]}
                placeholder="Ubicación"
                multiline
                numberOfLines={3}
                value={location}
                onChangeText={onChangeLocation}
              />
            )}
          </FormWrapper>

          <ButtonAction
            text={image ? 'Imagen seleccionada' : 'Selecciona imagen'}
            icon="folder-image"
            onPress={pickImage}
          />

          {errors.error && <Error error={errors.message} />}

          <View style={styles.actions}>
            <FormAction
              bg="#f59e0b"
              color="black"
              text="Crear"
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

      <BottomNavigationBar active="Home" />
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
    paddingTop: 16,
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '90%',
    textAlign: 'left',
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
    color: 'red',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pickerLabel: {
    marginRight: 8,
    fontSize: 16,
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    padding: 12,
  },
  radioGroup: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: '#f59e0b',
  },
  actions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    marginVertical: 24,
  },
})
