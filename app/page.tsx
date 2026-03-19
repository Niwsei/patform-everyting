import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { mockProperties } from '@/features/properties/services/mockData';
import { HeroSearch } from '@/features/search/components/HeroSearch';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 1. ใส่ Hero Search ไว้บนสุด */}
      <HeroSearch />
      
      {/* 2. ส่วนแสดงรายการแนะนำ */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">หอพักแนะนำสำหรับคุณ</h2>
            <p className="mt-2 text-gray-600">อัปเดตล่าสุดจากทั่วเมืองเวียงจันทน์</p>
          </div>
          <a href="/properties" className="hidden sm:block text-blue-600 font-medium hover:underline">
            ดูทั้งหมด &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {/* ปุ่มดูทั้งหมดสำหรับมือถือ */}
        <div className="mt-8 sm:hidden text-center">
          <a href="/properties" className="inline-block px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium w-full">
            ดูรายการทั้งหมด
          </a>
        </div>
      </div>
    </main>
  );
}