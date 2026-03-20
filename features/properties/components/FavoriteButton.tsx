'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { cn } from '@/lib/utils'

interface FavoriteButtonProps {
  propertyId: string
}

// Mock API function
const toggleFavoriteApi = async (propertyId: string) => {
  await new Promise(resolve => setTimeout(resolve, 800))
  // Simulate 5% chance of failure to test rollback
  if (Math.random() < 0.05) throw new Error('Network error')
  return propertyId
}

export function FavoriteButton({ propertyId }: FavoriteButtonProps) {
  const queryClient = useQueryClient()
  const { savedPropertyIds, toggleFavorite } = useFavoriteStore()
  const isFavorite = savedPropertyIds.includes(propertyId)

  const mutation = useMutation({
    mutationFn: toggleFavoriteApi,
    onMutate: async () => {
      // 1. Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['favorites'] })

      // 2. Snapshot the previous value
      const previousFavorites = [...savedPropertyIds]

      // 3. Optimistically update to the new value
      toggleFavorite(propertyId)

      // Return context with the snapshotted value
      return { previousFavorites }
    },
    onError: (err, variables, context) => {
      // 4. If mutation fails, use the context returned from onMutate to roll back
      if (context?.previousFavorites) {
        console.error('Failed to update favorite, rolling back...', err)
        // Manual rollback: just toggle again
        toggleFavorite(propertyId)
      }
    },
    onSettled: () => {
      // 5. Always refetch after error or success:
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        mutation.mutate(propertyId);
      }}
      disabled={mutation.isPending}
      className={cn(
        "p-3 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-90",
        isFavorite
            ? "bg-rose-50 text-rose-500 shadow-rose-100 shadow-lg"
            : "bg-white/90 backdrop-blur-md text-gray-400 hover:text-rose-500 shadow-sm"
      )}
    >
      <Heart className={cn("w-5 h-5", isFavorite && "fill-rose-500")} />
    </button>
  )
}
