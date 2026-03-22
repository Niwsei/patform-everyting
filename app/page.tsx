'use client'

import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { mockProperties } from '@/features/properties/services/mockData';
import { HeroSearch } from '@/features/search/components/HeroSearch';
import { NestAIEngine } from '@/features/search/components/NestAIEngine';
import { PageTransition } from '@/components/PageTransition';
import { RelocationConcierge } from '@/features/relocation/components/RelocationConcierge';
import { Truck, Shield, Zap, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <PageTransition>
      {/* 1. Hero Search */}
      <HeroSearch />
      
      {/* 2. Bento Grid Feature Section */}
      <section className="py-24 mesh-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <motion.h2
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="text-xs font-black text-indigo-600 dark:text-indigo-400 tracking-[0.3em] uppercase"
            >
               Why Vientiane Nest?
            </motion.h2>
            <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter"
            >
              The New Living <br/> <span className="text-indigo-600">Standard</span> in Laos
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Main Bento Card */}
            <motion.div
               whileHover={{ y: -5 }}
               className="md:col-span-3 md:row-span-2 bg-white dark:bg-slate-900 p-12 rounded-[3rem] shadow-premium border border-slate-100 dark:border-slate-800 flex flex-col justify-between group overflow-hidden relative"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/20 rounded-bl-[5rem] -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
               <div className="space-y-6 relative z-10">
                  <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100 dark:shadow-none">
                     <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">ค้นหาที่พักรวดเร็ว <br/>ด้วยระบบ AI อัจฉริยะ</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-sm">
                    ไม่ต้องเสียเวลาขับรถวนหา เราจับคู่คุณกับที่พักที่ตรงไลฟ์สไตล์ที่สุดในไม่กี่วินาที
                  </p>
               </div>
               <div className="pt-8 relative z-10">
                  <button className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                     Start Searching <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
            </motion.div>

            {/* Service Bento Card */}
            <motion.div
               whileHover={{ y: -5 }}
               className="md:col-span-3 bg-emerald-600 p-10 rounded-[3rem] text-white flex flex-col justify-between relative overflow-hidden group"
            >
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.2),transparent)] opacity-50" />
               <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-4">
                     <h3 className="text-2xl font-black leading-tight">บริการขนย้าย <br/> & โลจิสติกส์</h3>
                     <p className="text-emerald-50 font-bold text-sm max-w-[200px] opacity-80">ย้ายเข้าบ้านใหม่แบบสบายๆ ด้วยทีมงานมืออาชีพ</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                     <Truck className="w-6 h-6" />
                  </div>
               </div>
               <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 px-3 py-1.5 rounded-full border border-white/20">500+ Verified Partners</span>
               </div>
            </motion.div>

            {/* Trust Bento Card */}
            <motion.div
               whileHover={{ y: -5 }}
               className="md:col-span-3 bg-slate-900 dark:bg-white p-10 rounded-[3rem] text-white dark:text-slate-900 flex items-center justify-between group overflow-hidden relative"
            >
               <div className="space-y-4 relative z-10">
                  <h3 className="text-2xl font-black leading-tight">รายการที่ <br/> ผ่านการตรวจสอบ</h3>
                  <p className="text-slate-400 dark:text-slate-500 font-bold text-sm max-w-[240px]">ปลอดภัย 100% ด้วยระบบ KYC ของพาร์ทเนอร์ทุกคน</p>
               </div>
               <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center shrink-0 shadow-2xl relative z-10">
                  <Shield className="w-10 h-10 text-white" />
               </div>
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-tl-full pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. ส่วนแสดงรายการแนะนำ */}
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">กำลังเป็นที่นิยม</span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900">อสังหาริมทรัพย์แนะนำ</h2>
            <p className="mt-4 text-lg text-gray-600">ที่พักที่คัดสรรมาเพื่อคุณในโซนที่น่าสนใจที่สุดของเวียงจันทน์</p>
          </div>
          <a href="/properties" className="hidden sm:flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
            ดูทั้งหมด <span className="text-2xl leading-none">&rarr;</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Relocation Bundle Section (New!) */}
        <div className="mt-32">
           <RelocationConcierge />
        </div>

        {/* AI Powered Section */}
        <div className="mt-32 p-12 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/20 rounded-full -ml-32 -mb-32 blur-3xl animate-pulse" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-black uppercase tracking-[0.2em] text-indigo-300">
                <Sparkles className="w-4 h-4" />
                Nest AI Engine
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                ให้ AI ช่วยหาบ้าน <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">ที่ใช่สำหรับคุณที่สุด</span>
              </h2>
              <p className="text-lg text-slate-400 font-medium max-w-lg">
                ระบบอัจฉริยะของเราวิเคราะห์ที่พักกว่าพันแห่งในเวียงจันทน์ เพื่อจับคู่คุณกับทำเลและราคาที่ตอบโจทย์ไลฟ์สไตล์ของคุณที่สุด
              </p>
              <NestAIEngine />
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
               {[
                 { label: 'อัตราการจับคู่', value: '98%', desc: 'ความแม่นยำสูง' },
                 { label: 'เวลาที่ประหยัด', value: '12ชม.', desc: 'ต่อการค้นหา' },
                 { label: 'พาร์ทเนอร์ที่แนะนำ', value: '500+', desc: 'ทั่วเวียงจันทน์' },
                 { label: 'การันตีความพอใจ', value: '100%', desc: 'คืนเงินหากไม่ตรงปก' }
               ].map((stat, i) => (
                 <div key={i} className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 group hover:bg-white/10 transition-all">
                    <p className="text-3xl font-black mb-1 group-hover:scale-110 transition-transform origin-left">{stat.value}</p>
                    <p className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-2">{stat.label}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{stat.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
        
        {/* ปุ่มดูทั้งหมดสำหรับมือถือ */}
        <div className="mt-12 sm:hidden text-center">
          <a href="/properties" className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold w-full shadow-lg shadow-indigo-200">
            ดูอสังหาริมทรัพย์ทั้งหมด
          </a>
        </div>
      </div>

      {/* 4. CTA for Landlords/Services */}
      <section className="bg-indigo-900 py-24">
        <div className="max-w-5_l mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-8">
            คุณมีห้องว่างหรือบริการขนส่งหรือไม่?
          </h2>
          <p className="text-xl text-indigo-100 mb-12 opacity-80">
            เข้าร่วมเครือข่ายการเช่าและโลจิสติกส์ที่เติบโตเร็วที่สุดในเวียงจันทน์
            ให้ลูกค้าหลายพันคนเห็นบริการของคุณทุกวัน
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-colors">
              ลงประกาศที่พักของคุณ
            </button>
            <button className="bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-600 transition-colors border border-indigo-500/30">
              เข้าร่วมเป็นพาร์ทเนอร์
            </button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}