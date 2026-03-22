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
  Clock,
  Zap,
  Info,
  DollarSign,
  Plus,
  Minus
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCurrencyStore } from '@/stores/useCurrencyStore'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { translations } from '@/lib/translations'

export function RelocationConcierge() {
  const { formatPrice } = useCurrencyStore()
  const { language } = useLanguageStore()
  const t = translations[language]
  const [selectedServices, setSelectedServices] = useState<string[]>(['rent'])

  const bundles = [
    { id: 'rent', label: 'Elite Rental', icon: Home, price: 3500000, desc: 'Verified luxury units' },
    { id: 'move', label: 'VIP Logistics', icon: Truck, price: 800000, desc: 'White-glove moving' },
    { id: 'clean', label: 'Pro Sanitation', icon: Sparkles, price: 350000, desc: 'Deep cleaning service' },
    { id: 'wifi', label: 'Gigabit Fiber', icon: Globe, price: 150000, desc: 'Pre-installed internet' },
  ]

  const total = selectedServices.reduce((acc, id) => {
    const item = bundles.find(b => b.id === id)
    return acc + (item?.price || 0)
  }, 0)

  const discount = selectedServices.length >= 3 ? total * 0.1 : 0

  const toggleService = (id: string) => {
    if (id === 'rent') return // Rent is mandatory
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-10 md:p-20 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-premium relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="flex flex-col lg:flex-row justify-between items-start gap-16 relative z-10">
        <div className="max-w-2xl space-y-8">
           <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 bg-primary text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-glow"
           >
              <Compass className="w-4 h-4 fill-white" />
              Relocation Protocol v2.0
           </motion.div>
           <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.85]">
              Seamless <br/> <span className="text-primary italic">Relocation.</span>
           </h2>
           <p className="text-slate-500 dark:text-slate-400 font-bold text-lg leading-relaxed max-w-lg">
              The first integrated moving stack in Laos. We handle the complexity, you enjoy the destination.
           </p>

           <div className="flex flex-wrap gap-4">
              {[
                { icon: ShieldCheck, label: 'Insured Logistics' },
                { icon: Clock, label: '48hr Execution' },
                { icon: Zap, label: 'Instant Activation' }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                   <badge.icon className="w-4 h-4 text-primary" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">{badge.label}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Market Estimator - Startup Style */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-white/10 w-full lg:w-96 shrink-0 space-y-8 relative group"
        >
           <div className="absolute inset-0 bg-primary/5 rounded-[3rem] blur-xl group-hover:bg-primary/10 transition-colors" />
           <div className="flex items-center gap-3 text-primary relative z-10">
              <Calculator className="w-6 h-6" />
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-white">Market Estimator</h4>
           </div>
           <div className="space-y-5 relative z-10">
              {[
                { label: 'Prime Rental', value: '₭4.5M - 12M' },
                { label: 'Expat Logistics', value: '₭2.5M - 5M' },
                { label: 'Full Concierge', value: '₭1.5M - 3M' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0">
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                   <span className="text-sm font-black text-white tracking-tighter">{item.value}</span>
                </div>
              ))}
           </div>
           <div className="pt-4 relative z-10">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                 <Info className="w-5 h-5 text-primary" />
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em] leading-relaxed">Live Vientiane market data synced 2min ago.</p>
              </div>
           </div>
        </motion.div>
      </div>

      {/* Interactive Selection Segment */}
      <div className="mt-24 space-y-12">
        <div className="flex items-center justify-between">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Configure Your Stack</h3>
           <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1 mx-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {bundles.map((bundle) => (
              <motion.button
                 key={bundle.id}
                 whileHover={{ y: -10 }}
                 whileTap={{ scale: 0.96 }}
                 onClick={() => toggleService(bundle.id)}
                 className={cn(
                    "p-10 rounded-[3rem] border-2 text-left transition-all duration-700 flex flex-col gap-8 relative overflow-hidden group",
                    selectedServices.includes(bundle.id)
                       ? "bg-white dark:bg-slate-900 border-primary shadow-2xl"
                       : "bg-slate-50 dark:bg-slate-800/50 border-transparent opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
                 )}
              >
                 <div className={cn(
                    "w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-700",
                    selectedServices.includes(bundle.id) ? "bg-primary text-white shadow-glow" : "bg-white dark:bg-slate-800 text-slate-400"
                 )}>
                    <bundle.icon className="w-8 h-8 stroke-[2]" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="font-black text-xl text-slate-900 dark:text-white tracking-tight leading-none">{bundle.label}</h4>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">{formatPrice(bundle.price)}</p>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2">{bundle.desc}</p>
                 </div>

                 <div className={cn(
                    "absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                    selectedServices.includes(bundle.id) ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-700 text-transparent"
                 )}>
                    <CheckCircle2 className="w-5 h-5" />
                 </div>
              </motion.button>
           ))}
        </div>
      </div>

      {/* Checkout Summary - Immersive Glass */}
      <motion.div
         layout
         className="mt-20 bg-slate-900 rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden shadow-glow"
      >
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full -mr-64 -mt-64 blur-[120px] pointer-events-none" />

         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-20">
            <div className="space-y-10 flex-1">
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                     <Zap className="w-8 h-8 text-primary fill-primary" />
                  </div>
                  <h3 className="text-4xl font-black tracking-tighter">Stack Summary</h3>
               </div>
               <div className="space-y-4">
                  <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Active Protocol Components</p>
                  <div className="flex flex-wrap gap-3">
                     {selectedServices.map(id => (
                        <motion.span
                          layout
                          key={id}
                          className="px-6 py-2.5 bg-white/5 backdrop-blur-xl rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10"
                        >
                           {bundles.find(b => b.id === id)?.label}
                        </motion.span>
                     ))}
                  </div>
               </div>
            </div>

            <div className="w-full lg:w-[450px] space-y-10 bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10">
               <div className="space-y-6">
                  <div className="flex justify-between items-center text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
                     <span>Gross Deployment</span>
                     <span className="text-white text-sm">{formatPrice(total)}</span>
                  </div>
                  {discount > 0 && (
                     <div className="flex justify-between items-center text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-2">
                           <Sparkles className="w-4 h-4" />
                           Multi-Stack Discount (10%)
                        </span>
                        <span className="text-sm">-{formatPrice(discount)}</span>
                     </div>
                  )}
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3">Net Commitment</p>
                        <span className="text-5xl font-black text-white tracking-tighter">{formatPrice(total - discount)}</span>
                     </div>
                  </div>
               </div>

               <button className="w-full py-6 bg-primary text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:shadow-glow transition-all active:scale-[0.98] flex items-center justify-center gap-4 group">
                  Confirm Deployment
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
               </button>

               <div className="flex items-center gap-3 justify-center opacity-40">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Secure Stripe Protocol v4.0</span>
               </div>
            </div>
         </div>
      </motion.div>
    </div>
  )
}
