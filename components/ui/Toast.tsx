'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  // Expose a global method to add toasts
  useEffect(() => {
    (window as any).addToast = (message: string, type: ToastType = 'success') => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts(prev => [...prev, { id, message, type }])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 5000)
    }
  }, [])

  return (
    <div className="fixed top-24 right-6 z-[300] pointer-events-none flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto"
          >
            <div className={cn(
              "flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border min-w-[300px]",
              toast.type === 'success' ? "bg-white border-emerald-100" :
              toast.type === 'error' ? "bg-white border-red-100" : "bg-white border-indigo-100"
            )}>
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                toast.type === 'success' ? "bg-emerald-50 text-emerald-600" :
                toast.type === 'error' ? "bg-red-50 text-red-600" : "bg-indigo-50 text-indigo-600"
              )}>
                {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> :
                 toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-slate-900 leading-tight">{toast.message}</p>
              </div>
              <button
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="p-1 hover:bg-slate-50 rounded-lg transition-colors text-slate-300 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
