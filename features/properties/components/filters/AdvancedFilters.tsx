'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, SlidersHorizontal, Check, ShieldCheck, Zap, Star, MapPin, Coffee, Car, Wifi, Ruler, Info, Search, Snowflake } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { translations } from '@/lib/translations'

interface AdvancedFiltersProps {
  onFilterChange: (filters: any) => void
  activeFilters: any
}

export function AdvancedFilters({ onFilterChange, activeFilters }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguageStore()
  const t = translations[language]

  const amenityOptions = [
    { label: 'WiFi', icon: Wifi },
    { label: 'ที่จอดรถ', icon: Car },
    { label: 'แอร์', icon: Snowflake },
    { label: 'สระว่ายน้ำ', icon: Coffee },
    { label: 'ยิม', icon: Zap },
    { label: 'สวนส่วนตัว', icon: Coffee },
    { label: 'ครัวฝรั่ง', icon: Zap },
    { label: 'รปภ. 24 ชม.', icon: ShieldCheck },
  ]

  const landmarkOptions = [
    { label: 'ใกล้ประตูชัย (Patuxay)', value: 'patuxay' },
    { label: 'ใกล้ริมโขง (Mekong Riverside)', value: 'mekong' },
    { label: 'ใกล้ตลาดเช้า (Morning Market)', value: 'morning_market' },
    { label: 'ใกล้มหาวิทยาลัย (Dongdok)', value: 'dongdok' },
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 text-sm font-black text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95"
      >
        <SlidersHorizontal className="w-4 h-4" />
        {language === 'EN' ? 'Advanced Filters' : language === 'LO' ? 'ຕົວຕອງຂັ້ນສູງ' : 'ตัวกรองขั้นสูง'}
        {Object.keys(activeFilters).length > 0 && (
           <span className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] ml-1">
             {Object.keys(activeFilters).length}
           </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-end">
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsOpen(false)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-white dark:bg-slate-950 shadow-2xl flex flex-col"
            >
               <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{language === 'EN' ? 'Advanced Filters' : language === 'LO' ? 'ຕົວຕອງຂັ້ນສູງ' : 'ตัวกรองขั้นสูง'}</h3>
                  <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                     <X className="w-6 h-6" />
                  </button>
               </div>

               <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
                  {/* Verified Only */}
                  <div className="flex items-center justify-between p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl border border-indigo-100 dark:border-indigo-900/50">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                           <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-sm font-black text-slate-900 dark:text-white">Verified Hosts</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trust & Safety Only</p>
                        </div>
                     </div>
                     <button
                        onClick={() => onFilterChange({ ...activeFilters, verifiedOnly: !activeFilters.verifiedOnly })}
                        className={cn(
                           "w-12 h-6 rounded-full transition-all relative",
                           activeFilters.verifiedOnly ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-800"
                        )}
                     >
                        <motion.div
                           animate={{ x: activeFilters.verifiedOnly ? 26 : 2 }}
                           className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                     </button>
                  </div>

                  {/* Rating Selector */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{language === 'EN' ? 'MINIMUM RATING' : language === 'LO' ? 'ຄະແນນຄວາມພຶງພໍໃຈຂັ້ນຕ່ຳ' : 'คะแนนความพึงพอใจขั้นต่ำ'}</h4>
                     <div className="flex gap-2">
                        {[3, 4, 4.5].map((rating) => (
                           <button
                              key={rating}
                              onClick={() => onFilterChange({ ...activeFilters, minRating: activeFilters.minRating === rating ? null : rating })}
                              className={cn(
                                 "flex-1 py-3 rounded-2xl border-2 font-black text-xs transition-all flex items-center justify-center gap-1.5",
                                 activeFilters.minRating === rating
                                    ? "bg-indigo-600 border-indigo-600 text-white"
                                    : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600"
                              )}
                           >
                              <Star className={cn("w-3.5 h-3.5", activeFilters.minRating === rating ? "fill-white" : "fill-amber-400 text-amber-400")} />
                              {rating}+
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.amenities}</h4>
                     <div className="grid grid-cols-2 gap-3">
                        {amenityOptions.map((opt) => (
                           <button
                              key={opt.label}
                              onClick={() => {
                                 const current = activeFilters.amenities || []
                                 const next = current.includes(opt.label) ? current.filter((a: string) => a !== opt.label) : [...current, opt.label]
                                 onFilterChange({ ...activeFilters, amenities: next })
                              }}
                              className={cn(
                                 "flex items-center gap-3 p-4 rounded-2xl border transition-all text-left",
                                 activeFilters.amenities?.includes(opt.label)
                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100"
                                    : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-200"
                              )}
                           >
                              <opt.icon className="w-4 h-4 shrink-0" />
                              <span className="text-xs font-bold">{opt.label}</span>
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Distance from Landmarks */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{language === 'EN' ? 'NEARBY LANDMARKS' : language === 'LO' ? 'ທຳເລໃກ້ຄຽງ' : 'ทำเลใกล้เคียง'}</h4>
                     <div className="space-y-2">
                        {landmarkOptions.map((opt) => (
                           <button
                              key={opt.value}
                              onClick={() => onFilterChange({ ...activeFilters, landmark: activeFilters.landmark === opt.value ? null : opt.value })}
                              className={cn(
                                 "w-full flex items-center justify-between p-4 rounded-2xl border transition-all",
                                 activeFilters.landmark === opt.value
                                    ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                                    : "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600"
                              )}
                           >
                              <div className="flex items-center gap-3">
                                 <MapPin className="w-4 h-4 text-indigo-500" />
                                 <span className="text-sm font-bold">{opt.label}</span>
                              </div>
                              {activeFilters.landmark === opt.value && <Check className="w-4 h-4" />}
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* AI Assistant Insight */}
                  <div className="p-6 bg-slate-900 rounded-[2rem] border border-white/10 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/20 transition-colors" />
                     <div className="flex items-start gap-4 relative z-10">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                           <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div className="space-y-2">
                           <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">AI Nest Suggestion</p>
                           <p className="text-xs text-slate-300 leading-relaxed font-medium">
                              ในช่วงเดือนนี้ ย่าน <span className="text-white font-black underline decoration-indigo-500 underline-offset-4">เมืองจันทะบูลี</span> มีความต้องการสูง แนะนำให้เปิด "Verified Only" เพื่อรับการตอบกลับที่รวดเร็วขึ้นค่ะ
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 flex gap-4">
                  <button
                     onClick={() => onFilterChange({})}
                     className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                  >
                     {t.reset}
                  </button>
                  <button
                     onClick={() => setIsOpen(false)}
                     className="flex-2 px-10 py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl"
                  >
                     {t.showResults}
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
