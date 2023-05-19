import * as yup from 'yup'

export const editInfoSchema = yup.object().shape({
  name: yup.string().required('Ingresa un nombre valido'),
  description: yup.string().required('Ingresa una descripción')
})
