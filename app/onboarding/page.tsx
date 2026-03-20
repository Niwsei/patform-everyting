'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Truck, CheckCircle2, ArrowRight, Upload, MapPin, DollarSign, Camera } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [partnerType, setPartnerType] = useState<'property' | 'service' | null>(null)

  const handleNext = () => setStep(prev => prev + 1)
  const handleBack = () => setStep(prev => prev - 1)

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-premium border border-slate-100">

          <div className="mb-12 text-center">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Become a Partner</h1>
            <p className="text-slate-500 font-bold mt-2">Start earning with Vientiane Nest today.</p>

            <div className="flex justify-center gap-2 mt-8">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    step === s ? "w-8 bg-indigo-600" : "w-2 bg-slate-200"
                  )}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-black text-slate-900 text-center">What would you like to list?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setPartnerType('property')}
                    className={cn(
                      "p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 text-center group",
                      partnerType === 'property'
                        ? "border-indigo-600 bg-indigo-50/50 shadow-xl shadow-indigo-100"
                        : "border-slate-100 hover:border-indigo-200"
                    )}
                  >
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                      partnerType === 'property' ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                    )}>
                      <Building2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900">Property</h3>
                      <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Apartments, Houses, Rooms</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setPartnerType('service')}
                    className={cn(
                      "p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 text-center group",
                      partnerType === 'service'
                        ? "border-indigo-600 bg-indigo-50/50 shadow-xl shadow-indigo-100"
                        : "border-slate-100 hover:border-indigo-200"
                    )}
                  >
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                      partnerType === 'service' ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                    )}>
                      <Truck className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900">Service</h3>
                      <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Moving, Cleaning, Maintenance</p>
                    </div>
                  </button>
                </div>

                <button
                  disabled={!partnerType}
                  onClick={handleNext}
                  className="w-full mt-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h2 className="text-xl font-black text-slate-900">Tell us about your {partnerType === 'property' ? 'Property' : 'Service'}</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                      <input
                        type="text"
                        placeholder={partnerType === 'property' ? "Modern Studio in Xaysetha" : "Professional Home Cleaning"}
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (LAK)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="number"
                            placeholder="Price"
                            className="w-full p-4 pl-10 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="District"
                            className="w-full p-4 pl-10 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Photos</label>
                      <div className="w-full h-40 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center gap-2 hover:bg-slate-50 hover:border-indigo-300 transition-all cursor-pointer group">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
                          <Camera className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Upload up to 10 photos</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleBack}
                    className="w-1/3 py-5 border-2 border-slate-100 rounded-2xl font-black text-lg text-slate-400 hover:text-slate-600 hover:border-slate-200 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-slate-200"
                  >
                    Next Step
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-black text-slate-900">Application Submitted!</h2>
                  <p className="text-slate-500 font-medium">Our team will review your {partnerType} listing and get back to you within 24 hours.</p>
                </div>

                <div className="bg-indigo-50 p-6 rounded-3xl text-left border border-indigo-100">
                   <h4 className="font-bold text-indigo-900 mb-2">Verified Partner Status</h4>
                   <p className="text-sm font-medium text-indigo-700 opacity-80 leading-relaxed">
                     Your application includes a request for the "Verified Host" badge. This increases booking chances by up to 80%!
                   </p>
                </div>

                <Link
                  href="/dashboard"
                  className="block w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-slate-200"
                >
                  Go to Dashboard
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </main>
  )
}
