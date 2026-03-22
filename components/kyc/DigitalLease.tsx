'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, PenTool, X, CheckCircle2, Download, ShieldCheck, ChevronRight, Gavel, Globe, Lock, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DigitalLeaseProps {
  propertyName: string
  hostName: string
  amount: string
}

export function DigitalLease({ propertyName, hostName, amount }: DigitalLeaseProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSigned, setIsSigned] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSign = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSigned(true)
  }

  return (
    <>
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 p-7 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-premium hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all group"
      >
        <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
          <FileText className="w-7 h-7 stroke-[1.5]" />
        </div>
        <div className="text-left">
           <h4 className="font-black text-slate-900 dark:text-white tracking-tight uppercase text-xs">Lease Protocol</h4>
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Legal E-Signature Core</p>
        </div>
        <div className="ml-auto w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-all">
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
              className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[4rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col h-[90vh]"
            >
              <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-glow">
                       <Gavel className="w-6 h-6 stroke-[2]" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">Smart Lease Protocol</h2>
                 </div>
                 <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-12 bg-slate-50 dark:bg-slate-950">
                 <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-16 rounded-[3.5rem] shadow-premium border border-slate-100 dark:border-slate-800 space-y-12">
                    <div className="flex justify-between items-start">
                       <div className="space-y-2">
                          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Deployment Lease</h1>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Protocol Ref: VN-2024-ALPHA-{(Math.random() * 1000).toFixed(0)}</p>
                       </div>
                       <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                          <Globe className="w-8 h-8 text-primary" />
                       </div>
                    </div>

                    <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                       <p className="text-lg">This operational protocol is established between <span className="font-black text-slate-900 dark:text-white">{hostName}</span> (The "Entity Lead") and <span className="font-black text-slate-900 dark:text-white">Active Registry User</span> (The "Deployment Lead").</p>
                       <p>Asset designated for deployment: <span className="font-black text-primary italic">{propertyName}</span> located within the Vientiane Capital hotzone.</p>

                       <div className="space-y-6 p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                          <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] text-[10px]">Active Terms & Clauses:</h4>
                          <ol className="list-decimal list-inside space-y-4 text-xs font-sans font-bold uppercase tracking-widest leading-loose">
                             <li>Deployment Lead commits to a monthly protocol rate of <span className="text-primary">{amount}</span> executed via BCEL One Pay sync.</li>
                             <li>Minimum operational window is governed by the reservation manifest selected during ingestion.</li>
                             <li>All facility maintenance and sanitation must adhere to Vientiane Nest Elite Host standards.</li>
                             <li>Protocol termination triggers automatically upon a 7-day latency in credit commitment.</li>
                          </ol>
                       </div>

                       <div className="pt-12 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-16">
                          <div className="space-y-4">
                             <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">Entity Lead (Locked)</p>
                             <div className="h-20 flex items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                                <span className="text-3xl font-cursive text-primary/40 italic">{hostName}</span>
                             </div>
                          </div>
                          <div className="space-y-4">
                             <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.3em]">Deployment Lead (Signature Required)</p>
                             <div className="h-20 flex items-center border-b border-slate-100 dark:border-slate-800 pb-4 relative">
                                {isSigned ? (
                                   <motion.div
                                      initial={{ scale: 0.8, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      className="flex items-center gap-3"
                                   >
                                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                      <span className="text-2xl font-cursive text-emerald-500 italic">Alpha Verified</span>
                                   </motion.div>
                                ) : (
                                   <span className="text-slate-300 dark:text-slate-700 text-xs font-bold italic tracking-widest">Awaiting Neural Auth...</span>
                                )}
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-10 border-t border-slate-50 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 bg-white dark:bg-slate-900">
                 <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                       <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Quantum-Legal Protocol</p>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Compliant with Lao Digital Transaction Law v4.0</p>
                    </div>
                 </div>

                 <div className="flex gap-4 w-full md:w-auto">
                    {isSigned ? (
                       <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-5 bg-emerald-500/10 text-emerald-500 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all shadow-glow"
                       >
                          <Download className="w-5 h-5 stroke-[2.5]" />
                          Export Manifest (PDF)
                       </motion.button>
                    ) : (
                       <button
                          onClick={handleSign}
                          disabled={isSubmitting}
                          className="flex-1 md:flex-none btn-primary px-12 py-5 text-[10px] flex items-center justify-center gap-4"
                       >
                          {isSubmitting ? (
                             <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Syncing Auth...
                             </>
                          ) : (
                             <>
                                <PenTool className="w-5 h-5 stroke-[2.5]" />
                                Execute Signature
                             </>
                          )}
                       </button>
                    )}
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
