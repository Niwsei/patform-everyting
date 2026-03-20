'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react'
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

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    login(email)
    setIsLoading(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            {/* Header with gradient branding */}
            <div className="bg-indigo-600 p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
               <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                    <User className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-black leading-tight">
                    {mode === 'login' ? 'ยินดีต้อนรับกลับค่ะ!' : 'เริ่มเดินทางกับเราวันนี้'}
                  </h2>
                  <p className="text-indigo-100 text-sm font-medium opacity-80">
                    {mode === 'login' ? 'เข้าสู่ระบบเพื่อจัดการที่พักของคุณ' : 'สมัครสมาชิกเพื่อหาที่พักที่ใช่ในเวียงจันทน์'}
                  </p>
               </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ที่อยู่อีเมล</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">รหัสผ่าน</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>

                {mode === 'login' && (
                  <div className="text-right">
                    <button type="button" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">
                      ลืมรหัสผ่าน?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-slate-200 disabled:opacity-80 active:scale-95 flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>{mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}</>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                <p className="text-slate-500 text-xs font-bold">
                  {mode === 'login' ? 'ยังไม่มีบัญชีผู้ใช้?' : 'มีบัญชีผู้ใช้แล้ว?'}
                  <button
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    className="ml-2 text-indigo-600 font-black uppercase tracking-widest hover:underline"
                  >
                    {mode === 'login' ? 'สมัครเลย' : 'เข้าสู่ระบบ'}
                  </button>
                </p>
              </div>

              {/* Social Login simulation */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                 <button className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-100 rounded-xl text-xs font-black hover:bg-slate-50 transition-colors">
                    Google
                 </button>
                 <button className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-100 rounded-xl text-xs font-black hover:bg-slate-50 transition-colors">
                    Facebook
                 </button>
              </div>
            </div>

            <div className="bg-slate-50 p-6 flex items-center gap-3 border-t border-slate-100">
               <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
               <p className="text-[10px] font-bold text-slate-500 leading-tight uppercase tracking-widest">
                  เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ ข้อมูลของคุณจะถูกเข้ารหัสและรักษาความปลอดภัยสูงสุด
               </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
