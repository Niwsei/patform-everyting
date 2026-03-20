'use client'

import Link from 'next/link'
import { LayoutDashboard, Home, Truck, BarChart3, Settings, Bell, Search, UserCircle, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'My Properties', icon: Home, href: '/dashboard/properties' },
    { label: 'My Services', icon: Truck, href: '/dashboard/services' },
    { label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
    { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-gray-100 transition-all duration-300 fixed h-full z-40 lg:relative",
          isSidebarOpen ? "w-72" : "w-0 lg:w-24 overflow-hidden"
        )}
      >
        <div className="h-full flex flex-col p-6">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-xl font-black text-xl shadow-lg shadow-indigo-200 shrink-0">
              V
            </div>
            {isSidebarOpen && <span className="text-xl font-black text-gray-900 tracking-tight">Hub Console</span>}
          </Link>

          <nav className="flex-1 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 transition-all active:scale-95"
              >
                <item.icon className="w-6 h-6 shrink-0" />
                {isSidebarOpen && <span className="font-bold text-sm tracking-wide">{item.label}</span>}
              </Link>
            ))}
          </nav>

          <div className="mt-auto bg-gray-900 rounded-[1.5rem] p-4 flex items-center gap-3 text-white overflow-hidden shadow-xl shadow-gray-200">
             <UserCircle className="w-10 h-10 text-indigo-400 shrink-0" />
             {isSidebarOpen && (
               <div className="flex flex-col">
                  <span className="text-sm font-black truncate">Souphanouvong L.</span>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Premium Landlord</span>
               </div>
             )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 py-6 flex items-center justify-between border-b border-gray-50">
           <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                 {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="hidden sm:flex relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Quick search..."
                  className="pl-10 pr-6 py-2.5 rounded-xl bg-gray-100/50 border-none text-sm font-bold w-64 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                />
              </div>
           </div>

           <div className="flex items-center gap-3">
              <button className="relative p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                 <Bell className="w-5 h-5 text-gray-500" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                 + Add Listing
              </button>
           </div>
        </header>

        <div className="p-8">
           {children}
        </div>
      </main>
    </div>
  )
}
