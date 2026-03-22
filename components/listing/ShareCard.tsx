'use client'

import { Property } from "@/features/properties/types"
import { motion, AnimatePresence } from "framer-motion"
import { Share2, X, Download, Copy, CheckCircle2, MessageSquare, Facebook, Instagram } from "lucide-react"
import { useState, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useCurrencyStore } from "@/stores/useCurrencyStore"

interface ShareCardProps {
  property: Property
}

export function ShareCard({ property }: ShareCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { formatPrice } = useCurrencyStore()

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://vte-nest.la/properties/${property.id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    if (typeof window !== 'undefined' && (window as any).addToast) {
       (window as any).addToast('คัดลอกลิงก์เรียบร้อยแล้ว!', 'success')
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors underline"
      >
        <Share2 className="w-4 h-4" />
        แชร์
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsOpen(false)}
               className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
            >
               <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                  <h3 className="font-black text-slate-900 dark:text-white">Share this Nest</h3>
                  <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                     <X className="w-6 h-6" />
                  </button>
               </div>

               <div className="p-10 space-y-10">
                  {/* High Fidelity Preview Card */}
                  <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                     <div className="relative z-10 flex flex-col gap-6">
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg border-2 border-white/20">
                           <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
                           <div className="absolute top-3 left-3 bg-white/90 px-3 py-1.5 rounded-xl text-[9px] font-black text-indigo-600 uppercase shadow-sm">
                              Vientiane Nest
                           </div>
                        </div>
                        <div className="space-y-2 text-white">
                           <h4 className="text-xl font-black leading-tight line-clamp-1">{property.title}</h4>
                           <p className="text-xs font-medium opacity-80 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
                              {property.location}
                           </p>
                           <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                              <div>
                                 <p className="text-[9px] font-black uppercase opacity-60">Rent per month</p>
                                 <p className="text-lg font-black">{formatPrice(property.pricePerMonth)}</p>
                              </div>
                              <div className="bg-white rounded-lg p-2 shadow-inner">
                                 <div className="w-10 h-10 bg-slate-900 rounded flex items-center justify-center text-[10px] font-black text-white">VN</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="grid grid-cols-2 gap-4">
                     <button onClick={handleCopy} className="flex flex-col items-center gap-3 p-6 bg-slate-50 dark:bg-slate-800 rounded-[2rem] hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all border border-slate-100 dark:border-slate-800 group">
                        <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm">
                           {copied ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Copy className="w-6 h-6" />}
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{copied ? 'Copied!' : 'Copy Link'}</span>
                     </button>
                     <button className="flex flex-col items-center gap-3 p-6 bg-slate-50 dark:bg-slate-800 rounded-[2rem] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-slate-100 dark:border-slate-800 group">
                        <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#1877f2] transition-colors shadow-sm">
                           <Facebook className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Facebook</span>
                     </button>
                     <button className="flex flex-col items-center gap-3 p-6 bg-slate-50 dark:bg-slate-800 rounded-[2rem] hover:bg-[#25d366]/10 transition-all border border-slate-100 dark:border-slate-800 group col-span-2">
                        <div className="w-12 h-12 bg-[#25d366] rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-lg shadow-[#25d366]/20">
                           <MessageSquare className="w-6 h-6 fill-current" />
                        </div>
                        <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Share on WhatsApp</span>
                     </button>
                  </div>
               </div>

               <div className="bg-slate-50 dark:bg-slate-800/50 p-6 text-center border-t border-slate-100 dark:border-slate-800">
                  <button className="inline-flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:underline">
                     <Download className="w-4 h-4" />
                     Save as High-Res Image
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

function MapPin(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
