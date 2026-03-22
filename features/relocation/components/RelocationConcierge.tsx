'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Compass,
  Truck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Globe,
  Calculator,
  Home,
  ShieldCheck,
  Zap,
  Info,
  DollarSign
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCurrencyStore } from '@/stores/useCurrencyStore'
import { useLanguageStore } from '@/stores/useLanguageStore'

export function RelocationConcierge() {
  const { formatPrice } = useCurrencyStore()
  const { language } = useLanguageStore()
  const [selectedServices, setSelectedServices] = useState<string[]>(['rent'])

  const bundles = [
    { id: 'rent', label: 'ที่พักพรีเมียม (Rent)', icon: Home, price: 3500000 },
    { id: 'move', label: 'ขนย้าย Full-Service', icon: Truck, price: 800000 },
    { id: 'clean', label: 'ทำความสะอาด Deep Clean', icon: Sparkles, price: 350000 },
    { id: 'wifi', label: 'ติดตั้งอินเทอร์เน็ตความเร็วสูง', icon: Globe, price: 150000 },
  ]

  const total = selectedServices.reduce((acc, id) => {
    const item = bundles.find(b => b.id === id)
    return acc + (item?.price || 0)
  }, 0)

  const discount = selectedServices.length >= 3 ? total * 0.1 : 0

  const toggleService = (id: string) => {
    if (id === 'rent') return // Rent is mandatory for relocation bundle
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="max-w-2xl space-y-6">
           <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-200 dark:shadow-none">
              <Compass className="w-4 h-4" />
              Expat Relocation Concierge
           </div>
           <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              ย้ายเข้าเวียงจันทน์ <br/> <span className="text-indigo-600">แบบไร้กังวล</span>
           </h2>
           <p className="text-slate-500 dark:text-slate-400 font-bold text-lg leading-relaxed">
              จัดแพ็คเกจเริ่มต้นชีวิตใหม่ใน สปป. ลาว ให้เป็นเรื่องง่าย เลือกที่พักพร้อมบริการที่จำเป็นในคลิกเดียว พร้อมส่วนลดพิเศษสำหรับการ Bundle บริการ
           </p>
        </div>

        {/* Living Cost Mini Calculator */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 w-full md:w-80 shrink-0 space-y-6">
           <div className="flex items-center gap-2 text-indigo-600">
              <Calculator className="w-5 h-5" />
              <h4 className="font-black text-xs uppercase tracking-widest">Living Cost Estimator</h4>
           </div>
           <div className="space-y-4">
              {[
                { label: ' Rent & Utilities', value: '₭4.5M - 7M' },
                { label: ' Local Transport', value: '₭1.5M - 3M' },
                { label: ' Food & Lifestyle', value: '₭3M - 5M' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800 pb-3 last:border-0">
                   <span className="text-[10px] font-black text-slate-400 uppercase">{item.label}</span>
                   <span className="text-xs font-black text-slate-900 dark:text-white">{item.value}</span>
                </div>
              ))}
           </div>
           <p className="text-[9px] font-bold text-slate-400 text-center uppercase tracking-widest italic">Updated monthly for Vientiane</p>
        </div>
      </div>

      {/* Bundle Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {bundles.map((bundle) => (
            <motion.button
               key={bundle.id}
               whileHover={{ y: -8 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => toggleService(bundle.id)}
               className={cn(
                  "p-8 rounded-[2.5rem] border-2 text-left transition-all duration-500 flex flex-col gap-6 relative overflow-hidden group",
                  selectedServices.includes(bundle.id)
                     ? "bg-white dark:bg-slate-900 border-indigo-600 shadow-2xl shadow-indigo-100 dark:shadow-none"
                     : "bg-slate-100 dark:bg-slate-900/50 border-transparent opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
               )}
            >
               <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                  selectedServices.includes(bundle.id) ? "bg-indigo-600 text-white shadow-lg" : "bg-white dark:bg-slate-800 text-slate-400"
               )}>
                  <bundle.icon className="w-7 h-7" />
               </div>
               <div>
                  <h4 className="font-black text-slate-900 dark:text-white leading-tight mb-1">{bundle.label}</h4>
                  <p className="text-xs font-black text-indigo-600">{formatPrice(bundle.price)}</p>
               </div>
               {selectedServices.includes(bundle.id) && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 right-4 bg-indigo-600 text-white p-1 rounded-full">
                     <CheckCircle2 className="w-4 h-4" />
                  </motion.div>
               )}
            </motion.button>
         ))}
      </div>

      {/* Checkout Section */}
      <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#4f46e5,transparent_70%)]" />
         </div>

         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                     <Zap className="w-6 h-6 text-amber-400 fill-amber-400" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tight">สรุปแพ็คเกจย้ายเข้า</h3>
               </div>
               <div className="space-y-3">
                  <p className="text-indigo-100 opacity-70 uppercase tracking-widest text-[10px] font-black">รายการที่เลือก:</p>
                  <div className="flex flex-wrap gap-2">
                     {selectedServices.map(id => (
                        <span key={id} className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold border border-white/10">
                           {bundles.find(b => b.id === id)?.label}
                        </span>
                     ))}
                  </div>
               </div>
            </div>

            <div className="w-full md:w-96 space-y-6">
               <div className="space-y-4">
                  <div className="flex justify-between font-bold text-indigo-200">
                     <span>รวมทั้งหมด</span>
                     <span>{formatPrice(total)}</span>
                  </div>
                  {discount > 0 && (
                     <div className="flex justify-between font-black text-emerald-400">
                        <span className="flex items-center gap-2">
                           <Sparkles className="w-4 h-4" />
                           Bundle Discount (10%)
                        </span>
                        <span>-{formatPrice(discount)}</span>
                     </div>
                  )}
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between items-end">
                     <span className="text-sm font-black uppercase tracking-widest">ยอดชำระมัดจำ</span>
                     <span className="text-4xl font-black text-white">{formatPrice(total - discount)}</span>
                  </div>
               </div>

               <button className="w-full py-5 bg-white text-indigo-900 rounded-2xl font-black text-xl hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3">
                  ยืนยันการจอง Bundle
                  <ArrowRight className="w-6 h-6" />
               </button>

               <div className="flex items-center gap-2 justify-center opacity-60">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Safe & Fast Relocation Guarantee</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
