'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { cn } from '@/lib/utils'

interface FavoriteButtonProps {
    propertyId: string;
}

export function FavoriteButton({ propertyId}: FavoriteButtonProps) {
    const savedPropertyIds = useFavoriteStore((state) => state.savedPropertyIds)
    const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite)

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)

    }, [])

    if(!isMounted) {
        return (
            <button disabled className='p-2 bg-white/80 backdrop-blur rounded-full shadow-sm'>
               <Heart className='w-5 h-5 text-gray-300' />
            </button>
        )
    }

    const isSaved = savedPropertyIds.includes(propertyId)


    return (

        <button
        onClick={(e) => {
            e.preventDefault()
            e.stopPropagation();
            toggleFavorite(propertyId);
        }}
        className={cn("p-2 bg-white/80 backdrop-blur rounded-full shadow-sm trasition-all", "hover:scale-110 active:scale-95")} aria-label={isSaved ? "ลบออกจากรายการโปรด" : "บันทึกลงรายการโปรด"}>
            <Heart className={cn("w-5 h-5 trasition-colors duration-200", isSaved ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500")} />
        </button>
    )
}