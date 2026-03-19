import { FavoritesList } from '@/features/favorites/components/FavoritesList';

export default function FavoritesPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="border-b pb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            รายการโปรดของคุณ
          </h1>
          <p className="mt-2 text-gray-600">
            หอพักและคอนโดที่คุณเล็งไว้ในเวียงจันทน์ จะถูกเก็บไว้อย่างปลอดภัยที่นี่
          </p>
        </div>

        {/* เรียกใช้ Client Component เพื่อแสดงข้อมูล */}
        <FavoritesList />

      </div>
    </main>
  );
}