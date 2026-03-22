'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send, ShieldCheck, Zap, Globe, Lock, Cpu, Sparkles, Activity, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useNotificationStore } from '@/stores/useNotificationStore'

export function ChatWidget() {
  const { addNotification } = useNotificationStore()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Protocol sequence initiated. Sarah v4.2 online. How can I assist with your Vientiane deployment today?", sender: 'ai', time: '10:00 AM' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)

  const quickReplies = [
    "Identify High-Yield Hotzones",
    "Audit Deployment Availability",
    "Initiate Partner Onboarding",
    "Sync Multi-Stack Logistics"
  ]
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

    await new Promise(resolve => setTimeout(resolve, 1500))

    let aiResponse = "";
    const lowerInput = inputValue.toLowerCase();

    if (lowerInput.includes("hotzone") || lowerInput.includes("yield")) {
      aiResponse = "Neural analysis identifies Sisattanak and Chanthabouly as peak demand zones. Average ROI delta is currently +12.4% for serviced suites.";
    } else if (lowerInput.includes("price") || lowerInput.includes("budget")) {
      aiResponse = "Market pricing starts at 1.5M LAK for baseline assets. Premium units in hotzones are averaging 6.5M LAK. Should I sync specific filters?";
    } else if (lowerInput.includes("onboarding") || lowerInput.includes("partner")) {
      aiResponse = "Partner protocol initiated. You can start asset ingestion via the /onboarding portal. KYC verification latency is currently 24hrs.";
    } else {
      const responses = [
        "Analyzing registry for optimal matches. One moment.",
        "Query received. Syncing with local entity leads for real-time status.",
        "Asset performance in that district is currently stable. Would you like a deep audit?",
        "Protocol confirmed. I am notifying the relevant relocation concierge."
      ]
      aiResponse = responses[Math.floor(Math.random() * responses.length)];
    }

    const aiMsg = {
      id: Date.now() + 1,
      text: aiResponse,
      sender: 'ai',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, aiMsg])
    setIsTyping(false)

    if (!isOpen) {
      addNotification({
        title: 'Neural Update: Sarah',
        message: aiResponse,
        time: 'Just now',
        type: 'message'
      })
    }
  }

  return (
    <div className="fixed bottom-10 right-10 z-[500]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="mb-8 w-[400px] h-[650px] bg-white dark:bg-slate-900 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/10 flex flex-col overflow-hidden"
          >
            {/* Protocol Header */}
            <div className="bg-slate-900 p-8 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              <div className="flex items-center gap-5 relative z-10">
                <div className="relative">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center overflow-hidden border border-white/20 shadow-glow">
                        <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" alt="Sarah" fill className="object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full shadow-glow" />
                </div>
                <div>
                  <h3 className="font-black text-lg tracking-tight leading-none mb-1">Sarah Protocol</h3>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Alpha Concierge</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-white relative z-10">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Matrix Status Bar */}
            <div className="bg-slate-50 dark:bg-slate-800/50 px-8 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <Activity className="w-4 h-4 text-primary" />
                   <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">Latency: 12ms</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg">
                   <span className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                   <span className="text-[8px] font-black text-primary uppercase tracking-widest">Neural Link Active</span>
                </div>
            </div>

            {/* Chat Domain */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto w-full p-8 space-y-8 scroll-smooth bg-slate-50/20 dark:bg-transparent scrollbar-hide"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={cn(
                    "max-w-[85%] p-6 rounded-[2rem] text-sm font-bold shadow-premium leading-relaxed relative",
                    msg.sender === 'user'
                        ? "bg-primary text-white rounded-br-none shadow-glow"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-none"
                  )}>
                    {msg.text}
                    <div className={cn("flex items-center gap-2 mt-4 opacity-50", msg.sender === 'user' ? "text-white" : "text-slate-400")}>
                      <Clock className="w-3 h-3" />
                      <p className="text-[9px] font-black uppercase tracking-widest">{msg.time}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 rounded-[1.5rem] rounded-bl-none flex gap-2 items-center shadow-sm">
                    {[0, 1, 2].map(i => (
                       <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full shadow-glow" />
                    ))}
                  </div>
                </div>
              )}

              {showQuickReplies && !isTyping && (
                <div className="flex flex-col gap-3 pt-4">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1">Inference Shortcuts</p>
                  {quickReplies.map((reply, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      onClick={() => {
                        setInputValue(reply)
                        setShowQuickReplies(false)
                      }}
                      className="text-left py-4 px-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-glow"
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Terminal */}
            <div className="p-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <form onSubmit={handleSend} className="flex gap-4 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Transmit protocol inquiry..."
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
                  className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center hover:brightness-110 disabled:opacity-30 transition-all shadow-glow"
                >
                  <Send className="w-6 h-6 stroke-[2.5]" />
                </motion.button>
              </form>
              <div className="mt-4 flex items-center justify-center gap-2 opacity-30">
                <Globe className="w-3 h-3" />
                <span className="text-[8px] font-black uppercase tracking-[0.4em]">Encrypted Domain: Sarah-VN-4.2</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={!isOpen ? {
           y: [0, -12, 0],
           transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
        } : {}}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500 relative group overflow-hidden",
          isOpen ? "bg-slate-900 text-white border-2 border-white/10" : "bg-primary text-white shadow-glow"
        )}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X className="w-7 h-7 stroke-[2.5]" /> : <MessageSquare className="w-7 h-7 stroke-[2.5]" />}
        {!isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-glow"
            />
        )}
      </motion.button>
    </div>
  )
}
