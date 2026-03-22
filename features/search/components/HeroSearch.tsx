'use client'

import { Search, MapPin  } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguageStore } from "@/stores/useLanguageStore"
import { translations } from "@/lib/translations"

export function HeroSearch() {
    const { language } = useLanguageStore()
    const t = translations[language]
    const router = useRouter()
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('')
    const [category, setCategory] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if(location) params.append('location', location)
        if(priceRange) params.append('price', priceRange)
        if(category) params.append('category', category)

        router.push(`/properties?${params.toString()}`)
    }

    return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Image - Clean, High Quality, Natural Lighting */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop" 
          alt="Premium Real Estate" 
          className="w-full h-full object-cover brightness-[0.65]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30 text-white text-sm font-medium mb-8 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          {language === 'EN' ? 'The best real estate and logistics platform in Vientiane' : language === 'LO' ? 'ແພລດຟອມອະສັງຫາຯ ແລະ ໂລຈິສຕິກທີ່ດີທີ່ສຸດໃນວຽງຈັນ' : 'แพลตฟอร์มอสังหาฯ และโลจิสติกส์ที่ดีที่สุดในเวียงจันทน์'}
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-sm">
          {t.heroTitle.split(' ใน')[0]} <br />
          <span className="text-white">
            {language === 'EN' ? 'in Vientiane' : 'ในเวียงจันทน์'}
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-200 mb-12 drop-shadow-sm max-w-2xl mx-auto font-medium">
          {t.heroSub}
        </p>

        {/* Search Box - Airbnb Style (Clean, White, Standard Shadows) */}
        <form 
          onSubmit={handleSearch}
          className="bg-white p-2 rounded-3xl sm:rounded-full shadow-lg max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-2 border border-slate-100"
        >
          {/* Location */}
          <div className="flex-1 w-full flex items-center px-6 py-3 border-b sm:border-b-0 sm:border-r border-slate-100 transition-colors hover:bg-slate-50 rounded-t-2xl sm:rounded-l-full sm:rounded-tr-none cursor-pointer">
            <div className="flex flex-col text-left w-full">
              <label htmlFor="location-select" className="text-xs font-semibold text-slate-800 mb-0.5 cursor-pointer">{t.location}</label>
              <select 
                id="location-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-slate-500 outline-none text-sm cursor-pointer appearance-none"
              >
                <option value="">{t.searchPlaceholder}</option>
                <option value="Chanthabouly">{language === 'EN' ? 'Chanthabouly' : language === 'LO' ? 'ຈັນທະບູລີ' : 'จันทะบูลี'}</option>
                <option value="Sikhottabong">{language === 'EN' ? 'Sikhottabong' : language === 'LO' ? 'ສີໂຄດຕະບອງ' : 'สีโคดตะบอง'}</option>
                <option value="Xaysetha">{language === 'EN' ? 'Xaysetha' : language === 'LO' ? 'ໄຊເສດຖາ' : 'ไซเศรษฐา'}</option>
                <option value="Sisattanak">{language === 'EN' ? 'Sisattanak' : language === 'LO' ? 'ສີສັດຕະນາກ' : 'สีสัตตนาค'}</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div className="flex-1 w-full flex items-center px-6 py-3 border-b sm:border-b-0 sm:border-r border-slate-100 transition-colors hover:bg-slate-50 cursor-pointer">
            <div className="flex flex-col text-left w-full">
              <label htmlFor="category-select" className="text-xs font-semibold text-slate-800 mb-0.5 cursor-pointer">{language === 'EN' ? 'CATEGORY' : language === 'LO' ? 'ປະເພດທີ່ພັກ' : 'ประเภทที่พัก'}</label>
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-slate-500 outline-none text-sm cursor-pointer appearance-none"
              >
                <option value="">{t.allCategories}</option>
                <option value="hotel">{language === 'EN' ? 'Hotel' : language === 'LO' ? 'ໂຮງແຮມ' : 'โรงแรม'}</option>
                <option value="guesthouse">{language === 'EN' ? 'Guesthouse' : language === 'LO' ? 'ເກສເຮົ້າສ໌' : 'เกสต์เฮ้าส์'}</option>
                <option value="vacation_home">{language === 'EN' ? 'Vacation Home' : language === 'LO' ? 'ເຮືອນພັກ' : 'บ้านพักตากอากาศ'}</option>
                <option value="apartment">{language === 'EN' ? 'Apartment' : language === 'LO' ? 'ອາພາດເມັນ' : 'อพาร์ทเมนท์'}</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="flex-1 w-full flex items-center px-6 py-3 hover:bg-slate-50 transition-colors sm:rounded-r-full cursor-pointer">
            <div className="flex flex-col text-left w-full">
              <label htmlFor="price-select" className="text-xs font-semibold text-slate-800 mb-0.5 cursor-pointer">{language === 'EN' ? 'BUDGET' : language === 'LO' ? 'ງົບປະມານ' : 'งบประมาณ'}</label>
              <select 
                id="price-select"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-transparent text-slate-500 outline-none text-sm cursor-pointer appearance-none"
              >
                <option value="">{t.unlimitedPrice}</option>
                <option value="under_2m">{language === 'EN' ? 'Under 2M LAK' : language === 'LO' ? 'ຕ່ຳກວ່າ 2 ລ້ານ ກີບ' : 'ต่ำกว่า 2 ล้าน กีบ'}</option>
                <option value="2m_to_5m">{language === 'EN' ? '2M - 5M LAK' : language === 'LO' ? '2 - 5 ລ້ານ ກີບ' : '2 - 5 ล้าน กีบ'}</option>
                <option value="over_5m">{language === 'EN' ? 'Over 5M LAK' : language === 'LO' ? 'ຫຼາຍກວ່າ 5 ລ້ານ ກີບ' : 'มากกว่า 5 ล้าน กีบ'}</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button 
            type="submit"
            className="w-full sm:w-auto bg-[#ff385c] hover:bg-[#d90b3e] text-white px-8 py-4 rounded-2xl sm:rounded-full flex items-center justify-center gap-2 transition-all font-semibold shadow-md active:scale-95 m-1"
          >
            <Search className="w-5 h-5" />
            <span className="sm:hidden">{t.searchBtn}</span>
          </button>
        </form>
      </div>
    </div>
  );
}