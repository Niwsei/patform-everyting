'use client'

import { useRewardStore } from "@/stores/useRewardStore"
import { motion } from "framer-motion"
import { Gift, Share2, Copy, CheckCircle2, Users, ArrowRight, Zap, Coins } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function ReferralRewards() {
  const { points, referralCode, addPoints } = useRewardStore()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    if (typeof window !== 'undefined' && (window as any).addToast) {
       (window as any).addToast('คัดลอกรหัสแนะนำตัวแล้ว!', 'success')
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Rewards Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest">
                  <Gift className="w-4 h-4" />
                  Ecosystem Rewards
               </div>
               <h2 className="text-4xl font-black tracking-tight leading-none">แบ่งปันความสุข <br/> รับคะแนน Nest Points</h2>
               <p className="text-indigo-100 font-medium opacity-80 leading-relaxed max-w-sm">
                  ชวนเพื่อนมาจองที่พักหรือบริการในเวียงจันทน์ รับทันที 5,000 คะแนนต่อการแนะนำที่สำเร็จ!
               </p>

               <div className="flex gap-4 pt-4">
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex-1">
                     <p className="text-[10px] font-black uppercase text-indigo-300 mb-1">คะแนนปัจจุบัน</p>
                     <p className="text-3xl font-black">{points.toLocaleString()}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex-1 text-center">
                     <p className="text-[10px] font-black uppercase text-indigo-300 mb-1">รหัสของคุณ</p>
                     <p className="text-xl font-black tracking-widest">{referralCode}</p>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-4">
               <div className="p-8 bg-white rounded-[2.5rem] text-slate-900 shadow-2xl space-y-6">
                  <h3 className="font-black text-xl tracking-tight">คัดลอกรหัสแนะนำ</h3>
                  <div className="relative">
                     <input
                        type="text"
                        readOnly
                        value={referralCode}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 font-black text-lg text-center tracking-[0.3em] outline-none"
                     />
                     <button
                        onClick={handleCopy}
                        className={cn(
                           "absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all",
                           copied ? "bg-emerald-500 text-white" : "bg-slate-900 text-white hover:bg-black"
                        )}
                     >
                        {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                     </button>
                  </div>
                  <div className="flex gap-3">
                     <button className="flex-1 py-4 bg-[#25d366] text-white rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                        <Share2 className="w-4 h-4" />
                        WhatsApp
                     </button>
                     <button className="flex-1 py-4 bg-[#1877f2] text-white rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                        <Share2 className="w-4 h-4" />
                        Facebook
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Redemption Center */}
      <div className="space-y-6">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl flex items-center justify-center shadow-sm">
               <Coins className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">ศูนย์แลกสิทธิพิเศษ</h3>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
               { title: 'ส่วนลดค่าขนย้าย ₭50k', points: 1000, icon: Gift, color: 'indigo' },
               { title: 'ฟรี! แม่บ้านทำความสะอาด', points: 3500, icon: Zap, color: 'emerald' },
               { title: 'ลดค่ามัดจำแรกเข้า 5%', points: 5000, icon: CheckCircle2, color: 'pink' },
            ].map((reward, i) => (
               <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
                  <div className={`w-12 h-12 rounded-2xl bg-${reward.color}-50 dark:bg-${reward.color}-900/20 text-${reward.color}-600 flex items-center justify-center mb-6`}>
                     <reward.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-black text-slate-900 dark:text-white text-lg leading-tight mb-2">{reward.title}</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">ใช้ {reward.points.toLocaleString()} คะแนน</p>

                  <button
                     disabled={points < reward.points}
                     className={cn(
                        "w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                        points >= reward.points
                           ? "bg-slate-900 dark:bg-indigo-600 text-white hover:bg-indigo-600"
                           : "bg-slate-50 dark:bg-slate-800 text-slate-300 cursor-not-allowed"
                     )}
                  >
                     {points >= reward.points ? 'แลกสิทธิ์เลย' : 'คะแนนไม่พอ'}
                  </button>
               </div>
            ))}
         </div>
      </div>
    </div>
  )
}
