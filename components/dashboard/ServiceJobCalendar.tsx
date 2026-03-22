'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  User,
  Truck,
  CheckCircle2,
  Navigation,
  MoreVertical,
  Phone,
  ArrowRight
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
    serviceType: 'บริการขนย้าย Full-Service',
    time: '09:00 AM',
    location: 'หอพักสตรี ใกล้มหาวิทยาลัยลาว',
    distance: '3.2 กม.',
    status: 'pending',
    amount: 1200000
  },
  {
    id: 'JOB-881',
    clientName: 'Somsak K.',
    serviceType: 'ทำความสะอาดแบบ Deep Clean',
    time: '01:30 PM',
    location: 'อพาร์ทเมนท์ริมโขง (สีโคดตะบอง)',
    distance: '5.8 กม.',
    status: 'en_route',
    amount: 450000
  }
]

export function ServiceJobCalendar() {
  const [jobs, setJobs] = useState<ServiceJob[]>(mockJobs)
  const { formatPrice } = useCurrencyStore()

  const updateStatus = (id: string, newStatus: ServiceJob['status']) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: newStatus } : j))

    if (typeof window !== 'undefined' && (window as any).addToast) {
       (window as any).addToast(
         newStatus === 'en_route' ? 'เริ่มดำเนินการเดินทางแล้ว กดยืนยัน GPS ของคุณค่ะ' : 'เสร็จสิ้นภารกิจ! ระบบกำลังทำรายการเบิกจ่าย',
         'success'
       )
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
               ตารางงานบริการ (Service Jobs)
               <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full uppercase">Today</span>
            </h2>
            <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Job Ledger & GPS Navigation</p>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Time & Distance */}
                <div className="flex flex-col items-center gap-2 w-full md:w-32 text-center shrink-0">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-3xl flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700">
                     <Clock className="w-5 h-5 text-indigo-600 mb-1" />
                     <span className="text-[10px] font-black text-slate-900 dark:text-white">{job.time.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     <Navigation className="w-3 h-3" />
                     {job.distance}
                  </div>
                </div>

                {/* Job Info */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="space-y-1">
                     <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                          job.status === 'pending' ? "bg-amber-50 text-amber-600" :
                          job.status === 'en_route' ? "bg-indigo-50 text-indigo-600" :
                          "bg-emerald-50 text-emerald-600"
                        )}>
                          {job.status === 'pending' ? 'รอดำเนินการ' : job.status === 'en_route' ? 'กำลังเดินทาง' : 'เสร็จสมบูรณ์'}
                        </span>
                        <span className="text-[10px] font-bold text-slate-300">ID: {job.id}</span>
                     </div>
                     <h3 className="text-xl font-black text-slate-900 dark:text-white">{job.serviceType}</h3>
                     <p className="flex items-center justify-center md:justify-start gap-1.5 text-slate-500 font-medium">
                        <MapPin className="w-4 h-4 text-indigo-500" />
                        {job.location}
                     </p>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-6 pt-4 border-t border-slate-50 dark:border-slate-800">
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-xs text-slate-400">
                           {job.clientName[0]}
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{job.clientName}</span>
                     </div>
                     <div className="text-xs font-black text-indigo-600">
                        {formatPrice(job.amount)}
                     </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 w-full md:w-auto">
                   {job.status === 'pending' && (
                      <button
                         onClick={() => updateStatus(job.id, 'en_route')}
                         className="w-full md:w-40 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl"
                      >
                         <Truck className="w-4 h-4" />
                         เริ่มเดินทาง
                      </button>
                   )}
                   {job.status === 'en_route' && (
                      <button
                         onClick={() => updateStatus(job.id, 'completed')}
                         className="w-full md:w-40 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-100 dark:shadow-none"
                      >
                         <CheckCircle2 className="w-4 h-4" />
                         เสร็จสิ้นงาน
                      </button>
                   )}
                   {job.status === 'completed' && (
                      <div className="w-full md:w-40 py-4 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest text-center">
                         Completed
                      </div>
                   )}
                   <button className="py-4 border-2 border-slate-100 dark:border-slate-800 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" />
                      ติดต่อลูกค้า
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between">
            <div>
               <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em] mb-2">Total Earnings Today</p>
               <p className="text-3xl font-black text-slate-900 dark:text-white">{formatPrice(1650000)}</p>
            </div>
            <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm">
               <ArrowRight className="w-6 h-6 text-indigo-600 -rotate-45" />
            </div>
         </div>
         <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-sm">
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Scheduled Jobs</p>
               <p className="text-3xl font-black text-slate-900 dark:text-white">04 Jobs</p>
            </div>
            <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
               <CalendarIcon className="w-6 h-6 text-slate-400" />
            </div>
         </div>
      </div>
    </div>
  )
}
