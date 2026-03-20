'use client'

import Link from "next/link"
import { Heart, Menu, User, Truck, MapPin, Bell, Search } from "lucide-react"
import { useFavoriteStore } from "@/stores/useFavoriteStore"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function MainNavbar() {
    const savedCount = useFavoriteStore((state) => state.savedPropertyIds.length)
    const [isScrolled, setIsScrolled] = useState(false);
    const [hasNotifications, setHasNotifications] = useState(true);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-3 border-b border-slate-100"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-2xl font-bold text-2xl shadow-xl shadow-indigo-200 group-hover:shadow-indigo-300 transition-all duration-300"
          >
            V
          </motion.div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-extrabold text-slate-900 tracking-tight hidden sm:block">
              Vientiane Nest
            </span>
            <span className="text-[10px] font-bold text-indigo-600 tracking-widest hidden sm:block">
              STARTUP EDITION
            </span>
          </div>
        </Link>

        {/* Center Navigation - Pill style */}
        <nav className="hidden md:flex items-center bg-slate-100/50 p-1 rounded-full border border-slate-200/50 backdrop-blur-sm">
          <Link
            href="/properties"
            className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-all rounded-full hover:bg-white hover:shadow-sm flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Explore Homes
          </Link>
          <Link
            href="/services"
            className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-all rounded-full hover:bg-white hover:shadow-sm flex items-center gap-2"
          >
            <Truck className="w-4 h-4" />
            Moving Services
          </Link>
          <Link
            href="/provider-hub"
            className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-all rounded-full hover:bg-white hover:shadow-sm flex items-center gap-2"
          >
            Provider Hub
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setHasNotifications(false)}
            className="relative p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-300"
          >
            <Bell className="w-5 h-5" />
            {hasNotifications && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse" />
            )}
          </button>

          <Link href="/favorites" className="relative p-2.5 text-slate-500 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-all duration-300">
            <Heart className="w-5 h-5" />
            <AnimatePresence>
              {savedCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 bg-pink-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white"
                >
                  {savedCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          
          <button className="flex items-center gap-3 pl-3 pr-1.5 py-1.5 rounded-full border border-slate-200 hover:shadow-premium transition-all duration-300 bg-white group">
            <Menu className="w-5 h-5 text-slate-500 group-hover:text-slate-900 transition-colors" />
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-inner">
              <User className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
