'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, ShieldCheck, MoreHorizontal, Info, Phone, Zap, Globe, Lock, Cpu, Clock } from 'lucide-react'
import { useChatStore } from '@/stores/useChatStore'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface DirectChatProps {
  hostName: string
  hostAvatar: string
  propertyTitle: string
}

export function DirectChat({ hostName, hostAvatar, propertyTitle }: DirectChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const { sessions, getOrCreateSession, addMessage } = useChatStore()
  const scrollRef = useRef<HTMLDivElement>(null)

  const sessionId = getOrCreateSession(hostName, hostAvatar, propertyTitle)
  const session = sessions.find(s => s.id === sessionId)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [session?.messages, isOpen])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    addMessage(sessionId, { text: inputValue, sender: 'user' })
    setInputValue('')

    setTimeout(() => {
       const replies = [
          "Protocol update: I am verifying availability for your requested window.",
          "Confirmed. The asset rate includes high-speed fiber and utility sync.",
          "The deployment is ready for occupancy on the 1st of next month. Would you like to execute a physical audit?",
          "All visuals are neural-verified. The asset matches the manifest 100%."
       ]
       addMessage(sessionId, { text: replies[Math.floor(Math.random() * replies.length)], sender: 'host' })
    }, 1500)
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full py-5 bg-slate-900 dark:bg-slate-800 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary transition-all flex items-center justify-center gap-3 shadow-premium"
      >
        <MessageSquare className="w-4 h-4 stroke-[2.5]" />
        Initialize Comms with Host
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[300] flex items-end md:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.9, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 100, opacity: 0 }}
              className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col h-[85vh] md:h-[650px] border border-white/10"
            >
              {/* Protocol Header */}
              <div className="bg-slate-900 p-8 text-white flex items-center justify-between border-b border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                <div className="flex items-center gap-4 relative z-10">
                   <div className="relative">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary shadow-glow">
                         <Image src={hostAvatar} alt={hostName} fill className="object-cover" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-glow" />
                   </div>
                   <div>
                      <h3 className="font-black text-lg tracking-tight leading-none mb-1">{hostName}</h3>
                      <div className="flex items-center gap-2">
                         <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Verified Entity Lead</p>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-3 relative z-10">
                   <button className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"><Phone className="w-5 h-5 text-slate-400" /></button>
                   <button onClick={() => setIsOpen(false)} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"><X className="w-5 h-5" /></button>
                </div>
              </div>

              {/* Inquiry Identity */}
              <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-primary" />
                    <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] truncate max-w-[240px]">Protocol Ref: {propertyTitle}</p>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">Secure Sync</span>
                 </div>
              </div>

              {/* Chat Matrix */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth bg-slate-50/20 dark:bg-transparent scrollbar-hide"
              >
                 {session?.messages.map((msg) => (
                    <div key={msg.id} className={cn("flex", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                       <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={cn(
                          "max-w-[85%] p-6 rounded-[2rem] text-sm font-bold shadow-premium leading-relaxed relative group",
                          msg.sender === 'user'
                             ? "bg-primary text-white rounded-br-none"
                             : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-none"
                       )}>
                          {msg.text}
                          <div className={cn(
                             "flex items-center gap-2 mt-4 opacity-50",
                             msg.sender === 'user' ? "text-white" : "text-slate-400"
                          )}>
                             <Clock className="w-3 h-3" />
                             <p className="text-[9px] font-black uppercase tracking-widest">{msg.time}</p>
                          </div>
                       </motion.div>
                    </div>
                 ))}
              </div>

              {/* Input Terminal */}
              <div className="p-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                 <form onSubmit={handleSend} className="flex gap-4 items-center">
                    <div className="flex-1 relative">
                       <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Transmit message to host..."
                          className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-[1.5rem] px-8 py-5 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white placeholder:text-slate-400 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-widest"
                       />
                       <div className="absolute right-6 top-1/2 -translate-y-1/2">
                          <Lock className="w-4 h-4 text-slate-300" />
                       </div>
                    </div>
                    <motion.button
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       type="submit"
                       disabled={!inputValue.trim()}
                       className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center hover:brightness-110 transition-all shadow-glow disabled:opacity-30 disabled:grayscale"
                    >
                       <Send className="w-6 h-6 stroke-[2.5]" />
                    </motion.button>
                 </form>
                 <div className="mt-4 flex items-center justify-center gap-2 opacity-30">
                    <Globe className="w-3 h-3" />
                    <span className="text-[8px] font-black uppercase tracking-[0.4em]">Encrypted Protocol Stack v4.2</span>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
