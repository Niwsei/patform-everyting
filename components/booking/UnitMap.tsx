'use client'

import { PropertyUnit } from "@/features/properties/types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2, Lock, Clock, Info, DoorOpen, LayoutGrid, Zap } from "lucide-react";
import { useCurrencyStore } from "@/stores/useCurrencyStore";

interface UnitMapProps {
  units: PropertyUnit[];
  basePrice: number;
}

export function UnitMap({ units, basePrice }: UnitMapProps) {
  const [selectedUnit, setSelectedUnit] = useState<PropertyUnit | null>(null);
  const { formatPrice } = useCurrencyStore();

  const floors = Array.from(new Set(units.map(u => u.floor))).sort((a, b) => (b || 0) - (a || 0));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg">
               <DoorOpen className="w-5 h-5" />
            </div>
            <div>
               <h3 className="text-xl font-black text-slate-900 tracking-tight">แผนผังห้องพัก</h3>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Interactive Unit Selection</p>
            </div>
         </div>
         <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2">
               <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
               <span className="text-[10px] font-black text-slate-500 uppercase">ว่าง</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-2.5 h-2.5 bg-slate-200 rounded-full" />
               <span className="text-[10px] font-black text-slate-500 uppercase">ไม่ว่าง</span>
            </div>
         </div>
      </div>

      <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-inner space-y-8">
         {floors.map(floor => (
            <div key={floor} className="space-y-4">
               <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Floor {floor}</span>
                  <div className="h-px flex-1 bg-slate-200/50" />
               </div>
               <div className="flex flex-wrap gap-3">
                  {units.filter(u => u.floor === floor).map(unit => (
                     <motion.button
                        key={unit.id}
                        whileHover={{ y: -4, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedUnit(unit)}
                        className={cn(
                           "relative w-16 h-20 md:w-20 md:h-24 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border-2",
                           unit.status === 'available'
                              ? selectedUnit?.id === unit.id
                                 ? "bg-indigo-600 border-indigo-400 text-white shadow-xl shadow-indigo-200"
                                 : "bg-white border-emerald-100 text-slate-900 shadow-sm hover:border-indigo-600"
                              : "bg-slate-200 border-transparent text-slate-400 cursor-not-allowed grayscale"
                        )}
                        disabled={unit.status !== 'available'}
                     >
                        <span className="text-[9px] font-black opacity-50 uppercase tracking-widest">Unit</span>
                        <span className="text-sm font-black tracking-tighter">{unit.unitNumber}</span>
                        {unit.status === 'available' && (
                           <div className={cn(
                              "absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm",
                              selectedUnit?.id === unit.id ? "bg-white text-indigo-600" : "bg-emerald-500 text-white"
                           )}>
                              <CheckCircle2 className="w-3 h-3" />
                           </div>
                        )}
                        {unit.status === 'reserved' && (
                           <div className="absolute inset-0 bg-amber-500/10 flex items-center justify-center rounded-2xl">
                              <Clock className="w-4 h-4 text-amber-500" />
                           </div>
                        )}
                     </motion.button>
                  ))}
               </div>
            </div>
         ))}
      </div>

      <AnimatePresence mode="wait">
         {selectedUnit ? (
            <motion.div
               key={selectedUnit.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="bg-white rounded-[2.5rem] p-8 border-2 border-indigo-600 shadow-2xl relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 blur-2xl" />
               <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">Now Available</span>
                        <span className="text-slate-300 font-bold text-sm">Unit {selectedUnit.unitNumber} • Floor {selectedUnit.floor}</span>
                     </div>
                     <h4 className="text-3xl font-black text-slate-900 tracking-tight">พรีเมียม สตูดิโอ ({selectedUnit.sizeSqM} ตร.ม.)</h4>
                     <div className="flex flex-wrap gap-2">
                        {selectedUnit.features?.map(f => (
                           <div key={f} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-bold border border-slate-100">
                              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                              {f}
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="text-right flex flex-col justify-center items-end shrink-0">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ราคาสำหรับยูนิตนี้</p>
                     <p className="text-3xl font-black text-indigo-600">{formatPrice(selectedUnit.priceOverride || basePrice)}</p>
                     <button className="mt-6 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95">
                        จองยูนิต {selectedUnit.unitNumber}
                     </button>
                  </div>
               </div>
            </motion.div>
         ) : (
            <div className="p-12 text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
               <Info className="w-10 h-10 text-slate-300 mx-auto mb-4" />
               <p className="text-slate-400 font-bold">เลือกห้องที่ต้องการบนแผนผัง เพื่อดูรายละเอียดราคาและวิวค่ะ</p>
            </div>
         )}
      </AnimatePresence>
    </div>
  );
}
