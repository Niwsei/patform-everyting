'use client'

import { neighborhoods } from '@/features/properties/services/neighborhoodData';
import { mockProperties } from '@/features/properties/services/mockData';
import { PropertyCard } from '@/features/properties/components/PropertyCard';
import Image from 'next/image';
import { use } from 'react';
import { notFound } from 'next/navigation';
import { ShieldCheck, MapPin, Coffee, Utensils, Building, ArrowLeft, Zap, Heart, Compass } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function NeighborhoodDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const neighborhood = neighborhoods.find(n => n.slug === slug);

  if (!neighborhood) notFound();

  const localProperties = mockProperties.filter(p => p.location.includes(neighborhood.name.split(' ')[0]));

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image src={neighborhood.images[0]} alt={neighborhood.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
           <Link href="/neighborhoods" className="mb-8 flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all font-bold text-sm uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" />
              Back to Guides
           </Link>
           <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-center">{neighborhood.name}</h1>
           <p className="mt-4 text-xl font-medium max-w-2xl text-center opacity-90">{neighborhood.vibe}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">เกี่ยวกับย่านนี้</h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                {neighborhood.description}
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-100/50 rounded-full group-hover:scale-150 transition-transform duration-700" />
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 relative z-10">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 relative z-10">คาเฟ่และไลฟ์สไตล์</h3>
                  <p className="text-slate-500 font-bold leading-relaxed relative z-10">
                    ย่านนี้เต็มไปด้วยจุดนัดพบที่ทันสมัย มีคาเฟ่ที่เหมาะแก่การทำงาน (Co-working space) และแหล่งแฮงเอาท์ในตอนเย็น
                  </p>
               </div>
               <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-100/50 rounded-full group-hover:scale-150 transition-transform duration-700" />
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6 relative z-10">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 relative z-10">ความปลอดภัยระดับสูง</h3>
                  <p className="text-slate-500 font-bold leading-relaxed relative z-10">
                    มีระบบรักษาความปลอดภัยที่ดีเยี่ยม พร้อมสถานีตำรวจและหน่วยกู้ภัยที่ตอบสนองไวในเขตพื้นที่
                  </p>
               </div>
            </section>

            {/* Deep Neighborhood Analytics */}
            <section className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4f46e5,transparent_70%)]" />
               </div>

               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8">
                     <div className="inline-flex items-center gap-2 bg-indigo-500/20 px-4 py-2 rounded-full border border-indigo-400/30 text-indigo-300 text-xs font-black uppercase tracking-widest">
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        Market Analysis v2.0
                     </div>
                     <h2 className="text-4xl font-black tracking-tight leading-none">ดัชนีความน่าอยู่ <br/> (Living Index)</h2>
                     <p className="text-indigo-100 font-medium opacity-70 leading-relaxed">
                        วิเคราะห์ข้อมูลเชิงลึกจากสถิติจริง เพื่อช่วยให้คุณตัดสินใจเลือกย่านที่พักที่ตอบโจทย์ชีวิตในเวียงจันทน์มากที่สุด
                     </p>
                     <div className="grid grid-cols-2 gap-6 pt-4">
                        <div>
                           <p className="text-3xl font-black text-white">A+</p>
                           <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1">Connectivity</p>
                        </div>
                        <div>
                           <p className="text-3xl font-black text-white">94%</p>
                           <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mt-1">Expat Density</p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     {[
                        { label: 'ความสะดวกสบาย', score: 92, color: 'bg-indigo-500' },
                        { label: 'ความปลอดภัยตอนกลางคืน', score: 88, color: 'bg-emerald-500' },
                        { label: 'สิ่งอำนวยความสะดวกพื้นฐาน', score: 85, color: 'bg-amber-500' },
                        { label: 'สภาพแวดล้อมและอากาศ', score: 78, color: 'bg-pink-500' },
                     ].map((index, i) => (
                        <div key={i} className="space-y-2">
                           <div className="flex justify-between items-end">
                              <span className="text-xs font-black uppercase tracking-widest opacity-60">{index.label}</span>
                              <span className="text-sm font-black">{index.score}%</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                 initial={{ width: 0 }}
                                 whileInView={{ width: `${index.score}%` }}
                                 transition={{ duration: 1.5, delay: i * 0.1 }}
                                 className={cn("h-full rounded-full", index.color)}
                              />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">ที่พักแนะนำในย่าน {neighborhood.name.split(' ')[0]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {localProperties.map(p => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
             <div className="sticky top-32 space-y-8">
                <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-16 -mt-16 blur-2xl" />
                   <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-4">Neighborhood Stats</h4>
                   <div className="space-y-6">
                      {[
                        { label: 'ค่าเช่าเฉลี่ย', value: `₭${neighborhood.stats.averageRent.toLocaleString()}` },
                        { label: 'คะแนนความปลอดภัย', value: `${neighborhood.stats.safetyScore}/100` },
                        { label: 'ความสะดวกในการเดิน', value: `${neighborhood.stats.walkability}/100` }
                      ].map((stat, i) => (
                        <div key={i} className="flex justify-between items-end border-b border-white/10 pb-4">
                           <span className="text-sm font-bold opacity-60 uppercase tracking-widest">{stat.label}</span>
                           <span className="text-xl font-black">{stat.value}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-premium">
                   <h4 className="font-black text-slate-900 mb-6">ไฮไลท์ประจำย่าน</h4>
                   <ul className="space-y-4">
                      {neighborhood.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-3">
                           <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                           <span className="font-bold text-slate-600">{h}</span>
                        </li>
                      ))}
                   </ul>
                </div>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
