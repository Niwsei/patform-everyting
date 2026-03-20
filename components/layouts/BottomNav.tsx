'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Heart, User, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: 'Explore', href: '/' },
    { icon: Search, label: 'Search', href: '/properties' },
    { icon: Heart, label: 'Saved', href: '/favorites' },
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: User, label: 'Profile', href: '/profile' },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-1"
            >
              <div className={cn(
                "p-2 rounded-xl transition-all",
                isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-400"
              )}>
                <item.icon className={cn("w-6 h-6", isActive && "stroke-[2.5px]")} />
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest",
                isActive ? "text-indigo-600" : "text-slate-400"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
