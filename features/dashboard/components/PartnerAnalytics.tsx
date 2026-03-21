'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import { ArrowUpRight, ArrowDownRight, Eye, Users, Calendar, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const data = [
  { name: 'Mon', earnings: 1200000, views: 45 },
  { name: 'Tue', earnings: 1800000, views: 52 },
  { name: 'Wed', earnings: 1500000, views: 48 },
  { name: 'Thu', earnings: 2200000, views: 61 },
  { name: 'Fri', earnings: 3100000, views: 75 },
  { name: 'Sat', earnings: 2800000, views: 92 },
  { name: 'Sun', earnings: 3500000, views: 88 },
];

export function PartnerAnalytics() {
  const { formatPrice } = useCurrencyStore();

  return (
    <div className="space-y-8">
      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'ยอดรายได้สัปดาห์นี้', value: formatPrice(16100000), trend: '+14%', icon: Wallet, color: 'indigo' },
          { label: 'จำนวนการเข้าชม', value: '1,240', trend: '+22%', icon: Eye, color: 'emerald' },
          { label: 'คำขอจองใหม่', value: '12', trend: '+5%', icon: Calendar, color: 'amber' },
          { label: 'อัตราการตอบกลับ', value: '98%', trend: '+1%', icon: Users, color: 'pink' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
               <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5" />
               </div>
               <span className="flex items-center text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.trend}
               </span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-xl font-black text-slate-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Earnings Chart */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
             <div>
                <h3 className="font-black text-slate-900">แนวโน้มรายได้</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">7 วันที่ผ่านมา</p>
             </div>
             <select className="bg-slate-50 border-none rounded-xl text-xs font-bold px-3 py-2 outline-none">
                <option>รายสัปดาห์</option>
                <option>รายเดือน</option>
             </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                    dy={10}
                />
                <YAxis
                    hide
                />
                <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                    formatter={(value: any) => [formatPrice(Number(value)), 'Earnings']}
                />
                <Area type="monotone" dataKey="earnings" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Views Chart */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
             <div>
                <h3 className="font-black text-slate-900">การเข้าชมประกาศ</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">จำนวนผู้เข้าชมรายวัน</p>
             </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                    dy={10}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                />
                <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Payout Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-50">
            <h3 className="font-black text-slate-900">ประวัติการถอนเงิน</h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     <th className="px-8 py-4">ID รายการ</th>
                     <th className="px-8 py-4">วันที่</th>
                     <th className="px-8 py-4">จำนวนเงิน</th>
                     <th className="px-8 py-4">สถานะ</th>
                     <th className="px-8 py-4 text-right">ดำเนินการ</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {[
                     { id: 'TRX-9921', date: '20 Oct 2023', amount: 4500000, status: 'completed' },
                     { id: 'TRX-8812', date: '15 Oct 2023', amount: 3200000, status: 'completed' },
                     { id: 'TRX-7742', date: '08 Oct 2023', amount: 2800000, status: 'pending' },
                  ].map((payout) => (
                     <tr key={payout.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-5 font-bold text-slate-600">{payout.id}</td>
                        <td className="px-8 py-5 text-sm font-medium text-slate-500">{payout.date}</td>
                        <td className="px-8 py-5 font-black text-slate-900">{formatPrice(payout.amount)}</td>
                        <td className="px-8 py-5">
                           <span className={cn(
                             "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                             payout.status === 'completed' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                           )}>
                              {payout.status === 'completed' ? 'โอนสำเร็จ' : 'กำลังดำเนินการ'}
                           </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                           <button className="text-indigo-600 hover:text-indigo-800 font-black text-[10px] uppercase tracking-widest underline">โหลดใบเสร็จ</button>
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
