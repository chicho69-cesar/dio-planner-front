import { atom } from 'recoil'

export const imageState = atom({
  key: 'imageState',
  default: {
    error: true,
    link: ''
  }
})
