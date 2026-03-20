'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LayoutDashboard, Users, Building2, CheckCircle, ShieldAlert, BarChart3, Settings, Search, Bell, ShieldCheck, Zap } from 'lucide-react'
import { mockProperties } from '@/features/properties/services/mockData'
import { useCurrencyStore } from '@/stores/useCurrencyStore'
import { cn } from '@/lib/utils'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('verification')
  const { formatPrice } = useCurrencyStore()

  const stats = [
    { label: 'เจ้าของที่พักทั้งหมด', value: '124', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'ที่พักที่รอยืนยัน', value: '08', icon: Building2, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'รายได้ค่าธรรมเนียม (เดือนนี้)', value: 12500000, icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Admin Hub Console</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">ระบบจัดการส่วนกลาง</h1>
            <p className="text-slate-500 font-bold mt-2">ดูแลและควบคุมคุณภาพพาร์ทเนอร์ในระบบ Vientiane Nest</p>
          </div>

          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
             <button
               onClick={() => setActiveTab('verification')}
               className={cn("px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all", activeTab === 'verification' ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-600")}
             >
                การยืนยันตัวตน
             </button>
             <button
               onClick={() => setActiveTab('featured')}
               className={cn("px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all", activeTab === 'featured' ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-600")}
             >
                จัดการรายการแนะนำ
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6">
              <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center shrink-0", stat.bg)}>
                <stat.icon className={cn("w-8 h-8", stat.color)} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">
                  {typeof stat.value === 'number' ? formatPrice(stat.value) : stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden">
          {activeTab === 'verification' && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900">รายการรอยืนยัน (Verification Requests)</h3>
                <div className="relative">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                   <input type="text" placeholder="ค้นหาเจ้าของที่พัก..." className="pl-10 pr-6 py-2.5 bg-slate-50 rounded-xl border-none text-xs font-bold w-64 focus:ring-2 focus:ring-indigo-100 transition-all outline-none" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="pb-4 px-4">เจ้าของที่พัก</th>
                      <th className="pb-4 px-4">ประเภท</th>
                      <th className="pb-4 px-4">วันที่สมัคร</th>
                      <th className="pb-4 px-4">เอกสาร</th>
                      <th className="pb-4 px-4">สถานะ</th>
                      <th className="pb-4 px-4 text-right">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'คุณสายใจ แก้วสมหวัง', type: 'อพาร์ทเมนท์', date: '20 ก.ย. 2023', status: 'pending' },
                      { name: 'Souphanouvong L.', type: 'โรงแรม/เซอร์วิส', date: '18 ก.ย. 2023', status: 'pending' },
                      { name: 'คุณแสงเดือน', type: 'หอพักสตรี', date: '15 ก.ย. 2023', status: 'verified' },
                      { name: 'Vientiane Logistics', type: 'บริการขนย้าย', date: '12 ก.ย. 2023', status: 'verified' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
                        <td className="py-5 px-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">{row.name[0]}</div>
                              <span className="text-sm font-bold text-slate-900">{row.name}</span>
                           </div>
                        </td>
                        <td className="py-5 px-4 text-sm font-medium text-slate-500">{row.type}</td>
                        <td className="py-5 px-4 text-sm font-medium text-slate-500">{row.date}</td>
                        <td className="py-5 px-4">
                           <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest underline">ดูเอกสาร ID</button>
                        </td>
                        <td className="py-5 px-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                            row.status === 'verified' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                          )}>
                            {row.status === 'verified' ? 'ยืนยันแล้ว' : 'รอตรวจสอบ'}
                          </span>
                        </td>
                        <td className="py-5 px-4 text-right">
                           <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"><CheckCircle className="w-4 h-4" /></button>
                              <button className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"><ShieldAlert className="w-4 h-4" /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'featured' && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                   <h3 className="text-xl font-black text-slate-900">จัดการ Featured Properties</h3>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">คัดเลือกที่พักเพื่อแสดงในหน้าแรก (สลอตว่าง: 2/6)</p>
                </div>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                  + เพิ่มรายการแนะนำ
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {mockProperties.slice(0, 4).map((prop) => (
                    <div key={prop.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col gap-4">
                       <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                             <div className="w-12 h-12 bg-white rounded-xl overflow-hidden shadow-sm relative shrink-0">
                                <img src={prop.images[0]} className="w-full h-full object-cover" />
                             </div>
                             <div>
                                <h4 className="text-sm font-black text-slate-900 line-clamp-1">{prop.title}</h4>
                                <p className="text-[10px] font-bold text-slate-500">{prop.location}</p>
                             </div>
                          </div>
                          {prop.isFeatured && (
                            <div className="p-1.5 bg-indigo-600 text-white rounded-lg"><Zap className="w-3 h-3 fill-white" /></div>
                          )}
                       </div>

                       <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-200/50">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                             Rating: <span className="text-slate-900">{prop.rating}</span>
                          </div>
                          <button className={cn(
                            "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                            prop.isFeatured ? "bg-white text-rose-500 border border-rose-100" : "bg-indigo-600 text-white"
                          )}>
                             {prop.isFeatured ? 'ถอดออกจากหน้าแรก' : 'ตั้งเป็นรายการแนะนำ'}
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
