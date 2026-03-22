'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Camera,
  CheckCircle2,
  BrainCircuit,
  Languages,
  Zap,
  ChevronRight,
  Maximize2,
  Globe,
  Activity,
  Cpu
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface AnalysisResult {
  amenities: string[]
  qualityScore: number
  lighting: 'Excellent' | 'Good' | 'Fair'
  descriptions: {
    TH: string
    EN: string
    LO: string
  }
}

export function AIVisionOptimizer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const simulateAnalysis = async () => {
    setIsAnalyzing(true)
    setResult(null)

    await new Promise(resolve => setTimeout(resolve, 1500))
    await new Promise(resolve => setTimeout(resolve, 1500))
    await new Promise(resolve => setTimeout(resolve, 1500))

    setResult({
      amenities: ['Executive HVAC', 'Gigabit Node', 'Ergonomic Hub', 'Lutron Lighting', 'Panoramic Vista'],
      qualityScore: 98,
      lighting: 'Excellent',
      descriptions: {
        TH: 'ห้องสตูดิโอระดับพรีเมียมพร้อมเทคโนโลยีสมาร์ทโฮม วิวเมืองแบบพาโนรามา ตกแต่งเพื่อประสิทธิภาพสูงสุดของการใช้ชีวิตสมัยใหม่',
        EN: 'Elite studio asset with integrated smart-home nodes. Features panoramic district views and ergonomic layouts optimized for executive high-performance living.',
        LO: 'ຫ້ອງສະຕູດີໂອລະດັບພຣີມຽມພ້ອມເທັກໂນໂລຊີສະມາດໂຮມ, ວິວເມືອງແບບພາໂນຣາມາ, ຕົບແຕ່ງເພື່ອປະສິດທິພາບສູງສຸດຂອງການໃຊ້ຊີວິດສະໄໝໃຫມ່'
      }
    })
    setIsAnalyzing(false)
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="space-y-3">
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20 shadow-glow">
               <Cpu className="w-4 h-4" />
               Vision Analysis Protocol v2.4
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Neural Asset <br/> <span className="text-primary italic">Optimization.</span></h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">Image Recognition & Neural Multilingual Copywriting</p>
         </div>
         <div className="flex items-center gap-3 glass px-5 py-2.5 rounded-2xl border border-white/20 dark:border-white/10 shadow-glow">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Neural Core Online</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* Ingestion & Feed Side */}
         <div className="space-y-8">
            <div
               onClick={() => setSelectedImage('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop')}
               className={cn(
                  "relative h-[450px] rounded-[4rem] border-4 border-dashed flex flex-col items-center justify-center gap-6 cursor-pointer overflow-hidden transition-all duration-700 group",
                  selectedImage ? "border-primary border-solid shadow-glow" : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
               )}
            >
               {selectedImage ? (
                  <>
                     <Image src={selectedImage} alt="Preview" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                     <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                        <p className="text-white font-black text-[10px] uppercase tracking-[0.3em] bg-primary px-8 py-4 rounded-2xl shadow-glow">Re-Ingest Asset</p>
                     </div>
                  </>
               ) : (
                  <>
                     <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-slate-400 group-hover:bg-primary/20 group-hover:text-primary transition-all duration-500 shadow-sm group-hover:shadow-glow">
                        <Camera className="w-12 h-12 stroke-[1.5]" />
                     </div>
                     <div className="text-center space-y-2 px-10">
                        <p className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-[0.2em]">Ingest Asset Visuals</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Neural Core will auto-detect amenities, lighting delta, and yield potential.</p>
                     </div>
                  </>
               )}
            </div>

            <motion.button
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={simulateAnalysis}
               disabled={!selectedImage || isAnalyzing}
               className="btn-primary w-full py-6 text-[11px] scale-100 flex items-center justify-center gap-4"
            >
               {isAnalyzing ? (
                  <>
                     <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                     Syncing with Neural Core...
                  </>
               ) : (
                  <>
                     <BrainCircuit className="w-6 h-6 stroke-[2.5]" />
                     Execute Optimization Protocol
                  </>
               )}
            </motion.button>
         </div>

         {/* Meta-Results Terminal */}
         <div className="space-y-8">
            <AnimatePresence mode="wait">
               {isAnalyzing ? (
                  <motion.div
                     key="loading"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 1.05 }}
                     className="h-[550px] bg-white dark:bg-slate-900 rounded-[4rem] border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center p-14 text-center space-y-10 shadow-premium"
                  >
                     <div className="relative">
                        <motion.div
                           animate={{ rotate: 360 }}
                           transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                           className="w-40 h-40 border-[6px] border-slate-100 dark:border-slate-800 border-t-primary rounded-full shadow-glow"
                        />
                        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-primary animate-pulse" />
                     </div>
                     <div className="space-y-4">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Neural Ingestion</h3>
                        <div className="flex flex-col gap-3">
                           {['Mapping Geometry...', 'Auditing Illumination Delta...', 'Synthesizing Multilingual Copy...'].map((task, i) => (
                              <motion.div
                                 key={i}
                                 initial={{ opacity: 0, x: -10 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 transition={{ delay: i * 1.2 }}
                                 className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]"
                              >
                                 <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0 shadow-glow" />
                                 {task}
                              </motion.div>
                           ))}
                        </div>
                     </div>
                  </motion.div>
               ) : result ? (
                  <motion.div
                     key="result"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="space-y-8"
                  >
                     {/* Quality & Visibility Protocol */}
                     <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-premium grid grid-cols-2 gap-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[4rem] flex items-center justify-center group-hover:scale-110 transition-transform">
                           <Zap className="w-10 h-10 text-primary fill-primary shadow-glow" />
                        </div>
                        <div className="space-y-3">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Quality Index</p>
                           <div className="flex items-end gap-2">
                              <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{result.qualityScore}</span>
                              <span className="text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Alpha</span>
                           </div>
                        </div>
                        <div className="space-y-3">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visual Logic</p>
                           <span className="inline-flex px-4 py-2 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-emerald-500/20">
                              {result.lighting} Spectrum
                           </span>
                        </div>
                     </div>

                     {/* Logic: Feature Extraction */}
                     <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white space-y-6 shadow-glow relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                        <div className="flex items-center gap-4 relative z-10">
                           <Maximize2 className="w-6 h-6 text-primary" />
                           <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-white/50">Feature Extraction</h4>
                        </div>
                        <div className="flex flex-wrap gap-3 relative z-10">
                           {result.amenities.map(a => (
                              <div key={a} className="flex items-center gap-3 px-5 py-2.5 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest group hover:bg-white/10 transition-all">
                                 <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                 {a}
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Protocol: Multilingual Deployment */}
                     <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-premium overflow-hidden">
                        <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <Languages className="w-6 h-6 text-primary" />
                              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-900 dark:text-white">Neural Multilingual Synthesis</h4>
                           </div>
                           <Globe className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="p-10 space-y-10">
                           {Object.entries(result.descriptions).map(([lang, desc]) => (
                              <div key={lang} className="space-y-3 group">
                                 <div className="flex items-center gap-3">
                                    <span className="text-[9px] font-black bg-slate-900 dark:bg-primary text-white px-3 py-1 rounded-lg uppercase tracking-widest shadow-glow">{lang} Node</span>
                                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20 transition-all" />
                                 </div>
                                 <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                                    "{desc}"
                                 </p>
                              </div>
                           ))}
                           <motion.button
                              whileHover={{ scale: 1.02 }}
                              className="btn-primary w-full py-5 text-[10px] scale-100 flex items-center justify-center gap-4 group"
                           >
                              Deploy Copy to Global Registry
                              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                           </motion.button>
                        </div>
                     </div>
                  </motion.div>
               ) : (
                  <div className="h-[550px] border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[4rem] flex flex-col items-center justify-center p-14 text-center text-slate-300 group hover:border-primary/50 transition-all duration-700">
                     <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-sm group-hover:shadow-glow transition-all">
                        <Cpu className="w-12 h-12 opacity-30 group-hover:opacity-100 group-hover:text-primary transition-all duration-700" />
                     </div>
                     <p className="font-black uppercase text-xs tracking-[0.4em] opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all duration-700">Awaiting Asset Ingestion</p>
                  </div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  )
}
