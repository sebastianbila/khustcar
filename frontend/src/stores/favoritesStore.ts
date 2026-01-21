import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  favoriteIds: string[]
  addFavorite: (carId: string) => void
  removeFavorite: (carId: string) => void
  toggleFavorite: (carId: string) => void
  isFavorite: (carId: string) => boolean
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      addFavorite: (carId: string) => {
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(carId)
            ? state.favoriteIds
            : [...state.favoriteIds, carId],
        }))
      },

      removeFavorite: (carId: string) => {
        set((state) => ({
          favoriteIds: state.favoriteIds.filter((id) => id !== carId),
        }))
      },

      toggleFavorite: (carId: string) => {
        const { favoriteIds } = get()
        if (favoriteIds.includes(carId)) {
          set({ favoriteIds: favoriteIds.filter((id) => id !== carId) })
        } else {
          set({ favoriteIds: [...favoriteIds, carId] })
        }
      },

      isFavorite: (carId: string) => {
        return get().favoriteIds.includes(carId)
      },

      clearFavorites: () => {
        set({ favoriteIds: [] })
      },
    }),
    {
      name: 'car-favorites',
    }
  )
)
