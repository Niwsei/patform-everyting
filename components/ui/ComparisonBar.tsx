'use client'

import { useComparisonStore } from "@/stores/useComparisonStore"
import { mockProperties } from "@/features/properties/services/mockData"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRightLeft, Star, MapPin } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCurrencyStore } from "@/stores/useCurrencyStore"

export function ComparisonBar() {
  const { propertyIds, removeFromCompare, clearCompare } = useComparisonStore()
  const { formatPrice } = useCurrencyStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const selectedProperties = mockProperties.filter(p => propertyIds.includes(p.id))

  if (propertyIds.length === 0) return null

  return (
    <>
      {/* Floating Bar */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[120] w-full max-w-2xl px-4">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-900 text-white p-4 rounded-[2rem] shadow-2xl flex items-center justify-between gap-6 border border-white/10 backdrop-blur-xl bg-slate-900/90"
        >
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center">
                <ArrowRightLeft className="w-5 h-5 text-white" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Comparison Bar</p>
                <p className="text-xs font-bold">{propertyIds.length} properties selected</p>
             </div>
          </div>

          <div className="flex -space-x-3">
             {selectedProperties.map(p => (
                <div key={p.id} className="relative group">
                   <div className="w-12 h-12 rounded-2xl border-2 border-slate-900 overflow-hidden shadow-lg">
                      <Image src={p.images[0]} alt={p.title} width={48} height={48} className="object-cover h-full" />
                   </div>
                   <button
                    onClick={() => removeFromCompare(p.id)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                   >
                      <X className="w-3 h-3 text-white" />
                   </button>
                </div>
             ))}
          </div>

          <div className="flex items-center gap-3">
             <button onClick={clearCompare} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Clear</button>
             <button
                onClick={() => setIsModalOpen(true)}
                disabled={propertyIds.length < 2}
                className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-50"
             >
                Compare Now
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
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
               <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <div className="flex items-center gap-3">
                     <ArrowRightLeft className="w-6 h-6 text-indigo-600" />
                     <h2 className="text-2xl font-black text-slate-900 tracking-tight">Property Comparison</h2>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white rounded-2xl shadow-sm hover:bg-slate-50 transition-colors">
                     <X className="w-6 h-6 text-slate-400" />
                  </button>
               </div>

               <div className="flex-1 overflow-x-auto p-8">
                  <div className="min-w-[800px] grid grid-cols-4 gap-8">
                     <div className="space-y-12 pt-[220px]">
                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">Price / Month</div>
                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">Rating</div>
                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">Location</div>
                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">Amenities</div>
                     </div>

                     {selectedProperties.map(p => (
                        <div key={p.id} className="space-y-10 text-center">
                           <div className="space-y-4">
                              <div className="relative w-full h-40 rounded-[2rem] overflow-hidden shadow-lg">
                                 <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                              </div>
                              <h3 className="font-black text-slate-900 line-clamp-1">{p.title}</h3>
                           </div>

                           <div className="text-xl font-black text-indigo-600">{formatPrice(p.pricePerMonth)}</div>

                           <div className="flex items-center justify-center gap-1.5 font-bold text-slate-700">
                              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                              {p.rating} ({p.reviewCount})
                           </div>

                           <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-400">
                              <MapPin className="w-4 h-4 text-indigo-500" />
                              {p.location.split(',')[0]}
                           </div>

                           <div className="flex flex-wrap justify-center gap-1.5">
                              {p.amenities.slice(0, 4).map(a => (
                                 <span key={a} className="px-2.5 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-tighter">{a}</span>
                              ))}
                           </div>

                           <Link
                              href={`/properties/${p.id}`}
                              className="block w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all"
                           >
                              View Detail
                           </Link>
                        </div>
                     ))}
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
