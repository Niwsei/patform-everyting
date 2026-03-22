'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, X, MousePointer2, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TourStep {
  id: string
  title: string
  content: string
  target?: string
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'ยินดีต้อนรับสู่ Vientiane Nest!',
    content: 'เราพร้อมช่วยคุณหาที่พักที่ดีที่สุดในเวียงจันทน์ สปป. ลาว มาทำความรู้จักฟีเจอร์เด่นของเรากันค่ะ'
  },
  {
    id: 'ai-engine',
    title: 'Nest AI Engine',
    content: 'ปุ่มนี้จะช่วยวิเคราะห์หาที่พักที่ตรงกับไลฟ์สไตล์และงบประมาณของคุณที่สุดโดยอัตโนมัติค่ะ'
  },
  {
    id: 'language',
    title: 'รองรับ 3 ภาษา',
    content: 'คุณสามารถสลับเป็นภาษาไทย อังกฤษ หรือลาว ได้ตลอดเวลาที่แถบเมนูด้านบนค่ะ'
  }
]

export function StartupTour() {
  const [currentStep, setCurrentStep] = useState(-1) // -1 means tour not started

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('vte-nest-tour-seen')
    if (!hasSeenTour) {
      const timer = setTimeout(() => setCurrentStep(0), 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      completeTour()
    }
  }

  const completeTour = () => {
    setCurrentStep(-1)
    localStorage.setItem('vte-nest-tour-seen', 'true')
  }

  if (currentStep === -1) return null

  const step = tourSteps[currentStep]

  return (
    <div className="fixed inset-0 z-[300] flex items-end md:items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
      >
        <div className="p-8">
           <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                 <Sparkles className="w-6 h-6" />
              </div>
              <button onClick={completeTour} className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                 <X className="w-5 h-5" />
              </button>
           </div>

           <div className="space-y-4 mb-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{step.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{step.content}</p>
           </div>

           <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                 {tourSteps.map((_, i) => (
                    <div key={i} className={cn(
                       "h-1.5 rounded-full transition-all duration-500",
                       currentStep === i ? "w-6 bg-indigo-600" : "w-1.5 bg-slate-200 dark:bg-slate-700"
                    )} />
                 ))}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-slate-900 dark:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
              >
                {currentStep === tourSteps.length - 1 ? 'เริ่มใช้งานเลย' : 'ขั้นตอนถัดไป'}
                <ArrowRight className="w-4 h-4" />
              </button>
           </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 justify-center">
           <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Startup Tip: Click icons to see details</span>
        </div>
      </motion.div>
    </div>
  )
}
