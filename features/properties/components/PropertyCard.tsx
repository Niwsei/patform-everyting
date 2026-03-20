import Image from "next/image";
import Link from "next/link";
import { Property } from "../types";
import { FavoriteButton } from "./FavoriteButton";
import { MapPin, Star, ShieldCheck } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)] transition-all duration-700 hover:-translate-y-2 relative">
      <div className="absolute top-5 right-5 z-20">
        <div className="p-1 bg-white/80 backdrop-blur-xl rounded-2xl shadow-premium border border-white/20">
           <FavoriteButton propertyId={property.id} />
        </div>
      </div>

      <div className="relative h-72 w-full overflow-hidden bg-slate-100">
        <Image
          src={property.images[0] || '/placeholder-home.jpg'}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Floating Badges */}
        <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
           <div className="bg-white/90 backdrop-blur-xl text-indigo-600 text-[10px] font-black px-4 py-2 rounded-full flex items-center gap-1.5 shadow-premium uppercase tracking-[0.1em] border border-white/20">
            <Star className="w-3.5 h-3.5 fill-indigo-600" />
            คะแนนสูงสุด
          </div>
          {property.pricePerMonth < 2000000 && (
            <div className="bg-amber-400 text-amber-950 text-[10px] font-black px-4 py-2 rounded-full flex items-center gap-1.5 shadow-premium uppercase tracking-[0.1em]">
              คุ้มค่าที่สุด
            </div>
          )}
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <div className="bg-slate-900/40 backdrop-blur-xl p-4 rounded-[1.5rem] border border-white/10">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">เริ่มต้นที่</p>
                <span className="text-white text-xl font-black">
                  ₭{property.pricePerMonth.toLocaleString()} <span className="text-xs font-medium opacity-60">/ เดือน</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">ว่าง</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-7">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-2 group-hover:text-indigo-600 transition-colors">
          {property.title}
        </h3>
        <p className="text-slate-400 text-sm font-bold flex items-center gap-2 mb-5">
          <MapPin className="w-4 h-4 text-indigo-500" />
          {property.location}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white px-3 py-1.5 rounded-xl border border-indigo-700">
            {property.category === 'hotel' ? 'โรงแรม' :
             property.category === 'guesthouse' ? 'เกสต์เฮ้าส์' :
             property.category === 'vacation_home' ? 'บ้านพักตากอากาศ' : 'อพาร์ทเมนท์'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {property.amenities?.slice(0, 2).map((amenity) => (
            <span key={amenity} className="text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-500 px-4 py-2 rounded-xl border border-slate-100">
              {amenity}
            </span>
          ))}
          {(property.amenities?.length ?? 0) > 3 && (
            <span className="text-[10px] font-black text-slate-300 py-2 ml-1">+{ (property.amenities?.length ?? 0) - 3}</span>
          )}
        </div>

        <Link
          href={`/properties/${property.id}`}
          className="flex items-center justify-center w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-200 group-hover:shadow-indigo-200 active:scale-[0.98]"
        >
          สำรวจที่พักนี้
        </Link>
      </div>
    </div>
  );
}