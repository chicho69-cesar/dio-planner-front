import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  HStack,
  Icon,
  Input,
  Pressable,
  Stack,
  Text
} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { useRecoilState } from 'recoil'

import { errorsState, formDataState } from '../providers/login-state'
import Logo from '../components/Logo'
import FormElement from '../components/FormElement'
import FormValidation from '../components/FormValidation'
import FacebookLogin from '../components/login/FacebookLogin'
import GoogleLogin from '../components/login/GoogleLogin'

export default function LoginScreen({ navigation }) {
  const [formData, setFormData] = useRecoilState(formDataState)
  const [_, setErrors] = useRecoilState(errorsState)

  const [showPassword, setShowPassword] = useState(false)

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

  const onChangeRemember = (isSelected) => {
    setFormData({
      ...formData,
      remember: isSelected
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

      <FormElement to="password" isRequired={true} mb={2}>
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

      <FormElement mb={2}>
        <Checkbox
          value="remember"
          my="3"
          colorScheme="amber"
          w="100%"
          alignItems="start"
          onChange={onChangeRemember}
          _text={{ color: 'black' }}
        >
          Recuerdame
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
        mb={6}
        w="75%"
        _text={{ color: 'white', fontSize: 'lg', fontWeight: 'semibold' }}
        onPress={onSubmit}
      >
        Iniciar sesión
      </Button>

      <Pressable onPress={() => navigation.navigate('Register')} mb={12}>
        <Text color="black" fontSize="md">
          ¿No tienes cuenta?{' '}
          <Text color="amber.400" fontWeight="semibold">
            Registrate
          </Text>
        </Text>
      </Pressable>

      <HStack w="75%" space={3} justifyContent="center">
        <FacebookLogin />
        <GoogleLogin />
      </HStack>
    </Stack>
  )
}
