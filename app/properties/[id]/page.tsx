import { mockProperties } from "@/features/properties/services/mockData";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FavoriteButton } from "@/features/properties/components/FavoriteButton";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/properties" className="text-blue-600 hover:underline mb-6 inline-block font-medium">
        ← กลับไปยังรายการที่พัก
      </Link>
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="relative h-[400px] w-full">
          <Image
            src={property.images[0] || '/placeholder-home.jpg'}
            alt={property.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute top-6 right-6">
            <FavoriteButton propertyId={property.id} />
          </div>
        </div>
        
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">{property.title}</h1>
              <div className="flex items-center mt-3 text-gray-500">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="text-lg">{property.location}</span>
              </div>
            </div>
            
            <div className="bg-blue-50 px-8 py-6 rounded-2xl border border-blue-100 text-center md:text-left min-w-[200px]">
              <p className="text-blue-600 font-black text-3xl">
                ₭{property.pricePerMonth.toLocaleString()}
              </p>
              <p className="text-blue-400 font-medium">ต่อเดือน</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-gray-100 pt-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">รายละเอียดที่พัก</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{property.description}</p>
              
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">สิ่งอำนวยความสะดวก</h2>
                <div className="flex flex-wrap gap-3">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-xl text-sm font-semibold border border-gray-100"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">สนใจที่พักนี้?</h3>
                <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-[0.98] mb-4">
                  ติดต่อเจ้าของ
                </button>
                <button className="w-full bg-white text-gray-900 border-2 border-gray-200 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all">
                  แชร์ที่พักนี้
                </button>
                <p className="text-center text-gray-400 text-sm mt-6">
                  ID: {property.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
