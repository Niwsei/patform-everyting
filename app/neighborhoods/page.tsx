'use client'

import { neighborhoods } from '@/features/properties/services/neighborhoodData';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, TrendingUp, ShieldCheck, Footprints, ChevronRight, Sparkles, Map, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { translations } from '@/lib/translations';

export default function NeighborhoodsPage() {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 overflow-hidden relative">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,var(--primary),transparent_50%)] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 space-y-6">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-primary/20 shadow-glow"
          >
             <Map className="w-4 h-4 fill-primary" />
             Geospatial Intelligence
          </motion.div>
          <motion.h1
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none"
          >
            Vientiane <br/> <span className="text-primary italic">Hotzones.</span>
          </motion.h1>
          <motion.p
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.1 }}
             className="text-slate-500 dark:text-slate-400 font-bold text-lg max-w-2xl mx-auto"
          >
            Deep-dive into the capital's most coveted districts. Our data engine analyzes safety, walkability, and investment potential for every neighborhood.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {neighborhoods.map((nb, idx) => (
            <motion.div
              key={nb.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={`/neighborhoods/${nb.slug}`}
                className="group bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-premium border border-slate-100 dark:border-slate-800 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] transition-all duration-700 hover:-translate-y-3 block relative"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image src={nb.images[0]} alt={nb.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                  <div className="absolute top-6 left-6">
                     <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-[9px] font-black text-white uppercase tracking-[0.2em] border border-white/20">
                        {nb.stats.safetyScore}% Safety Rating
                     </span>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-3xl font-black tracking-tighter leading-none mb-2">{nb.name}</h3>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-glow" />
                       <p className="text-[10px] font-black opacity-70 uppercase tracking-[0.2em]">{nb.vibe}</p>
                    </div>
                  </div>
                </div>

                <div className="p-10 space-y-8">
                   <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-1">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                            Safety
                         </p>
                         <p className="text-xl font-black text-slate-900 dark:text-white">{nb.stats.safetyScore}%</p>
                      </div>
                      <div className="space-y-1 border-x border-slate-100 dark:border-slate-800 px-4">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <Footprints className="w-3.5 h-3.5 text-primary" />
                            Walk
                         </p>
                         <p className="text-xl font-black text-slate-900 dark:text-white">{nb.stats.walkability}%</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-primary" />
                            Yield
                         </p>
                         <p className="text-xl font-black text-slate-900 dark:text-white">High</p>
                      </div>
                   </div>

                   <p className="text-slate-500 dark:text-slate-400 font-bold text-xs leading-relaxed line-clamp-2">
                      {nb.description || "Discover the unique lifestyle and amenities of this premier Vientiane district."}
                   </p>

                   <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Explore District Data</span>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                         <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                   </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Global Stats Overlay */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="mt-32 p-16 bg-slate-900 rounded-[4rem] text-white relative overflow-hidden shadow-glow"
        >
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full -mr-64 -mt-64 blur-[120px] animate-pulse" />
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
              {[
                { label: 'Verified Hotzones', val: '08' },
                { label: 'Expat Communities', val: '12' },
                { label: 'POI Mapped', val: '500+' },
                { label: 'Data Latency', val: 'Real-time' }
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                   <p className="text-5xl font-black tracking-tighter">{stat.val}</p>
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{stat.label}</p>
                </div>
              ))}
           </div>
        </motion.div>
      </div>
    </main>
  );
}
