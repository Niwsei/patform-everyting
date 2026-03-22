'use client'

import Link from "next/link"
import { Heart, Menu, User, Truck, MapPin, Bell, Search, Calendar, MessageSquare, LayoutDashboard, Globe, ChevronDown } from "lucide-react"
import { useFavoriteStore } from "@/stores/useFavoriteStore"
import { useCurrencyStore, Currency } from "@/stores/useCurrencyStore"
import { useLanguageStore, Language } from "@/stores/useLanguageStore"
import { useNotificationStore } from "@/stores/useNotificationStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { useThemeStore } from "@/stores/useThemeStore"
import { useRewardStore } from "@/stores/useRewardStore"
import { AuthModal } from "@/components/auth/AuthModal"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export function MainNavbar() {
    const savedCount = useFavoriteStore((state) => state.savedPropertyIds.length)
    const { currency, setCurrency } = useCurrencyStore()
    const { language, setLanguage } = useLanguageStore()
    const { theme, toggleTheme } = useThemeStore()
    const { points } = useRewardStore()
    const { notifications, unreadCount, markAllAsRead } = useNotificationStore()
    const { isAuthenticated, user, logout } = useAuthStore()
    const t = translations[language]
    const [isScrolled, setIsScrolled] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-700",
        isScrolled
          ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-3 border-b border-slate-200/50 dark:border-slate-800/50"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-2xl font-black text-2xl shadow-premium group-hover:shadow-glow transition-all duration-500"
          >
            VN
          </motion.div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tighter hidden sm:block text-slate-900 dark:text-white">
              VIENTIANE NEST
            </span>
            <div className="flex items-center gap-1.5 hidden sm:flex">
              <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_var(--primary)]" />
              <span className="text-[9px] font-black text-primary tracking-[0.3em] uppercase opacity-80">
                Startup Edition
              </span>
            </div>
          </div>
        </Link>

        {/* Dynamic Nav - Center */}
        <nav className="hidden lg:flex items-center glass p-1.5 rounded-[2rem] border border-white/40 dark:border-white/10 shadow-premium">
          <Link
            href="/properties"
            className="px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-all rounded-[1.5rem] hover:bg-white dark:hover:bg-slate-800 hover:shadow-premium flex items-center gap-2"
          >
            <Search className="w-3.5 h-3.5 stroke-[3]" />
            {t.findHome}
          </Link>
          <Link
            href="/services"
            className="px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-all rounded-[1.5rem] hover:bg-white dark:hover:bg-slate-800 hover:shadow-premium flex items-center gap-2"
          >
            <Truck className="w-3.5 h-3.5 stroke-[3]" />
            {t.services}
          </Link>
          <Link
            href="/neighborhoods"
            className="px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-all rounded-[1.5rem] hover:bg-white dark:hover:bg-slate-800 hover:shadow-premium flex items-center gap-2"
          >
            <MapPin className="w-3.5 h-3.5 stroke-[3]" />
            {t.guides}
          </Link>
          <Link
            href="/onboarding"
            className="px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] text-white bg-primary transition-all rounded-[1.5rem] shadow-glow flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t.partner}
          </Link>
        </nav>

        {/* Global Controls & Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Market Controls Dropdown (Mobile Optimized) */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
             {/* Currency */}
             <select
               value={currency}
               onChange={(e) => setCurrency(e.target.value as Currency)}
               className="bg-transparent text-[10px] font-black text-slate-600 dark:text-slate-400 outline-none cursor-pointer px-1"
             >
               <option value="LAK">₭ LAK</option>
               <option value="USD">$ USD</option>
               <option value="THB">฿ THB</option>
             </select>
             <div className="w-px h-3 bg-slate-300 dark:bg-slate-600 mx-1" />
             {/* Language */}
             <button
                onClick={() => setLanguage(language === 'TH' ? 'EN' : language === 'EN' ? 'LO' : 'TH')}
                className="flex items-center gap-1.5 px-1 hover:text-primary transition-colors"
             >
                <Globe className="w-3 h-3" />
                <span className="text-[10px] font-black">{language}</span>
             </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-all duration-300 rounded-xl hover:bg-white dark:hover:bg-slate-800 shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={cn(
                "w-10 h-10 flex items-center justify-center text-slate-500 hover:text-primary dark:text-slate-400 transition-all rounded-xl",
                showNotifications && "bg-white dark:bg-slate-800 text-primary shadow-premium"
              )}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-ping" />
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute top-full right-0 mt-4 w-80 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-[100]"
                >
                  <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                    <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-widest">Feed</h4>
                    <button
                      onClick={() => markAllAsRead()}
                      className="text-[9px] font-black text-primary uppercase tracking-widest hover:opacity-70 transition-opacity"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div key={n.id} className={cn("p-4 rounded-2xl mb-1 last:mb-0 transition-colors", !n.isRead ? "bg-indigo-50/50 dark:bg-indigo-900/10" : "hover:bg-slate-50 dark:hover:bg-slate-800")}>
                          <div className="flex gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                              n.type === 'booking' ? "bg-emerald-100 text-emerald-600" : n.type === 'message' ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-600"
                            )}>
                              {n.type === 'booking' ? <Calendar className="w-5 h-5" /> : n.type === 'message' ? <MessageSquare className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-[11px] font-black text-slate-900 dark:text-white">{n.title}</p>
                              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{n.message}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-12 text-center">
                         <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-6 h-6 text-slate-300" />
                         </div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nothing New</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu Trigger */}
          <div className="relative">
            <button
              onClick={() => isAuthenticated ? setShowUserMenu(!showUserMenu) : setIsAuthModalOpen(true)}
              className="flex items-center gap-2.5 pl-3 pr-2 py-2 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 hover:shadow-premium transition-all duration-300 bg-white dark:bg-slate-900 group"
            >
              <Menu className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
              <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all overflow-hidden border border-slate-200 dark:border-slate-700">
                {isAuthenticated && user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {isAuthenticated && showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute top-full right-0 mt-4 w-64 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden py-3 z-[110]"
                >
                  <div className="px-6 py-4 border-b border-slate-50 dark:border-slate-800 mb-2">
                    <p className="font-black text-slate-900 dark:text-white text-sm">{user?.name}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                       <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[8px] font-black rounded-full uppercase tracking-widest">Pro User</span>
                       <span className="text-[10px] font-black text-slate-400">₭{points.toLocaleString()}</span>
                    </div>
                  </div>

                  {[
                    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                    { href: '/profile', icon: User, label: 'Profile' },
                    { href: '/favorites', icon: Heart, label: 'Saved Homes' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-slate-400" />
                      {item.label}
                    </Link>
                  ))}

                  <div className="h-px bg-slate-50 dark:bg-slate-800 my-2" />
                  <button
                    onClick={() => { logout(); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-3 px-6 py-3 hover:bg-red-50 dark:hover:bg-red-950/30 text-[11px] font-black text-red-500 uppercase tracking-widest transition-colors"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}
