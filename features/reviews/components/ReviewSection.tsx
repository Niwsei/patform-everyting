'use client'

import { useState } from 'react'
import { Star, Camera, CheckCircle2, MessageSquare, ThumbsUp, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
  photos?: string[]
  isVerifiedStay: boolean
}

const mockReviews: Review[] = [
  {
    id: 'rev-1',
    userName: 'Somsak K.',
    rating: 5,
    comment: 'ห้องพักสะอาดมากครับ ตรงปกสุดๆ เจ้าของที่พักดูแลดีมาก แนะนำเลยสำหรับใครที่จะมาย่านจันทะบูลี',
    date: '10 ต.ค. 2023',
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400&auto=format&fit=crop'
    ],
    isVerifiedStay: true
  },
  {
    id: 'rev-2',
    userName: 'Maria Garcia',
    rating: 4,
    comment: 'Great location and very responsive host. The WiFi was fast enough for my work.',
    date: '02 ต.ค. 2023',
    isVerifiedStay: true
  }
]

export function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [showForm, setShowForm] = useState(false)

  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
             รีวิวจากผู้เข้าพักจริง
             <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{reviews.length} รีวิว</span>
           </h2>
           <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Verified Community Reviews</p>
        </div>
        <button
           onClick={() => setShowForm(!showForm)}
           className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all active:scale-95"
        >
          {showForm ? 'ยกเลิก' : 'เขียนรีวิว'}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6"
          >
             <div className="flex items-center gap-4">
                <div className="flex gap-1">
                   {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="w-6 h-6 text-slate-300 hover:text-amber-400 cursor-pointer transition-colors" />
                   ))}
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">ให้คะแนนที่พักนี้</span>
             </div>

             <textarea
               placeholder="แชร์ประสบการณ์การเข้าพักของคุณที่นี่..."
               rows={4}
               className="w-full p-6 bg-white border border-slate-200 rounded-[2rem] font-bold text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
             />

             <div className="flex flex-wrap gap-4">
                <div className="w-24 h-24 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-white hover:border-indigo-300 transition-all cursor-pointer group">
                   <Camera className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                   <span className="text-[9px] font-black text-slate-400 uppercase">อัปโหลดรูป</span>
                </div>
             </div>

             <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-100">
                ส่งรีวิว
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
          >
             <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 text-lg">
                      {review.userName[0]}
                   </div>
                   <div>
                      <h4 className="font-black text-slate-900">{review.userName}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{review.date}</p>
                   </div>
                </div>
                {review.isVerifiedStay && (
                   <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Verified Stay</span>
                   </div>
                )}
             </div>

             <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                   <Star key={i} className={cn("w-4 h-4", i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200")} />
                ))}
             </div>

             <p className="text-slate-600 font-medium leading-relaxed mb-6">
                "{review.comment}"
             </p>

             {review.photos && (
                <div className="flex gap-3 mb-6">
                   {review.photos.map((photo, i) => (
                      <div key={i} className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-sm hover:scale-110 transition-transform cursor-zoom-in">
                         <Image src={photo} alt="Review" fill className="object-cover" />
                      </div>
                   ))}
                </div>
             )}

             <div className="flex items-center gap-6 pt-6 border-t border-slate-50">
                <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">
                   <ThumbsUp className="w-4 h-4" />
                   มีประโยชน์ (12)
                </button>
                <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">
                   <MessageSquare className="w-4 h-4" />
                   ตอบกลับ
                </button>
             </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
