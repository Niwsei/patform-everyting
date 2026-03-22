'use client'

import { Search, MapPin, Sparkles, Filter, ChevronDown  } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguageStore } from "@/stores/useLanguageStore"
import { translations } from "@/lib/translations"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function HeroSearch() {
    const { language } = useLanguageStore()
    const t = translations[language]
    const router = useRouter()
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('')
    const [category, setCategory] = useState('')
    const [isFocused, setIsFocused] = useState<string | null>(null)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if(location) params.append('location', location)
        if(priceRange) params.append('price', priceRange)
        if(category) params.append('category', category)

        router.push(`/properties?${params.toString()}`)
    }

    return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury Vientiane Estate"
            className="w-full h-full object-cover brightness-[0.4] dark:brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 glass px-6 py-3 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-white/20 shadow-glow"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Next-Gen Rental Network
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl sm:text-7xl lg:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.85]"
        >
          Find Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-cyan-300">Next Home.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl text-slate-300 mb-16 max-w-2xl mx-auto font-bold tracking-tight opacity-80"
        >
          Experience the first AI-integrated property ecosystem in Laos. <br className="hidden sm:block"/>
          Curated homes, verified landlords, seamless relocation.
        </motion.p>

        {/* Startup Style Search - Floating Glass Bar */}
        <motion.form
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          onSubmit={handleSearch}
          className="glass p-3 rounded-[2.5rem] sm:rounded-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-2 border border-white/20 shadow-2xl backdrop-blur-3xl group/form"
        >
          {/* Location Segment */}
          <div
            className={cn(
                "flex-1 w-full flex items-center px-8 py-4 transition-all duration-300 rounded-[2rem] sm:rounded-l-full cursor-pointer relative",
                isFocused === 'location' ? "bg-white/10" : "hover:bg-white/5"
            )}
            onClick={() => setIsFocused('location')}
          >
            <div className="flex flex-col text-left w-full">
              <div className="flex items-center gap-2 mb-1">
                 <MapPin className="w-3.5 h-3.5 text-primary" />
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{t.location}</span>
              </div>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setIsFocused('location')}
                onBlur={() => setIsFocused(null)}
                className="w-full bg-transparent text-slate-300 font-bold outline-none text-sm cursor-pointer appearance-none"
              >
                <option value="" className="bg-slate-900">{t.searchPlaceholder}</option>
                <option value="Chanthabouly" className="bg-slate-900">Chanthabouly</option>
                <option value="Sikhottabong" className="bg-slate-900">Sikhottabong</option>
                <option value="Xaysetha" className="bg-slate-900">Xaysetha</option>
                <option value="Sisattanak" className="bg-slate-900">Sisattanak</option>
              </select>
            </div>
          </div>

          <div className="hidden sm:block w-px h-12 bg-white/10" />

          {/* Type Segment */}
          <div
            className={cn(
                "flex-1 w-full flex items-center px-8 py-4 transition-all duration-300 rounded-[2rem] cursor-pointer",
                isFocused === 'type' ? "bg-white/10" : "hover:bg-white/5"
            )}
            onClick={() => setIsFocused('type')}
          >
            <div className="flex flex-col text-left w-full">
              <div className="flex items-center gap-2 mb-1">
                 <Filter className="w-3.5 h-3.5 text-primary" />
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Asset Class</span>
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onFocus={() => setIsFocused('type')}
                onBlur={() => setIsFocused(null)}
                className="w-full bg-transparent text-slate-300 font-bold outline-none text-sm cursor-pointer appearance-none"
              >
                <option value="" className="bg-slate-900">{t.allCategories}</option>
                <option value="hotel" className="bg-slate-900">Hotels & Suites</option>
                <option value="guesthouse" className="bg-slate-900">Guesthouses</option>
                <option value="vacation_home" className="bg-slate-900">Luxury Villas</option>
                <option value="apartment" className="bg-slate-900">Serviced Apartments</option>
              </select>
            </div>
          </div>

          <div className="hidden sm:block w-px h-12 bg-white/10" />

          {/* Budget Segment */}
          <div
            className={cn(
                "flex-1 w-full flex items-center px-8 py-4 transition-all duration-300 rounded-[2rem] sm:rounded-r-full cursor-pointer",
                isFocused === 'budget' ? "bg-white/10" : "hover:bg-white/5"
            )}
            onClick={() => setIsFocused('budget')}
          >
            <div className="flex flex-col text-left w-full">
              <div className="flex items-center gap-2 mb-1">
                 <Sparkles className="w-3.5 h-3.5 text-primary" />
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{language === 'EN' ? 'BUDGET' : 'งบประมาณ'}</span>
              </div>
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                onFocus={() => setIsFocused('budget')}
                onBlur={() => setIsFocused(null)}
                className="w-full bg-transparent text-slate-300 font-bold outline-none text-sm cursor-pointer appearance-none"
              >
                <option value="" className="bg-slate-900">{t.unlimitedPrice}</option>
                <option value="under_2m" className="bg-slate-900">Under 2M LAK</option>
                <option value="2m_to_5m" className="bg-slate-900">2M - 5M LAK</option>
                <option value="over_5m" className="bg-slate-900">Premium 5M+ LAK</option>
              </select>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-[1.5rem] sm:rounded-full flex items-center justify-center gap-3 transition-all font-black text-xs uppercase tracking-[0.2em] shadow-glow hover:brightness-110"
          >
            <Search className="w-5 h-5 stroke-[3]" />
            {t.searchBtn}
          </motion.button>
        </motion.form>

        {/* Quick Stats - Micro-interactions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-white/50"
        >
          <div className="flex items-center gap-2">
            <span className="text-white font-black">5,000+</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Listings</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-black">1.2k</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Verified Hosts</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white font-black">24/7</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Concierge</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
