import { create } from 'zustand'

export const useLoginStateStore = create((set) => ({
  loginState: {},
  setLoginState: (state) => set({ loginState: state }),
}))

export const useErrorsLoginStateStore = create((set) => ({
  errorsLoginState: {
    error: false,
    message: ''
  },
  setErrorsLoginState: (errors) => set({ errorsLoginState: errors }),
}))
