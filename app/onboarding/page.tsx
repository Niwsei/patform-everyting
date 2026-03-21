'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  Truck,
  CheckCircle2,
  ArrowRight,
  Upload,
  MapPin,
  DollarSign,
  Camera,
  ShieldCheck,
  FileText,
  Clock,
  Briefcase,
  ChevronLeft,
  Sparkles,
  Lock,
  Smartphone
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const LocationPicker = dynamic(() => import('@/components/onboarding/LocationPicker').then(mod => mod.LocationPicker), {
  ssr: false,
  loading: () => <div className="h-64 md:h-80 w-full bg-slate-50 animate-pulse rounded-3xl" />
})

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [partnerType, setPartnerType] = useState<'property' | 'service' | null>(null)
  const [location, setLocation] = useState<{ lat: number, lng: number, address: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = () => setStep(prev => prev + 1)
  const handleBack = () => setStep(prev => prev - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2500))
    setIsSubmitting(false)
    setStep(4)
    if (typeof window !== 'undefined' && (window as any).addToast) {
       (window as any).addToast('ส่งใบสมัครสำเร็จ! ทีมงานกำลังตรวจสอบข้อมูลของคุณค่ะ', 'success')
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 md:pt-32 pb-24 md:pb-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 shadow-premium border border-slate-100 relative overflow-hidden">

          {/* Progress Indicator */}
          {step < 4 && (
            <div className="mb-10 text-center relative z-10">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-100">
                Partner Registration • Step {step} of 3
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">
                ร่วมเป็นส่วนหนึ่งของ <br/>
                <span className="text-indigo-600">Vientiane Nest</span>
              </h1>

              <div className="flex justify-center gap-3 mt-8">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-700",
                      step === s ? "w-12 bg-indigo-600" : step > s ? "w-4 bg-emerald-500" : "w-4 bg-slate-200"
                    )}
                  />
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                   <h2 className="text-xl font-black text-slate-900 mb-2">เลือกประเภทธุรกิจของคุณ</h2>
                   <p className="text-sm font-bold text-slate-400">เราจะปรับแต่งประสบการณ์การใช้งานตามธุรกิจของคุณ</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setPartnerType('property')}
                    className={cn(
                      "p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-5 text-center group relative overflow-hidden",
                      partnerType === 'property'
                        ? "border-indigo-600 bg-indigo-50/50 shadow-2xl shadow-indigo-100"
                        : "border-slate-100 hover:border-indigo-200 hover:bg-slate-50/50"
                    )}
                  >
                    <div className={cn(
                      "w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500",
                      partnerType === 'property' ? "bg-indigo-600 text-white scale-110 shadow-xl shadow-indigo-200" : "bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                    )}>
                      <Building2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-slate-900 leading-none">โฮสต์อสังหาฯ</h3>
                      <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest leading-relaxed">อพาร์ทเมนท์, บ้านพัก, โรงแรม</p>
                    </div>
                    {partnerType === 'property' && (
                       <motion.div layoutId="check" className="absolute top-4 right-4 text-indigo-600"><CheckCircle2 className="w-6 h-6" /></motion.div>
                    )}
                  </button>

                  <button
                    onClick={() => setPartnerType('service')}
                    className={cn(
                      "p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-5 text-center group relative overflow-hidden",
                      partnerType === 'service'
                        ? "border-indigo-600 bg-indigo-50/50 shadow-2xl shadow-indigo-100"
                        : "border-slate-100 hover:border-indigo-200 hover:bg-slate-50/50"
                    )}
                  >
                    <div className={cn(
                      "w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500",
                      partnerType === 'service' ? "bg-indigo-600 text-white scale-110 shadow-xl shadow-indigo-200" : "bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                    )}>
                      <Truck className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-slate-900 leading-none">พาร์ทเนอร์บริการ</h3>
                      <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest leading-relaxed">ขนย้าย, ทำความสะอาด, ช่างซ่อม</p>
                    </div>
                    {partnerType === 'service' && (
                       <motion.div layoutId="check" className="absolute top-4 right-4 text-indigo-600"><CheckCircle2 className="w-6 h-6" /></motion.div>
                    )}
                  </button>
                </div>

                <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-4">
                   <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
                   <p className="text-xs font-bold text-amber-900 leading-relaxed uppercase tracking-wider">
                      ความปลอดภัยสูงสุด: พาร์ทเนอร์ทุกคนต้องผ่านการตรวจสอบเอกสารและได้รับตรา "Verified Partner" เพื่อเริ่มรับงานบนแพลตฟอร์ม
                   </p>
                </div>

                <button
                  disabled={!partnerType}
                  onClick={handleNext}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-2xl shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                  เริ่มดำเนินการ
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-indigo-600 text-white rounded-xl">
                        {partnerType === 'property' ? <Building2 className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
                     </div>
                     <h2 className="text-xl font-black text-slate-900">ข้อมูล{partnerType === 'property' ? 'ที่พัก' : 'ธุรกิจบริการ'}</h2>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ชื่อ{partnerType === 'property' ? 'ที่พัก/โครงการ' : 'แบรนด์/บริษัท'}</label>
                      <input
                        type="text"
                        placeholder={partnerType === 'property' ? "เช่น เวียงจันทน์ สตูดิโอ" : "เช่น บริการขนย้ายด่วน"}
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">เบอร์โทรศัพท์ติดต่อ</label>
                        <div className="relative">
                          <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            placeholder="020 XXX XXXX"
                            className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ราคาเริ่มต้น (กีบ)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="number"
                            placeholder="ระบุตัวเลข"
                            className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ปักหมุดตำแหน่งที่ตั้ง (WhatsApp Style)</label>
                      <LocationPicker
                        onLocationSelect={(lat, lng, address) => setLocation({ lat, lng, address })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">รูปภาพหลัก</label>
                      <div className="w-full h-32 md:h-40 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-slate-50 hover:border-indigo-300 transition-all cursor-pointer group">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
                          <Camera className="w-5 h-5" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">คลิกเพื่ออัปโหลดรูปภาพ</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleBack}
                    className="w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-black text-lg text-slate-400 hover:text-slate-600 hover:border-slate-200 transition-all active:scale-95"
                  >
                    กลับ
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95"
                  >
                    ถัดไป
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                   <div className="flex items-center gap-3">
                     <div className="p-2 bg-indigo-600 text-white rounded-xl">
                        <FileText className="w-5 h-5" />
                     </div>
                     <h2 className="text-xl font-black text-slate-900">เอกสารและการตรวจสอบ</h2>
                  </div>

                  <div className="space-y-5">
                     <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                        <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                           <Lock className="w-4 h-4 text-indigo-600" />
                           เอกสารยืนยันตัวตน
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                           <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col items-center gap-2 cursor-pointer hover:border-indigo-300 transition-all">
                              <FileText className="w-6 h-6 text-slate-300" />
                              <span className="text-[10px] font-black text-slate-400 uppercase">สำเนาบัตรประชาชน</span>
                           </div>
                           <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col items-center gap-2 cursor-pointer hover:border-indigo-300 transition-all">
                              <FileText className="w-6 h-6 text-slate-300" />
                              <span className="text-[10px] font-black text-slate-400 uppercase">ทะเบียนบ้าน/ธุรกิจ</span>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">เลือกแพ็คเกจพาร์ทเนอร์</label>
                        <div className="grid grid-cols-1 gap-3">
                           <div className="p-5 border-2 border-indigo-600 bg-indigo-50/50 rounded-3xl relative flex items-center gap-4">
                              <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 shrink-0">
                                 <Sparkles className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                 <p className="font-black text-slate-900">Standard Growth</p>
                                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ค่าธรรมเนียม 5% • โพสต์ได้ไม่จำกัด</p>
                              </div>
                              <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                                 <CheckCircle2 className="w-4 h-4 text-white" />
                              </div>
                           </div>
                           <div className="p-5 border-2 border-slate-100 rounded-3xl opacity-60 hover:opacity-100 transition-all cursor-pointer flex items-center gap-4 group">
                              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all shrink-0">
                                 <Briefcase className="w-6 h-6" />
                              </div>
                              <div className="flex-1">
                                 <p className="font-black text-slate-900">Pro verified</p>
                                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ค่าธรรมเนียม 3% • แนะนำพิเศษหน้าแรก</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-black text-lg text-slate-400 hover:text-slate-600 hover:border-slate-200 transition-all active:scale-95"
                  >
                    กลับ
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 active:scale-95 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                       <>
                          <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                          กำลังบันทึกข้อมูล...
                       </>
                    ) : (
                       <>ส่งข้อมูลตรวจสอบ</>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-10 py-6"
              >
                <div className="relative inline-block">
                   <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                      className="w-32 h-32 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-indigo-200"
                   >
                      <Clock className="w-16 h-16 text-white" />
                   </motion.div>
                   <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="absolute -inset-4 bg-indigo-100 rounded-[3rem] -z-10"
                   />
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">กำลังตรวจสอบ <br/> <span className="text-indigo-600">สถานะพาร์ทเนอร์</span></h2>
                  <p className="text-slate-500 font-bold text-lg max-w-sm mx-auto leading-relaxed">
                    ขอบคุณที่ร่วมเป็นพาร์ทเนอร์กับเรา ทีมงาน Vientiane Nest กำลังตรวจสอบข้อมูลของคุณอย่างละเอียด
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 text-left">
                   <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4 items-start">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                         <Clock className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-sm font-black text-slate-900">ระยะเวลาดำเนินการ</p>
                         <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">ประมาณ 24-48 ชั่วโมงทำการ</p>
                      </div>
                   </div>
                   <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4 items-start">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                         <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-sm font-black text-slate-900">การแจ้งเตือน</p>
                         <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">เราจะส่ง SMS และ Email แจ้งทันทีเมื่อผ่านการตรวจสอบ</p>
                      </div>
                   </div>
                </div>

                <Link
                  href="/dashboard"
                  className="block w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95"
                >
                  ไปที่หน้าแดชบอร์ด
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
           <p className="text-sm font-bold text-slate-400">
             ต้องการความช่วยเหลือ? <button className="text-indigo-600 underline">คุยกับเซร่า</button>
           </p>
        </div>
      </div>
    </main>
  )
}
