import { create } from 'zustand'

export const useSearchStore = create((set) => ({
  searchState: '',
  setSearchState: (search) => set({ searchState: search }),
  doSearchState: false,
  setDoSearchState: (doSearch) => set({ doSearchState: doSearch }),
}))
