'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  PieChart,
  Settings2,
  Plus,
  ArrowUpRight,
  DoorOpen,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCurrencyStore } from '@/stores/useCurrencyStore'

const unitsData = [
  { id: '1', number: '101', type: 'Studio', status: 'occupied', rent: 3500000, tenant: 'Alex S.' },
  { id: '2', number: '102', type: 'Studio', status: 'occupied', rent: 3500000, tenant: 'John D.' },
  { id: '3', number: '103', type: 'Studio', status: 'maintenance', rent: 3500000 },
  { id: '4', number: '104', type: '1-Bedroom', status: 'available', rent: 4500000 },
  { id: '5', number: '105', type: 'Studio', status: 'occupied', rent: 3500000, tenant: 'Maria G.' },
]

export function UnitManagement() {
  const [units, setUnits] = useState(unitsData)
  const { formatPrice } = useCurrencyStore()

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">การจัดการยูนิตที่พัก</h2>
           <p className="text-sm font-bold text-slate-400 mt-1">อสังหาริมทรัพย์: อพาร์ทเมนท์ทันสมัย ใกล้ประตูชัย</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none active:scale-95">
           <Plus className="w-4 h-4" />
           เพิ่มยูนิตใหม่
        </button>
      </div>

      {/* Occupancy Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">อัตราการเข้าพัก (Occupancy)</p>
            <div className="flex items-end gap-3 relative z-10">
               <p className="text-4xl font-black text-slate-900 dark:text-white">80%</p>
               <span className="mb-1 text-xs font-bold text-emerald-500 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  +5%
               </span>
            </div>
            <div className="mt-6 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative z-10">
               <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ duration: 1.5 }} className="h-full bg-indigo-600 rounded-full" />
            </div>
         </div>

         <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm group">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">รายได้รวม (เดือนนี้)</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{formatPrice(10500000)}</p>
            <p className="mt-2 text-xs font-bold text-slate-400">จากยูนิตที่เข้าพัก 4/5 ห้อง</p>
         </div>

         <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm group">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">ซ่อมบำรุงที่ค้างอยู่</p>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
               </div>
               <p className="text-2xl font-black text-slate-900 dark:text-white">01 ยูนิต</p>
            </div>
            <p className="mt-2 text-xs font-bold text-indigo-600 underline cursor-pointer">ดูรายละเอียดงานซ่อม</p>
         </div>
      </div>

      {/* Unit List */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-black text-slate-900 dark:text-white">รายละเอียดยูนิต</h3>
            <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
               <Settings2 className="w-5 h-5 text-slate-400" />
            </button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                     <th className="px-8 py-4">ห้อง</th>
                     <th className="px-8 py-4">ประเภท</th>
                     <th className="px-8 py-4">สถานะ</th>
                     <th className="px-8 py-4">ค่าเช่า/เดือน</th>
                     <th className="px-8 py-4">ผู้เช่าปัจจุบัน</th>
                     <th className="px-8 py-4 text-right">การจัดการ</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {units.map((unit) => (
                     <tr key={unit.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                        <td className="px-8 py-5">
                           <span className="font-black text-slate-900 dark:text-white">Unit {unit.number}</span>
                        </td>
                        <td className="px-8 py-5">
                           <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{unit.type}</span>
                        </td>
                        <td className="px-8 py-5">
                           <span className={cn(
                             "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                             unit.status === 'occupied' ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" :
                             unit.status === 'available' ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" :
                             "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                           )}>
                              {unit.status === 'occupied' ? 'มีผู้เช่า' : unit.status === 'available' ? 'ว่าง' : 'ซ่อมบำรุง'}
                           </span>
                        </td>
                        <td className="px-8 py-5">
                           <span className="font-bold text-slate-700 dark:text-slate-300">{formatPrice(unit.rent)}</span>
                        </td>
                        <td className="px-8 py-5">
                           <span className="text-sm font-bold text-slate-900 dark:text-white">{unit.tenant || '-'}</span>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all text-slate-400 hover:text-slate-900 dark:hover:text-white">
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
