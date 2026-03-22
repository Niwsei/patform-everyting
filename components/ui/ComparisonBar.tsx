'use client'

import { useComparisonStore } from "@/stores/useComparisonStore"
import { mockProperties } from "@/features/properties/services/mockData"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRightLeft, Star, MapPin, Ruler, Building2, Zap, Trash2, CheckCircle2, AlertCircle } from "lucide-react"
import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCurrencyStore } from "@/stores/useCurrencyStore"
import { useLanguageStore } from "@/stores/useLanguageStore"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

export function ComparisonBar() {
  const { propertyIds, removeFromCompare, clearCompare } = useComparisonStore()
  const { formatPrice } = useCurrencyStore()
  const { language } = useLanguageStore()
  const t = translations[language]
  const [isModalOpen, setIsModalOpen] = useState(false)

  const selectedProperties = useMemo(() =>
    mockProperties.filter(p => propertyIds.includes(p.id)),
    [propertyIds]
  )

  const minPrice = useMemo(() =>
    Math.min(...selectedProperties.map(p => p.pricePerMonth)),
    [selectedProperties]
  )

  const maxRating = useMemo(() =>
    Math.max(...selectedProperties.map(p => p.rating || 0)),
    [selectedProperties]
  )

  if (propertyIds.length === 0) return null

  return (
    <>
      {/* Floating Bar */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[120] w-full max-w-2xl px-4">
        <motion.div
          layoutId="comparison-bar"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-900/90 text-white p-3 md:p-4 rounded-[2.5rem] shadow-2xl flex items-center justify-between gap-4 md:gap-6 border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 pl-2">
             <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <ArrowRightLeft className="w-5 h-5 text-white" />
             </div>
             <div className="hidden md:block">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{t.compare}</p>
                <p className="text-xs font-bold">{propertyIds.length} / 3 selected</p>
             </div>
          </div>

          <div className="flex -space-x-3">
             {selectedProperties.map(p => (
                <motion.div
                  layout
                  key={p.id}
                  className="relative group cursor-pointer"
                  onClick={() => removeFromCompare(p.id)}
                >
                   <div className="w-12 h-12 rounded-2xl border-2 border-slate-900 overflow-hidden shadow-lg group-hover:border-indigo-500 transition-colors">
                      <Image src={p.images[0]} alt={p.title} width={48} height={48} className="object-cover h-full" />
                   </div>
                   <div className="absolute inset-0 bg-red-500/80 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-4 h-4 text-white" />
                   </div>
                </motion.div>
             ))}
             {Array.from({ length: 3 - propertyIds.length }).map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center text-white/10">
                   <PlusIcon className="w-4 h-4" />
                </div>
             ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4 pr-2">
             <button
                onClick={clearCompare}
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
             >
                {t.reset}
             </button>
             <button
                onClick={() => setIsModalOpen(true)}
                disabled={propertyIds.length < 2}
                className="bg-indigo-600 text-white px-5 md:px-7 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:grayscale shadow-lg shadow-indigo-600/20"
             >
                {t.analyze}
             </button>
          </div>
        </motion.div>
      </div>

      {/* Comparison Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative w-full max-w-6xl bg-white rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200"
            >
               <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                        <ArrowRightLeft className="w-6 h-6" />
                     </div>
                     <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t.analyze}</h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Comparing {propertyIds.length} listings side-by-side</p>
                     </div>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-4 bg-white rounded-2xl shadow-premium hover:bg-slate-50 transition-all active:scale-95 group">
                     <X className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </button>
               </div>

               <div className="flex-1 overflow-x-auto p-8 md:p-12">
                  <div className={cn(
                    "grid gap-8 min-w-[1000px]",
                    selectedProperties.length === 2 ? "grid-cols-[200px_1fr_1fr]" : "grid-cols-[200px_1fr_1fr_1fr]"
                  )}>
                     {/* Labels Column */}
                     <div className="space-y-16 pt-[260px]">
                        <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3">
                           <Zap className="w-4 h-4 text-indigo-500" /> {t.priceIndex}
                        </div>
                        <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3">
                           <Star className="w-4 h-4 text-amber-500" /> {t.trustScore}
                        </div>
                        <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3">
                           <Ruler className="w-4 h-4 text-emerald-500" /> Dimension
                        </div>
                        <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3">
                           <Building2 className="w-4 h-4 text-indigo-500" /> Category
                        </div>
                        <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3">
                           <MapPin className="w-4 h-4 text-slate-400" /> {t.location}
                        </div>
                     </div>

                     {/* Property Columns */}
                     {selectedProperties.map(p => (
                        <div key={p.id} className="space-y-12">
                           {/* Header */}
                           <div className="space-y-6">
                              <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group/img">
                                 <Image src={p.images[0]} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                 <button
                                    onClick={() => removeFromCompare(p.id)}
                                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-red-500 transition-colors"
                                 >
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                                 <div className="absolute bottom-6 left-6 right-6">
                                    <p className="text-white text-lg font-black leading-tight line-clamp-2">{p.title}</p>
                                 </div>
                              </div>
                           </div>

                           {/* Price */}
                           <div className="relative group">
                              <div className={cn(
                                 "text-3xl font-black transition-colors",
                                 p.pricePerMonth === minPrice ? "text-emerald-600" : "text-slate-900"
                              )}>
                                 {formatPrice(p.pricePerMonth)}
                              </div>
                              {p.pricePerMonth === minPrice && (
                                 <div className="absolute -top-6 left-0 flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                                    <CheckCircle2 className="w-3 h-3" /> {t.bestValue}
                                 </div>
                              )}
                           </div>

                           {/* Rating */}
                           <div className="flex items-center gap-3">
                              <div className={cn(
                                 "flex items-center gap-1.5 px-4 py-2 rounded-2xl border-2 font-black transition-all",
                                 p.rating === maxRating
                                    ? "bg-amber-50 border-amber-200 text-amber-600 scale-105 shadow-lg shadow-amber-100"
                                    : "bg-slate-50 border-slate-100 text-slate-600"
                              )}>
                                 <Star className={cn("w-4 h-4", p.rating === maxRating && "fill-amber-500")} />
                                 {p.rating}
                              </div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.reviewCount} Reviews</span>
                           </div>

                           {/* Size (Simulated since not in mock) */}
                           <div className="text-lg font-black text-slate-900">
                              {p.category === 'apartment' ? '45' : p.category === 'hotel' ? '32' : '120'} m²
                           </div>

                           {/* Category */}
                           <div>
                              <span className="px-4 py-2 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-indigo-100">
                                 {p.category}
                              </span>
                           </div>

                           {/* Location */}
                           <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                              <MapPin className="w-4 h-4 text-indigo-500" />
                              {p.location.split(',')[0]}
                           </div>

                           {/* CTAs */}
                           <div className="pt-4 grid grid-cols-2 gap-4">
                              <Link
                                 href={`/properties/${p.id}`}
                                 className="flex items-center justify-center py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
                              >
                                 {language === 'EN' ? 'View' : language === 'LO' ? 'ເບິ່ງ' : 'ดู'}
                              </Link>
                              <button className="flex items-center justify-center py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-indigo-600 transition-all">
                                 Tour
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Footer Disclaimer */}
               <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-3">
                  <AlertCircle className="w-4 h-4 text-slate-400" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Analysis is based on latest marketplace data. Prices may vary by lease duration.</p>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

function PlusIcon({ className }: { className?: string }) {
   return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
   )
}
