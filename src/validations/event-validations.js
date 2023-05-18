import * as yup from 'yup'

export const createEventSchema = yup.object().shape({
  name: yup.string().required('Ingresa un nombre del evento'),
  location: yup.string().required('Ingresa una locación'),
  topic: yup.string().required('Selecciona un tema')
})
