'use client'

import { Property } from "@/features/properties/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
import { useCurrencyStore } from "@/stores/useCurrencyStore";
import { ReviewSection } from "@/features/reviews/components/ReviewSection";
import { UnitMap } from "@/components/booking/UnitMap";
import { DirectChat } from "@/components/chat/DirectChat";
import { ImmersivePreview } from "@/components/listing/ImmersivePreview";
import { ShareCard } from "@/components/listing/ShareCard";

interface PropertyClientProps {
  property: Property;
}

export default function PropertyClient({ property }: PropertyClientProps) {
  const [activeImage, setActiveImage] = useState(0);
  const { formatPrice } = useCurrencyStore();

  const nextImage = () => setActiveImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumbs / Back */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/properties" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors">
            <ChevronLeft className="w-5 h-5" />
            กลับหน้าแรก
          </Link>
          <div className="flex items-center gap-4">
            <ShareCard property={property} />
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors underline cursor-pointer">
              <FavoriteButton propertyId={property.id} />
              บันทึก
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight leading-tight mb-3">
            {property.title}
          </h1>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-slate-900 text-slate-900" />
              <span className="text-slate-900 font-semibold">{property.rating}</span>
            </div>
            <span>·</span>
            <span className="underline cursor-pointer hover:text-slate-900 transition-colors">{property.reviewCount} รีวิว</span>
            <span>·</span>
            <div className="flex items-center gap-1 underline cursor-pointer hover:text-slate-900 transition-colors">
              <MapPin className="w-4 h-4" />
              {property.location}
            </div>
          </div>
        </div>

        {/* Minimal Gallery Section */}
        <div className="relative h-[400px] md:h-[600px] w-full rounded-[2.5rem] overflow-hidden mb-12 group bg-slate-100 dark:bg-slate-900 shadow-2xl">
          <ImmersivePreview image={property.images[0]} title={property.title} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full"
            >
              <Image
                src={property.images[activeImage] || '/placeholder-home.jpg'}
                alt={property.title}
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={prevImage} className="p-3 bg-white/90 backdrop-blur-sm text-slate-900 rounded-full shadow-md border border-slate-200 hover:scale-105 transition-transform">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextImage} className="p-3 bg-white/90 backdrop-blur-sm text-slate-900 rounded-full shadow-md border border-slate-200 hover:scale-105 transition-transform">
              <ChevronRight className="w-6 h-6" />
              </button>
          </div>

          <div className="absolute bottom-6 right-6 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-lg text-white text-sm font-medium tracking-wide">
            {activeImage + 1} / {property.images.length}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">

            {/* Host Section */}
            <div className="flex items-center justify-between pb-8 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">เจ้าของที่พัก: {property.hostName}</h2>
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <span>ผู้เชี่ยวชาญการปล่อยเช่า</span>
                  <span>·</span>
                  <span>พาร์ทเนอร์ 2 ปี</span>
                </div>
              </div>
              <div className="relative w-14 h-14">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                  <Image src={property.hostImage || '/placeholder-user.jpg'} alt="Host" fill className="object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 bg-[#ff385c] text-white p-1 rounded-full shadow-sm">
                  <ShieldCheck className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-slate-200">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900">สถานะ</h3>
                  <p className="text-slate-500 text-sm mt-1">ว่างพร้อมเข้าอยู่ทันที</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900">ระยะสัญญา</h3>
                  <p className="text-slate-500 text-sm mt-1">ขั้นต่ำ 6 เดือน</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900">การตกแต่ง</h3>
                  <p className="text-slate-500 text-sm mt-1">เฟอร์นิเจอร์ครบครัน</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900">ค่าน้ำ/ไฟ</h3>
                  <p className="text-slate-500 text-sm mt-1">จ่ายตามมิเตอร์รัฐ</p>
                </div>
              </div>
            </div>

            {/* Nest AI Insight (Redesigned) */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-100/30 rounded-full group-hover:scale-150 transition-transform duration-700" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                   <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-900 uppercase tracking-tight">Nest AI Analysis</h3>
              </div>
              <div className="space-y-4 relative z-10">
                 <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    ที่พักนี้เหมาะสำหรับคุณ เนื่องจากตรงกับสถิติความนิยมในโซน {property.location.split(',')[0]} ทั้งในด้านราคาและความปลอดภัย
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                       <p className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Connectivity</p>
                       <p className="text-xs font-bold text-slate-700">ใกล้ตลาดเช้า (1.2 กม.)</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                       <p className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Lifestyle</p>
                       <p className="text-xs font-bold text-slate-700">เดินไปริมโขงได้ใน 10 นาที</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Unit Layout Selection (New!) */}
            {property.units && property.units.length > 0 && (
               <div className="pb-12 border-b border-slate-200">
                  <UnitMap units={property.units} basePrice={property.pricePerMonth} />
               </div>
            )}

            {/* Description */}
            <div className="pb-8 border-b border-slate-200">
              <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">เกี่ยวกับที่พักนี้</h2>
              <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line font-medium">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="pb-8 border-b border-slate-200">
              <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">สิ่งอำนวยความสะดวก</h2>
              <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-4 text-slate-700 font-bold group">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                       <CheckCircle2 className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 shrink-0" />
                    </div>
                    <span className="text-base">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Reviews Section */}
            <div className="pb-8">
               <ReviewSection />
            </div>

          </div>

          {/* Sticky Booking Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-2xl font-bold text-slate-900">{formatPrice(property.pricePerMonth)}</span>
                <span className="text-slate-500 text-sm">/ เดือน</span>
              </div>

              <div className="rounded-xl border border-slate-300 mb-6 overflow-hidden">
                <div className="grid grid-cols-2 border-b border-slate-300">
                  <div className="p-3 border-r border-slate-300">
                    <label className="block text-[10px] font-bold uppercase text-slate-800 mb-1">วันที่เข้าอยู่</label>
                    <div className="text-sm text-slate-600">1 ต.ค. 2026</div>
                  </div>
                  <div className="p-3">
                    <label className="block text-[10px] font-bold uppercase text-slate-800 mb-1">ระยะสัญญา</label>
                    <div className="text-sm text-slate-600">6 เดือน</div>
                  </div>
                </div>
                <div className="p-3">
                  <label className="block text-[10px] font-bold uppercase text-slate-800 mb-1">ผู้เข้าพัก</label>
                  <div className="text-sm text-slate-600">1 ท่าน</div>
                </div>
              </div>

              <Link
                href={`/properties/${property.id}/book`}
                className="block w-full text-center bg-[#ff385c] text-white py-3.5 rounded-lg font-semibold text-base hover:bg-[#d90b3e] transition-colors mb-4"
              >
                จองที่พักนี้
              </Link>
              <div className="text-center text-sm text-slate-500 mb-6 font-medium">
                ยังไม่ต้องจ่ายเงินจนกว่าจะได้รับการอนุมัติ
              </div>

              <div className="space-y-3 pb-4 border-b border-slate-200">
                <div className="flex justify-between text-slate-600 text-base">
                  <span className="underline">ค่าเช่าเดือนแรก</span>
                  <span>{formatPrice(property.pricePerMonth)}</span>
                </div>
                <div className="flex justify-between text-slate-600 text-base">
                  <span className="underline">ค่าธรรมเนียมเข้าพัก (ครั้งเดียว)</span>
                  <span>{formatPrice(150000)}</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-slate-900 text-base pt-4">
                <span>ยอดรวมมัดจำแรกเข้า</span>
                <span>{formatPrice(property.pricePerMonth + 150000)}</span>
              </div>
            </div>

            {/* Host Contact Trigger */}
            <div className="mt-6">
              <DirectChat
                hostName={property.hostName || 'Host'}
                hostAvatar={property.hostImage || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100'}
                propertyTitle={property.title}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
