import { MaterialIcons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

import {
  loginUser
} from '../api/user'
import FacebookLogin from '../components/login/facebook-login'
import GoogleLogin from '../components/login/google-login'
import Error from '../components/shared/error'
import FormElement from '../components/shared/form-element'
import Loading from '../components/shared/loading'
import Logo from '../components/shared/logo'
import { useAuth } from '../hooks/use-auth'
import { useErrorsLoginStateStore, useLoginStateStore } from '../providers/login-state'
import { loginValidationSchema } from '../validations/login-validations'

export default function LoginScreen({ navigation }) {
  const { login } = useAuth()

  const formData = useLoginStateStore((state) => state.loginState)
  const setFormData = useLoginStateStore((state) => state.setLoginState)
  const theErrors = useErrorsLoginStateStore((state) => state.errorsLoginState)
  const setTheErrors = useErrorsLoginStateStore((state) => state.setErrorsLoginState)

  const [showPassword, setShowPassword] = useState(false)

  const onChangeEmail = (text) => {
    setFormData({ ...formData, email: text })
  }

  const onChangePassword = (text) => {
    setFormData({ ...formData, password: text })
  }

  const nativeLogin = useMutation({
    mutationFn: async (values) => {
      const user = await loginUser(values.email, values.password)

      if (user) {
        login(user)
        navigation.navigate('Home')
      } else {
        setTheErrors({ error: true, message: 'Email o password incorrectos' })
      }
    }
  })

  const validate = async (data) => {
    try {
      await loginValidationSchema.validate({
        email: data.email,
        password: data.password
      })

      setTheErrors({ error: false, message: '' })
    } catch (err) {
      setTheErrors({ error: true, message: err.errors[0] })
    }
  }

  const onSubmit = async () => {
    await validate(formData)

    if (!theErrors.error) {
      nativeLogin.mutate({
        email: formData.email,
        password: formData.password
      })
    }
  }

  if (nativeLogin.isLoading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Logo />

      <FormElement to="email" isRequired={true}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={onChangeEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </FormElement>

      <FormElement to="password" isRequired={true}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={formData.password}
            onChangeText={onChangePassword}
            secureTextEntry={!showPassword}
          />
          <Pressable
            style={styles.visibilityToggle}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={24}
              color="#6b7280"
            />
          </Pressable>
        </View>
      </FormElement>

      {theErrors.error && <Error error={theErrors.message} />}

      <Pressable style={styles.loginButton} onPress={onSubmit}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </Pressable>

      <Pressable
        style={styles.registerLink}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>
          ¿No tienes cuenta? <Text style={styles.registerHighlight}>Regístrate</Text>
        </Text>
      </Pressable>

      <View style={styles.socialLoginContainer}>
        <FacebookLogin onPress={() => { }} />
        <GoogleLogin onPress={() => { }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '75%',
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordContainer: {
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 25,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  visibilityToggle: {
    padding: 10,
  },
  loginButton: {
    width: '75%',
    height: 50,
    backgroundColor: '#f59e0b',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#1f2937',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  registerLink: {
    marginBottom: 30,
  },
  registerText: {
    fontSize: 16,
    color: '#1f2937',
  },
  registerHighlight: {
    color: '#f59e0b',
    fontWeight: '600',
  },
  socialLoginContainer: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
})
