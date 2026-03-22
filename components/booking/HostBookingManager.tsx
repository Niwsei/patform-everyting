'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Calendar,
  MapPin,
  ChevronRight,
  MoreVertical,
  Sparkles,
  Mail,
  Phone,
  FileText
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
}

const mockRequests: BookingRequest[] = [
  {
    id: 'REQ-001',
    propertyTitle: 'อพาร์ทเมนท์ทันสมัย ใกล้ประตูชัย',
    tenantName: 'Alex Smith',
    tenantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    checkInDate: '24 ต.ค. 2023',
    status: 'pending',
    amount: 3650000,
    phone: '020 5555 1234'
  },
  {
    id: 'REQ-002',
    propertyTitle: 'คอนโดหรูริมน้ำ ใกล้เวียงจันทน์เซ็นเตอร์',
    tenantName: 'Maria Garcia',
    tenantAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop',
    checkInDate: '15 พ.ย. 2023',
    status: 'approved',
    amount: 6150000,
    phone: '020 9999 8888'
  }
]

export function HostBookingManager() {
  const [requests, setRequests] = useState<BookingRequest[]>(mockRequests)
  const { formatPrice } = useCurrencyStore()

  const handleStatusUpdate = (id: string, newStatus: 'approved' | 'declined') => {
    setRequests(prev => prev.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    ))

    if (typeof window !== 'undefined' && (window as any).addToast) {
       (window as any).addToast(
         newStatus === 'approved' ? 'อนุมัติการจองเรียบร้อยแล้วค่ะ' : 'ปฏิเสธการจองเรียบร้อยแล้ว',
         newStatus === 'approved' ? 'success' : 'info'
       )
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-2">
         <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">คำขอจองที่พัก (Booking Requests)</h2>
            <p className="text-sm font-bold text-slate-400 mt-1">จัดการและตรวจสอบผู้เข้าพักที่สนใจที่พักของคุณ</p>
         </div>
         <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Live Updates</span>
         </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {requests.map((req) => (
            <motion.div
              key={req.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Tenant Info */}
                <div className="flex flex-col items-center gap-4 w-full md:w-48 text-center shrink-0">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-lg">
                      <Image src={req.tenantAvatar} alt={req.tenantName} fill className="object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl border-4 border-white shadow-sm">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{req.tenantName}</h4>
                    <div className="flex items-center justify-center gap-1.5 mt-1 text-emerald-600">
                       <ShieldCheck className="w-3.5 h-3.5" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Verified Tenant</span>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="flex-1 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-full">New Request</span>
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{req.propertyTitle}</h3>
                      <p className="text-sm font-bold text-slate-400">ID: {req.id}</p>
                    </div>
                    <div className={cn(
                      "px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border",
                      req.status === 'pending' ? "bg-amber-50 text-amber-600 border-amber-100" :
                      req.status === 'approved' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      "bg-slate-50 text-slate-400 border-slate-100"
                    )}>
                      {req.status === 'pending' ? 'รอการยืนยัน' : req.status === 'approved' ? 'อนุมัติแล้ว' : 'ปฏิเสธแล้ว'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-50">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">วันที่เข้าอยู่</p>
                      <div className="flex items-center gap-2 text-slate-700 font-bold">
                        <Calendar className="w-4 h-4 text-indigo-500" />
                        {req.checkInDate}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ยอดชำระมัดจำ</p>
                      <p className="text-slate-900 font-black">{formatPrice(req.amount)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">เบอร์ติดต่อ</p>
                      <p className="text-slate-700 font-bold">{req.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">สัญญาเช่า</p>
                      <button className="flex items-center gap-1.5 text-indigo-600 font-black text-[10px] uppercase tracking-widest underline">
                        <FileText className="w-3 h-3" />
                        ดูแบบร่าง
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col justify-end gap-3 shrink-0 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-slate-50 md:pl-8">
                  {req.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(req.id, 'approved')}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        อนุมัติการเช่า
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(req.id, 'declined')}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-rose-500 hover:border-rose-100 transition-all active:scale-95"
                      >
                        <XCircle className="w-4 h-4" />
                        ปฏิเสธ
                      </button>
                    </>
                  ) : (
                    <button className="px-6 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest cursor-default">
                       ดำเนินการแล้ว
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Analytics Insight */}
      <div className="bg-indigo-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
         <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-md space-y-4">
               <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  Host Insights
               </div>
               <h3 className="text-3xl font-black tracking-tight leading-tight">ความนิยมพุ่งสูงขึ้น!</h3>
               <p className="text-indigo-100 font-medium opacity-80 leading-relaxed">
                 ที่พักของคุณมีการเข้าชมเพิ่มขึ้น 45% ในสัปดาห์นี้ แนะนำให้อนุมัติคำขอภายใน 2 ชั่วโมงเพื่อรักษาระดับ "Responsive Host"
               </p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
               <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center">
                  <p className="text-3xl font-black">2.4ชม.</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mt-1">Avg. Response Time</p>
               </div>
               <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center">
                  <p className="text-3xl font-black">92%</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mt-1">Acceptance Rate</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
