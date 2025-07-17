import { create } from 'zustand'

export const useEditInfoStore = create((set) => ({
  editInfo: {},
  setEditInfo: (info) => set({ editInfo: info }),
}))

export const useErrorsEditInfoStore = create((set) => ({
  errorsEditInfo: {},
  setErrorsEditInfo: (errors) => set({ errorsEditInfo: errors }),
}))
