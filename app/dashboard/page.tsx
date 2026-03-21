'use client'

import { useState } from "react";
import { mockProperties } from "@/features/properties/services/mockData";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Search,
  MapPin,
  Calendar,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  LayoutDashboard,
  Settings,
  Heart,
  MessageSquare,
  Wallet,
  ArrowUpRight,
  BarChart2,
  Package,
  LayoutGrid
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCurrencyStore } from "@/stores/useCurrencyStore";
import { PartnerAnalytics } from "@/features/dashboard/components/PartnerAnalytics";
import { TenantKYC } from "@/components/kyc/TenantKYC";
import { DigitalLease } from "@/components/kyc/DigitalLease";
import { HostBookingManager } from "@/components/booking/HostBookingManager";
import { UnitManagement } from "@/components/dashboard/UnitManagement";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('bookings');
  const { formatPrice } = useCurrencyStore();

  // Simulated data
  const myBookings = [
    {
      id: 'bk-001',
      property: mockProperties[0],
      status: 'pending',
      date: 'Sep 24, 2023',
      amount: 3650000,
      host: mockProperties[0].hostName,
      type: 'property'
    },
    {
      id: 'srv-001',
      property: {
        title: 'บริการขนย้ายบ้านแบบ Full-Service',
        location: 'ทั่วเวียงจันทน์',
        images: ['https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=600&auto=format&fit=crop'],
      },
      status: 'confirmed',
      date: 'Oct 01, 2023',
      amount: 450000,
      host: 'Vientiane Logistics',
      type: 'service'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Sidebar Nav */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-premium border border-slate-100 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-lg">
                  AS
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 leading-none">คุณอเล็กซ์ สมิธ</h2>
                  <p className="text-slate-400 font-bold text-xs mt-1 uppercase tracking-widest">สมาชิกพรีเมียม</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={cn("w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all", activeTab === 'bookings' ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "text-slate-500 hover:bg-slate-50")}
                >
                  <Calendar className="w-5 h-5" />
                  การจองของฉัน
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={cn("w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all", activeTab === 'analytics' ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "text-slate-500 hover:bg-slate-50")}
                >
                  <BarChart2 className="w-5 h-5" />
                  สถิติพาร์ทเนอร์
                </button>
                <button
                  onClick={() => setActiveTab('manage_bookings')}
                  className={cn("w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all", activeTab === 'manage_bookings' ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "text-slate-500 hover:bg-slate-50")}
                >
                  <Package className="w-5 h-5" />
                  จัดการคำขอจอง
                </button>
                <button
                  onClick={() => setActiveTab('manage_units')}
                  className={cn("w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all", activeTab === 'manage_units' ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "text-slate-500 hover:bg-slate-50")}
                >
                  <LayoutGrid className="w-5 h-5" />
                  จัดการยูนิตที่พัก
                </button>
                <Link
                  href="/favorites"
                  className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  <Heart className="w-5 h-5" />
                  ที่พักที่บันทึกไว้
                </Link>
                <button
                  className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  ข้อความ
                  <span className="ml-auto w-5 h-5 bg-indigo-600 text-white text-[10px] rounded-full flex items-center justify-center">2</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  <Settings className="w-5 h-5" />
                  ตั้งค่า
                </button>
              </nav>
            </div>

            <div className="bg-indigo-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
               <h4 className="font-black text-xl mb-2 relative z-10">แนะนำเพื่อน</h4>
               <p className="text-sm font-medium opacity-80 mb-6 relative z-10">รับ ₭100,000 สำหรับเพื่อนทุกคนที่จองที่พักครั้งแรก</p>
               <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black text-sm relative z-10 hover:shadow-xl transition-all">
                  แชร์รหัสแนะนำ
               </button>
            </div>

            <div className="space-y-4">
               <h3 className="px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">การดำเนินการที่จำเป็น</h3>
               <TenantKYC />
               <DigitalLease
                  propertyName={mockProperties[0].title}
                  hostName={mockProperties[0].hostName || 'Host'}
                  amount={formatPrice(mockProperties[0].pricePerMonth)}
               />
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-9 space-y-10">
            {activeTab === 'analytics' ? (
               <PartnerAnalytics />
            ) : activeTab === 'manage_bookings' ? (
               <HostBookingManager />
            ) : activeTab === 'manage_units' ? (
               <UnitManagement />
            ) : (
               <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                     <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                        <Wallet className="w-6 h-6" />
                     </div>
                     <span className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-full">
                        <ArrowUpRight className="w-3 h-3" />
                        +12%
                     </span>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ยอดใช้จ่ายสะสม</p>
                  <p className="text-2xl font-black text-slate-900">{formatPrice(4100000)}</p>
               </div>

               <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                     <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                        <Package className="w-6 h-6" />
                     </div>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">การจองที่รอการตรวจสอบ</p>
                  <p className="text-2xl font-black text-slate-900">01</p>
               </div>

               <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                     <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                        <BarChart2 className="w-6 h-6" />
                     </div>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">คะแนนเครดิต Nest</p>
                  <p className="text-2xl font-black text-slate-900">740</p>
               </div>
            </div>

            {/* Header / Section Title */}
            <div>
               <h2 className="text-3xl font-black text-slate-900 tracking-tight">จัดการการจอง</h2>
               <p className="text-slate-500 font-bold mt-2 text-sm">ตรวจสอบสถานะและรายละเอียดการจองของคุณ</p>
            </div>

            {/* Booking List */}
            <div className="space-y-6">
              {myBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-slate-100 flex flex-col md:flex-row gap-8 relative overflow-hidden group"
                >
                  <div className={cn(
                    "absolute top-0 right-0 px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest border-l border-b transition-all",
                    booking.status === 'pending' ? "bg-amber-50 text-amber-600 border-amber-100/50" : "bg-emerald-50 text-emerald-600 border-emerald-100/50"
                  )}>
                    {booking.status === 'pending' ? 'รอการตรวจสอบ' : 'ยืนยันแล้ว'}
                  </div>

                  <div className="relative w-full md:w-48 h-40 rounded-3xl overflow-hidden shrink-0 shadow-lg border border-slate-100">
                    <Image src={booking.property.images?.[0] || booking.property.images[0]} alt="Property" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                          booking.type === 'property' ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
                        )}>
                          {booking.type === 'property' ? 'อสังหาริมทรัพย์' : 'บริการ'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">{booking.property.title}</h3>
                      <p className="flex items-center gap-1.5 text-slate-400 font-bold text-sm">
                        <MapPin className="w-4 h-4 text-indigo-500" />
                        {booking.property.location}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-slate-50">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{booking.type === 'property' ? 'วันที่เข้าอยู่' : 'วันที่รับบริการ'}</p>
                        <p className="font-bold text-slate-900">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{booking.type === 'property' ? 'เจ้าของที่พัก' : 'ผู้ให้บริการ'}</p>
                        <p className="font-bold text-slate-900">{booking.host}</p>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ยอดรวม</p>
                        <p className="font-bold text-indigo-600">{formatPrice(booking.amount)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col justify-end gap-3 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-slate-50 md:pl-8">
                     <button className="flex-1 md:flex-none px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:shadow-xl transition-all">
                        ดูรายละเอียด
                     </button>
                     <button className="flex-1 md:flex-none px-6 py-4 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl font-bold text-sm hover:text-slate-600 hover:border-slate-200 transition-all">
                        ยกเลิก
                     </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State / Recommended */}
            <div className="bg-slate-200/50 rounded-[2.5rem] p-12 text-center border-2 border-dashed border-slate-200">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <TrendingUp className="w-8 h-8 text-indigo-600" />
               </div>
               <h3 className="text-xl font-black text-slate-900">กำลังมองหาที่พักเพิ่มเติม?</h3>
               <p className="text-slate-500 font-medium mt-2 mb-8 max-w-sm mx-auto">ค้นพบที่พักที่กำลังเป็นที่นิยมในย่านที่คุณสนใจ</p>
               <Link
                href="/properties"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black shadow-sm hover:shadow-md transition-all"
               >
                 สำรวจที่พัก
                 <ChevronRight className="w-4 h-4" />
               </Link>
            </div>
               </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
