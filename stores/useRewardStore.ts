import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RewardState {
  points: number
  referralCode: string
  addPoints: (amount: number) => void
  redeemPoints: (amount: number) => boolean
}

export const useRewardStore = create<RewardState>()(
  persist(
    (set, get) => ({
      points: 1500, // Initial welcome points
      referralCode: 'NEST-' + Math.random().toString(36).substring(7).toUpperCase(),
      addPoints: (amount) => set((state) => ({ points: state.points + amount })),
      redeemPoints: (amount) => {
        if (get().points >= amount) {
          set((state) => ({ points: state.points - amount }))
          return true
        }
        return false
      }
    }),
    { name: 'vte-nest-rewards' }
  )
)
