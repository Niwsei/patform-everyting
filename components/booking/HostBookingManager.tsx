'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  XCircle,
  Calendar,
  Sparkles,
  FileText,
  Zap,
  ShieldCheck,
  BrainCircuit,
  UserCheck,
  Globe,
  ArrowRight,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useCurrencyStore } from '@/stores/useCurrencyStore'

interface BookingRequest {
  id: string
  propertyTitle: string
  tenantName: string
  tenantAvatar: string
  checkInDate: string
  status: 'pending' | 'approved' | 'declined'
  amount: number
  phone: string
  trustScore: number
}

const mockRequests: BookingRequest[] = [
  {
    id: 'REQ-001',
    propertyTitle: 'Modern Nordic Studio (Chanthabouly)',
    tenantName: 'Alex Smith',
    tenantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    checkInDate: 'Dec 24, 2024',
    status: 'pending',
    amount: 3650000,
    phone: '020 5555 1234',
    trustScore: 98
  },
  {
    id: 'REQ-002',
    propertyTitle: 'Riverfront Luxury Condo (Sikhottabong)',
    tenantName: 'Maria Garcia',
    tenantAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop',
    checkInDate: 'Jan 15, 2025',
    status: 'approved',
    amount: 6150000,
    phone: '020 9999 8888',
    trustScore: 94
  }
]

export function HostBookingManager() {
  const [requests, setRequests] = useState<BookingRequest[]>(mockRequests)
  const { formatPrice } = useCurrencyStore()

  const handleStatusUpdate = (id: string, newStatus: 'approved' | 'declined') => {
    setRequests(prev => prev.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    ))
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-4">
         <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Booking Pipeline</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold mt-3 text-sm uppercase tracking-wider">Managed verification and occupancy control center.</p>
         </div>
         <div className="flex items-center gap-3 glass px-5 py-2.5 rounded-2xl border border-white/20 dark:border-white/10 shadow-glow">
            <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Quantum Sync Active</span>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <AnimatePresence mode="popLayout">
          {requests.map((req) => (
            <motion.div
              key={req.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-premium hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 relative overflow-hidden group"
            >
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Tenant Protocol Card */}
                <div className="flex flex-col items-center gap-6 w-full lg:w-56 text-center shrink-0 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-700 shadow-2xl">
                      <Image src={req.tenantAvatar} alt={req.tenantName} fill className="object-cover" />
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl border-4 border-white dark:border-slate-900 shadow-glow"
                    >
                      <UserCheck className="w-4 h-4" />
                    </motion.div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-black text-xl text-slate-900 dark:text-white tracking-tight leading-none">{req.tenantName}</h4>
                    <div className="flex items-center justify-center gap-2">
                       <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/20">Trust Score: {req.trustScore}</span>
                    </div>
                  </div>
                  <div className="pt-4 w-full border-t border-slate-200 dark:border-slate-700 space-y-3">
                     <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        <span>Background Check</span>
                        <span className="text-emerald-500">Passed</span>
                     </div>
                     <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        <span>KYC Verified</span>
                        <span className="text-emerald-500">Yes</span>
                     </div>
                  </div>
                </div>

                {/* Engagement Metrics */}
                <div className="flex-1 space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border border-primary/20">
                         <Zap className="w-3.5 h-3.5 fill-primary" />
                         Priority Selection
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors tracking-tighter leading-none">{req.propertyTitle}</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction ID • {req.id}</p>
                    </div>
                    <div className={cn(
                      "px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-glow transition-all",
                      req.status === 'pending' ? "bg-amber-500 text-white border-amber-600" :
                      req.status === 'approved' ? "bg-emerald-500 text-white border-emerald-600" :
                      "bg-slate-400 text-white border-slate-500"
                    )}>
                      {req.status === 'pending' ? 'Verification Required' : req.status === 'approved' ? 'Active Deployment' : 'Rejected'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-slate-50 dark:border-slate-800">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deployment Date</p>
                      <div className="flex items-center gap-3 text-slate-900 dark:text-white font-black text-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        {req.checkInDate}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contract Value</p>
                      <p className="text-primary font-black text-sm tracking-tight">{formatPrice(req.amount)}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comm Protocol</p>
                      <p className="text-slate-900 dark:text-white font-black text-sm tracking-tight">{req.phone}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Lease</p>
                      <button className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-all">
                        <FileText className="w-4 h-4" />
                        Review Draft
                      </button>
                    </div>
                  </div>
                </div>

                {/* Protocol Actions */}
                <div className="flex lg:flex-col justify-end gap-4 shrink-0 pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-50 dark:border-slate-800 lg:pl-10">
                  {req.status === 'pending' ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleStatusUpdate(req.id, 'approved')}
                        className="flex-1 lg:flex-none btn-primary py-5 text-[10px] scale-100 flex items-center justify-center gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 stroke-[3]" />
                        Confirm Lease
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleStatusUpdate(req.id, 'declined')}
                        className="flex-1 lg:flex-none btn-secondary py-5 text-[10px] flex items-center justify-center gap-3 border-rose-500/20 hover:border-rose-500/50 hover:bg-rose-500/5 dark:hover:bg-rose-500/10 text-rose-500"
                      >
                        <XCircle className="w-5 h-5 stroke-[2.5]" />
                        Reject Application
                      </motion.button>
                    </>
                  ) : (
                    <div className="bg-slate-50 dark:bg-slate-800 px-8 py-5 rounded-[1.5rem] border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center gap-2">
                       <CheckCircle2 className="w-6 h-6 text-primary" />
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Protocol Locked</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* AI Intelligence Optimization Banner */}
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         className="bg-slate-900 dark:bg-primary/10 rounded-[4rem] p-12 text-white relative overflow-hidden group shadow-glow"
      >
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full -mr-48 -mt-48 blur-[120px] group-hover:bg-primary/30 transition-colors" />
         <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="max-w-2xl space-y-6">
               <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                  <BrainCircuit className="w-5 h-5" />
                  Yield Optimizer v4.1
               </div>
               <h3 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9]">Maximize Your <br/> <span className="text-primary italic">Rental Velocity.</span></h3>
               <p className="text-slate-400 font-bold text-sm leading-relaxed max-w-lg">
                 Our neural network analyzes Chanthabouly demand spikes in real-time. Boost your acceptance rate to 95% to qualify for the <span className="text-white font-black underline decoration-primary underline-offset-8">Elite Host Accelerator</span>.
               </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
               <div className="bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 text-center min-w-[160px] group-hover:bg-white/10 transition-all shadow-premium">
                  <p className="text-4xl font-black text-white tracking-tighter">2.4h</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mt-2">Avg Latency</p>
               </div>
               <div className="bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 text-center min-w-[160px] group-hover:bg-white/10 transition-all shadow-premium">
                  <p className="text-4xl font-black text-white tracking-tighter">92%</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mt-2">Success Delta</p>
               </div>
            </div>
         </div>
      </motion.div>
    </div>
  )
}
