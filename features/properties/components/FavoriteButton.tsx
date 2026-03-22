'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface FavoriteButtonProps {
  propertyId: string
}

// Mock API function
const toggleFavoriteApi = async (propertyId: string) => {
  await new Promise(resolve => setTimeout(resolve, 400))
  // Simulate 2% chance of failure to test rollback
  if (Math.random() < 0.02) throw new Error('Network error')
  return propertyId
}

export function FavoriteButton({ propertyId }: FavoriteButtonProps) {
  const queryClient = useQueryClient()
  const { savedPropertyIds, toggleFavorite } = useFavoriteStore()
  const isFavorite = savedPropertyIds.includes(propertyId)

  const mutation = useMutation({
    mutationFn: toggleFavoriteApi,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] })
      const previousFavorites = [...savedPropertyIds]
      toggleFavorite(propertyId)
      return { previousFavorites }
    },
    onError: (err, variables, context) => {
      if (context?.previousFavorites) {
        console.error('Failed to update favorite, rolling back...', err)
        toggleFavorite(propertyId)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })

  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        mutation.mutate(propertyId);
      }}
      disabled={mutation.isPending}
      className={cn(
        "p-2.5 rounded-xl transition-all duration-300 relative group",
        isFavorite
            ? "bg-rose-500 text-white shadow-glow-rose"
            : "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 shadow-premium"
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
           key={isFavorite ? 'active' : 'inactive'}
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           exit={{ scale: 0.8, opacity: 0 }}
           transition={{ duration: 0.2 }}
        >
          <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
        </motion.div>
      </AnimatePresence>

      {/* Micro-sparkle on favorite */}
      {isFavorite && (
        <motion.div
           initial={{ scale: 0, opacity: 0 }}
           animate={{ scale: 1.5, opacity: 0 }}
           transition={{ duration: 0.5 }}
           className="absolute inset-0 bg-rose-500 rounded-full"
        />
      )}
    </motion.button>
  )
}
