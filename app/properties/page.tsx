import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { mockProperties } from '@/features/properties/services/mockData';
import { SearchX, MapPin } from 'lucide-react';
import Link from 'next/link';

// 1. กำหนด Type สำหรับ URL Search Parameters ที่ส่งมาจาก HeroSearch
interface PropertiesPageProps {
  searchParams: {
    location?: string;
    price?: string;
  };
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  // 2. ดึงค่าจาก URL
  const locationFilter = searchParams.location || '';
  const priceFilter = searchParams.price || '';

  // 3. Logic การกรองข้อมูล (Filter)
  const filteredProperties = mockProperties.filter((property) => {
    // กรองทำเลที่ตั้ง
    const matchLocation = locationFilter 
      ? property.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;

    // กรองช่วงราคา
    let matchPrice = true;
    if (priceFilter === 'under_2m') {
      matchPrice = property.pricePerMonth < 2000000;
    } else if (priceFilter === '2m_to_5m') {
      matchPrice = property.pricePerMonth >= 2000000 && property.pricePerMonth <= 5000000;
    } else if (priceFilter === 'over_5m') {
      matchPrice = property.pricePerMonth > 5000000;
    }

    return matchLocation && matchPrice;
  });

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header ของหน้าค้นหา */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              ผลการค้นหาหอพัก
            </h1>
            <p className="mt-2 text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {locationFilter 
                ? `แสดงผลในโซน: ${locationFilter}` 
                : 'แสดงผลทั้งหมดในเวียงจันทน์'}
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0 text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border">
            พบทั้งหมด <span className="text-blue-600 font-bold">{filteredProperties.length}</span> รายการ
          </div>
        </div>

        {/* 4. แสดงผลข้อมูล (แยกระหว่าง "เจอ" กับ "ไม่เจอ") */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          // Empty State: ดีไซน์เมื่อค้นหาไม่เจอข้อมูล (ช่วยลดอัตราคนกดปิดเว็บทิ้ง)
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <SearchX className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">ไม่พบหอพักที่ตรงกับเงื่อนไข</h2>
            <p className="text-gray-500 max-w-md mb-6">
              ลองเปลี่ยนทำเลที่ตั้ง หรือปรับช่วงราคาให้กว้างขึ้น เพื่อดูตัวเลือกอื่นๆ ในเวียงจันทน์
            </p>
            <Link 
              href="/properties"
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
            >
              ดูหอพักทั้งหมด
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}