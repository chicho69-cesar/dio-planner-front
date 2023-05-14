import { MaterialIcons } from '@expo/vector-icons'
import { Button, Icon, Input, Pressable, Stack, Text } from 'native-base'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

import { registerUser } from '../api/user'
import Error from '../components/Error'
import FormElement from '../components/FormElement'
import Loading from '../components/Loading'
import Logo from '../components/Logo'
import { useAuth } from '../hooks/useAuth'
import { errorsState, formDataState } from '../providers/login-state'
import { registerValidationSchema } from '../validations/register-validations'

export default function RegisterScreen({ navigation }) {
  const { login } = useAuth()

  const [formData, setFormData] = useRecoilState(formDataState)
  const [theErrors, setTheErrors] = useRecoilState(errorsState)

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

  const nativeRegister = useMutation(async (values) => {
    const user = await registerUser(values.name, values.email, values.password)

    if (user) {
      login(user)
      navigation.navigate('Home')
    } else {
      setTheErrors({
        error: true,
        message: 'Email o password incorrectos'
      })
    }
  })

  const validate = async (data) => {
    try {
      await registerValidationSchema.validate({
        email: data.email,
        password: data.password,
        confirmPassword: data.retype
      })

      setTheErrors({
        error: false,
        message: ''
      })
    } catch (err) {
      const { errors } = err
      setTheErrors({
        error: true,
        message: errors[0]
      })
    }
  }

  const onSubmit = async () => {
    console.log({ formData })

    await validate(formData)

    if (!theErrors.error) {
      nativeRegister.mutate({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
    }
  }

  if (nativeRegister.isLoading) {
    return <Loading />
  }

  return (
    <>
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
                      name={
                        showRetypePassword ? 'visibility' : 'visibility-off'
                      }
                    />
                  }
                  size={5}
                  mr="2"
                  color="gray.600"
                />
              </Pressable>
            }
          />
        </FormElement>

        {theErrors.error && <Error error={theErrors.message} />}

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
          mt={4}
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
    </>
  )
}
