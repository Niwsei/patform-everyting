'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, ShieldCheck, MoreHorizontal, Info, Phone } from 'lucide-react'
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

    // Auto-reply simulation
    setTimeout(() => {
       const replies = [
          "เดี๋ยวผมเช็คคิววันเข้าชมห้องให้นะครับ",
          "ขอบคุณที่สนใจครับ ราคานี้รวมค่าน้ำไฟตามมิเตอร์หลวงครับ",
          "ห้องนี้ว่างพร้อมเข้าอยู่วันที่ 1 พฤศจิกายนครับ สนใจนัดดูสถานที่จริงไหมครับ?",
          "ยินดีครับ ห้องจริงตกแต่งตามรูปทุกประการครับ"
       ]
       addMessage(sessionId, { text: replies[Math.floor(Math.random() * replies.length)], sender: 'host' })
    }, 1500)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 border-2 border-slate-900 dark:border-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
      >
        <MessageSquare className="w-4 h-4" />
        แชทกับเจ้าของที่พัก
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[250] flex items-end md:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 50, opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[80vh] md:h-[600px]"
            >
              {/* Header */}
              <div className="bg-slate-900 p-6 text-white flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                   <div className="relative">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/20">
                         <Image src={hostAvatar} alt={hostName} fill className="object-cover" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                   </div>
                   <div>
                      <h3 className="font-black text-sm">{hostName}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                         <ShieldCheck className="w-3 h-3 text-emerald-400" />
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Host</p>
                      </div>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <button className="p-2 hover:bg-white/10 rounded-xl transition-colors"><Phone className="w-5 h-5 text-slate-400" /></button>
                   <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><X className="w-5 h-5" /></button>
                </div>
              </div>

              {/* Property Snapshot */}
              <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[200px]">Inquiry: {propertyTitle}</p>
                 <Info className="w-3.5 h-3.5 text-indigo-500" />
              </div>

              {/* Chat Body */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-slate-50/20"
              >
                 {session?.messages.map((msg) => (
                    <div key={msg.id} className={cn("flex", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                       <div className={cn(
                          "max-w-[85%] p-4 rounded-3xl text-sm font-medium shadow-sm",
                          msg.sender === 'user'
                             ? "bg-indigo-600 text-white rounded-br-none"
                             : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-none"
                       )}>
                          {msg.text}
                          <p className={cn("text-[9px] mt-2 font-black uppercase opacity-60", msg.sender === 'user' ? "text-indigo-100" : "text-slate-400")}>
                             {msg.time}
                          </p>
                       </div>
                    </div>
                 ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                 <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="พิมพ์ข้อความที่นี่..."
                    className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl px-5 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                 />
                 <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="p-3.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none disabled:opacity-50"
                 >
                    <Send className="w-5 h-5" />
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
