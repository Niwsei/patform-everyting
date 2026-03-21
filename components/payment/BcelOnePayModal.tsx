'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, QrCode, Smartphone, ShieldCheck, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface BcelOnePayModalProps {
  isOpen: boolean
  onClose: () => void
  amount: string
  onSuccess: () => void
}

export function BcelOnePayModal({ isOpen, onClose, amount, onSuccess }: BcelOnePayModalProps) {
  const [step, setStep] = useState<'qr' | 'verifying' | 'success'>('qr')

  const [pollingStatus, setPollingStatus] = useState<'connecting' | 'polling' | 'finalizing'>('connecting')
  const [qrDots, setQrDots] = useState<boolean[]>([])

  useEffect(() => {
    // Generate QR dots only on client to avoid hydration mismatch
    const dots = Array.from({ length: 144 }).map(() => Math.random() > 0.5)
    setQrDots(dots)
  }, [])

  useEffect(() => {
    if (step === 'verifying') {
      // Step 1: Connecting
      const t1 = setTimeout(() => setPollingStatus('polling'), 1000)

      // Step 2: Polling (longer wait)
      const t2 = setTimeout(() => setPollingStatus('finalizing'), 3500)

      // Step 3: Success
      const t3 = setTimeout(() => {
        setStep('success')
        setTimeout(() => {
          onSuccess()
        }, 1500)
      }, 5000)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
      }
    }
  }, [step, onSuccess])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
          >
            {/* Header */}
            <div className="bg-[#1a4a9e] p-6 text-white relative">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
               <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-[#e31837] font-black text-lg">One</span>
                     </div>
                     <div>
                        <h3 className="font-black text-xl tracking-tight leading-none">BCEL One Pay</h3>
                        <p className="text-xs font-bold text-white/70 mt-1 uppercase tracking-widest">Secure Payment</p>
                     </div>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
               </div>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {step === 'qr' && (
                  <motion.div
                    key="qr"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 text-center"
                  >
                    <div className="space-y-1">
                       <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">ยอดที่ต้องชำระ</p>
                       <h4 className="text-3xl font-black text-slate-900">{amount}</h4>
                    </div>

                    <div className="relative group mx-auto w-56 h-56 p-4 bg-white border-4 border-slate-50 rounded-[2rem] shadow-inner transition-transform hover:scale-105 duration-500">
                       <div className="absolute inset-0 flex items-center justify-center">
                          <QrCode className="w-40 h-40 text-slate-900 opacity-20" />
                       </div>
                       {/* Simulated QR Code Blocks */}
                       <div className="relative z-10 w-full h-full bg-slate-900 rounded-2xl flex flex-wrap p-2 gap-1 overflow-hidden">
                          {qrDots.map((isWhite, i) => (
                             <div key={i} className={cn(
                                "w-2.5 h-2.5 rounded-[1px]",
                                isWhite ? "bg-white" : "bg-transparent"
                             )} />
                          ))}
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-12 h-12 bg-white rounded-lg shadow-xl flex items-center justify-center p-1.5">
                                <div className="w-full h-full bg-[#e31837] rounded flex items-center justify-center text-[8px] font-black text-white">ONE</div>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-2xl border border-indigo-100/50 text-left">
                          <Smartphone className="w-5 h-5 text-indigo-600 shrink-0" />
                          <p className="text-xs font-bold text-indigo-900 leading-relaxed">
                             เปิดแอป <span className="font-black">BCEL One</span> สแกน QR Code นี้เพื่อชำระเงิน
                          </p>
                       </div>

                       <button
                         onClick={() => setStep('verifying')}
                         className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group"
                       >
                         ฉันชำระเงินเรียบร้อยแล้ว
                         <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                       </button>
                    </div>
                  </motion.div>
                )}

                {step === 'verifying' && (
                  <motion.div
                    key="verifying"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-8"
                  >
                    <div className="relative">
                       <motion.div
                         animate={{ rotate: 360 }}
                         transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                         className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full"
                       />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <ShieldCheck className="w-8 h-8 text-indigo-600" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-xl font-black text-slate-900 tracking-tight">
                          {pollingStatus === 'connecting' ? 'กำลังเชื่อมต่อ...' :
                           pollingStatus === 'polling' ? 'กำลังค้นหารายการชำระ...' :
                           'ยืนยันยอดเงินสำเร็จ!'}
                       </h4>
                       <p className="text-sm font-bold text-slate-400">
                          {pollingStatus === 'connecting' ? 'รอกำลังสร้างการเชื่อมต่อที่ปลอดภัย' :
                           pollingStatus === 'polling' ? 'ระบบกำลังรอการยืนยันจากแอป BCEL One' :
                           'กำลังส่งข้อมูลกลับไปยัง Vientiane Nest'}
                       </p>
                    </div>
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12, stiffness: 200 }}
                      className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-200"
                    >
                       <CheckCircle2 className="w-12 h-12 text-white" />
                    </motion.div>
                    <div className="space-y-2">
                       <h4 className="text-2xl font-black text-slate-900 tracking-tight">ชำระเงินสำเร็จ!</h4>
                       <p className="text-sm font-bold text-slate-500">ขอบคุณที่ใช้บริการ Vientiane Nest</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 p-6 border-t border-slate-100 flex items-center justify-center gap-2">
               <ShieldCheck className="w-4 h-4 text-emerald-500" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure payment by BCEL & Vientiane Nest</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
