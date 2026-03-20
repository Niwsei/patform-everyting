import { ServiceCard } from '@/features/services/components/ServiceCard';
import { mockServiceProviders } from '@/features/services/services/mockData';
import { Truck, Package, ShieldCheck, Star, SlidersHorizontal, Search } from 'lucide-react';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-50/50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-sm shadow-indigo-100/50">
              <Truck className="w-4 h-4" />
              Startup Hub: Services
            </div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              Vientiane's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Logistics & Moving</span> Experts.
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              Find verified delivery and moving services to help you settle into your new home or office.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  className="pl-12 pr-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm shadow-gray-200/50 outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-bold text-sm w-full sm:w-80"
                />
             </div>
             <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white border border-gray-100 text-sm font-black text-gray-600 hover:bg-gray-50 transition-colors shadow-sm shadow-gray-200/50">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
             </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-4 overflow-x-auto pb-8 mb-8 scrollbar-hide no-scrollbar">
          {['all', 'moving', 'delivery', 'storage', 'express'].map((cat) => (
            <button
              key={cat}
              className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all whitespace-nowrap shadow-sm ${
                cat === 'all'
                  ? 'bg-indigo-600 text-white shadow-indigo-200'
                  : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100 shadow-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mockServiceProviders.map((provider) => (
            <ServiceCard key={provider.id} provider={provider} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 p-12 rounded-[3rem] bg-indigo-900 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-700/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-4xl font-black text-white mb-6 leading-tight">
                  Provide a service in Vientiane?
                </h2>
                <p className="text-indigo-100 text-lg font-medium opacity-80 leading-relaxed">
                  Join our verified network of logistics experts.
                  Reach thousands of users moving across the city every day.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <button className="bg-white text-indigo-900 px-12 py-5 rounded-[1.5rem] font-black text-lg hover:bg-indigo-50 transition-all hover:scale-105 shadow-xl shadow-indigo-950/20">
                  Partner with Us
                </button>
                <button className="bg-indigo-700 text-white px-12 py-5 rounded-[1.5rem] font-black text-lg border border-indigo-500/30 hover:bg-indigo-600 transition-all">
                  How it Works
                </button>
              </div>
           </div>
        </div>

      </div>
    </main>
  );
}
