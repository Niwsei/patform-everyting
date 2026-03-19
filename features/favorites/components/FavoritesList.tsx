'use client';

import { useState, useEffect } from 'react';
import { useFavoriteStore } from '@/stores/useFavoriteStore';
import { mockProperties } from '@/features/properties/services/mockData';
import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { HeartCrack } from 'lucide-react';
import Link from 'next/link';

export function FavoritesList() {
  const savedPropertyIds = useFavoriteStore((state) => state.savedPropertyIds);
  const [isMounted, setIsMounted] = useState(false);

  // สั่งให้ Component รู้ตัวว่าตอนนี้ทำงานบนเบราว์เซอร์แล้ว
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1. ระหว่างรอโหลด (กัน Error ฝั่ง Server) ให้แสดงโครงร่างเปล่าๆ (Skeleton) หรือหน้าว่างไปก่อน
  if (!isMounted) {
    return <div className="min-h-[400px] flex items-center justify-center">กำลังโหลดข้อมูล...</div>;
  }

  // 2. กรองเฉพาะหอพักที่ผู้ใช้กดหัวใจไว้
  const favoriteProperties = mockProperties.filter((property) => 
    savedPropertyIds.includes(property.id)
  );

  // 3. ถ้าไม่มีรายการโปรดเลย (Empty State)
  if (favoriteProperties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl shadow-sm border border-dashed border-gray-300 mt-8">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <HeartCrack className="w-12 h-12 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">ยังไม่มีหอพักในรายการโปรด</h2>
        <p className="text-gray-500 max-w-md mb-6">
          กดไอคอนรูปหัวใจที่หอพักที่คุณสนใจ เพื่อบันทึกเก็บไว้เปรียบเทียบภายหลัง
        </p>
        <Link 
          href="/properties"
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
        >
          ค้นหาหอพักเลย
        </Link>
      </div>
    );
  }

  // 4. แสดงรายการหอพักที่บันทึกไว้
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {favoriteProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}