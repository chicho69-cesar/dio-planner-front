import { atom } from 'recoil'

export const searchState = atom({
  key: 'searchState',
  default: ''
})

export const doSearchState = atom({
  key: 'doSearchState',
  default: false
})
