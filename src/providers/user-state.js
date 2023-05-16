import { atom } from 'recoil'

export const userLoggedState = atom({
  key: 'userLogged',
  default: {
    ID: 1
  }
})
