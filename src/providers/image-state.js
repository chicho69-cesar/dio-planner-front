import { create } from 'zustand'

export const useImageStore = create((set) => ({
  image: {
    error: true,
    link: ''
  },
  setImage: (image) => set({ image }),
}))
