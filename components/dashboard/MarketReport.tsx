'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Target,
  ArrowRight,
  Zap,
  HelpCircle,
  BrainCircuit,
  Globe,
  Activity,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCurrencyStore } from '@/stores/useCurrencyStore'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts'

const marketData = [
  { name: 'Chanthabouly', current: 4200000, market: 3800000, demand: 95 },
  { name: 'Sikhottabong', current: 3500000, market: 3400000, demand: 72 },
  { name: 'Sisattanak', current: 4500000, market: 4800000, demand: 88 },
  { name: 'Xaysetha', current: 3200000, market: 3100000, demand: 65 },
]

export function MarketReport() {
  const { formatPrice } = useCurrencyStore()

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="space-y-3">
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20 shadow-glow">
               <Activity className="w-4 h-4" />
               Live Market Protocol v4.0
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Vientiane <br/> <span className="text-primary italic">Market Intelligence.</span></h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">Real-time Geospatial Pricing & Demand Delta</p>
         </div>
         <button className="w-14 h-14 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-premium text-slate-400 hover:text-primary transition-all flex items-center justify-center">
            <HelpCircle className="w-6 h-6" />
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Price Gap Analysis */}
         <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-premium relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
               <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Geospatial Benchmarking</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Portfolio Rate vs District Baseline</p>
               </div>
               <div className="flex gap-6 p-2 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2 px-3 py-1.5">
                     <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-glow" />
                     <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Active Rate</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5">
                     <div className="w-2.5 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
                     <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Market Alpha</span>
                  </div>
               </div>
            </div>

            <div className="h-80 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketData} barGap={12}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                     <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                        dy={15}
                     />
                     <YAxis hide />
                     <Tooltip
                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', backgroundColor: '#0f172a', color: '#fff' }}
                        itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                        cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
                        formatter={(value: any) => [formatPrice(Number(value)), '']}
                     />
                     <Bar dataKey="current" fill="#4f46e5" radius={[8, 8, 0, 0]} barSize={28} />
                     <Bar dataKey="market" fill="rgba(148, 163, 184, 0.2)" radius={[8, 8, 0, 0]} barSize={28} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* AI Strategy Logic */}
         <div className="lg:col-span-4 space-y-8">
            <motion.div
               whileHover={{ y: -5 }}
               className="bg-primary p-10 rounded-[3.5rem] text-white relative overflow-hidden group shadow-glow"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
               <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                  <TrendingUp className="w-8 h-8 stroke-[2.5]" />
               </div>
               <h4 className="text-2xl font-black tracking-tighter leading-none mb-3">Yield Opportunity</h4>
               <p className="text-sm font-bold text-white/80 leading-relaxed uppercase tracking-tight">
                  <span className="text-white underline decoration-white/30 underline-offset-4">Chanthabouly</span> is experiencing an 8.4% supply deficit. Adjust long-term contracts by <span className="text-white font-black">+12%</span> immediately.
               </p>
            </motion.div>

            <div className="bg-slate-900 p-10 rounded-[3.5rem] border border-white/10 text-white space-y-8 relative overflow-hidden group shadow-premium">
               <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="flex items-center gap-3 relative z-10">
                  <BrainCircuit className="w-6 h-6 text-primary" />
                  <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-primary">Neural Optimization</h4>
               </div>
               <ul className="space-y-6 relative z-10">
                  {[
                     'Enhance "Master Suite" imagery to boost engagement by 24%.',
                     'Deploy Expat-KYC protocol to reduce vacancy delta.',
                     'Implement 12-month loyalty incentives for 98% retention.'
                  ].map((tip, i) => (
                     <li key={i} className="flex items-start gap-4">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0 shadow-glow" />
                        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{tip}</p>
                     </li>
                  ))}
               </ul>
               <button className="w-full py-5 bg-white text-slate-900 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-white hover:shadow-glow transition-all active:scale-[0.98] flex items-center justify-center gap-3 relative z-10">
                  Execute Protocol
                  <ArrowRight className="w-4 h-4" />
               </button>
            </div>
         </div>
      </div>

      {/* Demand Heatmap Micro-module */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-12 rounded-[4rem] border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-[500px] h-full bg-[radial-gradient(circle_at_center,var(--primary),transparent)] opacity-[0.03] pointer-events-none" />
         <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="flex items-center gap-8">
               <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-[2rem] shadow-premium flex items-center justify-center shrink-0">
                  <Target className="w-10 h-10 text-primary" />
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">High-Yield Hotzones</h3>
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400 max-w-lg">Sisattanak demand for "Premium-Serviced" assets has reached a 12-month peak. Deployment in this sector is highly recommended.</p>
               </div>
            </div>

            <div className="flex gap-10 bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-premium border border-slate-100 dark:border-slate-700 min-w-[320px] justify-center">
               <div className="text-center">
                  <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Peak</p>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-2">Active Demand</p>
               </div>
               <div className="w-px h-12 bg-slate-100 dark:bg-slate-700" />
               <div className="text-center">
                  <p className="text-4xl font-black text-emerald-500 tracking-tighter">Low</p>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-2">Market Volatility</p>
               </div>
            </div>
         </div>

         <div className="mt-10 flex items-center justify-between pt-10 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
               <Globe className="w-5 h-5 text-slate-400" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Neural Map Instance #7742</span>
            </div>
            <button className="text-[10px] font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2 hover:gap-4 transition-all">
               View Neural Map <ChevronRight className="w-4 h-4" />
            </button>
         </div>
      </div>
    </div>
  )
}
