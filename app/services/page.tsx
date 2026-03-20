'use client'

import { useState } from 'react';
import { serviceProviders, ServiceProvider } from '@/features/services/servicesData';
import Image from 'next/image';
import { Star, ShieldCheck, Truck, Sparkles, Wrench, Search, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceProvider['category']>('all');

  const filteredProviders = activeCategory === 'all'
    ? serviceProviders
    : serviceProviders.filter(p => p.category === activeCategory);

  const categories = [
    { id: 'all', label: 'ทั้งหมด', icon: Search },
    { id: 'moving', label: 'ขนย้าย', icon: Truck },
    { id: 'cleaning', label: 'ทำความสะอาด', icon: Sparkles },
    { id: 'repair', label: 'ซ่อมบำรุง', icon: Wrench },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Services Marketplace</h1>
            <p className="text-slate-500 font-bold text-lg max-w-xl">
              พาร์ทเนอร์ที่ช่วยให้การย้ายบ้านและการอยู่อาศัยของคุณในเวียงจันทน์เป็นเรื่องง่าย
            </p>
          </div>

          <div className="flex flex-wrap gap-2 bg-white p-2 rounded-3xl shadow-sm border border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                  activeCategory === cat.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                )}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image src={provider.image} alt={provider.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                   <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm flex items-center gap-1.5 border border-white/20">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-black text-slate-900">{provider.rating}</span>
                      <span className="text-[10px] font-bold text-slate-400">({provider.reviewCount})</span>
                   </div>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">{provider.name}</h3>
                    {provider.isVerified && <ShieldCheck className="w-5 h-5 text-emerald-500" />}
                  </div>
                  <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
                    {provider.category === 'moving' ? 'บริการขนย้าย' : provider.category === 'cleaning' ? 'ทำความสะอาด' : 'ซ่อมบำรุง'}
                  </p>
                  <p className="text-slate-500 font-medium text-sm line-clamp-2 leading-relaxed">
                    {provider.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ราคาเริ่มต้น</p>
                    <p className="text-lg font-black text-slate-900">{provider.priceRange.split(' - ')[0]}</p>
                  </div>
                  <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
                    จองบริการ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-20 p-12 bg-indigo-900 rounded-[3rem] text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl space-y-4">
                 <h2 className="text-3xl font-black tracking-tight">Nest Partner Program</h2>
                 <p className="text-indigo-100 font-medium opacity-80">
                    หากคุณเป็นผู้ให้บริการมืออาชีพในเวียงจันทน์ มาร่วมเป็นพาร์ทเนอร์กับเราเพื่อเข้าถึงฐานลูกค้ากว่า 5,000 รายต่อเดือน
                 </p>
              </div>
              <button className="px-10 py-5 bg-white text-indigo-900 rounded-2xl font-black text-lg hover:shadow-2xl transition-all">
                 สมัครเป็นพาร์ทเนอร์
              </button>
           </div>
        </div>
      </div>
    </main>
  );
}
