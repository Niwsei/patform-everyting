'use client'

import { useState, use } from "react";
import { serviceProviders } from "@/features/services/servicesData";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  Info,
  MapPin,
  Sparkles,
  ChevronLeft,
  Truck,
  Wrench,
  PartyPopper
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrencyStore } from "@/stores/useCurrencyStore";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { cn } from "@/lib/utils";
import { BcelOnePayModal } from "@/components/payment/BcelOnePayModal";

interface ServiceBookPageProps {
  params: Promise<{ id: string }>;
}

export default function ServiceBookPage({ params }: ServiceBookPageProps) {
  const { id } = use(params);
  const service = serviceProviders.find((s) => s.id === id);
  const { formatPrice } = useCurrencyStore();
  const { addNotification } = useNotificationStore();

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>('2023-10-15');
  const [selectedTime, setSelectedTime] = useState<string>('09:00');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showBcelModal, setShowBcelModal] = useState(false);

  if (!service) {
    notFound();
  }

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBcelModal(true);
  };

  const handlePaymentSuccess = async () => {
    setShowBcelModal(false);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    addNotification({
      title: 'จองบริการสำเร็จ!',
      message: `คุณได้จอง ${service.name} เรียบร้อยแล้ว ทีมงานจะติดต่อกลับเพื่อยืนยันเวลาค่ะ`,
      time: 'เมื่อสักครู่',
      type: 'booking'
    });

    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-xl w-full bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-slate-100 text-center"
        >
          <div className="w-24 h-24 bg-emerald-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-emerald-600">
             <PartyPopper className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4">จองบริการสำเร็จ!</h1>
          <p className="text-slate-500 font-bold mb-10 leading-relaxed">
            ทีมงานจาก <span className="text-indigo-600">{service.name}</span> ได้รับคำขอของคุณแล้ว และจะติดต่อกลับมาทางเบอร์โทรศัพท์ของคุณภายใน 30 นาทีค่ะ
          </p>
          <Link
            href="/dashboard"
            className="block w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl"
          >
            ไปที่แดชบอร์ด
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
           <Link href="/services" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-colors mb-6 group">
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              กลับหน้าตลาดบริการ
           </Link>
           <div className="flex items-center justify-between gap-6">
              <div>
                 <h1 className="text-4xl font-black text-slate-900 tracking-tight">นัดหมายบริการ</h1>
                 <p className="text-slate-500 font-bold mt-1">แจ้งรายละเอียดงานให้เราทราบนะคะ</p>
              </div>
              <div className="h-16 w-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
                 {service.category === 'moving' ? <Truck className="w-8 h-8 text-indigo-600" /> : <Wrench className="w-8 h-8 text-indigo-600" />}
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
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
                    <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-8">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">เลือกวันที่</label>
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          />
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ช่วงเวลา</label>
                          <div className="grid grid-cols-3 gap-3">
                             {['09:00', '11:00', '13:00', '15:00', '17:00'].map(time => (
                               <button
                                 key={time}
                                 type="button"
                                 onClick={() => setSelectedTime(time)}
                                 className={cn(
                                   "py-3 rounded-xl font-bold text-sm transition-all",
                                   selectedTime === time ? "bg-indigo-600 text-white shadow-lg" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                                 )}
                               >
                                 {time}
                               </button>
                             ))}
                          </div>
                       </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                    >
                      ถัดไป <ArrowRight className="w-5 h-5" />
                    </button>
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
                    <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">รายละเอียดงานเพิ่มเติม</label>
                          <textarea
                            rows={4}
                            placeholder="ระบุสิ่งที่ต้องการให้ช่างทราบ เช่น จำนวนของที่ต้องการขนย้าย หรือขนาดพื้นที่ห้อง..."
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ที่อยู่ที่ต้องการรับบริการ</label>
                          <input
                            type="text"
                            placeholder="ระบุบ้านเลขที่ ซอย ถนน แขวง..."
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                       </div>
                    </div>

                    <div className="flex gap-4">
                       <button
                         type="button"
                         onClick={handleBack}
                         className="w-1/3 py-5 border-2 border-slate-100 text-slate-400 rounded-2xl font-black text-lg"
                       >
                         กลับ
                       </button>
                       <button
                         type="submit"
                         className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl"
                       >
                         ยืนยันและชำระเงิน
                       </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-premium space-y-6">
               <div className="flex gap-4 pb-6 border-b border-slate-50">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                     <Image src={service.image} alt={service.name} fill className="object-cover" />
                  </div>
                  <div>
                     <h3 className="font-black text-slate-900 leading-tight">{service.name}</h3>
                     <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">
                        {service.category === 'moving' ? 'Professional Moving' : 'Home Services'}
                     </p>
                  </div>
               </div>

               <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">สรุปรายการ</h4>
                  <div className="space-y-3">
                     <div className="flex justify-between font-bold text-slate-600">
                        <span>มัดจำค่าสำรวจหน้างาน</span>
                        <span>{formatPrice(100000)}</span>
                     </div>
                     <div className="flex justify-between text-xs font-medium text-slate-400">
                        <span>(จะนำไปหักกับค่าบริการจริงภายหลัง)</span>
                     </div>
                     <div className="flex justify-between pt-4 border-t border-slate-50 font-black text-slate-900">
                        <span>ยอดที่ต้องชำระทันที</span>
                        <span className="text-xl text-indigo-600">{formatPrice(100000)}</span>
                     </div>
                  </div>
               </div>

               <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex gap-4">
                  <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
                  <p className="text-[10px] font-bold text-indigo-900 leading-relaxed uppercase tracking-wider">
                     เงินของคุณปลอดภัย! พาร์ทเนอร์จะได้รับเงินหลังจากงานเสร็จสิ้นและคุณกดยืนยันเท่านั้น
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <BcelOnePayModal
        isOpen={showBcelModal}
        onClose={() => setShowBcelModal(false)}
        amount={formatPrice(100000)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
