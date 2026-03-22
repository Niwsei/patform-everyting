'use client';

import { useState, useEffect } from 'react';
import { useFavoriteStore } from '@/stores/useFavoriteStore';
import { mockProperties } from '@/features/properties/services/mockData';
import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { HeartCrack, Search, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function FavoritesList() {
  const savedPropertyIds = useFavoriteStore((state) => state.savedPropertyIds);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-[600px] flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full animate-spin shadow-glow" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing Intelligence</p>
      </div>
    );
  }

  const favoriteProperties = mockProperties.filter((property) => 
    savedPropertyIds.includes(property.id)
  );

  if (favoriteProperties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-40 px-6 text-center bg-white dark:bg-slate-900 rounded-[4rem] shadow-premium border border-dashed border-slate-200 dark:border-slate-800 mt-12 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary),transparent)] opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity" />
        <div className="bg-rose-500/10 p-10 rounded-[2.5rem] mb-8 shadow-glow-rose">
          <HeartCrack className="w-16 h-16 text-rose-500 stroke-[1.5]" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter leading-none">Zero Estates Indexed.</h2>
        <p className="text-slate-500 dark:text-slate-400 font-bold max-w-sm mb-12 text-sm">
          Your curation list is currently empty. Explore Vientiane's hotzones to start indexing your potential homes.
        </p>
        <Link 
          href="/properties"
          className="btn-primary flex items-center gap-4 px-12 py-5 scale-125"
        >
          Explore Assets <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-12">
      <AnimatePresence mode="popLayout">
        {favoriteProperties.map((property, idx) => (
          <motion.div
            key={property.id}
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
