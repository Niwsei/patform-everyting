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
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* พื้นหลังภาพ (สมมติว่าเป็นวิวเมืองเวียงจันทน์) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1540611025311-01df3cef54b5?q=80&w=2000&auto=format&fit=crop" 
          alt="Vientiane City" 
          className="w-full h-full object-cover brightness-50"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
          ค้นหาพื้นที่พักพิงของคุณ ในเวียงจันทน์
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-10 drop-shadow-md">
          หอพัก คอนโด และบ้านเช่ากว่า 1,000 แห่ง รอให้คุณค้นพบ
        </p>

        {/* กล่องค้นหา (Search Box) แบบลอยตัว */}
        <form 
          onSubmit={handleSearch}
          className="bg-white p-2 sm:p-4 rounded-full sm:rounded-full shadow-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-4"
        >
          {/* ช่องทำเลที่ตั้ง */}
          <div className="flex-1 w-full flex items-center px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-200">
            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
            <div className="flex flex-col text-left w-full">
              <label className="text-xs font-bold text-gray-900">ทำเลที่ตั้ง</label>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-gray-600 outline-none text-sm cursor-pointer appearance-none"
              >
                <option value="">ทุกโซนในเวียงจันทน์</option>
                <option value="Chanthabouly">จันทะบูลี (Chanthabouly)</option>
                <option value="Sikhottabong">สีโคดตะบอง (Sikhottabong)</option>
                <option value="Xaysetha">ไซเสดถา (Xaysetha)</option>
                <option value="Sisattanak">สีสัดตะนาก (Sisattanak)</option>
              </select>
            </div>
          </div>

          {/* ช่องช่วงราคา */}
          <div className="flex-1 w-full flex items-center px-4 py-2">
            <span className="w-5 h-5 text-gray-400 mr-3 font-bold">₭</span>
            <div className="flex flex-col text-left w-full">
              <label className="text-xs font-bold text-gray-900">ช่วงราคา (ต่อเดือน)</label>
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-transparent text-gray-600 outline-none text-sm cursor-pointer appearance-none"
              >
                <option value="">ทุกระดับราคา</option>
                <option value="under_2m">ต่ำกว่า 2,000,000 กีบ</option>
                <option value="2m_to_5m">2,000,000 - 5,000,000 กีบ</option>
                <option value="over_5m">มากกว่า 5,000,000 กีบ</option>
              </select>
            </div>
          </div>

          {/* ปุ่มค้นหา */}
          <button 
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full flex items-center justify-center gap-2 transition-colors font-bold"
          >
            <Search className="w-5 h-5" />
            <span className="sm:hidden">ค้นหาเลย</span>
          </button>
        </form>
      </div>
    </div>
  );
}