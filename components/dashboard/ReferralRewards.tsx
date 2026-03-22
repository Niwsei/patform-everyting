'use client'

import { useRewardStore } from "@/stores/useRewardStore"
import { motion } from "framer-motion"
import { Gift, Share2, Copy, CheckCircle2, Users, ArrowRight, Zap, Coins, Sparkles, Trophy } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function ReferralRewards() {
  const { points, referralCode, addPoints } = useRewardStore()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-12">
      {/* Alpha Rewards Engine */}
      <div className="bg-primary rounded-[4rem] p-12 text-white relative overflow-hidden shadow-glow">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full -mr-64 -mt-64 blur-[120px] pointer-events-none" />
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-10">
               <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-white">
                  <Trophy className="w-4 h-4 fill-white" />
                  Ecosystem Referral Alpha
               </div>
               <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9]">Scale the <br/> <span className="text-white italic opacity-80">Network.</span></h2>
               <p className="text-lg text-white/70 font-bold leading-relaxed max-w-md">
                  Deploy your unique protocol link. Earn <span className="text-white font-black">5,000 Nest Points</span> for every verified asset or service deployment.
               </p>

               <div className="flex flex-col sm:flex-row gap-6 pt-4">
                  <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 flex-1 group hover:bg-white/10 transition-all">
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-3">Balance</p>
                     <p className="text-4xl font-black tracking-tighter">{points.toLocaleString()} <span className="text-xs font-black uppercase opacity-40">pts</span></p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 flex-1 text-center group hover:bg-white/10 transition-all">
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-3">Unique ID</p>
                     <p className="text-2xl font-black tracking-[0.4em] uppercase">{referralCode}</p>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-5">
               <div className="p-10 bg-white dark:bg-slate-900 rounded-[3.5rem] text-slate-900 dark:text-white shadow-2xl space-y-8 relative overflow-hidden border border-white/10">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <h3 className="font-black text-2xl tracking-tighter leading-none text-center">Protocol Link</h3>
                  <div className="relative">
                     <input
                        type="text"
                        readOnly
                        value={referralCode}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-[1.5rem] p-6 font-black text-xl text-center tracking-[0.4em] outline-none text-primary"
                     />
                     <button
                        onClick={handleCopy}
                        className={cn(
                           "absolute right-3 top-1/2 -translate-y-1/2 p-4 rounded-2xl transition-all shadow-glow",
                           copied ? "bg-emerald-500 text-white" : "bg-primary text-white hover:brightness-110"
                        )}
                     >
                        {copied ? <CheckCircle2 className="w-5 h-5 stroke-[3]" /> : <Copy className="w-5 h-5 stroke-[3]" />}
                     </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <button className="py-4 bg-[#25d366] text-white rounded-[1.25rem] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-lg">
                        <Share2 className="w-4 h-4" />
                        WhatsApp
                     </button>
                     <button className="py-4 bg-[#0088cc] text-white rounded-[1.25rem] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-lg">
                        <Share2 className="w-4 h-4" />
                        Telegram
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Redemption Matrix */}
      <div className="space-y-10">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center border border-amber-500/20">
                     <Coins className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Reward Marketplace</h3>
               </div>
               <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">Convert alpha points into operational credits</p>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vault Sync:</span>
               <span className="text-[10px] font-black text-slate-900 dark:text-white">Live</span>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
               { title: '₭150k Moving Credit', points: 1000, icon: Gift, color: 'indigo', desc: 'Deploy for any logistics task' },
               { title: 'Sanitation Protocol', points: 3500, icon: Zap, color: 'emerald', desc: 'Full deep-clean deployment' },
               { title: '5% Contract Delta', points: 5000, icon: CheckCircle2, color: 'primary', desc: 'Deducted from security deposit' },
            ].map((reward, i) => (
               <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-premium hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all group flex flex-col h-full">
                  <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-lg", `bg-${reward.color === 'primary' ? 'primary' : reward.color + '-50'}`)}>
                     <reward.icon className={cn("w-8 h-8", reward.color === 'primary' ? 'text-white' : `text-${reward.color}-600`)} />
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white text-xl tracking-tight leading-none mb-3">{reward.title}</h4>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">{reward.desc}</p>

                  <div className="mt-auto space-y-6">
                     <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-slate-400">
                        <span>Cost Basis</span>
                        <span className={cn(points >= reward.points ? "text-primary" : "text-slate-300")}>{reward.points.toLocaleString()} pts</span>
                     </div>
                     <button
                        disabled={points < reward.points}
                        className={cn(
                           "w-full py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all",
                           points >= reward.points
                              ? "bg-slate-900 dark:bg-primary text-white hover:shadow-glow"
                              : "bg-slate-50 dark:bg-slate-800 text-slate-300 cursor-not-allowed"
                        )}
                     >
                        {points >= reward.points ? 'Redeem Protocol' : 'Insufficient Alpha'}
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  )
}
