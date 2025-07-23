import { MaterialIcons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

import { registerUser } from '../api/user'
import Error from '../components/shared/error'
import FormElement from '../components/shared/form-element'
import Loading from '../components/shared/loading'
import Logo from '../components/shared/logo'
import { useAuth } from '../hooks/use-auth'
import { useErrorsLoginStateStore, useLoginStateStore } from '../providers/login-state'
import { registerValidationSchema } from '../validations/register-validations'

export default function RegisterScreen({ navigation }) {
  const { login } = useAuth()

  const formData = useLoginStateStore((state) => state.loginState)
  const setFormData = useLoginStateStore((state) => state.setLoginState)
  const theErrors = useErrorsLoginStateStore((state) => state.errorsLoginState)
  const setTheErrors = useErrorsLoginStateStore((state) => state.setErrorsLoginState)

  const [showPassword, setShowPassword] = useState(false)
  const [showRetypePassword, setShowRetypePassword] = useState(false)

  const onChangeName = (text) => setFormData({ ...formData, name: text })
  const onChangeEmail = (text) => setFormData({ ...formData, email: text })
  const onChangePassword = (text) => setFormData({ ...formData, password: text })
  const onChangeRetypePassword = (text) => setFormData({ ...formData, retype: text })

  const nativeRegister = useMutation({
    mutationFn: async (values) => {
      const user = await registerUser(values.name, values.email, values.password)

      if (user) {
        login(user)
        navigation.navigate('Home')
      } else {
        setTheErrors({ error: true, message: 'Error al registrar el usuario' })
      }
    }
  })

  const validate = async (data) => {
    try {
      await registerValidationSchema.validate({
        email: data.email,
        password: data.password,
        confirmPassword: data.retype
      })

      setTheErrors({ error: false, message: '' })
    } catch (err) {
      setTheErrors({ error: true, message: err.errors[0] })
    }
  }

  const onSubmit = async () => {
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
    <View style={styles.container}>
      <Logo />

      <FormElement to="name" isRequired={true}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={formData.name}
          onChangeText={onChangeName}
        />
      </FormElement>

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

      <FormElement to="retype" isRequired={true}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Repetir Password"
            value={formData.retype}
            onChangeText={onChangeRetypePassword}
            secureTextEntry={!showRetypePassword}
          />
          <Pressable
            style={styles.visibilityToggle}
            onPress={() => setShowRetypePassword(!showRetypePassword)}
          >
            <MaterialIcons
              name={showRetypePassword ? 'visibility' : 'visibility-off'}
              size={24}
              color="#6b7280"
            />
          </Pressable>
        </View>
      </FormElement>

      {theErrors.error && <Error error={theErrors.message} />}

      <Pressable style={styles.registerButton} onPress={onSubmit}>
        <Text style={styles.registerButtonText}>Crear cuenta</Text>
      </Pressable>

      <Pressable
        style={styles.loginLink}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>
          ¿Ya tienes cuenta? <Text style={styles.loginHighlight}>Inicia sesión</Text>
        </Text>
      </Pressable>
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
  registerButton: {
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
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#1f2937',
  },
  loginHighlight: {
    color: '#f59e0b',
    fontWeight: '600',
  },
})
