import { create }  from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteState {
 savedPropertyIds: string[];
 toggleFavorite: (id: string) => void;
}

export const useFavoriteStore = create<FavoriteState>() (
    persist(
        (set) => ({
            savedPropertyIds: [],
            toggleFavorite: (id) => set((state) => {
                const isSaved = state.savedPropertyIds.includes(id);
                return {
                    savedPropertyIds: isSaved ?
                    state.savedPropertyIds.filter(savedId => savedId !== id) :
                    [...state.savedPropertyIds, id ]
                }
            })
        }),
        {
            name: 'favorite-properties-storage'
        }

    )
)