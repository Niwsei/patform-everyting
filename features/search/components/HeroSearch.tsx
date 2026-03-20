'use client'

import { Search, MapPin  } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"


export function HeroSearch() {
    const router = useRouter()
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('')


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if(location) params.append('location', location)
            if(priceRange) params.append('price', priceRange)

                router.push(`/properties?${params.toString()}`)
    }

    return (
    <div className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 overflow-hidden">
      {/* พื้นหลังภาพ (สมมติว่าเป็นวิวเมืองเวียงจันทน์) */}
      <div className="absolute inset-0 z-0 scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite]">
        <img 
          src="https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=2000&auto=format&fit=crop" 
          alt="Vientiane City" 
          className="w-full h-full object-cover brightness-[0.4]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-sm font-bold mb-8 shadow-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          แพลตฟอร์มอสังหาฯ และโลจิสติกส์อันดับ 1 ในเวียงจันทน์
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 drop-shadow-2xl">
          ค้นพบ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
            ที่พักใหม่ในเวียงจันทน์
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300 mb-12 drop-shadow-md max-w-2xl mx-auto font-medium">
          ไม่ว่าจะเป็นบ้าน คอนโด หรือบริการขนย้าย — เราพร้อมดูแลคุณทุกขั้นตอน
        </p>

        {/* กล่องค้นหา (Search Box) แบบลอยตัว */}
        <form 
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-xl p-3 rounded-3xl sm:rounded-full shadow-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-2 border border-white/20"
        >
          {/* ช่องทำเลที่ตั้ง */}
          <div className="flex-1 w-full flex items-center px-6 py-3 border-b sm:border-b-0 sm:border-r border-gray-100 group transition-all">
            <MapPin className="w-6 h-6 text-indigo-500 mr-4 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col text-left w-full">
              <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">ทำเลที่ตั้ง</label>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-gray-900 font-bold outline-none text-base cursor-pointer appearance-none"
              >
                <option value="">ทุกเขตพื้นที่</option>
                <option value="Chanthabouly">จันทะบูลี</option>
                <option value="Sikhottabong">สีโคดตะบอง</option>
                <option value="Xaysetha">ไซเศรษฐา</option>
                <option value="Sisattanak">สีสัตตนาค</option>
              </select>
            </div>
          </div>

          {/* ช่องช่วงราคา */}
          <div className="flex-1 w-full flex items-center px-6 py-3 group transition-all">
            <span className="w-6 h-6 text-indigo-500 mr-4 font-black flex items-center justify-center text-lg group-hover:scale-110 transition-transform">₭</span>
            <div className="flex flex-col text-left w-full">
              <label className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">งบประมาณ (ต่อเดือน)</label>
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-transparent text-gray-900 font-bold outline-none text-base cursor-pointer appearance-none"
              >
                <option value="">ไม่จำกัดงบประมาณ</option>
                <option value="under_2m">ต่ำกว่า 2 ล้าน กีบ</option>
                <option value="2m_to_5m">2 - 5 ล้าน กีบ</option>
                <option value="over_5m">มากกว่า 5 ล้าน กีบ</option>
              </select>
            </div>
          </div>

          {/* ปุ่มค้นหา */}
          <button 
            type="submit"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-2xl sm:rounded-full flex items-center justify-center gap-3 transition-all font-bold shadow-lg shadow-indigo-200 active:scale-95"
          >
            <Search className="w-6 h-6" />
            <span>ค้นหาเลย</span>
          </button>
        </form>
      </div>
    </div>
  );
}