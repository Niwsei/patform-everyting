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
            <h2 className="text-sm font-bold text-indigo-600 tracking-widest uppercase mb-3">Why Vientiane Nest?</h2>
            <p className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              The ecosystem for modern living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                Find the perfect stay or service in minutes. Our spatial search algorithms do the heavy lifting for you.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Moving & Logistics</h3>
              <p className="text-gray-600 leading-relaxed">
                More than just a room. We connect you with verified transportation and delivery services across Vientiane.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Verified Listings</h3>
              <p className="text-gray-600 leading-relaxed">
                Every landlord and service provider on our platform goes through a strict verification process.
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
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Trending Now</span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900">Featured Properties</h2>
            <p className="mt-4 text-lg text-gray-600">Handpicked stays across the most vibrant zones of Vientiane.</p>
          </div>
          <a href="/properties" className="hidden sm:flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
            Explore All <span className="text-2xl leading-none">&rarr;</span>
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
            View All Properties
          </a>
        </div>
      </div>

      {/* 4. CTA for Landlords/Services */}
      <section className="bg-indigo-900 py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-8">
            Own a property or delivery service?
          </h2>
          <p className="text-xl text-indigo-100 mb-12 opacity-80">
            Join Vientiane's fastest growing rental and logistics network.
            Get seen by thousands of potential customers daily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-colors">
              List Your Property
            </button>
            <button className="bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-600 transition-colors border border-indigo-500/30">
              Become a Partner
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}