'use client'

import { mockProperties } from "@/features/properties/services/mockData";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { FavoriteButton } from "@/features/properties/components/FavoriteButton";
import {
  Star,
  MapPin,
  ShieldCheck,
  Calendar,
  Users,
  CheckCircle2,
  Share2,
  ChevronLeft,
  ChevronRight,
  Info,
  Clock,
  Sparkles,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { use } from "react";
import { cn } from "@/lib/utils";
import { useCurrencyStore } from "@/stores/useCurrencyStore";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const { id } = use(params);
  const property = mockProperties.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const { formatPrice } = useCurrencyStore();

  if (!property) {
    notFound();
  }

  const nextImage = () => setActiveImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumbs / Back */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/properties" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-all group">
            <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:bg-indigo-50 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </div>
            กลับไปหน้าค้นหา
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
              <Share2 className="w-5 h-5 text-slate-600" />
            </button>
            <FavoriteButton propertyId={property.id} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content (Images + Details) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery Section */}
            <div className="relative h-[450px] md:h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl group border-4 border-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={property.images[activeImage] || '/placeholder-home.jpg'}
                    alt={property.title}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                </motion.div>
              </AnimatePresence>

              {/* Overlay Badges */}
              <div className="absolute top-8 left-8 flex flex-wrap gap-3">
                <div className="px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2 border border-indigo-400/30 backdrop-blur-md">
                  <Award className="w-4 h-4" />
                  Premium Nest
                </div>
                <div className="px-5 py-2.5 bg-white/10 backdrop-blur-xl text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2 border border-white/20">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Verified Host
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute inset-0 flex items-center justify-between px-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <button onClick={prevImage} className="p-4 bg-white/10 backdrop-blur-2xl text-white rounded-[1.5rem] shadow-2xl border border-white/20 hover:bg-white hover:text-slate-900 transition-all active:scale-90">
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button onClick={nextImage} className="p-4 bg-white/10 backdrop-blur-2xl text-white rounded-[1.5rem] shadow-2xl border border-white/20 hover:bg-white hover:text-slate-900 transition-all active:scale-90">
                  <ChevronRight className="w-7 h-7" />
                </button>
              </div>

              {/* Image Info & Counter */}
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div className="flex gap-2 p-2 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10">
                  {property.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={cn(
                        "h-1.5 transition-all duration-500 rounded-full",
                        idx === activeImage ? "w-10 bg-white" : "w-3 bg-white/30 hover:bg-white/60"
                      )}
                    />
                  ))}
                </div>
                <div className="bg-black/20 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 text-white text-xs font-black tracking-widest uppercase">
                  {activeImage + 1} / {property.images.length} Photos
                </div>
              </div>
            </div>

            {/* Title and Rating Section */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-premium border border-slate-100">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-black border border-amber-100">
                      <Star className="w-4 h-4 fill-amber-600 mr-1" />
                      {property.rating}
                    </div>
                    <span className="text-slate-400 font-bold">•</span>
                    <span className="text-slate-500 font-bold underline cursor-pointer">{property.reviewCount} รีวิว</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-slate-500 font-semibold">
                    <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center group/card transition-all hover:bg-white hover:shadow-premium hover:border-indigo-100">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3 group-hover/card:scale-110 transition-transform">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="block text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">สถานะ</span>
                  <span className="text-emerald-600 font-black text-xs uppercase tracking-wider">ว่างพร้อมเข้าอยู่</span>
                </div>
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center group/card transition-all hover:bg-white hover:shadow-premium hover:border-indigo-100">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-3 group-hover/card:scale-110 transition-transform">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="block text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">ระยะสัญญา</span>
                  <span className="text-slate-900 font-black text-xs uppercase tracking-wider">ขั้นต่ำ 6 เดือน</span>
                </div>
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center group/card transition-all hover:bg-white hover:shadow-premium hover:border-indigo-100">
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-3 group-hover/card:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span className="block text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">เฟอร์นิเจอร์</span>
                  <span className="text-slate-900 font-black text-xs uppercase tracking-wider">Luxury Set</span>
                </div>
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center group/card transition-all hover:bg-white hover:shadow-premium hover:border-indigo-100">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3 group-hover/card:scale-110 transition-transform">
                    <Info className="w-5 h-5" />
                  </div>
                  <span className="block text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">ค่าน้ำ/ไฟ</span>
                  <span className="text-slate-900 font-black text-xs uppercase tracking-wider">ตามมิเตอร์</span>
                </div>
              </div>

              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-3 p-6 bg-gradient-to-r from-indigo-600 to-violet-700 rounded-[2rem] text-white shadow-xl shadow-indigo-100 mb-10">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-widest opacity-80">Nest AI Insight</h4>
                    <p className="font-bold text-lg leading-tight">ทำไมที่นี่ถึงเหมาะกับคุณ?</p>
                    <p className="text-xs font-medium opacity-70 mt-1">วิเคราะห์จากความชอบของคุณในย่าน {property.location.split(',')[0]}</p>
                  </div>
                </div>

                <h2 className="text-2xl font-black text-slate-900">เกี่ยวกับที่พักนี้</h2>
                <p className="text-slate-600 leading-relaxed text-lg font-medium">
                  {property.description}
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-700 rounded-2xl text-sm font-bold border border-indigo-100/50">
                      <CheckCircle2 className="w-4 h-4" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Host Section */}
              <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20">
                    <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
                      <Image src={property.hostImage || ''} alt="Host" fill className="object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-2xl border-4 border-white shadow-lg">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <h4 className="text-xl font-black text-slate-900">ดูแลโดย {property.hostName}</h4>
                       <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">Superhost</span>
                    </div>
                    <p className="text-slate-500 font-bold text-sm">
                      สถิติตอบกลับเร็วภายใน 15 นาที • พาร์ทเนอร์ 2 ปี
                    </p>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black text-sm hover:bg-slate-50 hover:border-slate-200 transition-all shadow-premium">
                  ส่งข้อความถึง {property.hostName}
                </button>
              </div>
            </div>
          </div>

          {/* Booking Card - Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-[2.5rem] p-8 shadow-premium border border-slate-100 space-y-6">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-3xl font-black text-slate-900">{formatPrice(property.pricePerMonth)}</span>
                  <span className="text-slate-500 font-bold ml-2">/ เดือน</span>
                </div>
                <div className="bg-indigo-50 px-3 py-1 rounded-full text-xs font-bold text-indigo-600 border border-indigo-100">
                  คุ้มค่าที่สุด
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">วันที่เข้าอยู่</p>
                      <p className="text-sm font-bold text-slate-900">1 ต.ค. 2023</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-indigo-500" />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ผู้เข้าพัก</p>
                      <p className="text-sm font-bold text-slate-900">1 ท่าน</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between font-bold text-slate-600">
                  <span>ค่าเช่าเดือนแรก</span>
                  <span>{formatPrice(property.pricePerMonth)}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-600">
                  <span>ค่าธรรมเนียมบริการ</span>
                  <span>{formatPrice(150000)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100">
                  <span className="text-lg font-black text-slate-900">ยอดรวมมัดจำ</span>
                  <span className="text-lg font-black text-indigo-600">{formatPrice(property.pricePerMonth + 150000)}</span>
                </div>
              </div>

              <Link
                href={`/properties/${property.id}/book`}
                className="block w-full text-center bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-[0.98]"
              >
                จองที่พักนี้
              </Link>

              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
                <Info className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-xs font-bold text-amber-800 leading-tight">
                  ยังไม่ต้องใช้บัตรเครดิต จนกว่าเจ้าของที่พักจะอนุมัติใบสมัครของคุณ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
