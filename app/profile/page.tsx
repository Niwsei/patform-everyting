'use client'

import { useAuthStore } from "@/stores/useAuthStore"
import { useRewardStore } from "@/stores/useRewardStore"
import { motion } from "framer-motion"
import {
  User,
  ShieldCheck,
  Settings,
  Heart,
  MessageSquare,
  Clock,
  CreditCard,
  Lock,
  Smartphone,
  ChevronRight,
  Gift,
  Star,
  MapPin,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuthStore()
  const { points } = useRewardStore()

  if (!isAuthenticated) {
     return (
        <div className="min-h-screen flex items-center justify-center p-4">
           <div className="text-center space-y-4">
              <User className="w-12 h-12 text-slate-300 mx-auto" />
              <h2 className="text-xl font-bold">Please log in to view your profile</h2>
              <Link href="/" className="btn-primary inline-block">Go to Home</Link>
           </div>
        </div>
     )
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Identity Card (Bento Row 1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/20 rounded-bl-[5rem] -mr-16 -mt-16 pointer-events-none" />
             <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
                   <Image src={user?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200'} alt="User" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-2xl border-4 border-white dark:border-slate-900 shadow-lg">
                   <ShieldCheck className="w-5 h-5" />
                </div>
             </div>
             <div className="flex-1 text-center md:text-left space-y-4 relative z-10">
                <div>
                   <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{user?.name}</h1>
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">{user?.email}</p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                   <span className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100 dark:border-indigo-900/50">Member since 2023</span>
                   <span className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 dark:border-emerald-900/50 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      KYC Verified
                   </span>
                </div>
             </div>
             <button className="p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl text-slate-400 hover:text-indigo-600 transition-colors self-start md:self-center">
                <Settings className="w-6 h-6" />
             </button>
          </motion.div>

          {/* Nest Points Bento (Row 1 Side) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] p-10 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
             <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-2">
                   <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                      <Gift className="w-6 h-6 text-white" />
                   </div>
                   <h3 className="font-black text-lg uppercase tracking-tight">Nest Points</h3>
                </div>
                <div className="space-y-1">
                   <p className="text-4xl font-black">{points.toLocaleString()}</p>
                   <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Available to redeem</p>
                </div>
             </div>
             <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black text-xs uppercase tracking-widest mt-8 hover:shadow-xl transition-all active:scale-95">
                Redeem Rewards
             </button>
          </motion.div>

          {/* Activity Timeline (Bento Row 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800 space-y-8"
          >
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Recent Activity</h3>
                <Link href="/dashboard" className="text-[10px] font-black text-indigo-600 uppercase hover:underline">View All</Link>
             </div>
             <div className="space-y-6">
                {[
                  { icon: Heart, label: 'Saved a new property in Sisattanak', time: '2 hours ago', color: 'pink' },
                  { icon: MessageSquare, label: 'Message from Sarah (Concierge)', time: 'Yesterday', color: 'indigo' },
                  { icon: Star, label: 'Left a review for Mr. Fix-It', time: '3 days ago', color: 'amber' },
                ].map((act, i) => (
                  <div key={i} className="flex gap-4 group">
                     <div className={`w-10 h-10 bg-${act.color}-50 dark:bg-${act.color}-900/20 text-${act.color}-600 rounded-xl flex items-center justify-center shrink-0`}>
                        <act.icon className="w-5 h-5" />
                     </div>
                     <div className="space-y-1 border-b border-slate-50 dark:border-slate-800 pb-4 flex-1">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 transition-colors">{act.label}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{act.time}</p>
                     </div>
                  </div>
                ))}
             </div>
          </motion.div>

          {/* Security & Access (Bento Row 2 Side) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 bg-slate-900 rounded-[3rem] p-10 text-white grid grid-cols-1 md:grid-cols-2 gap-10 relative overflow-hidden"
          >
             <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-tl-[5rem] -mb-16 -mr-16 pointer-events-none" />
             <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <Lock className="w-6 h-6 text-indigo-400" />
                   <h3 className="font-black text-lg tracking-tight">Security Center</h3>
                </div>
                <div className="space-y-4">
                   <div className="p-4 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <Smartphone className="w-5 h-5 text-slate-400" />
                         <div>
                            <p className="text-xs font-bold">iPhone 14 Pro</p>
                            <p className="text-[9px] text-slate-500 uppercase">Vientiane, LA • Active Now</p>
                         </div>
                      </div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                   </div>
                   <button className="w-full py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                      Update Password
                   </button>
                </div>
             </div>

             <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <CreditCard className="w-6 h-6 text-indigo-400" />
                   <h3 className="font-black text-lg tracking-tight">Payment Methods</h3>
                </div>
                <div className="space-y-4">
                   <div className="p-4 bg-white/5 rounded-3xl border border-white/10 flex items-center gap-3">
                      <div className="w-10 h-8 bg-[#e31837] rounded flex items-center justify-center font-black text-[8px]">ONE</div>
                      <div className="flex-1">
                         <p className="text-xs font-bold">BCEL One Pay</p>
                         <p className="text-[9px] text-slate-500 uppercase">Connected Account</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                   </div>
                   <button className="w-full py-4 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">
                      Add New Method
                   </button>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </main>
  )
}
