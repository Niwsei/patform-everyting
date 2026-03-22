'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Heart, User, LayoutDashboard, Compass, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: 'Hub', href: '/' },
    { icon: Search, label: 'Explore', href: '/properties' },
    { icon: Compass, label: 'Hotzones', href: '/neighborhoods' },
    { icon: Cpu, label: 'Matrix', href: '/dashboard' },
  ]

  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
       <div className="bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/10 px-8 py-4 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="flex justify-between items-center max-w-md mx-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 relative",
                    isActive ? "bg-primary text-white shadow-glow scale-110" : "text-slate-400 hover:text-white"
                  )}>
                    <item.icon className={cn("w-6 h-6", isActive ? "stroke-[2.5]" : "stroke-[2]")} />
                    {isActive && (
                       <motion.div
                         layoutId="bottom-nav-glow"
                         className="absolute -inset-1 bg-primary/20 blur-lg rounded-2xl -z-10"
                       />
                    )}
                  </div>
                  <span className={cn(
                    "text-[8px] font-black uppercase tracking-[0.2em] transition-colors duration-500",
                    isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-300"
                  )}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
       </div>
    </div>
  )
}
