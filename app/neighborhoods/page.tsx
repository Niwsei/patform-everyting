import { neighborhoods } from '@/features/properties/services/neighborhoodData';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, TrendingUp, ShieldCheck, Footprints, ChevronRight } from 'lucide-react';

export default function NeighborhoodsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Vientiane Guides</h1>
          <p className="text-slate-500 font-bold text-lg max-w-2xl mx-auto">
            เจาะลึกย่านที่น่าอยู่ที่สุดในเวียงจันทน์ เพื่อช่วยให้คุณตัดสินใจเลือกบ้านใหม่ได้ง่ายขึ้น
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {neighborhoods.map((nb) => (
            <Link
              key={nb.id}
              href={`/neighborhoods/${nb.slug}`}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-premium border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 w-full">
                <Image src={nb.images[0]} alt={nb.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-black">{nb.name}</h3>
                  <p className="text-xs font-bold opacity-80 uppercase tracking-widest mt-1">{nb.vibe}</p>
                </div>
              </div>
              <div className="p-8 space-y-6">
                 <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                       <ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                       <p className="text-[10px] font-black text-slate-400 uppercase">ความปลอดภัย</p>
                       <p className="font-bold text-slate-900">{nb.stats.safetyScore}%</p>
                    </div>
                    <div className="text-center border-x border-slate-50">
                       <Footprints className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                       <p className="text-[10px] font-black text-slate-400 uppercase">การเดินเท้า</p>
                       <p className="font-bold text-slate-900">{nb.stats.walkability}%</p>
                    </div>
                    <div className="text-center">
                       <TrendingUp className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                       <p className="text-[10px] font-black text-slate-400 uppercase">ค่าครองชีพ</p>
                       <p className="font-bold text-slate-900">$$$</p>
                    </div>
                 </div>
                 <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">สำรวจพื้นที่</span>
                    <ChevronRight className="w-4 h-4 text-indigo-600" />
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
