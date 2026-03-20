'use client'

import { useState, use } from "react";
import { mockProperties } from "@/features/properties/services/mockData";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ShieldCheck,
  Calendar,
  Users,
  CreditCard,
  Lock,
  CheckCircle,
  ArrowRight,
  Info,
  MapPin,
  Bell,
  Sparkles,
  PartyPopper
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export default function BookPage({ params }: BookPageProps) {
  const { id } = use(params);
  const property = mockProperties.find((p) => p.id === id);
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!property) {
    notFound();
  }

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-50 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl opacity-60" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 text-center relative z-10"
        >
          <div className="relative inline-block mb-10">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
              className="w-28 h-28 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-200"
            >
              <PartyPopper className="w-14 h-14 text-white" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -inset-4 bg-emerald-100 rounded-[2.5rem] -z-10"
            />
          </div>

          <div className="space-y-4 mb-12">
            <div className="flex justify-center gap-2 mb-4">
              <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100">Booking Confirmed</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
              รอกดตอบรับ <br />
              <span className="text-indigo-600">ได้เลยค่ะ!</span>
            </h1>
            <p className="text-slate-500 font-bold text-lg max-w-md mx-auto leading-relaxed">
              เราได้ส่งรายละเอียดการจอง <span className="text-slate-900 font-black">{property.title}</span> ให้กับ {property.hostName} เรียบร้อยแล้ว
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 relative group transition-all hover:bg-white hover:shadow-premium">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-100">
                <Bell className="w-5 h-5" />
              </div>
              <h4 className="font-black text-slate-900 mb-2">แจ้งเตือนทันใจ</h4>
              <p className="text-xs font-bold text-slate-500 leading-relaxed">
                เซร่าจะส่งแจ้งเตือนผ่าน SMS และ Email ทันทีที่เจ้าของที่พักตอบรับคำขอของคุณค่ะ
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 relative group transition-all hover:bg-white hover:shadow-premium">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-100">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-black text-slate-900 mb-2">สิทธิพิเศษพาร์ทเนอร์</h4>
              <p className="text-xs font-bold text-slate-500 leading-relaxed">
                เนื่องจากคุณจองกับ "Verified Host" คุณจะได้รับส่วนลดค่าขนย้าย 15% จากพาร์ทเนอร์ของเรา!
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard"
              className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              ไปที่แดชบอร์ด
            </Link>
            <button
              onClick={() => router.push('/properties')}
              className="flex-1 bg-white border-2 border-slate-100 text-slate-900 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all active:scale-95"
            >
              หาที่พักเพิ่ม
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6 px-2">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">จองที่พักของคุณ</h1>
              <p className="text-slate-400 font-bold text-sm mt-1">ใกล้จะได้บ้านใหม่ในเวียงจันทน์แล้วค่ะ!</p>
            </div>
            <div className="text-right">
              <span className="block text-indigo-600 font-black text-2xl leading-none">{Math.round((step / 3) * 100)}%</span>
              <span className="text-slate-300 font-black uppercase tracking-[0.2em] text-[10px]">เสร็จสิ้น</span>
            </div>
          </div>
          <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden p-1 border border-slate-100">
            <motion.div
              initial={{ width: "33%" }}
              animate={{ width: `${(step / 3) * 100}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full shadow-lg shadow-indigo-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <h2 className="text-xl font-black text-slate-900">1. เลือกวันที่เข้าอยู่</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="p-4 bg-white border-2 border-indigo-600 rounded-2xl text-left shadow-lg shadow-indigo-100">
                          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">เร็วที่สุด</p>
                          <p className="font-bold text-slate-900">ภายใน 7 วัน</p>
                        </button>
                        <button type="button" className="p-4 bg-white border border-slate-200 rounded-2xl text-left hover:border-indigo-600 transition-colors">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">มาตรฐาน</p>
                          <p className="font-bold text-slate-900">ภายใน 30 วัน</p>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-xl font-black text-slate-900">2. ระยะเวลาเช่า</h2>
                      <select className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none appearance-none">
                        <option>6 เดือน (สัญญามาตรฐาน)</option>
                        <option>12 เดือน (ราคาดีที่สุด)</option>
                        <option>เดือนต่อเดือน</option>
                      </select>
                    </div>

                    <div className="pt-6">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                      >
                        ดำเนินการต่อ <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <h2 className="text-xl font-black text-slate-900">3. ข้อมูลผู้เช่า</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="ชื่อ-นามสกุล"
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                          defaultValue="Alex Smith"
                        />
                        <input
                          type="email"
                          placeholder="ที่อยู่อีเมล"
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                          defaultValue="alex.smith@example.com"
                        />
                      </div>
                      <textarea
                        placeholder="แนะนำตัวคุณให้เจ้าของที่พักรู้จัก..."
                        rows={4}
                        className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>

                    <div className="flex gap-4 pt-6">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="w-1/3 bg-white border-2 border-slate-200 text-slate-900 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all"
                      >
                        กลับ
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-2/3 flex items-center justify-center gap-2 bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                      >
                        ใกล้จะเสร็จแล้ว <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-indigo-900 text-white p-8 rounded-[2rem] space-y-6 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />

                      <div className="flex justify-between items-center">
                        <CreditCard className="w-10 h-10 text-indigo-300" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] opacity-60">การันตีการสมัคร</span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Lock className="w-4 h-4 text-indigo-300" />
                          <p className="text-sm font-bold opacity-80">การชำระเงินที่ปลอดภัย</p>
                        </div>
                        <p className="text-xs font-medium opacity-60 leading-relaxed">
                          เราจะยังไม่ตัดเงินค่าเช่าจากบัตรของคุณ แต่จำเป็นต้องมีเงินมัดจำจำนวน ₭150,000 (ค่าบริการ) เพื่อยืนยันความตั้งใจในการสมัคร ซึ่งจะได้รับคืนเต็มจำนวนหากเจ้าของที่พักปฏิเสธคำขอ
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-all group">
                           <div className="w-10 h-10 bg-[#e31837] rounded-lg flex items-center justify-center font-black text-white text-xs shadow-lg group-hover:scale-110 transition-transform">One</div>
                           <div className="flex-1">
                              <p className="text-xs font-black uppercase tracking-widest">BCEL One Pay</p>
                              <p className="text-[10px] opacity-60">ชำระผ่านแอปยอดนิยมในลาว</p>
                           </div>
                           <div className="w-5 h-5 rounded-full border-2 border-indigo-400 flex items-center justify-center">
                              <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full" />
                           </div>
                        </div>

                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl opacity-40 cursor-not-allowed">
                           <div className="flex items-center gap-3">
                              <CreditCard className="w-10 h-10" />
                              <div className="flex-1">
                                 <p className="text-xs font-black uppercase tracking-widest">Credit / Debit Card</p>
                                 <p className="text-[10px]">เร็วๆ นี้</p>
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={isSubmitting}
                        className="w-1/3 bg-white border-2 border-slate-200 text-slate-900 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all disabled:opacity-50"
                      >
                        กลับ
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-2/3 flex items-center justify-center gap-3 bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-80"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            กำลังประมวลผล...
                          </>
                        ) : (
                          <>ยืนยันคำขอจอง</>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Summary Side */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-slate-100 space-y-8">
              <div className="flex gap-4">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                  <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 line-clamp-2">{property.title}</h3>
                  <div className="flex items-center gap-1 mt-1 text-slate-400">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{property.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest border-b border-slate-50 pb-2">สรุปยอดชำระ</h4>
                <div className="space-y-3">
                  <div className="flex justify-between font-bold text-slate-600">
                    <span>ค่าเช่ารายเดือน</span>
                    <span>₭{property.pricePerMonth.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-600">
                    <span>ค่าบริการ</span>
                    <span>₭150,000</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-slate-100">
                    <span className="text-xl font-black text-slate-900">ยอดรวมมัดจำ</span>
                    <span className="text-xl font-black text-indigo-600">₭{(property.pricePerMonth + 150000).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 space-y-3">
                <div className="flex items-center gap-3 text-indigo-700 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  รวมการรับประกัน Nest Guarantee
                </div>
                <p className="text-xs font-medium text-indigo-600 leading-relaxed">
                  ทุกการจองผ่าน Vientiane Nest ได้รับการคุ้มครอง หากที่พักไม่ตรงปก เราจะหาที่ใหม่ให้หรือคืนเงินให้คุณ 100%
                </p>
              </div>

              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
                 <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                 <p className="text-[10px] font-black text-amber-900 leading-tight uppercase tracking-wider">
                    AI Insight: ยอดการจองที่พักนี้พุ่งสูงขึ้น 20% ในสัปดาห์ที่ผ่านมา รีบจองก่อนคนอื่นนะคะ!
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
