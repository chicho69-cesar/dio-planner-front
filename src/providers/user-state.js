import { create } from 'zustand'

export const useUserLoggedStore = create((set) => ({
  userLogged: {},
  setUserLogged: (user) => set({ userLogged: user }),
}))
