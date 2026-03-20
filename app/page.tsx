import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { mockProperties } from '@/features/properties/services/mockData';
import { HeroSearch } from '@/features/search/components/HeroSearch';
import { Truck, Shield, Zap, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Search */}
      <HeroSearch />
      
      {/* 2. Feature Section for Startups */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-3">ทำไมต้อง Vientiane Nest?</h2>
            <p className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              ระบบนิเวศเพื่อการอยู่อาศัยที่ทันสมัย
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">ค้นหาที่พักรวดเร็ว</h3>
              <p className="text-gray-600 leading-relaxed">
                ค้นหาที่พักหรือบริการที่เหมาะสมที่สุดในเวลาเพียงไม่กี่นาที ด้วยระบบการค้นหาพื้นที่ที่ชาญฉลาด
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">บริการขนย้ายและโลจิสติกส์</h3>
              <p className="text-gray-600 leading-relaxed">
                เรามีมากกว่าแค่ห้องพัก เราเชื่อมต่อคุณกับบริการขนย้ายและจัดส่งที่ผ่านการตรวจสอบทั่วเวียงจันทน์
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">รายการที่ผ่านการตรวจสอบ</h3>
              <p className="text-gray-600 leading-relaxed">
                ผู้ให้เช่าและผู้ให้บริการทุกรายบนแพลตฟอร์มของเราต้องผ่านกระบวนการตรวจสอบที่เข้มงวด
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ส่วนแสดงรายการแนะนำ */}
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">กำลังเป็นที่นิยม</span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900">อสังหาริมทรัพย์แนะนำ</h2>
            <p className="mt-4 text-lg text-gray-600">ที่พักที่คัดสรรมาเพื่อคุณในโซนที่น่าสนใจที่สุดของเวียงจันทน์</p>
          </div>
          <a href="/properties" className="hidden sm:flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
            ดูทั้งหมด <span className="text-2xl leading-none">&rarr;</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {/* ปุ่มดูทั้งหมดสำหรับมือถือ */}
        <div className="mt-12 sm:hidden text-center">
          <a href="/properties" className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold w-full shadow-lg shadow-indigo-200">
            ดูอสังหาริมทรัพย์ทั้งหมด
          </a>
        </div>
      </div>

      {/* 4. CTA for Landlords/Services */}
      <section className="bg-indigo-900 py-24">
        <div className="max-w-5_l mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-8">
            คุณมีห้องว่างหรือบริการขนส่งหรือไม่?
          </h2>
          <p className="text-xl text-indigo-100 mb-12 opacity-80">
            เข้าร่วมเครือข่ายการเช่าและโลจิสติกส์ที่เติบโตเร็วที่สุดในเวียงจันทน์
            ให้ลูกค้าหลายพันคนเห็นบริการของคุณทุกวัน
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-colors">
              ลงประกาศที่พักของคุณ
            </button>
            <button className="bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-600 transition-colors border border-indigo-500/30">
              เข้าร่วมเป็นพาร์ทเนอร์
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}