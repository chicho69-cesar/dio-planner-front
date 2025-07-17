import { create } from 'zustand'

export const useCreateEventStore = create((set) => ({
  createEvent: {},
  setCreateEvent: (event) => set({ createEvent: event }),
}))

export const useErrorsCreateEventStore = create((set) => ({
  errorsCreateEvent: {},
  setErrorsCreateEvent: (errors) => set({ errorsCreateEvent: errors }),
}))

export const useSelectedEventStore = create((set) => ({
  selectedEvent: {},
  setSelectedEvent: (event) => set({ selectedEvent: event }),
}))
