'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, X, Move, Smartphone, Globe, Cpu, Zap } from 'lucide-react'
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
        className="absolute top-6 left-6 z-20 px-6 py-3 bg-black/60 backdrop-blur-xl rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.3em] border border-white/20 flex items-center gap-3 hover:bg-black transition-all shadow-glow"
      >
        <Compass className="w-4 h-4 animate-spin-slow text-primary" />
        Neural 360° View
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center bg-slate-950/98 backdrop-blur-2xl">
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 overflow-hidden pointer-events-none"
             >
                <Image src={image} alt="Env" fill className="object-cover blur-[120px] opacity-10 scale-150" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary),transparent)] opacity-5" />
             </motion.div>

             <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 150 }}
                className="relative w-full max-w-7xl aspect-video md:h-[75vh] rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] bg-black group"
             >
                <motion.div
                   className="relative h-full flex"
                   animate={{ x: `-${rotation}%` }}
                   transition={{ type: "spring", damping: 40, stiffness: 80 }}
                >
                   <div className="min-w-full h-full relative shrink-0">
                      <Image src={image} alt={title} fill className="object-cover brightness-110" />
                   </div>
                   <div className="min-w-full h-full relative shrink-0">
                      <Image src={image} alt={title} fill className="object-cover scale-x-[-1] brightness-110" />
                   </div>
                   <div className="min-w-full h-full relative shrink-0">
                      <Image src={image} alt={title} fill className="object-cover brightness-110" />
                   </div>
                </motion.div>

                {/* UI Matrix Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-12 pointer-events-none">
                   <div className="flex justify-between items-start pointer-events-auto">
                      <div className="space-y-3">
                         <div className="inline-flex items-center gap-3 bg-primary/20 text-primary px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] border border-primary/20 backdrop-blur-md">
                            <Cpu className="w-3.5 h-3.5" />
                            Neural Geometry Projection
                         </div>
                         <h3 className="text-white text-4xl font-black tracking-tighter">{title}</h3>
                         <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">High-Fidelity Spatial Metadata v2.4</p>
                      </div>
                      <button onClick={() => setIsOpen(false)} className="w-16 h-16 bg-white/5 backdrop-blur-2xl rounded-[1.5rem] text-white border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center">
                         <X className="w-8 h-8 stroke-[1.5]" />
                      </button>
                   </div>

                   <div className="flex flex-col items-center gap-10 pointer-events-auto">
                      <div className="flex items-center gap-8 bg-black/40 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-glow">
                         <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Move className="w-6 h-6 text-primary animate-pulse" />
                         </div>
                         <input
                            type="range"
                            min="0"
                            max="200"
                            value={rotation}
                            onChange={(e) => setRotation(parseInt(e.target.value))}
                            className="w-80 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                         />
                         <div className="flex flex-col items-end min-w-[60px]">
                            <span className="text-white text-xs font-black tracking-tighter">{rotation}°</span>
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Azimuth</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="px-8 py-3 bg-primary rounded-full text-white text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-3 shadow-glow">
                            <Smartphone className="w-4 h-4" />
                            Tactile Exploration Enabled
                         </div>
                         <div className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white/60 text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                            <Globe className="w-4 h-4" />
                            Live Sync: 24ms
                         </div>
                      </div>
                   </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

                {/* Visual Artifacts */}
                <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
