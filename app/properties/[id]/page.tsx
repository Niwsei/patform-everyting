'use client'

import { mockProperties } from "@/features/properties/services/mockData";
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
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumbs / Back */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/properties" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors">
            <ChevronLeft className="w-5 h-5" />
            กลับหน้าแรก
          </Link>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors underline">
              <Share2 className="w-4 h-4" />
              แชร์
            </button>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors underline cursor-pointer">
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
        <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden mb-12 group bg-slate-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
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
            <div className="grid grid-cols-2 gap-6 pb-8 border-b border-slate-200">
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
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold text-slate-900">Nest Insight</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-1">
                ที่พักนี้เหมาะสำหรับคุณ เนื่องจากตรงกับสถิติความนิยมในโซน {property.location.split(',')[0]} ทั้งในด้านราคาและความปลอดภัย
              </p>
            </div>

            {/* Description */}
            <div className="pb-8 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">เกี่ยวกับที่พักนี้</h2>
              <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="pb-8 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">สิ่งอำนวยความสะดวก</h2>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0" />
                    <span className="text-base">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="pb-8">
              <div className="flex items-center gap-2 mb-8">
                <Star className="w-5 h-5 fill-slate-900 text-slate-900" />
                <h2 className="text-xl font-semibold text-slate-900">{property.rating} · {property.reviewCount} รีวิว</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                 {[
                   { name: 'Somsak', date: 'August 2023', comment: 'ห้องพักสะอาดมาก และอยู่ใกล้แหล่งของกิน พนักงานดูแลดีมากครับ แนะนำเลย' },
                   { name: 'Keo', date: 'July 2023', comment: 'วิวสวยมากครับ เดินทางสะดวก ใกล้ประตูชัยจริงๆ คุ้มค่าเงินมาก' },
                   { name: 'Maria', date: 'June 2023', comment: 'Perfect location for digital nomads. The WiFi was super fast and reliable.' },
                   { name: 'Anoulack', date: 'May 2023', comment: 'เจ้าของที่พักตอบไวมาก ช่วยเหลือทุกอย่าง ประทับใจมากครับ' }
                 ].map((review, i) => (
                   <div key={i} className="space-y-3">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                            {review.name[0]}
                         </div>
                         <div>
                            <h4 className="text-sm font-semibold text-slate-900">{review.name}</h4>
                            <p className="text-xs text-slate-500">{review.date}</p>
                         </div>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                         {review.comment}
                      </p>
                   </div>
                 ))}
              </div>

              <button className="mt-8 px-6 py-3 border border-slate-900 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors">
                แสดงรีวิวทั้งหมด
              </button>
            </div>

          </div>

          {/* Sticky Booking Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-2xl font-bold text-slate-900">₭{property.pricePerMonth.toLocaleString()}</span>
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
                  <span>₭{property.pricePerMonth.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600 text-base">
                  <span className="underline">ค่าธรรมเนียมเข้าพัก (ครั้งเดียว)</span>
                  <span>₭150,000</span>
                </div>
              </div>
              
              <div className="flex justify-between font-bold text-slate-900 text-base pt-4">
                <span>ยอดรวมมัดจำแรกเข้า</span>
                <span>₭{(property.pricePerMonth + 150000).toLocaleString()}</span>
              </div>
            </div>
            
            {/* Host Contact Trigger */}
            <div className="mt-6 text-center">
              <button className="text-slate-900 font-semibold underline hover:text-slate-600 transition-colors">
                ส่งข้อความถึงเจ้าของที่พัก
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
