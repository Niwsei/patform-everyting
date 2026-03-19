'use client'

import Link from "next/link"
import { Heart, Menu, User } from "lucide-react"
import { useFavoriteStore } from "@/stores/useFavoriteStore"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export function MainNavbar() {
    const savedCount = useFavoriteStore((state) => state.savedPropertyIds.length)
    const [isScrolled, setIsScrolled] = useState(false);


    useEffect(() => {
        const handleScroll = ( ) => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    })




    return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled ? "bg-white shadow-sm py-3" : "bg-white/80 backdrop-blur-md py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-lg font-bold text-xl">
            V
          </div>
          <span className="text-xl font-extrabold text-gray-900 tracking-tight hidden sm:block">
            Vientiane Nest
          </span>
        </Link>

        {/* เมนูฝั่งขวา */}
        <div className="flex items-center gap-4">
          <Link href="/favorites" className="relative p-2 text-gray-600 hover:text-red-500 transition">
            <Heart className="w-6 h-6" />
            {savedCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {savedCount}
              </span>
            )}
          </Link>
          
          {/* ปุ่มเข้าสู่ระบบ */}
          <button className="hidden sm:flex items-center gap-2 border px-4 py-2 rounded-full hover:shadow-md transition bg-white">
            <Menu className="w-5 h-5 text-gray-500" />
            <div className="bg-gray-200 p-1 rounded-full">
              <User className="w-5 h-5 text-gray-500" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}