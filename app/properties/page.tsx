'use client'

import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { PropertyMap } from '@/features/properties/components/PropertyMap';
import { mockProperties } from '@/features/properties/services/mockData';
import { SearchX, SlidersHorizontal, LayoutGrid, Map as MapIcon, ChevronDown, Sparkles, Filter } from 'lucide-react';
import { PropertyCardSkeleton } from '@/components/ui/Skeleton';
import { AdvancedFilters } from '@/features/properties/components/filters/AdvancedFilters';
import Link from 'next/link';
import { use, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { translations } from '@/lib/translations';

interface PropertiesPageProps {
  searchParams: Promise<{
    location?: string;
    price?: string;
    category?: string;
  }>;
}

export default function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const {
    location: locationFilter = '',
    price: priceFilter = '',
    category: categoryFilter = ''
  } = use(searchParams);

  const { language } = useLanguageStore();
  const t = translations[language];

  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  useEffect(() => {
     const timer = setTimeout(() => setIsLoading(false), 1200);
     return () => clearTimeout(timer);
  }, [locationFilter, priceFilter, categoryFilter, activeFilters, sortBy]);

  const filteredProperties = mockProperties.filter((property) => {
    const matchLocation = locationFilter 
      ? property.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;

    const matchCategory = categoryFilter
      ? property.category === categoryFilter
      : true;

    let matchPrice = true;
    if (priceFilter === 'under_2m') {
      matchPrice = property.pricePerMonth < 2000000;
    } else if (priceFilter === '2m_to_5m') {
      matchPrice = property.pricePerMonth >= 2000000 && property.pricePerMonth <= 5000000;
    } else if (priceFilter === 'over_5m') {
      matchPrice = property.pricePerMonth > 5000000;
    }

    const matchVerified = activeFilters.verifiedOnly ? property.isFeatured : true;
    const matchAmenities = activeFilters.amenities?.length
      ? activeFilters.amenities.every((a: string) => property.amenities.includes(a))
      : true;

    const matchRating = activeFilters.minRating ? (property.rating || 0) >= activeFilters.minRating : true;

    const matchLandmark = activeFilters.landmark ? (
      activeFilters.landmark === 'patuxay' ? property.location.includes('จันทะบูลี') :
      activeFilters.landmark === 'mekong' ? property.location.includes('สีโคดตะบอง') :
      activeFilters.landmark === 'morning_market' ? property.location.includes('ไซเศรษฐา') :
      activeFilters.landmark === 'dongdok' ? property.location.includes('ไซทานี') : true
    ) : true;

    return matchLocation && matchPrice && matchCategory && matchVerified && matchAmenities && matchRating && matchLandmark;
  }).sort((a, b) => {
     if (sortBy === 'price_low') return a.pricePerMonth - b.pricePerMonth;
     if (sortBy === 'price_high') return b.pricePerMonth - a.pricePerMonth;
     if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
     return 0;
  });

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24">
      <div className="max-w-[1800px] mx-auto flex flex-col h-[calc(100vh-96px)]">
        
        {/* Advanced Toolbar */}
        <div className="px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 z-10 shadow-sm">
          <div className="flex flex-wrap items-center gap-6 w-full md:w-auto">
            <div>
              <div className="flex items-center gap-2 mb-1">
                 <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                   {language === 'EN' ? 'Elite Estates' : 'อสังหาริมทรัพย์ระดับพรีเมียม'}
                 </h1>
                 <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20 shadow-glow">
                   {filteredProperties.length} Matches
                 </span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {locationFilter || 'Vientiane Capital'} • {categoryFilter || 'All Assets'} • {priceFilter || 'Flexible Budget'}
              </p>
            </div>

            <div className="h-10 w-px bg-slate-100 dark:bg-slate-800 hidden lg:block" />

            <div className="flex items-center gap-3">
               <AdvancedFilters
                  activeFilters={activeFilters}
                  onFilterChange={(f) => {
                     setIsLoading(true);
                     setActiveFilters(f);
                  }}
               />

               <div className="relative group">
                  <button className="flex items-center gap-3 px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                    <Filter className="w-3.5 h-3.5" />
                    Sort: {sortBy === 'newest' ? 'Newest' : sortBy === 'price_low' ? 'Low Price' : sortBy === 'price_high' ? 'High Price' : 'Rating'}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute top-full left-0 mt-3 w-56 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[50]">
                     {[
                       { label: 'Newest Listings', value: 'newest' },
                       { label: 'Price: Low to High', value: 'price_low' },
                       { label: 'Price: High to Low', value: 'price_high' },
                       { label: 'Top Rated Assets', value: 'rating' },
                     ].map((opt) => (
                       <button
                         key={opt.value}
                         onClick={() => setSortBy(opt.value)}
                         className="w-full text-left px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary transition-colors"
                       >
                         {opt.label}
                       </button>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          <div className="flex items-center glass p-1 rounded-2xl border border-white/40 dark:border-white/10 shadow-premium">
            <button
               onClick={() => setViewMode('grid')}
               className={cn(
                  "flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  viewMode === 'grid' ? "bg-white dark:bg-slate-800 text-primary shadow-premium" : "text-slate-400 hover:text-slate-600"
               )}
            >
              <LayoutGrid className="w-4 h-4" />
              Grid
            </button>
            <button
               onClick={() => setViewMode('map')}
               className={cn(
                  "flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  viewMode === 'map' ? "bg-white dark:bg-slate-800 text-primary shadow-premium" : "text-slate-400 hover:text-slate-600"
               )}
            >
              <MapIcon className="w-4 h-4" />
              Map
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main List Section */}
          <div className={cn(
             "transition-all duration-700 ease-in-out p-8 scrollbar-hide overflow-y-auto",
             viewMode === 'grid' ? "w-full lg:w-3/5 xl:w-1/2" : "hidden lg:block lg:w-3/5 xl:w-1/2"
          )}>
            {isLoading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[1, 2, 3, 4, 5, 6].map(i => <PropertyCardSkeleton key={i} />)}
               </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filteredProperties.map((property, idx) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 px-4 text-center bg-white dark:bg-slate-900/50 rounded-[3.5rem] border border-dashed border-slate-200 dark:border-slate-800">
                <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-full shadow-premium mb-8">
                  <SearchX className="w-16 h-16 text-primary opacity-40" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tighter">Zero Assets Found</h2>
                <p className="text-slate-500 dark:text-slate-400 font-bold max-w-sm mb-10 text-sm">
                  We couldn't find any properties matching your exact criteria. Try adjusting your filters or search "Vientiane".
                </p>
                <button
                  onClick={() => {
                     setActiveFilters({});
                     setIsLoading(true);
                  }}
                  className="btn-primary scale-110"
                >
                  Reset All Engines
                </button>
              </div>
            )}
          </div>

          {/* Interactive Map Section */}
          <div className={cn(
             "transition-all duration-700 ease-in-out",
             viewMode === 'map' ? "w-full" : "hidden lg:block lg:flex-1 p-8 pl-0"
          )}>
             <PropertyMap properties={filteredProperties} />
          </div>
        </div>
      </div>
    </main>
  );
}
