'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Truck,
  CheckCircle2,
  Navigation,
  Phone,
  ArrowRight,
  Zap,
  Activity,
  Globe,
  Route
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCurrencyStore } from '@/stores/useCurrencyStore'

interface ServiceJob {
  id: string
  clientName: string
  serviceType: string
  time: string
  location: string
  distance: string
  status: 'pending' | 'en_route' | 'completed'
  amount: number
}

const mockJobs: ServiceJob[] = [
  {
    id: 'JOB-772',
    clientName: 'Maria Garcia',
    serviceType: 'Elite Relocation Protocol',
    time: '09:00 AM',
    location: 'Skyline Residence (Chanthabouly)',
    distance: '3.2 KM',
    status: 'pending',
    amount: 1200000
  },
  {
    id: 'JOB-881',
    clientName: 'Somsak K.',
    serviceType: 'Sanitation Stack Deployment',
    time: '01:30 PM',
    location: 'Mekong Riverfront Apts',
    distance: '5.8 KM',
    status: 'en_route',
    amount: 450000
  }
]

export function ServiceJobCalendar() {
  const [jobs, setJobs] = useState<ServiceJob[]>(mockJobs)
  const { formatPrice } = useCurrencyStore()

  const updateStatus = (id: string, newStatus: ServiceJob['status']) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: newStatus } : j))
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="space-y-3">
            <div className="inline-flex items-center gap-3 bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] border border-emerald-500/20 shadow-glow">
               <Route className="w-4 h-4" />
               Logistics Pulse v4.2
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Operational <br/> <span className="text-primary italic">Ledger.</span></h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">Active Jobs • Real-time GPS Tracking</p>
         </div>
         <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 p-2 rounded-[1.5rem]">
            <button className="px-6 py-2.5 bg-white dark:bg-slate-700 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm text-primary">Daily</button>
            <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400">Weekly</button>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <AnimatePresence mode="popLayout">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-premium relative overflow-hidden group"
            >
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Temporal Metadata */}
                <div className="flex flex-col items-center gap-4 w-full lg:w-40 text-center shrink-0">
                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700 shadow-sm">
                     <Clock className="w-6 h-6 text-primary mb-1" />
                     <span className="text-xs font-black text-slate-900 dark:text-white tracking-tight">{job.time.split(' ')[0]}</span>
                  </div>
                  <div className="px-4 py-1.5 bg-primary/5 rounded-full border border-primary/10">
                     <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{job.distance} Delta</span>
                  </div>
                </div>

                {/* Engagement Identity */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                  <div className="space-y-3">
                     <div className="flex items-center justify-center lg:justify-start gap-3">
                        <span className={cn(
                          "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-glow transition-all",
                          job.status === 'pending' ? "bg-amber-500 text-white border-amber-600" :
                          job.status === 'en_route' ? "bg-indigo-500 text-white border-indigo-600" :
                          "bg-emerald-500 text-white border-emerald-600"
                        )}>
                          {job.status.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol ID • {job.id}</span>
                     </div>
                     <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{job.serviceType}</h3>
                     <p className="flex items-center justify-center lg:justify-start gap-2 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider">
                        <MapPin className="w-4 h-4 text-primary" />
                        {job.location}
                     </p>
                  </div>

                  <div className="flex items-center justify-center lg:justify-start gap-10 pt-6 border-t border-slate-50 dark:border-slate-800">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                           <Globe className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Client Identity</p>
                           <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">{job.clientName}</p>
                        </div>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Deployment Yield</p>
                        <p className="text-xs font-black text-primary uppercase tracking-widest">{formatPrice(job.amount)}</p>
                     </div>
                  </div>
                </div>

                {/* Operations Terminal */}
                <div className="flex flex-col gap-4 w-full lg:w-56 shrink-0 lg:pl-10 lg:border-l border-slate-50 dark:border-slate-800">
                   {job.status === 'pending' && (
                      <motion.button
                         whileHover={{ scale: 1.02 }}
                         whileTap={{ scale: 0.98 }}
                         onClick={() => updateStatus(job.id, 'en_route')}
                         className="btn-primary w-full py-5 text-[10px] scale-100 flex items-center justify-center gap-3"
                      >
                         <Truck className="w-5 h-5 stroke-[2.5]" />
                         Initiate Transit
                      </motion.button>
                   )}
                   {job.status === 'en_route' && (
                      <motion.button
                         whileHover={{ scale: 1.02 }}
                         whileTap={{ scale: 0.98 }}
                         onClick={() => updateStatus(job.id, 'completed')}
                         className="w-full py-5 bg-emerald-500 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-glow"
                      >
                         <CheckCircle2 className="w-5 h-5 stroke-[3]" />
                         Finalize Mission
                      </motion.button>
                   )}
                   {job.status === 'completed' && (
                      <div className="w-full py-5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] text-center border border-slate-100 dark:border-slate-700">
                         Protocol Complete
                      </div>
                   )}
                   <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="py-5 border-2 border-slate-100 dark:border-slate-800 text-slate-400 hover:text-primary hover:border-primary/30 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3"
                   >
                      <Phone className="w-4 h-4" />
                      Client Comms
                   </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Operational Velocity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="bg-primary/5 dark:bg-primary/10 p-10 rounded-[3.5rem] border border-primary/20 flex items-center justify-between group">
            <div className="space-y-2">
               <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3">Daily Yield Delta</p>
               <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{formatPrice(1650000)}</p>
            </div>
            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-premium group-hover:rotate-12 transition-transform">
               <Zap className="w-10 h-10 text-primary fill-primary" />
            </div>
         </div>
         <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-premium group">
            <div className="space-y-2">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Queue Status</p>
               <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">04 Operations</p>
            </div>
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center shadow-sm">
               <Activity className="w-10 h-10 text-slate-300" />
            </div>
         </div>
      </div>
    </div>
  )
}
