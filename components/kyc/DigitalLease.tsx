'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, PenTool, X, CheckCircle2, Download, ShieldCheck, ChevronRight, Gavel } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DigitalLeaseProps {
  propertyName: string
  hostName: string
  amount: string
}

export function DigitalLease({ propertyName, hostName, amount }: DigitalLeaseProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSign = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSigned(true)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 p-6 bg-white border border-slate-100 rounded-3xl hover:shadow-xl transition-all group"
      >
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
          <FileText className="w-6 h-6" />
        </div>
        <div className="text-left">
           <h4 className="font-black text-slate-900 leading-tight">สัญญาเช่าดิจิทัล</h4>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Legal E-Signature</p>
        </div>
        <ChevronRight className="ml-auto w-5 h-5 text-slate-300" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col h-[90vh]"
            >
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center">
                       <Gavel className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Vientiane Nest Digital Lease</h2>
                 </div>
                 <button onClick={() => setIsOpen(false)} className="p-3 bg-white rounded-2xl shadow-sm hover:bg-slate-50 transition-colors">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 bg-slate-50">
                 <div className="max-w-2xl mx-auto bg-white p-12 rounded-[2rem] shadow-sm border border-slate-100 space-y-10 font-serif">
                    <div className="text-center space-y-2">
                       <h1 className="text-3xl font-black text-slate-900 underline decoration-indigo-200">สัญญาเช่าที่พักอาศัย</h1>
                       <p className="text-sm font-bold text-slate-400">เลขที่สัญญา: VN-2023-{(Math.random() * 10000).toFixed(0)}</p>
                    </div>

                    <div className="space-y-6 text-slate-700 leading-loose">
                       <p>สัญญาฉบับนี้ทำขึ้นระหว่าง <span className="font-black text-slate-900">{hostName}</span> (ต่อไปนี้เรียกว่า "ผู้ให้เช่า") และ <span className="font-black text-slate-900">ผู้ใช้งาน Vientiane Nest</span> (ต่อไปนี้เรียกว่า "ผู้เช่า")</p>
                       <p>โดยมีรายละเอียดที่พักตั้งอยู่ที่: <span className="font-bold text-slate-900">{propertyName}</span> ในเขตเวียงจันทน์ สปป. ลาว</p>

                       <div className="space-y-4">
                          <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">ข้อตกลงและเงื่อนไข:</h4>
                          <ol className="list-decimal list-inside space-y-3 text-sm">
                             <li>ผู้เช่าตกลงชำระค่าเช่ารายเดือนจำนวน <span className="font-black">{amount}</span> ผ่านระบบ Vientiane Nest</li>
                             <li>ระยะเวลาการเช่ามีกำหนดขั้นต่ำตามที่ระบุไว้ในรายละเอียดการจอง</li>
                             <li>ผู้เช่าต้องดูแลรักษาความสะอาดและไม่สร้างความรำคาญให้แก่เพื่อนบ้าน</li>
                             <li>การผิดนัดชำระเกิน 7 วัน ถือเป็นการยกเลิกสัญญาโดยอัตโนมัติ</li>
                          </ol>
                       </div>

                       <div className="pt-10 border-t border-slate-100 grid grid-cols-2 gap-12">
                          <div className="space-y-4">
                             <p className="text-xs font-black uppercase text-slate-400">ผู้ให้เช่า (Signed)</p>
                             <div className="h-16 flex items-end border-b border-slate-200 pb-2">
                                <span className="text-2xl font-cursive text-indigo-600 opacity-60 italic">{hostName}</span>
                             </div>
                          </div>
                          <div className="space-y-4">
                             <p className="text-xs font-black uppercase text-slate-400">ผู้เช่า (Your Signature)</p>
                             <div className="h-16 flex items-end border-b border-slate-200 pb-2 relative">
                                {isSigned ? (
                                   <motion.span
                                      initial={{ pathLength: 0, opacity: 0 }}
                                      animate={{ pathLength: 1, opacity: 1 }}
                                      className="text-2xl font-cursive text-emerald-600 italic"
                                   >
                                      Verified Digital Signature
                                   </motion.span>
                                ) : (
                                   <span className="text-slate-300 text-xs font-bold italic">Waiting for signature...</span>
                                )}
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t border-slate-100 flex items-center justify-between bg-white">
                 <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-indigo-600" />
                    <div>
                       <p className="text-xs font-black text-slate-900">Legal Standard</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compliant with Lao E-Transaction Law</p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    {isSigned ? (
                       <button className="flex items-center gap-2 px-8 py-4 bg-emerald-50 text-emerald-600 rounded-2xl font-black text-sm hover:bg-emerald-100 transition-all">
                          <Download className="w-5 h-5" />
                          ดาวน์โหลด PDF
                       </button>
                    ) : (
                       <button
                          onClick={handleSign}
                          disabled={isSubmitting}
                          className="flex items-center gap-3 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-100 active:scale-95 transition-all disabled:opacity-50"
                       >
                          {isSubmitting ? (
                             <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                             <PenTool className="w-5 h-5" />
                          )}
                          เซ็นสัญญาออนไลน์
                       </button>
                    )}
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
