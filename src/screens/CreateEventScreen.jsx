import React, { useEffect, useState } from 'react'
import {
  Stack,
  ScrollView,
  Input,
  Heading,
  View,
  TextArea,
  Select,
  CheckIcon,
  HStack,
  Radio
} from 'native-base'
import { useRecoilState } from 'recoil'
import DateTimePicker from '@react-native-community/datetimepicker'

import { getPickedDate } from '../utilities/getTextDateES'
import BottomNavigationBar from '../components/BottomNavigationBar'
import {
  createEventState,
  errorsCreateEventState
} from '../providers/event-state'
import FormWrapper from '../components/create-event/FormWrapper'
import ButtonAction from '../components/ButtonAction'
import FormAction from '../components/FormAction'

export default function CreateEventScreen({ navigation }) {
  const [errors, setErrors] = useRecoilState(errorsCreateEventState)
  const [data, setData] = useRecoilState(createEventState)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [topic, setTopic] = useState('fiesta')
  const [pickedDate, setPickedDate] = useState(new Date())
  const [accessibilityValue, setAccessibilityValue] = useState('1')
  const [location, setLocation] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)

  useEffect(() => {
    setData({
      name: name,
      description: description,
      topic: topic,
      date: pickedDate,
      accessibility: accessibilityValue,
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

  const onChangeLocation = () => {}

  const validate = () => {
    console.log('Validaciones')
  }

  const onSubmit = () => {
    console.log({ data })
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

          <ButtonAction
            text="Selecciona la ubicación"
            icon="google-maps"
            onPress={onChangeLocation}
          />

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
