'use client'

import { useComparisonStore } from "@/stores/useComparisonStore"
import { mockProperties } from "@/features/properties/services/mockData"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRightLeft, Star, MapPin, Ruler, Building2, Zap, Trash2, CheckCircle2, AlertCircle, Plus, Cpu, Activity, Globe } from "lucide-react"
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
      {/* Neural Floating Bar */}
      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[120] w-full max-w-2xl px-6">
        <motion.div
          layoutId="comparison-bar"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-900/95 text-white p-4 rounded-[3rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] flex items-center justify-between gap-8 border border-white/10 backdrop-blur-2xl"
        >
          <div className="flex items-center gap-4 pl-4">
             <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-glow">
                <ArrowRightLeft className="w-6 h-6 text-white stroke-[2.5]" />
             </div>
             <div className="hidden md:block">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Protocol Comparison</p>
                <p className="text-xs font-black tracking-tight">{propertyIds.length} / 3 Nodes Active</p>
             </div>
          </div>

          <div className="flex -space-x-4">
             {selectedProperties.map(p => (
                <motion.div
                  layout
                  key={p.id}
                  className="relative group cursor-pointer"
                  onClick={() => removeFromCompare(p.id)}
                >
                   <div className="w-14 h-14 rounded-2xl border-4 border-slate-900 overflow-hidden shadow-2xl group-hover:border-primary transition-all duration-500">
                      <Image src={p.images[0]} alt={p.title} width={56} height={56} className="object-cover h-full" />
                   </div>
                   <div className="absolute inset-0 bg-red-500/90 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-5 h-5 text-white" />
                   </div>
                </motion.div>
             ))}
             {Array.from({ length: 3 - propertyIds.length }).map((_, i) => (
                <div key={i} className="w-14 h-14 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center text-white/5">
                   <Plus className="w-5 h-5" />
                </div>
             ))}
          </div>

          <div className="flex items-center gap-4 pr-2">
             <button
                onClick={clearCompare}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
             >
                Reset
             </button>
             <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                disabled={propertyIds.length < 2}
                className="bg-primary text-white px-8 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:brightness-110 transition-all disabled:opacity-30 disabled:grayscale shadow-glow"
             >
                Deep Analysis
             </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Logic Matrix Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateX: 10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-7xl bg-white dark:bg-slate-900 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[90vh] border border-white/10"
            >
               {/* Modal Header */}
               <div className="p-12 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 bg-primary rounded-[1.5rem] flex items-center justify-center text-white shadow-glow">
                        <Cpu className="w-8 h-8 stroke-[2]" />
                     </div>
                     <div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Neural Match Matrix</h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Side-by-Side Protocol Comparison</p>
                     </div>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-slate-800 shadow-premium flex items-center justify-center text-slate-400 hover:text-primary transition-all">
                     <X className="w-8 h-8 stroke-[1.5]" />
                  </button>
               </div>

               <div className="flex-1 overflow-x-auto p-12 scrollbar-hide">
                  <div className={cn(
                    "grid gap-12 min-w-[1100px]",
                    selectedProperties.length === 2 ? "grid-cols-[240px_1fr_1fr]" : "grid-cols-[240px_1fr_1fr_1fr]"
                  )}>
                     {/* Attribute Column */}
                     <div className="space-y-24 pt-[320px]">
                        {[
                           { icon: Zap, label: 'Rate Index' },
                           { icon: Star, label: 'Trust Delta' },
                           { icon: Ruler, label: 'Spatial Dim' },
                           { icon: Building2, label: 'Asset Class' },
                           { icon: Globe, label: 'Hotzone' }
                        ].map(attr => (
                           <div key={attr.label} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-4">
                              <attr.icon className="w-4 h-4 text-primary" /> {attr.label}
                           </div>
                        ))}
                     </div>

                     {/* Asset Columns */}
                     {selectedProperties.map(p => (
                        <div key={p.id} className="space-y-16">
                           {/* Asset Visual Card */}
                           <div className="space-y-8">
                              <div className="relative w-full aspect-[4/3] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)] group/img border border-white/10">
                                 <Image src={p.images[0]} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                                 <div className="absolute top-6 right-6">
                                    <button
                                       onClick={() => removeFromCompare(p.id)}
                                       className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-rose-500 transition-all border border-white/20"
                                    >
                                       <Trash2 className="w-5 h-5" />
                                    </button>
                                 </div>
                                 <div className="absolute bottom-8 left-8 right-8">
                                    <h4 className="text-white text-2xl font-black tracking-tighter leading-none line-clamp-2 uppercase">{p.title}</h4>
                                 </div>
                              </div>
                           </div>

                           {/* Valuation Logic */}
                           <div className="relative group">
                              <div className={cn(
                                 "text-5xl font-black tracking-tighter transition-all duration-700",
                                 p.pricePerMonth === minPrice ? "text-emerald-500" : "text-slate-900 dark:text-white"
                              )}>
                                 {formatPrice(p.pricePerMonth)}
                              </div>
                              {p.pricePerMonth === minPrice && (
                                 <div className="absolute -top-10 left-0 flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-emerald-500/20 shadow-glow">
                                    <Zap className="w-3 h-3 fill-emerald-500" /> Optimal Value
                                 </div>
                              )}
                           </div>

                           {/* Reputation Protocol */}
                           <div className="flex items-center gap-5">
                              <div className={cn(
                                 "flex items-center gap-2 px-6 py-3 rounded-2xl border-2 font-black text-sm tracking-tight transition-all duration-700",
                                 p.rating === maxRating
                                    ? "bg-amber-500/10 border-amber-500 text-amber-500 shadow-glow"
                                    : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-500"
                              )}>
                                 <Star className={cn("w-5 h-5", p.rating === maxRating && "fill-amber-500")} />
                                 {p.rating}
                              </div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{p.reviewCount} Reports</span>
                           </div>

                           {/* Dimensions */}
                           <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                              {p.category === 'apartment' ? '45' : p.category === 'hotel' ? '32' : '120'} <span className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">SQM Units</span>
                           </div>

                           {/* Identity Class */}
                           <div>
                              <span className="px-5 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-primary/20 shadow-glow">
                                 {p.category.replace('_', ' ')}
                              </span>
                           </div>

                           {/* Geospatial Lead */}
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700">
                                 <MapPin className="w-5 h-5 text-primary" />
                              </div>
                              <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{p.location.split(',')[0]}</p>
                           </div>

                           {/* Execution Logic */}
                           <div className="pt-8 grid grid-cols-2 gap-6">
                              <Link
                                 href={`/properties/${p.id}`}
                                 className="btn-primary py-5 text-[9px] scale-100 text-center"
                              >
                                 DEPLOY
                              </Link>
                              <button className="py-5 border-2 border-slate-100 dark:border-slate-800 text-slate-500 hover:text-primary hover:border-primary/30 rounded-[1.5rem] font-black text-[9px] uppercase tracking-[0.2em] transition-all">
                                 AUDIT
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Matrix Footer */}
               <div className="p-10 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-4">
                  <Activity className="w-5 h-5 text-primary animate-pulse" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Comparison data synthesized from Vientiane Alpha Registry v4.2</p>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
