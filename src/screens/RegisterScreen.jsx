import React, { useState } from 'react'
import {
  Stack,
  Input,
  Pressable,
  Icon,
  Checkbox,
  Button,
  Text
} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { useRecoilState } from 'recoil'

import { errorsState, formDataState } from '../providers/login-state'
import Logo from '../components/Logo'
import FormElement from '../components/FormElement'
import FormValidation from '../components/FormValidation'

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useRecoilState(formDataState)
  const [_, setErrors] = useRecoilState(errorsState)

  const [showPassword, setShowPassword] = useState(false)
  const [showRetypePassword, setShowRetypePassword] = useState(false)

  const onChangeName = (text) => {
    setFormData({
      ...formData,
      name: text
    })
  }

  const onChangeEmail = (text) => {
    setFormData({
      ...formData,
      email: text
    })
  }

  const onChangePassword = (text) => {
    setFormData({
      ...formData,
      password: text
    })
  }

  const onChangeRetypePassword = (text) => {
    setFormData({
      ...formData,
      retype: text
    })
  }

  const onChangeTerms = (isSelected) => {
    setFormData({
      ...formData,
      terms: isSelected
    })
  }

  const validate = () => {
    console.log('Validaciones')
  }

  const onSubmit = () => {
    console.log({ formData })
  }

  return (
    <Stack
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
      bg="white"
    >
      <Logo />

      <FormElement to="name" isRequired={true}>
        <Input
          w={{ base: '75%', md: '25%' }}
          color="gray.800"
          fontSize="lg"
          placeholder="Nombre"
          onChangeText={onChangeName}
          variant="rounded"
          p="3"
          focusOutlineColor="gray.800"
        />

        <FormValidation to="name" />
      </FormElement>

      <FormElement to="email" isRequired={true}>
        <Input
          w={{ base: '75%', md: '25%' }}
          color="gray.800"
          fontSize="lg"
          placeholder="Email"
          onChangeText={onChangeEmail}
          variant="rounded"
          p="3"
          focusOutlineColor="gray.800"
        />

        <FormValidation to="email" />
      </FormElement>

      <FormElement to="password" isRequired={true}>
        <Input
          w={{ base: '75%', md: '25%' }}
          type={showPassword ? 'text' : 'password'}
          color="gray.800"
          fontSize="lg"
          placeholder="Password"
          onChangeText={onChangePassword}
          variant="rounded"
          p="3"
          focusOutlineColor="gray.800"
          InputRightElement={
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Icon
                as={
                  <MaterialIcons
                    name={showPassword ? 'visibility' : 'visibility-off'}
                  />
                }
                size={5}
                mr="2"
                color="gray.600"
              />
            </Pressable>
          }
        />

        <FormValidation to="password" />
      </FormElement>

      <FormElement to="retype" isRequired={true} mb={2}>
        <Input
          w={{ base: '75%', md: '25%' }}
          type={showRetypePassword ? 'text' : 'password'}
          color="gray.800"
          fontSize="lg"
          placeholder="Repetir Password"
          onChangeText={onChangeRetypePassword}
          variant="rounded"
          p="3"
          focusOutlineColor="gray.800"
          InputRightElement={
            <Pressable
              onPress={() => setShowRetypePassword(!showRetypePassword)}
            >
              <Icon
                as={
                  <MaterialIcons
                    name={showRetypePassword ? 'visibility' : 'visibility-off'}
                  />
                }
                size={5}
                mr="2"
                color="gray.600"
              />
            </Pressable>
          }
        />

        <FormValidation to="retype" />
      </FormElement>

      <FormElement mb={2}>
        <Checkbox
          value="accept"
          my="3"
          colorScheme="amber"
          w="100%"
          alignItems="start"
          onChange={onChangeTerms}
          _text={{ color: 'black' }}
        >
          Aceptar terminos y condiciones
        </Checkbox>
      </FormElement>

      <Button
        bg="amber.400"
        borderColor="gray.800"
        borderWidth={1}
        colorScheme="dark"
        variant="subtle"
        rounded="full"
        px={10}
        py={2}
        shadow={2}
        mb={4}
        w="75%"
        _text={{ color: 'white', fontSize: 'lg', fontWeight: 'semibold' }}
        onPress={onSubmit}
      >
        Crear cuenta
      </Button>

      <Pressable onPress={() => navigation.navigate('Login')} mt={10}>
        <Text color="black" fontSize="md">
          ¿Ya tienes cuenta?{' '}
          <Text color="amber.400" fontWeight="semibold">
            Inicia sesión
          </Text>
        </Text>
      </Pressable>
    </Stack>
  )
}
