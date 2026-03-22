'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Cpu, Zap, Globe } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { cn } from '@/lib/utils'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'signup'
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    login(email)
    setIsLoading(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10"
          >
            {/* Protocol Header */}
            <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl" />
               <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-glow">
                    <Cpu className="w-8 h-8 text-primary stroke-[2]" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black tracking-tighter uppercase">
                      {mode === 'login' ? 'Auth Protocol' : 'Identity Genesis'}
                    </h2>
                    <p className="text-primary font-black text-[9px] uppercase tracking-[0.4em]">
                      Accessing Vientiane Alpha Registry v4.2
                    </p>
                  </div>
               </div>
            </div>

            <div className="p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Neural Identity (Email)</label>
                  <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-primary transition-colors">
                       <Mail className="w-full h-full stroke-[2.5]" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="identity@v-nest.ai"
                      className="w-full p-5 pl-16 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] font-bold focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Security Key</label>
                  <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-primary transition-colors">
                       <Lock className="w-full h-full stroke-[2.5]" />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full p-5 pl-16 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] font-bold focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white placeholder:text-slate-300"
                    />
                  </div>
                </div>

                {mode === 'login' && (
                  <div className="text-right">
                    <button type="button" className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline decoration-primary/30 underline-offset-8">
                      Reset Protocol?
                    </button>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full py-6 text-xs scale-100 flex items-center justify-center gap-4"
                >
                  {isLoading ? (
                    <>
                       <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                       <span className="uppercase tracking-[0.2em]">Syncing Auth...</span>
                    </>
                  ) : (
                    <>
                       <span className="uppercase tracking-[0.2em]">{mode === 'login' ? 'Execute Login' : 'Initiate Registration'}</span>
                       <ArrowRight className="w-5 h-5 stroke-[3]" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.1em]">
                  {mode === 'login' ? 'No registry record?' : 'Identity already indexed?'}
                  <button
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    className="ml-3 text-primary hover:underline decoration-primary/30 underline-offset-8"
                  >
                    {mode === 'login' ? 'Create Node' : 'Bypass to Login'}
                  </button>
                </p>
              </div>

              {/* Social Delta */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                 <button className="flex items-center justify-center gap-3 py-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary transition-all">
                    <Globe className="w-4 h-4 text-primary" />
                    Google Auth
                 </button>
                 <button className="flex items-center justify-center gap-3 py-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary transition-all">
                    <Zap className="w-4 h-4 text-primary" />
                    Fast Pass
                 </button>
              </div>
            </div>

            <div className="bg-slate-900 p-8 flex items-center gap-5 border-t border-white/5 relative overflow-hidden">
               <div className="absolute inset-0 bg-primary opacity-5 animate-pulse" />
               <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0 relative z-10" />
               <p className="text-[10px] font-black text-slate-400 leading-relaxed uppercase tracking-[0.1em] relative z-10">
                  Secure Protocol: 256-bit AES identity encryption active. Access to the Vientiane Hub is restricted to verified nodes.
               </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
