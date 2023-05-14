import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Ingresa un correo electrónico válido')
    .required('Ingresa tu correo electrónico'),
  password: yup.string().required('Ingresa tu contraseña')
})
