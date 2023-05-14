import {
  ANDROID_CLIENT_ID,
  CLIENT_ID,
  EXPO_CLIENT_ID,
  IOS_CLIENT_ID,
  WEB_CLIENT_ID
} from '@env'

import { MaterialIcons } from '@expo/vector-icons'
import * as Facebook from 'expo-auth-session/providers/facebook'
import * as Google from 'expo-auth-session/providers/google'
import {
  Button,
  HStack,
  Icon,
  Input,
  Pressable,
  Stack,
  Text
} from 'native-base'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

import {
  facebookLoginOrRegisterUser,
  googleLoginOrRegisterUser,
  loginUser
} from '../api/user'
import Error from '../components/Error'
import FormElement from '../components/FormElement'
import Loading from '../components/Loading'
import Logo from '../components/Logo'
import FacebookLogin from '../components/login/FacebookLogin'
import GoogleLogin from '../components/login/GoogleLogin'
import { useAuth } from '../hooks/useAuth'
import { errorsState, formDataState } from '../providers/login-state'
import { loginValidationSchema } from '../validations/login-validations'

export default function LoginScreen({ navigation }) {
  const { login } = useAuth()

  const [formData, setFormData] = useRecoilState(formDataState)
  const [theErrors, setTheErrors] = useRecoilState(errorsState)
  const [showPassword, setShowPassword] = useState(false)

  const [, , googlePromptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID
  })

  const [, , fbPromptAsync] = Facebook.useAuthRequest({
    clientId: CLIENT_ID
  })

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

  const nativeLogin = useMutation(async (values) => {
    const user = await loginUser(values.email, values.password)

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

  const facebookLogin = useMutation(async () => {
    const response = await fbPromptAsync()

    if (response.type === 'success') {
      const { access_token } = response.params

      const user = await facebookLoginOrRegisterUser(access_token)

      if (user) {
        login(user)
        navigation.navigate('Home')
      } else {
        setTheErrors({
          error: true,
          message: 'Login con facebook incorrecto'
        })
      }
    }
  })

  const googleLogin = useMutation(async () => {
    const response = await googlePromptAsync()

    if (response.type === 'success') {
      const { access_token } = response.params

      const user = await googleLoginOrRegisterUser(access_token)

      if (user) {
        login(user)
        navigation.navigate('Home')
      } else {
        setTheErrors({
          error: true,
          message: 'Login con google incorrecto'
        })
      }
    }
  })

  const validate = async (data) => {
    try {
      await loginValidationSchema.validate({
        email: data.email,
        password: data.password
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
      nativeLogin.mutate({
        email: formData.email,
        password: formData.password
      })
    }
  }

  if (
    nativeLogin.isLoading ||
    facebookLogin.isLoading ||
    googleLogin.isLoading
  ) {
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
          mt={6}
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
              Regístrate
            </Text>
          </Text>
        </Pressable>

        <HStack w="75%" space={3} justifyContent="center">
          <FacebookLogin onPress={() => facebookLogin.mutate()} />
          <GoogleLogin onPress={() => googleLogin.mutate()} />
        </HStack>
      </Stack>
    </>
  )
}
