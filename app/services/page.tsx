'use client'

import { useState } from 'react';
import { serviceProviders, ServiceProvider } from '@/features/services/servicesData';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShieldCheck, Truck, Sparkles, Wrench, Search, ChevronRight, Zap, Globe, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { translations } from '@/lib/translations';

export default function ServicesPage() {
  const { language } = useLanguageStore();
  const t = translations[language];
  const [activeCategory, setActiveCategory] = useState<'all' | ServiceProvider['category']>('all');

  const filteredProviders = activeCategory === 'all'
    ? serviceProviders
    : serviceProviders.filter(p => p.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Services', icon: Search },
    { id: 'moving', label: 'Logistics', icon: Truck },
    { id: 'cleaning', label: 'Sanitation', icon: Sparkles },
    { id: 'repair', label: 'Technical', icon: Wrench },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="space-y-6">
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-3 bg-primary/10 text-primary px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20 shadow-glow"
            >
               <Zap className="w-4 h-4 fill-primary" />
               Vientiane Service Protocol
            </motion.div>
            <motion.h1
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]"
            >
              Elite <br/> <span className="text-primary italic">Marketplace.</span>
            </motion.h1>
            <motion.p
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-slate-500 dark:text-slate-400 font-bold text-lg max-w-xl"
            >
              Verified logistics, sanitation, and technical experts curated for the modern Vientiane resident.
            </motion.p>
          </div>

          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex flex-wrap gap-2 glass p-2 rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-premium"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={cn(
                  "flex items-center gap-3 px-8 py-4 rounded-3xl font-black text-[10px] uppercase tracking-[0.15em] transition-all duration-500",
                  activeCategory === cat.id ? "bg-primary text-white shadow-glow" : "text-slate-400 hover:text-slate-600 dark:hover:text-white"
                )}
              >
                <cat.icon className="w-4 h-4 stroke-[2.5]" />
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProviders.map((provider, idx) => (
              <motion.div
                key={provider.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="group bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] transition-all duration-700 hover:-translate-y-3 block relative">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image src={provider.image} alt={provider.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6">
                       <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-premium flex items-center gap-2 border border-white/20 dark:border-white/10">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-black text-slate-900 dark:text-white">{provider.rating}</span>
                          <span className="text-[10px] font-bold text-slate-400">({provider.reviewCount})</span>
                       </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent">
                       <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-[10px] font-black text-white uppercase tracking-widest">Available 24/7</span>
                       </div>
                    </div>
                  </div>

                  <div className="p-10 space-y-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-primary transition-colors">{provider.name}</h3>
                        {provider.isVerified && <ShieldCheck className="w-6 h-6 text-primary opacity-80" />}
                      </div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-3 py-1.5 bg-primary/10 rounded-xl inline-block">
                        {provider.category === 'moving' ? 'Logistics Partner' : provider.category === 'cleaning' ? 'Sanitation Expert' : 'Technical Ops'}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed line-clamp-2">
                        {provider.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-slate-50 dark:border-slate-800">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Base Protocol Rate</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">{provider.priceRange.split(' - ')[0]}</p>
                      </div>
                      <Link
                        href={`/services/book/${provider.id}`}
                        className="btn-primary px-8 py-4 text-[10px]"
                      >
                        Book Service
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global CTA Section */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="mt-32 p-16 bg-slate-900 rounded-[4.5rem] text-white relative overflow-hidden shadow-glow"
        >
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full -mr-64 -mt-64 blur-[120px] animate-pulse" />
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="max-w-2xl space-y-6">
                 <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                    <Globe className="w-4 h-4" />
                    Market Expansion v2.4
                 </div>
                 <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]">Scale Your <br/> <span className="text-primary italic">Operations.</span></h2>
                 <p className="text-lg text-slate-400 font-bold leading-relaxed">
                    Join the region's elite service network. Access over 12,000 monthly active users and automate your client acquisition.
                 </p>
              </div>
              <Link href="/onboarding" className="btn-primary scale-125 px-12 py-5 shadow-glow">
                 Join the Network
              </Link>
           </div>
        </motion.div>
      </div>
    </main>
  );
}
