import { atom } from 'recoil'

export const formDataState = atom({
  key: 'formDataState',
  default: {}
})

export const errorsState = atom({
  key: 'errorsState',
  default: {}
})
