'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Camera,
  CheckCircle2,
  AlertCircle,
  BrainCircuit,
  Languages,
  FileText,
  Image as ImageIcon,
  Zap,
  Star,
  ChevronRight,
  Maximize2
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

    // Multi-stage AI Simulation
    await new Promise(resolve => setTimeout(resolve, 1500)) // Feature detection
    await new Promise(resolve => setTimeout(resolve, 1500)) // Quality audit
    await new Promise(resolve => setTimeout(resolve, 1500)) // Description generation

    setResult({
      amenities: ['Air Conditioning', 'High-Speed WiFi', 'Work Desk', 'Modern Lighting', 'City View'],
      qualityScore: 94,
      lighting: 'Excellent',
      descriptions: {
        TH: 'ห้องสตูดิโอสุดหรูพร้อมวิวเมืองเวียงจันทน์ ตกแต่งสไตล์โมเดิร์น พร้อมแอร์และพื้นที่ทำงานที่เงียบสงบ เหมาะสำหรับคนทำงานและชาวต่างชาติ',
        EN: 'Luxury studio apartment with stunning Vientiane city views. Featuring modern decor, silent AC, and a dedicated workspace perfect for digital nomads.',
        LO: 'ຫ້ອງສະຕູດີໂອສຸດຫຮູພ້ອມວິວເມືອງວຽງຈັນ, ຕົບແຕ່ງສະໄຕລ໌ໂມເດີນ, ພ້ອມແອ ແລະ ພື້ນທີ່ເຮັດວຽກທີ່ງຽບສະຫງົບ ເຫມາະສຳລັບຄົນເຮັດວຽກ ແລະ ຊາວຕ່າງຊາດ'
      }
    })
    setIsAnalyzing(false)

    if (typeof window !== 'undefined' && (window as any).addToast) {
       (window as any).addToast('AI วิเคราะห์รูปภาพและเขียนคำบรรยายเสร็จเรียบร้อยแล้วค่ะ!', 'success')
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
               Nest AI Vision
               <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase">Optimizer</span>
            </h2>
            <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Image Recognition & Multilingual Copywriting</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Upload & Preview Side */}
         <div className="space-y-6">
            <div
               onClick={() => setSelectedImage('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop')}
               className={cn(
                  "relative h-[400px] rounded-[3rem] border-4 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden transition-all group",
                  selectedImage ? "border-solid border-indigo-600" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
               )}
            >
               {selectedImage ? (
                  <>
                     <Image src={selectedImage} alt="Preview" fill className="object-cover" />
                     <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white font-black text-xs uppercase tracking-widest bg-slate-900/80 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/20">เปลี่ยนรูปภาพ</p>
                     </div>
                  </>
               ) : (
                  <>
                     <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 transition-all">
                        <Camera className="w-10 h-10" />
                     </div>
                     <div className="text-center">
                        <p className="font-black text-slate-900 dark:text-white uppercase text-sm tracking-widest">อัปโหลดรูปภาพห้องพัก</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest leading-relaxed">AI จะทำการวิเคราะห์สิ่งอำนวยความสะดวก <br/> และคะแนนความน่าสนใจโดยอัตโนมัติ</p>
                     </div>
                  </>
               )}
            </div>

            <button
               onClick={simulateAnalysis}
               disabled={!selectedImage || isAnalyzing}
               className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
            >
               {isAnalyzing ? (
                  <>
                     <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                     กำลังวิเคราะห์ด้วย AI...
                  </>
               ) : (
                  <>
                     <BrainCircuit className="w-6 h-6" />
                     วิเคราะห์และสร้างคำบรรยาย
                  </>
               )}
            </button>
         </div>

         {/* Results Side */}
         <div className="space-y-6">
            <AnimatePresence mode="wait">
               {isAnalyzing ? (
                  <motion.div
                     key="loading"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 1.05 }}
                     className="h-[500px] bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center p-12 text-center space-y-8"
                  >
                     <div className="relative">
                        <motion.div
                           animate={{ rotate: 360 }}
                           transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                           className="w-32 h-32 border-4 border-indigo-50 dark:border-slate-800 border-t-indigo-600 rounded-full"
                        />
                        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-indigo-600 animate-pulse" />
                     </div>
                     <div className="space-y-3">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Nest AI is Processing</h3>
                        <div className="flex flex-col gap-2">
                           {['ตรวจจับวัตถุในรูปภาพ...', 'ประเมินมุมกล้องและแสง...', 'ประมวลผลคำบรรยาย 3 ภาษา...'].map((task, i) => (
                              <motion.div
                                 key={i}
                                 initial={{ opacity: 0, x: -10 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 transition={{ delay: i * 0.8 }}
                                 className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest"
                              >
                                 <div className="w-1 h-1 bg-indigo-500 rounded-full shrink-0" />
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
                     className="space-y-6"
                  >
                     {/* Score & Specs Card */}
                     <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm grid grid-cols-2 gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-bl-[3rem] flex items-center justify-center">
                           <Zap className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quality Score</p>
                           <div className="flex items-end gap-1">
                              <span className="text-4xl font-black text-slate-900 dark:text-white">{result.qualityScore}</span>
                              <span className="text-sm font-bold text-slate-400 mb-1">/100</span>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lighting</p>
                           <span className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase rounded-full">
                              {result.lighting}
                           </span>
                        </div>
                     </div>

                     {/* Detected Amenities */}
                     <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-4">
                        <div className="flex items-center gap-3">
                           <Maximize2 className="w-5 h-5 text-indigo-400" />
                           <h4 className="font-black text-sm uppercase tracking-widest">Detected Amenities</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                           {result.amenities.map(a => (
                              <div key={a} className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl border border-white/5 text-[10px] font-bold">
                                 <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                 {a}
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Multilingual Descriptions */}
                     <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                           <Languages className="w-5 h-5 text-indigo-600" />
                           <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white">AI Multilingual Copy</h4>
                        </div>
                        <div className="p-8 space-y-8">
                           {Object.entries(result.descriptions).map(([lang, desc]) => (
                              <div key={lang} className="space-y-2">
                                 <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-md uppercase">{lang}</span>
                                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                                 </div>
                                 <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">
                                    "{desc}"
                                 </p>
                              </div>
                           ))}
                           <button className="w-full py-4 border-2 border-indigo-600 text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 active:scale-95">
                              นำไปใช้กับประกาศนี้
                              <ChevronRight className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  </motion.div>
               ) : (
                  <div className="h-[500px] border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center text-slate-300">
                     <BrainCircuit className="w-16 h-16 mb-4 opacity-50" />
                     <p className="font-black uppercase text-xs tracking-widest">อัปโหลดรูปเพื่อเริ่มการวิเคราะห์</p>
                  </div>
               )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  )
}
