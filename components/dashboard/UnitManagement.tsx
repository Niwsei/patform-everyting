'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  ArrowUpRight,
  AlertCircle,
  MoreHorizontal,
  ChevronRight,
  Database,
  Layers,
  Settings2,
  Zap,
  Activity,
  User
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCurrencyStore } from '@/stores/useCurrencyStore'

const unitsData = [
  { id: '1', number: '101', type: 'Executive Studio', status: 'occupied', rent: 3500000, tenant: 'Alex S.', trust: 98 },
  { id: '2', number: '102', type: 'Executive Studio', status: 'occupied', rent: 3500000, tenant: 'John D.', trust: 94 },
  { id: '3', number: '103', type: 'Executive Studio', status: 'maintenance', rent: 3500000 },
  { id: '4', number: '104', type: 'Penthouse Lite', status: 'available', rent: 4500000 },
  { id: '5', number: '105', type: 'Executive Studio', status: 'occupied', rent: 3500000, tenant: 'Maria G.', trust: 99 },
]

export function UnitManagement() {
  const [units, setUnits] = useState(unitsData)
  const { formatPrice } = useCurrencyStore()

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-3">
           <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20 shadow-glow">
              <Database className="w-4 h-4" />
              Asset Inventory Protocol
           </div>
           <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Estate <br/> <span className="text-primary italic">Inventory.</span></h2>
           <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">Managed Units • Skyline Suites Vientiane</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-8 py-5 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-glow hover:brightness-110 transition-all"
        >
           <Plus className="w-4 h-4 stroke-[3]" />
           Deploy New Asset
        </motion.button>
      </div>

      {/* Deployment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-premium relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex items-center justify-between mb-8">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Operational Density</p>
               <Activity className="w-4 h-4 text-primary" />
            </div>
            <div className="flex items-end gap-3 relative z-10">
               <p className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">80%</p>
               <span className="mb-2 text-[10px] font-black text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg">
                  <ArrowUpRight className="w-3 h-3 stroke-[3]" />
                  +5.2%
               </span>
            </div>
            <div className="mt-8 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative z-10">
               <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 2, ease: "circOut" }} className="h-full bg-primary shadow-glow" />
            </div>
         </div>

         <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-premium group">
            <div className="flex items-center justify-between mb-8">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Alpha Yield</p>
               <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{formatPrice(10500000)}</p>
            <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Calculated across 4/5 Assets</p>
         </div>

         <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-premium group">
            <div className="flex items-center justify-between mb-8">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Maintenance Backlog</p>
               <AlertCircle className="w-4 h-4 text-rose-500" />
            </div>
            <div className="flex items-center gap-4">
               <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">01</p>
               <span className="text-[10px] font-black text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full uppercase tracking-widest">Priority</span>
            </div>
            <p className="mt-4 text-[10px] font-black text-primary underline decoration-primary/30 underline-offset-8 uppercase tracking-widest cursor-pointer hover:decoration-primary transition-all">Launch Repair Protocol</p>
         </div>
      </div>

      {/* Asset Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden">
         <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
            <div className="flex items-center gap-4">
               <Layers className="w-5 h-5 text-slate-400" />
               <h3 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest">Unit Manifest</h3>
            </div>
            <button className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all shadow-sm">
               <Settings2 className="w-5 h-5 text-slate-400" />
            </button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/20 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
                     <th className="px-10 py-6">Identity</th>
                     <th className="px-10 py-6">Asset Class</th>
                     <th className="px-10 py-6">Status Delta</th>
                     <th className="px-10 py-6">Contract Rate</th>
                     <th className="px-10 py-6">Operational Lead</th>
                     <th className="px-10 py-6 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {units.map((unit) => (
                     <tr key={unit.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                        <td className="px-10 py-8">
                           <span className="font-black text-slate-900 dark:text-white tracking-tight">Unit #{unit.number}</span>
                        </td>
                        <td className="px-10 py-8">
                           <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{unit.type}</span>
                        </td>
                        <td className="px-10 py-8">
                           <span className={cn(
                             "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 w-fit",
                             unit.status === 'occupied' ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20" :
                             unit.status === 'available' ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-glow" :
                             "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                           )}>
                              <div className={cn("w-1 h-1 rounded-full", unit.status === 'occupied' ? "bg-indigo-500" : unit.status === 'available' ? "bg-emerald-500" : "bg-amber-500 animate-pulse")} />
                              {unit.status}
                           </span>
                        </td>
                        <td className="px-10 py-8">
                           <span className="font-black text-slate-900 dark:text-white text-sm tracking-tight">{formatPrice(unit.rent)}</span>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                 <User className="w-4 h-4 text-slate-400" />
                              </div>
                              <div>
                                 <p className="text-xs font-black text-slate-900 dark:text-white">{unit.tenant || '-'}</p>
                                 {unit.trust && <p className="text-[9px] font-black text-emerald-500 uppercase">Trust: {unit.trust}</p>}
                              </div>
                           </div>
                        </td>
                        <td className="px-10 py-8 text-right">
                           <button className="w-10 h-10 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white">
                              <MoreHorizontal className="w-5 h-5" />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  )
}
