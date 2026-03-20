'use client'

import { ServiceProvider } from '../types'
import { Star, ShieldCheck, ArrowRight, Truck, Package, Box } from 'lucide-react'

interface ServiceCardProps {
  provider: ServiceProvider
}

export function ServiceCard({ provider }: ServiceCardProps) {
  const Icon = provider.category === 'moving' ? Truck : provider.category === 'delivery' ? Package : Box

  return (
    <div className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500">
      <div className="flex items-start justify-between mb-8">
        <div className="relative w-20 h-20 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
          <img src={provider.logo} alt={provider.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col items-end">
          {provider.isVerified && (
            <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 mb-2 uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" />
              พาร์ทเนอร์ที่ผ่านการรับรอง
            </div>
          )}
          <div className="flex items-center gap-1 text-amber-500 font-black">
            <Star className="w-4 h-4 fill-amber-500" />
            {provider.rating}
            <span className="text-xs font-bold text-gray-400">({provider.reviewCount})</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
          <Icon className="w-3 h-3" />
          บริการ {provider.category === 'moving' ? 'ขนย้าย' : provider.category === 'delivery' ? 'จัดส่ง' : 'คลังสินค้า'}
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
          {provider.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed font-medium">
          {provider.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {provider.features.map(feature => (
          <span key={feature} className="text-[10px] font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl">
            {feature}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-gray-50">
        <div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">เริ่มต้นที่</span>
          <span className="text-xl font-black text-indigo-600">
            {provider.basePrice.toLocaleString()} <span className="text-xs font-normal">กีบ</span>
          </span>
        </div>
        <button className="bg-gray-900 text-white p-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all hover:translate-x-1 shadow-lg shadow-gray-100">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
