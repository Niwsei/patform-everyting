import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { PropertyMap } from '@/features/properties/components/PropertyMap';
import { mockProperties } from '@/features/properties/services/mockData';
import { SearchX, SlidersHorizontal, LayoutGrid, Map as MapIcon } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

interface PropertiesPageProps {
  searchParams: Promise<{
    location?: string;
    price?: string;
  }>;
}

export default function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const { location: locationFilter = '', price: priceFilter = '' } = use(searchParams);

  const filteredProperties = mockProperties.filter((property) => {
    const matchLocation = locationFilter 
      ? property.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;

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
    <main className="min-h-screen bg-white pt-20">
      <div className="max-w-[1600px] mx-auto flex flex-col h-[calc(100vh-80px)]">
        
        <div className="px-6 py-4 flex items-center justify-between border-b bg-white z-10">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-xl font-black text-gray-900 flex items-center gap-2">
                Properties in Vientiane
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  {filteredProperties.length}
                </span>
              </h1>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                {locationFilter || 'All over Vientiane'} • {priceFilter || 'Any price'}
              </p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
              <SlidersHorizontal className="w-4 h-4" />
              Advanced Filters
            </button>
          </div>

          <div className="hidden sm:flex items-center bg-gray-100 p-1 rounded-xl">
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white text-indigo-600 shadow-sm text-sm font-bold">
              <LayoutGrid className="w-4 h-4" />
              Grid View
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-500 text-sm font-bold hover:bg-gray-200 transition-colors">
              <MapIcon className="w-4 h-4" />
              Map View
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-full lg:w-3/5 xl:w-1/2 overflow-y-auto p-6 scrollbar-hide">
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <div className="bg-white p-6 rounded-full shadow-sm mb-6">
                  <SearchX className="w-12 h-12 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No properties found</h2>
                <p className="text-gray-500 max-w-sm mb-8">
                  Try adjusting your search filters or explore other vibrant neighborhoods in Vientiane.
                </p>
                <Link
                  href="/properties"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  Reset All Filters
                </Link>
              </div>
            )}
          </div>

          <div className="hidden lg:block flex-1 p-6 pl-0">
             <PropertyMap properties={filteredProperties} />
          </div>
        </div>
      </div>
    </main>
  );
}
