'use client'

import Link from "next/link"
import { Heart, Menu, User, Truck, MapPin, Bell, Search, Calendar, MessageSquare } from "lucide-react"
import { useFavoriteStore } from "@/stores/useFavoriteStore"
import { useCurrencyStore, Currency } from "@/stores/useCurrencyStore"
import { useNotificationStore } from "@/stores/useNotificationStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { AuthModal } from "@/components/auth/AuthModal"
import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function MainNavbar() {
    const savedCount = useFavoriteStore((state) => state.savedPropertyIds.length)
    const { currency, setCurrency } = useCurrencyStore()
    const { notifications, unreadCount, markAllAsRead } = useNotificationStore()
    const { isAuthenticated, user, logout } = useAuthStore()
    const [isScrolled, setIsScrolled] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 bg-gradient-to-br from-indigo-600 to-violet-700 text-white flex items-center justify-center rounded-2xl font-black text-2xl shadow-xl shadow-indigo-200 group-hover:shadow-indigo-300 transition-all duration-300"
          >
            VN
          </motion.div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black text-slate-900 tracking-tighter hidden sm:block">
              VIENTIANE NEST
            </span>
            <div className="flex items-center gap-1.5 hidden sm:flex">
              <span className="h-1 w-1 bg-indigo-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-indigo-600 tracking-[0.2em] uppercase">
                Startup Edition
              </span>
            </div>
          </div>
        </Link>

        {/* Center Navigation - Pill style */}
        <nav className="hidden md:flex items-center bg-slate-100/50 p-1 rounded-3xl border border-slate-200/50 backdrop-blur-md">
          <Link
            href="/properties"
            className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 transition-all rounded-2xl hover:bg-white hover:shadow-premium flex items-center gap-2"
          >
            <Search className="w-3.5 h-3.5" />
            ค้นหาที่พัก
          </Link>
          <Link
            href="/services"
            className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 transition-all rounded-2xl hover:bg-white hover:shadow-premium flex items-center gap-2"
          >
            <Truck className="w-3.5 h-3.5" />
            บริการขนย้าย
          </Link>
          <Link
            href="/neighborhoods"
            className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 transition-all rounded-2xl hover:bg-white hover:shadow-premium flex items-center gap-2"
          >
            <MapPin className="w-3.5 h-3.5" />
            ไกด์ย่านที่พัก
          </Link>
          <Link
            href="/onboarding"
            className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 transition-all rounded-2xl hover:bg-white hover:shadow-premium flex items-center gap-2"
          >
            เป็นพาร์ทเนอร์
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Currency Switcher */}
          <div className="hidden lg:flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200">
            {(['LAK', 'USD', 'THB'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={cn(
                  "px-3 py-1.5 text-[10px] font-black rounded-xl transition-all",
                  currency === curr ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {curr}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={cn(
                "relative p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-300",
                showNotifications && "bg-indigo-50 text-indigo-600"
              )}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[8px] font-black border-2 border-white rounded-full flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-[100]"
                >
                  <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <h4 className="font-black text-slate-900 text-sm">การแจ้งเตือน</h4>
                    <button
                      onClick={() => markAllAsRead()}
                      className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline"
                    >
                      อ่านทั้งหมด
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div key={n.id} className={cn("p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors", !n.isRead && "bg-indigo-50/30")}>
                          <div className="flex gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                              n.type === 'booking' ? "bg-emerald-100 text-emerald-600" : n.type === 'message' ? "bg-indigo-100 text-indigo-600" : "bg-amber-100 text-amber-600"
                            )}>
                              {n.type === 'booking' ? <Calendar className="w-5 h-5" /> : n.type === 'message' ? <MessageSquare className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-black text-slate-900">{n.title}</p>
                              <p className="text-[11px] font-medium text-slate-500 leading-relaxed">{n.message}</p>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-10 text-center space-y-2">
                        <Bell className="w-10 h-10 text-slate-200 mx-auto" />
                        <p className="text-xs font-bold text-slate-400">ไม่มีการแจ้งเตือนใหม่ค่ะ</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
          
          <div className="relative group">
            <button
              onClick={() => !isAuthenticated ? setIsAuthModalOpen(true) : null}
              className="flex items-center gap-3 pl-3 pr-1.5 py-1.5 rounded-full border border-slate-200 hover:shadow-premium transition-all duration-300 bg-white"
            >
              <Menu className="w-5 h-5 text-slate-500 group-hover:text-slate-900 transition-colors" />
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-inner overflow-hidden">
                {isAuthenticated && user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
            </button>

            {isAuthenticated && (
              <div className="absolute top-full right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[110]">
                <div className="px-6 py-4 border-b border-slate-50 mb-2">
                  <p className="font-black text-slate-900 text-sm">{user?.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user?.email}</p>
                </div>
                <Link href="/dashboard" className="flex items-center gap-3 px-6 py-3 hover:bg-slate-50 text-sm font-bold text-slate-600 transition-colors">
                  <User className="w-4 h-4" />
                  หน้าแดชบอร์ด
                </Link>
                <Link href="/favorites" className="flex items-center gap-3 px-6 py-3 hover:bg-slate-50 text-sm font-bold text-slate-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  รายการที่บันทึกไว้
                </Link>
                <div className="h-px bg-slate-50 my-2" />
                <button
                  onClick={() => logout()}
                  className="w-full flex items-center gap-3 px-6 py-3 hover:bg-red-50 text-sm font-bold text-red-500 transition-colors"
                >
                  ออกจากระบบ
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}
