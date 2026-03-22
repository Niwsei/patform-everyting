'use client'

import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { PropertyMap } from '@/features/properties/components/PropertyMap';
import { mockProperties } from '@/features/properties/services/mockData';
import { SearchX, SlidersHorizontal, LayoutGrid, Map as MapIcon, ChevronDown } from 'lucide-react';
import { PropertyCardSkeleton } from '@/components/ui/Skeleton';
import { AdvancedFilters } from '@/features/properties/components/filters/AdvancedFilters';
import Link from 'next/link';
import { use, useState, useEffect } from 'react';

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

  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [sortBy, setSortBy] = useState('newest');

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
    <main className="min-h-screen bg-white pt-20">
      <div className="max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-80px)]">
        
        <div className="px-6 py-4 flex items-center justify-between border-b bg-white z-10">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-xl font-black text-gray-900 flex items-center gap-2">
                อสังหาริมทรัพย์ในเวียงจันทน์
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  {filteredProperties.length}
                </span>
              </h1>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                {locationFilter || 'ทั่วเวียงจันทน์'} • {categoryFilter || 'ทุกประเภท'} • {priceFilter || 'ทุกช่วงราคา'}
              </p>
            </div>

            <AdvancedFilters
               activeFilters={activeFilters}
               onFilterChange={(f) => {
                  setIsLoading(true);
                  setActiveFilters(f);
               }}
            />

            <div className="relative group">
               <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-800 text-sm font-black text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                 เรียงตาม: {sortBy === 'newest' ? 'ใหม่ล่าสุด' : sortBy === 'price_low' ? 'ราคาถูกที่สุด' : sortBy === 'price_high' ? 'ราคาสูงที่สุด' : 'คะแนนสูงสุด'}
                 <ChevronDown className="w-4 h-4" />
               </button>
               <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[50]">
                  {[
                    { label: 'ใหม่ล่าสุด', value: 'newest' },
                    { label: 'ราคาถูกที่สุด', value: 'price_low' },
                    { label: 'ราคาสูงที่สุด', value: 'price_high' },
                    { label: 'คะแนนสูงสุด', value: 'rating' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className="w-full text-left px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 transition-colors"
                    >
                      {opt.label}
                    </button>
                  ))}
               </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center bg-gray-100 p-1 rounded-xl">
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white text-indigo-600 shadow-sm text-sm font-bold">
              <LayoutGrid className="w-4 h-4" />
              ตาราง
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-500 text-sm font-bold hover:bg-gray-200 transition-colors">
              <MapIcon className="w-4 h-4" />
              แผนที่
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-full lg:w-3/5 xl:w-1/2 overflow-y-auto p-6 scrollbar-hide">
            {isLoading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => <PropertyCardSkeleton key={i} />)}
               </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <div className="bg-white p-6 rounded-full shadow-sm mb-6">
                  <SearchX className="w-12 h-12 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">ไม่พบอสังหาริมทรัพย์ที่ค้นหา</h2>
                <p className="text-gray-500 max-w-sm mb-8">
                  ลองปรับตัวกรองการค้นหาของคุณ หรือสำรวจย่านที่น่าสนใจอื่นๆ ในเวียงจันทน์
                </p>
                <Link
                  href="/properties"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  รีเซ็ตตัวกรองทั้งหมด
                </Link>
              </div>
            )}
          </div>

          <div className="hidden lg:block flex-1 p-6 pl-0">
             <PropertyMap properties={filteredProperties} />
          </div>
        </div>
      </div>
    </main>
  );
}
