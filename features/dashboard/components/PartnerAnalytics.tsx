'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useCurrencyStore } from '@/stores/useCurrencyStore';
import { ArrowUpRight, ArrowDownRight, Eye, Users, Calendar, Wallet, Zap, Sparkles, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const data = [
  { name: 'Mon', earnings: 1200000, views: 45, optimization: 65 },
  { name: 'Tue', earnings: 1800000, views: 52, optimization: 68 },
  { name: 'Wed', earnings: 1500000, views: 48, optimization: 72 },
  { name: 'Thu', earnings: 2200000, views: 61, optimization: 80 },
  { name: 'Fri', earnings: 3100000, views: 75, optimization: 85 },
  { name: 'Sat', earnings: 2800000, views: 92, optimization: 88 },
  { name: 'Sun', earnings: 3500000, views: 88, optimization: 92 },
];

export function PartnerAnalytics() {
  const { formatPrice } = useCurrencyStore();

  return (
    <div className="space-y-12">
      {/* AI Pulse Header */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group border border-white/10 shadow-glow">
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full -mr-48 -mt-48 blur-[100px] animate-pulse" />
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-3 bg-primary/20 text-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20">
                  <BrainCircuit className="w-4 h-4" />
                  Real-time Neural Analysis
               </div>
               <h2 className="text-4xl font-black tracking-tighter leading-none">Market Visibility <br/> <span className="text-primary italic">Optimized.</span></h2>
               <p className="text-slate-400 font-bold text-sm max-w-lg">Your portfolio visibility is 24% higher than the district average this week. AI suggests adjusting weekend rates by +5% to maximize yield.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 flex flex-col items-center gap-2 min-w-[180px]">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nest Score</p>
               <p className="text-5xl font-black text-white tracking-tighter">984</p>
               <span className="text-[10px] font-black text-emerald-400 uppercase bg-emerald-400/10 px-3 py-1 rounded-full">+12pts</span>
            </div>
         </div>
      </div>

      {/* Primary Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Net Alpha Yield', value: formatPrice(16100000), trend: '+14%', icon: Wallet, color: 'primary' },
          { label: 'Neural Impressions', value: '1,240', trend: '+22%', icon: Eye, color: 'emerald' },
          { label: 'Operational Requests', value: '12', trend: '+5%', icon: Calendar, color: 'amber' },
          { label: 'Conversion Delta', value: '98%', trend: '+1%', icon: Users, color: 'indigo' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-premium group hover:-translate-y-2 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
               <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", `bg-${stat.color === 'primary' ? 'primary' : stat.color + '-500'}`)}>
                  <stat.icon className="w-6 h-6" />
               </div>
               <span className="flex items-center text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                  {stat.trend}
               </span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Alpha Yield Chart */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-premium relative overflow-hidden">
          <div className="flex justify-between items-center mb-12">
             <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Financial Velocity</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">7-Day Transaction Cycle</p>
             </div>
             <div className="flex bg-slate-50 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-700">
                <button className="px-4 py-2 bg-white dark:bg-slate-700 text-[10px] font-black uppercase rounded-xl shadow-sm text-primary transition-all">Weekly</button>
                <button className="px-4 py-2 text-[10px] font-black uppercase rounded-xl text-slate-400 transition-all">Monthly</button>
             </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                    formatter={(value: any) => [formatPrice(Number(value)), 'Yield']}
                />
                <Area type="monotone" dataKey="earnings" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Neural Impressions Chart */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-premium">
          <div className="flex justify-between items-center mb-12">
             <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Search Dominance</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Impression Delta</p>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20">
                <Zap className="w-3.5 h-3.5 fill-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Optimal Range</span>
             </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                    dy={15}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                <Tooltip
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', backgroundColor: '#0f172a', color: '#fff' }}
                />
                <Line type="monotone" dataKey="views" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8, strokeWidth: 0 }} />
                <Line type="monotone" dataKey="optimization" stroke="#4f46e5" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Financial Protocol Log */}
      <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden relative">
         <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-slate-900 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-white">
                  <Wallet className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Withdrawal Ledger</h3>
            </div>
            <button className="btn-secondary px-8 py-3">Initiate Payout</button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                     <th className="px-10 py-6">Transaction ID</th>
                     <th className="px-10 py-6">Timestamp</th>
                     <th className="px-10 py-6">Net Value</th>
                     <th className="px-10 py-6">Protocol Status</th>
                     <th className="px-10 py-6 text-right">Manifest</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {[
                     { id: 'TX-9921', date: '20 Dec 2024', amount: 4500000, status: 'completed' },
                     { id: 'TX-8812', date: '15 Dec 2024', amount: 3200000, status: 'completed' },
                     { id: 'TX-7742', date: '08 Dec 2024', amount: 2800000, status: 'pending' },
                  ].map((payout) => (
                     <tr key={payout.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                        <td className="px-10 py-6 font-black text-slate-900 dark:text-white tracking-tight">{payout.id}</td>
                        <td className="px-10 py-6 text-xs font-bold text-slate-500 dark:text-slate-400">{payout.date}</td>
                        <td className="px-10 py-6 font-black text-primary">{formatPrice(payout.amount)}</td>
                        <td className="px-10 py-6">
                           <span className={cn(
                             "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 w-fit",
                             payout.status === 'completed' ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-glow"
                           )}>
                              <div className={cn("w-1.5 h-1.5 rounded-full", payout.status === 'completed' ? "bg-emerald-500" : "bg-amber-500 animate-pulse")} />
                              {payout.status === 'completed' ? 'Synced' : 'In Transit'}
                           </span>
                        </td>
                        <td className="px-10 py-6 text-right">
                           <button className="text-primary hover:text-indigo-800 font-black text-[10px] uppercase tracking-widest underline decoration-primary/30 underline-offset-4 group-hover:decoration-primary transition-all">Download Audit</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="p-8 bg-slate-50 dark:bg-slate-800/20 flex items-center justify-center gap-4">
             <Sparkles className="w-5 h-5 text-primary" />
             <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Verified Secure by BCEL One Pay Integration Protocol</p>
         </div>
      </div>
    </div>
  )
}
