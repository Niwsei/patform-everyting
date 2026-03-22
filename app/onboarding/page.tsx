'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  Truck,
  CheckCircle2,
  ArrowRight,
  Upload,
  MapPin,
  DollarSign,
  Camera,
  ShieldCheck,
  FileText,
  Clock,
  Briefcase,
  ChevronLeft,
  Sparkles,
  Lock,
  Smartphone,
  Check
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { translations } from '@/lib/translations'

const LocationPicker = dynamic(() => import('@/components/onboarding/LocationPicker').then(mod => mod.LocationPicker), {
  ssr: false,
  loading: () => <div className="h-64 md:h-80 w-full bg-slate-50 dark:bg-slate-800 animate-pulse rounded-[2.5rem]" />
})

export default function OnboardingPage() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [step, setStep] = useState(1)
  const [partnerType, setPartnerType] = useState<'property' | 'service' | null>(null)
  const [location, setLocation] = useState<{ lat: number, lng: number, address: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = () => setStep(prev => prev + 1)
  const handleBack = () => setStep(prev => prev - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2500))
    setIsSubmitting(false)
    setStep(4)
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 px-4 overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full -ml-48 -mb-48 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-2xl relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-8 md:p-14 shadow-premium border border-slate-100 dark:border-slate-800 relative overflow-hidden">

          {/* Progress Indicator */}
          {step < 4 && (
            <div className="mb-14 text-center">
              <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-primary/20 shadow-glow">
                <Sparkles className="w-3.5 h-3.5 fill-primary" />
                Onboarding Portal • {step}/3
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] mb-4">
                Scale Your <br/>
                <span className="text-primary italic">Business.</span>
              </h1>

              <div className="flex justify-center gap-4 mt-10">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-1000",
                      step === s ? "w-16 bg-primary shadow-glow" : step > s ? "w-6 bg-emerald-500" : "w-6 bg-slate-100 dark:bg-slate-800"
                    )}
                  />
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="text-center space-y-2">
                   <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Identity Class</h2>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select your operational model</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    onClick={() => setPartnerType('property')}
                    className={cn(
                      "p-10 rounded-[3rem] border-2 transition-all duration-500 flex flex-col items-center gap-6 text-center group relative overflow-hidden",
                      partnerType === 'property'
                        ? "border-primary bg-primary/5 shadow-premium"
                        : "border-slate-100 dark:border-slate-800 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    <div className={cn(
                      "w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all duration-700",
                      partnerType === 'property' ? "bg-primary text-white scale-110 shadow-glow" : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-primary/20 group-hover:text-primary"
                    )}>
                      <Building2 className="w-12 h-12 stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-slate-900 dark:text-white leading-none">Estate Host</h3>
                      <p className="text-[10px] font-black text-slate-400 mt-3 uppercase tracking-widest leading-relaxed">Condos, Villas, Serviced Apts</p>
                    </div>
                    {partnerType === 'property' && (
                       <motion.div layoutId="check" className="absolute top-6 right-6 text-primary"><CheckCircle2 className="w-8 h-8" /></motion.div>
                    )}
                  </button>

                  <button
                    onClick={() => setPartnerType('service')}
                    className={cn(
                      "p-10 rounded-[3rem] border-2 transition-all duration-500 flex flex-col items-center gap-6 text-center group relative overflow-hidden",
                      partnerType === 'service'
                        ? "border-primary bg-primary/5 shadow-premium"
                        : "border-slate-100 dark:border-slate-800 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    )}
                  >
                    <div className={cn(
                      "w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all duration-700",
                      partnerType === 'service' ? "bg-primary text-white scale-110 shadow-glow" : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-primary/20 group-hover:text-primary"
                    )}>
                      <Truck className="w-12 h-12 stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-slate-900 dark:text-white leading-none">Service Provider</h3>
                      <p className="text-[10px] font-black text-slate-400 mt-3 uppercase tracking-widest leading-relaxed">Logistics, Cleaning, Maintenance</p>
                    </div>
                    {partnerType === 'service' && (
                       <motion.div layoutId="check" className="absolute top-6 right-6 text-primary"><CheckCircle2 className="w-8 h-8" /></motion.div>
                    )}
                  </button>
                </div>

                <div className="bg-slate-900 dark:bg-white/5 p-8 rounded-[2.5rem] border border-white/10 flex gap-5">
                   <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
                   <p className="text-[10px] font-black text-slate-300 dark:text-slate-400 leading-relaxed uppercase tracking-[0.15em]">
                      Trust protocols: All applicants undergo rigorous KYC verification before listing activation. Secure the "Verified" badge to boost leads by 300%.
                   </p>
                </div>

                <button
                  disabled={!partnerType}
                  onClick={handleNext}
                  className="btn-primary w-full py-6 text-sm scale-100"
                >
                  Initiate Setup
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center border border-primary/20">
                        {partnerType === 'property' ? <Building2 className="w-6 h-6" /> : <Truck className="w-6 h-6" />}
                     </div>
                     <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">{partnerType === 'property' ? 'Estate Intelligence' : 'Service Framework'}</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Entity Name</label>
                      <input
                        type="text"
                        placeholder={partnerType === 'property' ? "e.g. Skyline Suites Vientiane" : "e.g. SwiftReloc Laos"}
                        className="w-full p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] font-bold focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Operational Contact</label>
                        <div className="relative">
                          <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            placeholder="020 XXX XXXX"
                            className="w-full p-5 pl-14 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] font-bold focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Baseline Price (LAK)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="number"
                            placeholder="Amount in LAK"
                            className="w-full p-5 pl-14 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] font-bold focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Geospatial Intelligence (Map Pin)</label>
                      <div className="rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800">
                         <LocationPicker
                           onLocationSelect={(lat, lng, address) => setLocation({ lat, lng, address })}
                         />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Visual Showcase</label>
                      <div className="w-full h-48 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-primary transition-all cursor-pointer group">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
                          <Camera className="w-6 h-6" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upload Master Visuals</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleBack}
                    className="w-1/3 py-5 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-600 hover:border-slate-200 transition-all active:scale-95"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 btn-primary py-5 text-xs scale-100"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="space-y-8">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center border border-primary/20">
                        <FileText className="w-6 h-6" />
                     </div>
                     <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Verification Matrix</h2>
                  </div>

                  <div className="space-y-8">
                     <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-6">
                        <div className="flex items-center justify-between">
                           <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-widest flex items-center gap-3">
                              <Lock className="w-4 h-4 text-primary" />
                              Required Documents
                           </h4>
                           <span className="text-[9px] font-black text-emerald-500 uppercase bg-emerald-500/10 px-2 py-1 rounded-lg">Encrypted</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           {[
                              { label: 'Business ID', icon: FileText },
                              { label: 'Operating Permit', icon: ShieldCheck }
                           ].map((doc, i) => (
                             <div key={i} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col items-center gap-3 cursor-pointer hover:border-primary transition-all group shadow-sm">
                                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                   <doc.icon className="w-5 h-5" />
                                </div>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">{doc.label}</span>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Accelerator Packages</label>
                        <div className="grid grid-cols-1 gap-4">
                           <div className="p-7 border-2 border-primary bg-primary/5 rounded-[2.5rem] relative flex items-center gap-5 shadow-premium">
                              <div className="w-14 h-14 bg-primary text-white rounded-[1.25rem] flex items-center justify-center shadow-glow shrink-0">
                                 <Sparkles className="w-7 h-7 fill-white" />
                              </div>
                              <div className="flex-1">
                                 <p className="font-black text-slate-900 dark:text-white text-lg tracking-tight">Growth Catalyst</p>
                                 <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em] mt-1">5% Comm • Priority AI Indexing</p>
                              </div>
                              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-glow">
                                 <Check className="w-5 h-5 text-white stroke-[3]" />
                              </div>
                           </div>
                           <div className="p-7 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] opacity-60 hover:opacity-100 transition-all cursor-pointer flex items-center gap-5 group">
                              <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-[1.25rem] flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all shrink-0">
                                 <Briefcase className="w-7 h-7" />
                              </div>
                              <div className="flex-1">
                                 <p className="font-black text-slate-900 dark:text-white text-lg tracking-tight">Enterprise Pro</p>
                                 <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em] mt-1">Custom Comm • API Integration</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-1/3 py-5 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-600 hover:border-slate-200 transition-all active:scale-95"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 btn-primary py-5 text-xs scale-100 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                       <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing Application...
                       </>
                    ) : (
                       <>Submit for Review</>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-12 py-10"
              >
                <div className="relative inline-block">
                   <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                      className="w-40 h-40 bg-primary rounded-[3rem] flex items-center justify-center mx-auto shadow-glow"
                   >
                      <Clock className="w-20 h-20 text-white stroke-[1.5]" />
                   </motion.div>
                   <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-500 rounded-[1.25rem] border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                   </div>
                </div>

                <div className="space-y-5">
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]">
                    Review in <br/> <span className="text-primary italic">Progress.</span>
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 font-bold text-lg max-w-sm mx-auto leading-relaxed">
                    Our compliance team is currently auditing your submission. Expect status updates via your registered contact.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 text-left">
                   <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex gap-5 items-start">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
                         <Clock className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Processing Window</p>
                         <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.2em] leading-relaxed">24 - 48 Standard Business Hours</p>
                      </div>
                   </div>
                </div>

                <Link
                  href="/dashboard"
                  className="btn-primary w-full py-6 text-sm scale-100"
                >
                  Enter Control Center
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Support Section */}
        <div className="mt-12 text-center">
           <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
             Need Assistance? <button className="text-primary underline decoration-primary/30 underline-offset-8">Consult Sarah</button>
           </p>
        </div>
      </div>
    </main>
  )
}
