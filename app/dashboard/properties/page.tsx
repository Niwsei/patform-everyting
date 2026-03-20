'use client'

import { cn } from "@/lib/utils";
import { Building2, Plus, MapPin, Star, MoreVertical, Edit, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { mockProperties } from "@/features/properties/services/mockData";

export default function MyPropertiesPage() {
  // Mocking my listed properties (first 2 from mock data)
  const myProperties = mockProperties.slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">อสังหาริมทรัพย์ของฉัน</h1>
            <p className="text-slate-500 font-bold mt-2">จัดการรายการที่พักของคุณและติดตามผลการดำเนินงาน</p>
          </div>
          <Link
            href="/onboarding"
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            เพิ่มที่พักใหม่
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-[2.5rem] p-6 shadow-premium border border-slate-100 group relative overflow-hidden"
            >
              <div className="relative h-48 w-full rounded-3xl overflow-hidden mb-6">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-indigo-600 border border-white/20">
                  เปิดใช้งาน
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 line-clamp-1">{property.title}</h3>
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs mt-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                    {property.location}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">ค่าเช่ารายเดือน</p>
                    <p className="font-black text-slate-900">₭{property.pricePerMonth.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="font-black text-[10px] text-amber-700">4.9</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all">
                    <Edit className="w-3.5 h-3.5" />
                    แก้ไข
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-100 text-slate-400 rounded-xl font-bold text-xs hover:text-red-500 hover:border-red-100 transition-all">
                    <Trash className="w-3.5 h-3.5" />
                    เก็บถาวร
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* New Property Placeholder */}
          <Link
            href="/onboarding"
            className="bg-slate-200/50 rounded-[2.5rem] border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-12 text-center group hover:border-indigo-300 hover:bg-indigo-50/50 transition-all"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Plus className="w-8 h-8 text-slate-400 group-hover:text-white" />
            </div>
            <h3 className="font-black text-slate-900">ลงประกาศเพิ่ม</h3>
            <p className="text-slate-500 text-xs font-bold mt-2 uppercase tracking-widest">ขยายพอร์ตโฟลิโอของคุณ</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
