'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, X, Maximize2, Move, Smartphone } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImmersivePreviewProps {
  image: string
  title: string
}

export function ImmersivePreview({ image, title }: ImmersivePreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [rotation, setRotation] = useState(0)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 left-4 z-20 px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl text-white text-[10px] font-black uppercase tracking-widest border border-white/20 flex items-center gap-2 hover:bg-black transition-all"
      >
        <Compass className="w-3.5 h-3.5 animate-spin-slow" />
        360° View
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl">
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 overflow-hidden pointer-events-none"
             >
                {/* Background "Environment" Simulation */}
                <Image src={image} alt="Env" fill className="object-cover blur-3xl opacity-20 scale-150" />
             </motion.div>

             <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-6xl aspect-video md:h-[70vh] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-black group"
             >
                {/* High Fidelity 360 Scroll Simulation */}
                <motion.div
                   className="relative h-full flex"
                   animate={{ x: `-${rotation}%` }}
                   transition={{ type: "spring", damping: 30, stiffness: 100 }}
                >
                   <div className="min-w-full h-full relative shrink-0">
                      <Image src={image} alt={title} fill className="object-cover" />
                   </div>
                   <div className="min-w-full h-full relative shrink-0">
                      <Image src={image} alt={title} fill className="object-cover scale-x-[-1]" />
                   </div>
                   <div className="min-w-full h-full relative shrink-0">
                      <Image src={image} alt={title} fill className="object-cover" />
                   </div>
                </motion.div>

                {/* UI Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-10 pointer-events-none">
                   <div className="flex justify-between items-start pointer-events-auto">
                      <div className="space-y-1">
                         <h3 className="text-white text-2xl font-black tracking-tight">{title}</h3>
                         <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Immersive 360° Interior Preview</p>
                      </div>
                      <button onClick={() => setIsOpen(false)} className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/10 hover:bg-white/20 transition-all">
                         <X className="w-6 h-6" />
                      </button>
                   </div>

                   <div className="flex flex-col items-center gap-6 pointer-events-auto">
                      <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10">
                         <Move className="w-5 h-5 text-indigo-400 animate-pulse" />
                         <input
                            type="range"
                            min="0"
                            max="200"
                            value={rotation}
                            onChange={(e) => setRotation(parseInt(e.target.value))}
                            className="w-64 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-indigo-500"
                         />
                         <span className="text-white text-[10px] font-black w-8">200%</span>
                      </div>
                      <div className="px-6 py-3 bg-indigo-600 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                         <Smartphone className="w-3.5 h-3.5" />
                         Drag or Tilt to Explore
                      </div>
                   </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
