'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Search, CheckCircle2, Home, MapPin, DollarSign, BrainCircuit, X, ChevronRight, Wand2 } from 'lucide-react'
import { mockProperties } from '@/features/properties/services/mockData'
import { PropertyCard } from '@/features/properties/components/PropertyCard'
import { cn } from '@/lib/utils'
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
        { label: language === 'EN' ? 'Under 2M LAK' : language === 'LO' ? 'ຕ່ຳກວ່າ 2 ລ້ານ ກີບ' : 'ไม่เกิน 2 ล้าน กีบ', value: 'under_2m' },
        { label: language === 'EN' ? '2M - 5M LAK' : language === 'LO' ? '2 - 5 ລ້ານ ກີບ' : '2 - 5 ล้าน กีบ', value: '2m_to_5m' },
        { label: language === 'EN' ? 'Over 5M LAK' : language === 'LO' ? 'ຫຼາຍກວ່າ 5 ລ້ານ ກີບ' : '5 ล้าน กีบ ขึ้นไป', value: 'over_5m' }
      ]
    },
    {
      id: 'vibe',
      question: language === 'EN' ? 'What vibe do you prefer?' : language === 'LO' ? 'ທ່ານມັກບັນຍາກາດແບບໃດ?' : 'คุณชอบบรรยากาศแบบไหนมากที่สุด?',
      options: [
        { label: language === 'EN' ? 'City Center, Convenient' : language === 'LO' ? 'ໃຈກາງເມືອງ, ເດີນທາງສະດວກ' : 'ใจกลางเมือง เดินทางสะดวก', value: 'urban' },
        { label: language === 'EN' ? 'Quiet, Near Nature' : language === 'LO' ? 'ງຽບສະຫງົບ, ໃກ້ທຳມະຊາດ' : 'เงียบสงบ ใกล้ธรรมชาติ', value: 'quiet' },
        { label: language === 'EN' ? 'Luxury with Amenities' : language === 'LO' ? 'ຫູຫຼາ ພ້ອມສິ່ງອຳນວຍຄວາມສະດວກ' : 'หรูหรา พร้อมสิ่งอำนวยความสะดวก', value: 'luxury' }
      ]
    },
    {
      id: 'amenity',
      question: language === 'EN' ? 'Essential amenities?' : language === 'LO' ? 'ສິ່ງອຳນວຍຄວາມສະດວກທີ່ຂາດບໍ່ໄດ້?' : 'สิ่งอำนวยความสะดวกที่ขาดไม่ได้คือ?',
      options: [
        { label: language === 'EN' ? 'High Speed WiFi' : language === 'LO' ? 'ອິນເຕີເນັດຄວາມໄວສູງ' : 'อินเทอร์เน็ตความเร็วสูง', value: 'WiFi' },
        { label: language === 'EN' ? 'Pool & Gym' : language === 'LO' ? 'ສະລອຍນ້ຳ ແລະ ຢິມ' : 'สระว่ายน้ำและยิม', value: 'pool_gym' },
        { label: language === 'EN' ? 'Spacious Parking' : language === 'LO' ? 'ບ່ອນຈອດລົດກວ້າງຂວາງ' : 'ที่จอดรถกว้างขวาง', value: 'parking' }
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

    // Simulate detailed logs
    const logs = language === 'EN' ? [
      "Connecting to Vientiane Data Hub...",
      `Analyzing price trends in ${preferences.vibe === 'urban' ? 'Chanthabouly' : 'Sisattanak'}...`,
      "Checking real-time availability...",
      "Comparing desired amenities...",
      "Calculating Nest Score (Value-for-money)...",
      "Generating personalized recommendations..."
    ] : language === 'LO' ? [
      "ກຳລັງເຊື່ອມຕໍ່ກັບ Vientiane Data Hub...",
      `ວິເຄາະແນວໂນ້ມລາຄາໃນຢ່ານ ${preferences.vibe === 'urban' ? 'ຈັນທະບູລີ' : 'ສີສັດຕະນາກ'}...`,
      "ກວດສອບສະຖານະຫ້ອງວ່າງແບບ Real-time...",
      "ປຽບທຽບສິ່ງອຳນວຍຄວາມສະດວກທີ່ຕ້ອງການ...",
      "ຄຳນວນຄະແນນຄວາມຄຸ້ມຄ່າ (Nest Score)...",
      "ສ້າງລາຍການທີ່ແນະນຳສຳລັບທ່ານ..."
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
      await new Promise(resolve => setTimeout(resolve, 800))
    }

    // Simple filter logic for recommendations
    let filtered = [...mockProperties]

    if (preferences.budget === 'under_2m') filtered = filtered.filter(p => p.pricePerMonth < 2000000)
    else if (preferences.budget === '2m_to_5m') filtered = filtered.filter(p => p.pricePerMonth >= 2000000 && p.pricePerMonth <= 5000000)
    else if (preferences.budget === 'over_5m') filtered = filtered.filter(p => p.pricePerMonth > 5000000)

    // Fallback if no matches
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
        className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-white/10 transition-all active:scale-95"
      >
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
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[600px]"
            >
              {/* Sidebar Info */}
              <div className="md:w-1/3 bg-indigo-600 p-8 md:p-12 text-white flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                    <BrainCircuit className="w-7 h-7" />
                  </div>
                  <h2 className="text-3xl font-black leading-tight">Nest AI <br />Analysis</h2>
                  <p className="text-indigo-100 font-medium opacity-80 text-sm leading-relaxed">
                    ระบบ AI ของเราจะวิเคราะห์ที่พักในเวียงจันทน์ตามความต้องการของคุณ เพื่อหาบ้านที่ 'ใช่' ที่สุด
                  </p>
                </div>

                <div className="hidden md:block">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-300">
                    <Sparkles className="w-4 h-4" />
                    Powered by Nest Engine
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col p-8 md:p-12 overflow-y-auto relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-900 transition-colors"
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
                      className="space-y-8"
                    >
                      <div className="space-y-2">
                        <p className="text-indigo-600 font-black text-xs uppercase tracking-widest">ขั้นตอนที่ {step + 1} จาก {steps.length}</p>
                        <h3 className="text-2xl font-black text-slate-900 leading-tight">
                          {steps[step].question}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {steps[step].options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleOptionSelect(opt.value)}
                            className="group flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-100 transition-all text-left active:scale-[0.98]"
                          >
                            <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{opt.label}</span>
                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-all group-hover:translate-x-1" />
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
                      className="flex-1 flex flex-col items-center justify-center text-center space-y-10"
                    >
                      <div className="relative">
                        <motion.div
                           animate={{ rotate: 360 }}
                           transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                           className="w-28 h-28 border-4 border-slate-100 border-t-indigo-600 rounded-full"
                        />
                        <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-indigo-600 animate-pulse" />
                      </div>

                      <div className="space-y-4 w-full max-w-xs">
                         <div className="flex flex-col gap-2">
                            {analysisLogs.map((log, i) => (
                               <motion.div
                                  key={i}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400"
                               >
                                  <div className="w-1 h-1 bg-emerald-500 rounded-full shrink-0" />
                                  <span className="text-left">{log}</span>
                               </motion.div>
                            ))}
                         </div>
                      </div>

                      <div className="flex gap-2">
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                            className="w-2 h-2 bg-indigo-600 rounded-full"
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {recommendations.length > 0 && !isAnalyzing && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">{language === 'EN' ? 'Analysis Results' : language === 'LO' ? 'ຜົນການວິເຄາະ' : 'ผลการวิเคราะห์'}</h3>
                  <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{language === 'EN' ? `We found ${recommendations.length} perfect matches.` : language === 'LO' ? `ພວກເຮົາພົບ ${recommendations.length} ທີ່ພັກທີ່ເໝາະສົມ.` : `เราพบ ${recommendations.length} ที่พักที่เหมาะกับคุณที่สุด`}</p>
                        </div>
                        <button
                          onClick={reset}
                          className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline"
                        >
                  {language === 'EN' ? 'Start Over' : language === 'LO' ? 'ເລີ່ມໃຫມ່' : 'เริ่มวิเคราะห์ใหม่'}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[400px] pr-2 scrollbar-hide">
                        {recommendations.map((property) => (
                           <div key={property.id} className="scale-[0.85] origin-top-left -mb-16 -mr-16">
                              <PropertyCard property={property} />
                           </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                         <Wand2 className="w-5 h-5 text-indigo-600" />
                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                            ต้องการการปรับแต่งเชิงลึกกว่านี้? <span className="text-indigo-600 underline cursor-pointer">คุยกับผู้เชี่ยวชาญของเรา</span>
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
