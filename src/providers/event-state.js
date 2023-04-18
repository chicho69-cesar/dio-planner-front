import { atom } from 'recoil'

export const createEventState = atom({
  key: 'createEventState',
  default: {}
})

export const errorsCreateEventState = atom({
  key: 'errorsCreateEventState',
  default: {}
})

export const selectedEventState = atom({
  key: 'selectedEventState',
  default: {}
})
