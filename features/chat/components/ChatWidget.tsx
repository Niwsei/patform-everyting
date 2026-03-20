'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send, User, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm Sarah from Vientiane Nest. How can I help you find your dream nest today?", sender: 'ai', time: '10:00 AM' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const newUserMsg = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, newUserMsg])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI/Manager response
    await new Promise(resolve => setTimeout(resolve, 1500))

    const responses = [
      "That's a great choice! Would you like me to schedule a viewing for you?",
      "I can definitely help with that. Are you looking for a specific neighborhood?",
      "Our verified hosts usually respond within 2 hours. I can notify them for you!",
      "I'll check the availability for you right now. One moment please."
    ]

    const aiMsg = {
      id: Date.now() + 1,
      text: responses[Math.floor(Math.random() * responses.length)],
      sender: 'ai',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, aiMsg])
    setIsTyping(false)
  }

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-6 w-[380px] h-[550px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" alt="Sarah" fill className="object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-indigo-600 rounded-full" />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-none">Sarah</h3>
                  <p className="text-[10px] font-bold text-indigo-200 mt-1 flex items-center gap-1 uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Nest Concierge
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-slate-50/50"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-3xl text-sm font-bold shadow-sm",
                    msg.sender === 'user'
                        ? "bg-indigo-600 text-white rounded-tr-none"
                        : "bg-white text-slate-900 border border-slate-100 rounded-tl-none"
                  )}>
                    {msg.text}
                    <p className={cn("text-[9px] mt-1 font-black opacity-60 uppercase tracking-widest", msg.sender === 'user' ? "text-indigo-100" : "text-slate-400")}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-tl-none flex gap-1 items-center">
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-6 bg-white border-t border-slate-50 flex gap-3 items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Sarah anything..."
                className="flex-1 bg-slate-100 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <button
                type="submit"
                className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-90"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-300 relative",
          isOpen ? "bg-slate-900 text-white rotate-90" : "bg-indigo-600 text-white"
        )}
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-4 border-white shadow-lg animate-bounce">1</span>
        )}
      </motion.button>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
