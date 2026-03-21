'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, FileText, UserCheck, ChevronRight, X, Upload, Smartphone, CheckCircle2, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TenantKYC() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleVerify = async () => {
    setIsVerifying(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsVerifying(false)
    setIsComplete(true)
    setStep(3)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 p-6 bg-white border border-slate-100 rounded-3xl hover:shadow-xl transition-all group"
      >
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="text-left">
           <h4 className="font-black text-slate-900 leading-tight">ยืนยันตัวตน (KYC)</h4>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Verified Tenant Badge</p>
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
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center">
                       <UserCheck className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-black text-slate-900">การยืนยันตัวตนผู้เช่า</h2>
                 </div>
                 <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="p-10">
                 <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                      >
                         <div className="space-y-2">
                            <h3 className="text-2xl font-black text-slate-900">อัปโหลดเอกสารยืนยัน</h3>
                            <p className="text-sm font-bold text-slate-400">กรุณาอัปโหลดสำเนาพาสปอร์ตหรือบัตรประชาชนของคุณ</p>
                         </div>

                         <div className="grid grid-cols-1 gap-4">
                            <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 hover:bg-slate-50 hover:border-indigo-300 transition-all cursor-pointer group">
                               <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
                                  <Upload className="w-8 h-8" />
                               </div>
                               <div className="text-center">
                                  <p className="font-black text-slate-900 uppercase text-xs tracking-widest">คลิกเพื่ออัปโหลด</p>
                                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Passport or ID Card (Max 5MB)</p>
                               </div>
                            </div>
                         </div>

                         <div className="bg-indigo-50 p-6 rounded-3xl flex gap-4">
                            <Lock className="w-6 h-6 text-indigo-600 shrink-0" />
                            <p className="text-[10px] font-bold text-indigo-900 leading-relaxed uppercase tracking-wider">
                               ข้อมูลของคุณถูกเข้ารหัสและปกป้องภายใต้มาตรฐานความปลอดภัยระดับสูง ข้อมูลนี้จะถูกใช้เพื่อการทำสัญญาเท่านั้น
                            </p>
                         </div>

                         <button
                            onClick={() => setStep(2)}
                            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-200 active:scale-95 transition-all"
                         >
                            ถัดไป
                         </button>
                      </motion.div>
                    )}

                    {step === 2 && (
                       <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10 py-6 text-center"
                       >
                          <div className="relative inline-block">
                             <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                className="w-32 h-32 border-4 border-indigo-100 border-t-indigo-600 rounded-full"
                             />
                             <Smartphone className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-indigo-600 animate-pulse" />
                          </div>

                          <div className="space-y-2">
                             <h3 className="text-2xl font-black text-slate-900">กำลังตรวจสอบข้อมูล...</h3>
                             <p className="text-slate-500 font-bold">ระบบ AI กำลังวิเคราะห์ใบหน้าและข้อมูลในเอกสาร</p>
                          </div>

                          <button
                             onClick={handleVerify}
                             className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg active:scale-95 shadow-xl shadow-indigo-100"
                          >
                             จำลองการตรวจสอบสำเร็จ
                          </button>
                       </motion.div>
                    )}

                    {step === 3 && (
                       <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-8 py-6"
                       >
                          <div className="w-24 h-24 bg-emerald-100 rounded-[2rem] flex items-center justify-center mx-auto text-emerald-600">
                             <CheckCircle2 className="w-12 h-12" />
                          </div>
                          <div className="space-y-2">
                             <h3 className="text-3xl font-black text-slate-900">ยืนยันตัวตนสำเร็จ!</h3>
                             <p className="text-slate-500 font-bold">คุณได้รับตราสัญลักษณ์ "Verified Tenant" แล้วค่ะ</p>
                          </div>

                          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-left space-y-4">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-lg">
                                   <ShieldCheck className="w-4 h-4" />
                                </div>
                                <span className="font-black text-slate-900 text-sm uppercase tracking-widest">Verified Benefits</span>
                             </div>
                             <ul className="space-y-2">
                                {['จองที่พักได้ทันทีไม่ต้องรออนุมัติเสริม', 'ได้รับส่วนลดค่ามัดจำ 5%', 'ความน่าเชื่อถือสูงขึ้นต่อเจ้าของที่พัก'].map((item, i) => (
                                   <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                      {item}
                                   </li>
                                ))}
                             </ul>
                          </div>

                          <button
                             onClick={() => setIsOpen(false)}
                             className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg active:scale-95"
                          >
                             เสร็จสิ้น
                          </button>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
