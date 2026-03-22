'use client'

import { FavoritesList } from '@/features/favorites/components/FavoritesList';
import { Heart, Sparkles, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { translations } from '@/lib/translations';

export default function FavoritesPage() {
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 overflow-hidden relative">
      {/* Immersive Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section - Elite Style */}
        <div className="mb-16 space-y-6">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="inline-flex items-center gap-3 bg-rose-500/10 text-rose-500 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border border-rose-500/20 shadow-glow-rose"
          >
             <Heart className="w-3.5 h-3.5 fill-rose-500" />
             Personal Selection
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
             <div className="space-y-4">
                <motion.h1
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]"
                >
                  Saved <br/> <span className="text-rose-500 italic">Estates.</span>
                </motion.h1>
                <motion.p
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 }}
                   className="text-slate-500 dark:text-slate-400 font-bold text-lg max-w-xl"
                >
                  Your curated collection of high-potential properties in Vientiane. Locked and ready for deployment.
                </motion.p>
             </div>

             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden md:flex items-center gap-6 p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-premium border border-slate-100 dark:border-slate-800"
             >
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                      <ShieldCheck className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase">KYC Verified</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Safety Assured</p>
                   </div>
                </div>
                <div className="w-px h-8 bg-slate-100 dark:bg-slate-800" />
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <Sparkles className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase">AI Matching</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Optimized ROI</p>
                   </div>
                </div>
             </motion.div>
          </div>
        </div>

        <FavoritesList />

        {/* Dynamic Footer for Favorites */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="mt-32 p-12 bg-slate-900 rounded-[3.5rem] text-white relative overflow-hidden group shadow-glow"
        >
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,var(--primary),transparent)] opacity-10" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="space-y-2">
                 <h3 className="text-2xl font-black tracking-tighter">Ready to proceed?</h3>
                 <p className="text-slate-400 font-bold text-sm">Our relocation concierge is standing by to assist with your tour bookings.</p>
              </div>
              <button className="btn-primary px-10 py-5 scale-110">Book VIP Tour</button>
           </div>
        </motion.div>

      </div>
    </main>
  );
}
