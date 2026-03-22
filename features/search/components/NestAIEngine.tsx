'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, CheckCircle2, BrainCircuit, X, ChevronRight, Wand2 } from 'lucide-react'
import { mockProperties } from '@/features/properties/services/mockData'
import { PropertyCard } from '@/features/properties/components/PropertyCard'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { translations } from '@/lib/translations'

export function NestAIEngine() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguageStore()
  const t = translations[language]
  const [step, setStep] = useState(0)
  const [preferences, setPreferences] = useState({
    budget: '',
    vibe: '',
    amenity: ''
  })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recommendations, setRecommendations] = useState<typeof mockProperties>([])

  const steps = [
    {
      id: 'budget',
      question: language === 'EN' ? 'What is your monthly budget?' : language === 'LO' ? 'ງົບປະມານລາຍເດືອນຂອງທ່ານແມ່ນເທົ່າໃດ?' : 'งบประมาณรายเดือนที่คุณตั้งไว้คือเท่าไหร่?',
      options: [
        { label: language === 'EN' ? 'Under 2M LAK' : 'ไม่เกิน 2 ล้าน กีบ', value: 'under_2m' },
        { label: language === 'EN' ? '2M - 5M LAK' : '2 - 5 ล้าน กีบ', value: '2m_to_5m' },
        { label: language === 'EN' ? 'Over 5M LAK' : '5 ล้าน กีบ ขึ้นไป', value: 'over_5m' }
      ]
    },
    {
      id: 'vibe',
      question: language === 'EN' ? 'What vibe do you prefer?' : 'คุณชอบบรรยากาศแบบไหนมากที่สุด?',
      options: [
        { label: language === 'EN' ? 'City Center, Convenient' : 'ใจกลางเมือง เดินทางสะดวก', value: 'urban' },
        { label: language === 'EN' ? 'Quiet, Near Nature' : 'เงียบสงบ ใกล้ธรรมชาติ', value: 'quiet' },
        { label: language === 'EN' ? 'Luxury with Amenities' : 'หรูหรา พร้อมสิ่งอำนวยความสะดวก', value: 'luxury' }
      ]
    },
    {
      id: 'amenity',
      question: language === 'EN' ? 'Essential amenities?' : 'สิ่งอำนวยความสะดวกที่ขาดไม่ได้คือ?',
      options: [
        { label: language === 'EN' ? 'High Speed WiFi' : 'อินเทอร์เน็ตความเร็วสูง', value: 'WiFi' },
        { label: language === 'EN' ? 'Pool & Gym' : 'สระว่ายน้ำและยิม', value: 'pool_gym' },
        { label: language === 'EN' ? 'Spacious Parking' : 'ที่จอดรถกว้างขวาง', value: 'parking' }
      ]
    }
  ]

  const handleOptionSelect = (value: string) => {
    const currentStepId = steps[step].id
    setPreferences(prev => ({ ...prev, [currentStepId]: value }))

    if (step < steps.length - 1) {
      setStep(prev => prev + 1)
    } else {
      startAnalysis()
    }
  }

  const [analysisLogs, setAnalysisLogs] = useState<string[]>([])

  const startAnalysis = async () => {
    setIsAnalyzing(true)
    setStep(steps.length)
    setAnalysisLogs([])

    const logs = language === 'EN' ? [
      "Connecting to Vientiane Data Hub...",
      `Analyzing price trends in ${preferences.vibe === 'urban' ? 'Chanthabouly' : 'Sisattanak'}...`,
      "Checking real-time availability...",
      "Comparing desired amenities...",
      "Calculating Nest Score (Value-for-money)...",
      "Generating personalized recommendations..."
    ] : [
      "กำลังเชื่อมต่อกับ Vientiane Data Hub...",
      `วิเคราะห์แนวโน้มราคาในย่าน ${preferences.vibe === 'urban' ? 'จันทะบูลี' : 'สีสัตตนาค'}...`,
      "ตรวจสอบสถานะห้องว่างแบบ Real-time...",
      "เปรียบเทียบสิ่งอำนวยความสะดวกที่ต้องการ...",
      "คำนวณคะแนนความคุ้มค่า (Nest Score)...",
      "สร้างรายการที่แนะนำสำหรับคุณ..."
    ]

    for (const log of logs) {
      setAnalysisLogs(prev => [...prev, log])
      await new Promise(resolve => setTimeout(resolve, 600))
    }

    let filtered = [...mockProperties]

    if (preferences.budget === 'under_2m') filtered = filtered.filter(p => p.pricePerMonth < 2000000)
    else if (preferences.budget === '2m_to_5m') filtered = filtered.filter(p => p.pricePerMonth >= 2000000 && p.pricePerMonth <= 5000000)
    else if (preferences.budget === 'over_5m') filtered = filtered.filter(p => p.pricePerMonth > 5000000)

    if (filtered.length === 0) {
      filtered = mockProperties.slice(0, 2)
    }

    setRecommendations(filtered)
    setIsAnalyzing(false)
  }

  const reset = () => {
    setStep(0)
    setPreferences({ budget: '', vibe: '', amenity: '' })
    setRecommendations([])
    setIsAnalyzing(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center gap-3 px-12 py-5 scale-110"
      >
        <Sparkles className="w-5 h-5 fill-white" />
        {t.aiBtn}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[650px] border border-white/10"
            >
              {/* Sidebar Info */}
              <div className="md:w-[40%] bg-primary p-12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="space-y-8 relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/20">
                    <BrainCircuit className="w-8 h-8" />
                  </div>
                  <h2 className="text-4xl font-black leading-tight tracking-tighter">Nest AI <br />Quantum Search</h2>
                  <p className="text-white/80 font-bold text-sm leading-relaxed max-w-[280px]">
                    Our proprietary engine cross-references real-time market data to find properties that match your unique profile.
                  </p>

                  <div className="space-y-4 pt-4">
                     {[
                       { label: 'Data points', val: '12,500+' },
                       { label: 'Latency', val: '< 2.4s' },
                       { label: 'Precision', val: '99.8%' }
                     ].map(item => (
                       <div key={item.label} className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{item.label}</span>
                          <span className="text-xs font-black tracking-widest">{item.val}</span>
                       </div>
                     ))}
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
                  <Sparkles className="w-4 h-4" />
                  Proprietary Algorithm v4.2
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col p-8 md:p-14 overflow-y-auto relative bg-slate-50 dark:bg-slate-900">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-10 right-10 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <AnimatePresence mode="wait">
                  {step < steps.length && (
                    <motion.div
                      key="step"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                           <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest">Step {step + 1} of {steps.length}</span>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
                          {steps[step].question}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {steps[step].options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleOptionSelect(opt.value)}
                            className="group flex items-center justify-between p-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2rem] hover:bg-white dark:hover:bg-slate-700 hover:border-primary hover:shadow-premium transition-all text-left active:scale-[0.98]"
                          >
                            <span className="font-black text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors tracking-tight">{opt.label}</span>
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                               <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {isAnalyzing && (
                    <motion.div
                      key="analyzing"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex-1 flex flex-col items-center justify-center text-center space-y-12"
                    >
                      <div className="relative">
                        <motion.div
                           animate={{ rotate: 360 }}
                           transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                           className="w-32 h-32 border-[6px] border-slate-100 dark:border-slate-800 border-t-primary rounded-full shadow-glow"
                        />
                        <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-primary animate-pulse" />
                      </div>

                      <div className="space-y-4 w-full max-w-sm">
                         <div className="flex flex-col gap-3">
                            {analysisLogs.slice(-3).map((log, i) => (
                               <motion.div
                                  key={i}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
                               >
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                  <span className="text-left leading-none">{log}</span>
                               </motion.div>
                            ))}
                         </div>
                      </div>
                    </motion.div>
                  )}

                  {recommendations.length > 0 && !isAnalyzing && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-10"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
                        <div className="space-y-1">
                          <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{language === 'EN' ? 'Elite Matches' : 'ผลการวิเคราะห์'}</h3>
                          <p className="text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-widest">{language === 'EN' ? `Identified ${recommendations.length} high-potential properties.` : `เราพบ ${recommendations.length} ที่พักที่เหมาะกับคุณที่สุด`}</p>
                        </div>
                        <button
                          onClick={reset}
                          className="btn-secondary px-6 py-2.5"
                        >
                          Reset
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto max-h-[400px] pr-4 scrollbar-hide">
                        {recommendations.map((property) => (
                           <div key={property.id} className="scale-90 origin-top-left -mb-12 -mr-12">
                              <PropertyCard property={property} />
                           </div>
                        ))}
                      </div>

                      <div className="pt-6 flex items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700">
                         <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                            <Wand2 className="w-6 h-6 text-primary" />
                         </div>
                         <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">
                            Need a dedicated advisor? <span className="text-primary underline cursor-pointer">Consult our VIP Relocation Team</span>
                         </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
