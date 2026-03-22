import { create } from 'zustand'

interface ComparisonState {
  propertyIds: string[]
  addToCompare: (id: string) => void
  removeFromCompare: (id: string) => void
  clearCompare: () => void
}

export const useComparisonStore = create<ComparisonState>((set) => ({
  propertyIds: [],
  addToCompare: (id) => set((state) => ({
    propertyIds: state.propertyIds.includes(id)
      ? state.propertyIds
      : [...state.propertyIds, id].slice(-3) // Max 3 for comparison
  })),
  removeFromCompare: (id) => set((state) => ({
    propertyIds: state.propertyIds.filter(pid => pid !== id)
  })),
  clearCompare: () => set({ propertyIds: [] })
}))
