'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, UserCheck, ChevronRight, X, Upload, Smartphone, CheckCircle2, Lock, Zap, Cpu, Activity, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TenantKYC() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleVerify = async () => {
    setIsVerifying(true)
    await new Promise(resolve => setTimeout(resolve, 2500))
    setIsVerifying(false)
    setIsComplete(true)
    setStep(3)
  }

  return (
    <>
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 p-7 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-premium hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all group"
      >
        <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
          <ShieldCheck className="w-7 h-7 stroke-[1.5]" />
        </div>
        <div className="text-left">
           <h4 className="font-black text-slate-900 dark:text-white tracking-tight uppercase text-xs">Identity Protocol</h4>
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Verified Tenant Badge</p>
        </div>
        <div className="ml-auto w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-all">
           <ChevronRight className="w-5 h-5" />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[4rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            >
              <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-glow">
                       <UserCheck className="w-6 h-6 stroke-[2]" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">KYC Interface</h2>
                 </div>
                 <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              <div className="p-12">
                 <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                         <div className="space-y-3">
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Identity Ingestion</h3>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Biometric Passport or Global ID required.</p>
                         </div>

                         <div className="grid grid-cols-1 gap-6">
                            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[3rem] p-16 flex flex-col items-center justify-center gap-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-primary transition-all cursor-pointer group">
                               <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500 group-hover:shadow-glow">
                                  <Upload className="w-10 h-10 stroke-[1.5]" />
                               </div>
                               <div className="text-center space-y-2">
                                  <p className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-[0.2em]">Initiate Upload</p>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Maximum file delta: 5MB</p>
                               </div>
                            </div>
                         </div>

                         <div className="bg-slate-900 p-8 rounded-[2.5rem] flex gap-5 border border-white/10">
                            <Lock className="w-8 h-8 text-primary shrink-0" />
                            <p className="text-[10px] font-black text-slate-400 leading-relaxed uppercase tracking-[0.15em]">
                               Quantum Encryption active. Your data is restricted to contract verification and local registry protocols only.
                            </p>
                         </div>

                         <button
                            onClick={() => setStep(2)}
                            className="btn-primary w-full py-6 text-xs scale-100"
                         >
                            Deploy Documentation
                         </button>
                      </motion.div>
                    )}

                    {step === 2 && (
                       <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-12 py-10 text-center"
                       >
                          <div className="relative inline-block">
                             <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                className="w-40 h-40 border-[6px] border-slate-100 dark:border-slate-800 border-t-primary rounded-full shadow-glow"
                             />
                             <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-primary animate-pulse" />
                          </div>

                          <div className="space-y-3">
                             <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Neural Verification</h3>
                             <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Synthesizing Biometric Data...</p>
                          </div>

                          <button
                             onClick={handleVerify}
                             className="w-full py-6 bg-primary/10 text-primary border border-primary/20 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all shadow-glow"
                          >
                             Force Protocol Success
                          </button>
                       </motion.div>
                    )}

                    {step === 3 && (
                       <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-10 py-6"
                       >
                          <div className="w-28 h-28 bg-emerald-500/10 rounded-[3rem] flex items-center justify-center mx-auto text-emerald-500 border border-emerald-500/20 shadow-glow">
                             <CheckCircle2 className="w-14 h-14 stroke-[2.5]" />
                          </div>
                          <div className="space-y-3">
                             <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Protocol Secure.</h3>
                             <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Elite Tenant Identity active.</p>
                          </div>

                          <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 text-left space-y-6">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-glow">
                                   <Zap className="w-5 h-5 fill-white" />
                                </div>
                                <span className="font-black text-slate-900 dark:text-white text-[10px] uppercase tracking-[0.3em]">Alpha Privileges</span>
                             </div>
                             <ul className="space-y-4">
                                {[
                                   'Instant Lease Approval bypass',
                                   '5% Deposit Delta Incentive',
                                   'Alpha Trust Score: 98/100'
                                ].map((item, i) => (
                                   <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-glow" />
                                      {item}
                                   </li>
                                ))}
                             </ul>
                          </div>

                          <button
                             onClick={() => setIsOpen(false)}
                             className="btn-primary w-full py-6 text-xs scale-100"
                          >
                             Commit to Registry
                          </button>
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
