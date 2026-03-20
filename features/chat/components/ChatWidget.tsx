'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useNotificationStore } from '@/stores/useNotificationStore'

export function ChatWidget() {
  const { addNotification } = useNotificationStore()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "สวัสดีค่ะ! เซร่าจาก Vientiane Nest ยินดีให้บริการค่ะ วันนี้ให้เซร่าช่วยหาที่พักในฝันให้คุณนะคะ?", sender: 'ai', time: '10:00 AM' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [chatHistory, setChatHistory] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)

  const quickReplies = [
    "ขอดูที่พักแนะนำหน่อยค่ะ",
    "ช่วยเช็คสถานะว่างของห้องล่าสุด",
    "สนใจลงประกาศที่พักค่ะ",
    "ช่วยแนะนำโรงแรมในจันทะบูลีหน่อย"
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
    setChatHistory(prev => [...prev, inputValue])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI/Manager response
    await new Promise(resolve => setTimeout(resolve, 1500))

    let aiResponse = "";
    const lowerInput = inputValue.toLowerCase();

    if (lowerInput.includes("โรงแรม")) {
      aiResponse = "ในย่านจันทะบูลี เรามี 'อพาร์ทเมนท์ทันสมัย ใกล้ประตูชัย' ที่ได้รับความนิยมมากค่ะ หรือหากคุณต้องการแบบฟูลเซอร์วิส โรงแรมริมน้ำก็น่าสนใจนะคะ ให้เซร่าส่งลิสต์ให้ไหมคะ?";
    } else if (lowerInput.includes("ราคา") || lowerInput.includes("งบ")) {
      aiResponse = "ราคาที่พักในเวียงจันทน์ช่วงนี้เริ่มต้นที่ 1.5 ล้าน กีบ ต่อเดือนค่ะ คุณมีงบประมาณที่ตั้งไว้เท่าไหร่คะ เซร่าจะได้ช่วยเลือกที่คุ้มที่สุดให้ค่ะ";
    } else if (lowerInput.includes("จอง")) {
      aiResponse = "การจองทำได้ง่ายมากค่ะ! เพียงกดปุ่ม 'จองที่พักนี้' ในหน้าข้อมูลที่พัก แล้วทำตามขั้นตอนได้เลยค่ะ ระบบจะส่งคำขอไปยังเจ้าของที่พักทันที";
    } else if (lowerInput.includes("สวัสดี") || lowerInput.includes("hi")) {
        aiResponse = "สวัสดีค่ะ! ยินดีที่ได้คุยกับคุณนะคะ วันนี้อยากให้เซร่าช่วยดูที่พักย่านไหนเป็นพิเศษไหมคะ?";
    } else {
      const responses = [
        "เป็นตัวเลือกที่ดีมากเลยค่ะ! สนใจให้เซร่านัดวันเข้าชมที่พักให้ไหมคะ?",
        "ยินดีช่วยเหลือเรื่องนี้เป็นอย่างยิ่งค่ะ คุณกำลังมองหาย่านไหนเป็นพิเศษไหมคะ?",
        "ปกติเจ้าของที่พักที่ผ่านการรับรองของเราจะตอบกลับภายใน 2 ชม. ค่ะ เดี๋ยวเซร่าแจ้งพวกเขาให้ทันทีเลยค่ะ!",
        "เดี๋ยวเซร่าเช็คสถานะว่างให้เดี๋ยวนี้เลยค่ะ รอสักครู่นะคะ"
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
        title: 'ข้อความใหม่จาก Sarah',
        message: aiResponse.length > 50 ? aiResponse.substring(0, 50) + '...' : aiResponse,
        time: 'เมื่อสักครู่',
        type: 'message'
      })
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-6 w-[360px] h-[520px] bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center overflow-hidden border border-white/10">
                        <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" alt="Sarah" fill className="object-cover" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-base leading-none">Sarah</h3>
                  <p className="text-xs text-slate-300 mt-1 flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    ผู้ช่วยส่วนตัว
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto w-full p-5 space-y-5 scroll-smooth bg-slate-50/50"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.sender === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] p-3.5 rounded-2xl text-[13px] font-medium shadow-sm leading-relaxed",
                    msg.sender === 'user'
                        ? "bg-slate-900 text-white rounded-br-sm"
                        : "bg-white text-slate-700 border border-slate-200 rounded-bl-sm"
                  )}>
                    {msg.text}
                    <p className={cn("text-[10px] mt-1.5 opacity-60", msg.sender === 'user' ? "text-slate-300 text-right" : "text-slate-500")}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-bl-sm flex gap-1.5 items-center shadow-sm">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  </div>
                </div>
              )}

              {showQuickReplies && !isTyping && (
                <div className="flex flex-col gap-2 pt-2">
                  {quickReplies.map((reply, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      onClick={() => {
                        setInputValue(reply)
                        setShowQuickReplies(false)
                      }}
                      className="text-left py-2.5 px-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
                    >
                      {reply}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2 items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="พิมพ์ข้อความ..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm font-medium focus:ring-1 focus:ring-slate-400 focus:border-slate-400 outline-none transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 bg-slate-900 text-white rounded-full hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-100 transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 relative",
          isOpen ? "bg-white text-slate-900 border border-slate-200" : "bg-slate-900 text-white"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
            <span className="absolute 0 top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
        )}
      </motion.button>
    </div>
  )
}
