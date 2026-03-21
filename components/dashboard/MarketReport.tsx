'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  Map,
  Target,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCurrencyStore } from '@/stores/useCurrencyStore'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const marketData = [
  { name: 'Chanthabouly', current: 4200000, market: 3800000 },
  { name: 'Sikhottabong', current: 3500000, market: 3400000 },
  { name: 'Sisattanak', current: 4500000, market: 4800000 },
  { name: 'Xaysetha', current: 3200000, market: 3100000 },
]

export function MarketReport() {
  const { formatPrice } = useCurrencyStore()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
               AI Market Report
               <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase">Beta</span>
            </h2>
            <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Real-time Vientiane Market Analysis</p>
         </div>
         <button className="p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm text-slate-400 hover:text-indigo-600 transition-colors">
            <HelpCircle className="w-5 h-5" />
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Price Gap Analysis */}
         <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-black text-slate-900 dark:text-white">เปรียบเทียบราคาตลาดรายย่าน</h3>
               <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                     <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                     <span className="text-[10px] font-black text-slate-400 uppercase">ราคาของคุณ</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <div className="w-2.5 h-2.5 bg-slate-200 rounded-full" />
                     <span className="text-[10px] font-black text-slate-400 uppercase">ราคาตลาด</span>
                  </div>
               </div>
            </div>

            <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                     <YAxis hide />
                     <Tooltip
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                        formatter={(value: any) => [formatPrice(Number(value)), '']}
                     />
                     <Bar dataKey="current" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={24} />
                     <Bar dataKey="market" fill="#e2e8f0" radius={[6, 6, 0, 0]} barSize={24} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* AI Profit Tips */}
         <div className="space-y-6">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-8 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-900/50 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform" />
               <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200 dark:shadow-none">
                  <TrendingUp className="w-5 h-5" />
               </div>
               <h4 className="font-black text-slate-900 dark:text-white text-lg mb-2">โอกาสทำกำไร</h4>
               <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 leading-relaxed">
                  ราคาห้องพักในย่าน <span className="font-black">จันทะบูลี</span> มีแนวโน้มเพิ่มขึ้น 8% ในไตรมาสหน้า แนะนำให้ปรับสัญญาเป็นแบบ 6 เดือน
               </p>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6">
               <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <h4 className="font-black text-sm uppercase tracking-widest">AI Optimization</h4>
               </div>
               <ul className="space-y-4">
                  {[
                     'เพิ่มรูปภาพส่วนห้องครัวเพื่อเพิ่มโอกาสจอง 15%',
                     'เปิดรับชาวต่างชาติเพิ่มขึ้นโดยใช้ระบบ KYC ของเรา',
                     'ลดราคา 5% สำหรับสัญญาเช่า 1 ปีขึ้นไป'
                  ].map((tip, i) => (
                     <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0" />
                        <p className="text-xs font-medium text-slate-300 leading-relaxed">{tip}</p>
                     </li>
                  ))}
               </ul>
               <button className="w-full py-4 bg-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                  ดำเนินการตามแนะนำ
                  <ArrowRight className="w-4 h-4" />
               </button>
            </div>
         </div>
      </div>

      {/* Demand Map Mock */}
      <div className="bg-slate-50 dark:bg-slate-800/50 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 text-center space-y-6">
         <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-sm flex items-center justify-center mx-auto">
            <Target className="w-8 h-8 text-indigo-600" />
         </div>
         <div className="space-y-2">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">พื้นที่ความต้องการสูง (Hotzones)</h3>
            <p className="text-sm font-bold text-slate-400 max-w-md mx-auto">ขณะนี้ย่าน สีสัตตนาค กำลังมีความต้องการที่พักแบบพรีเมียมสูงที่สุด หากคุณมีห้องในย่านนี้ แนะนำให้ลงประกาศทันที</p>
         </div>
         <div className="flex justify-center gap-8">
            <div className="text-center">
               <p className="text-2xl font-black text-slate-900 dark:text-white">High</p>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Demand</p>
            </div>
            <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
               <p className="text-2xl font-black text-emerald-500">Low</p>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Competition</p>
            </div>
         </div>
      </div>
    </div>
  )
}
