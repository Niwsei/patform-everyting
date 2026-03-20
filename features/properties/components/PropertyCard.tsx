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
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
      <div className="absolute top-4 right-4 z-20">
        <div className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-slate-100 transition-transform active:scale-95">
           <FavoriteButton propertyId={property.id} />
        </div>
      </div>

      <div className="relative h-64 w-full overflow-hidden bg-slate-100">
        <Image
          src={property.images[0] || '/placeholder-home.jpg'}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
           <div className="bg-white/95 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-slate-100">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            คะแนนสูงสุด
          </div>
          {property.pricePerMonth < 2000000 && (
            <div className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-emerald-100">
              คุ้มค่าที่สุด
            </div>
          )}
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-slate-900/75 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex justify-between items-center shadow-lg">
            <div>
              <p className="text-white/70 text-[10px] font-medium uppercase tracking-wider mb-0.5">เริ่มต้นที่</p>
              <div className="text-white text-lg font-bold">
                ₭{property.pricePerMonth.toLocaleString()} <span className="text-xs font-normal text-white/70">/ เดือน</span>
              </div>
            </div>
            
            {property.isAvailable && (
              <div className="flex items-center gap-1.5 bg-emerald-500/20 px-2 py-1 rounded-md border border-emerald-500/30">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                <span className="text-emerald-300 text-[10px] font-semibold tracking-wide">ว่าง</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900 line-clamp-1 mb-1.5 group-hover:text-slate-700 transition-colors">
          {property.title}
        </h3>
        <p className="text-slate-500 text-sm flex items-center gap-1.5 mb-4">
          <MapPin className="w-4 h-4 text-slate-400" />
          {property.location}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
            {property.category === 'hotel' ? 'โรงแรม' :
             property.category === 'guesthouse' ? 'เกสต์เฮ้าส์' :
             property.category === 'vacation_home' ? 'บ้านพักตากอากาศ' : 'อพาร์ทเมนท์'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {property.amenities?.slice(0, 3).map((amenity) => (
            <span key={amenity} className="text-[11px] font-medium text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md">
              {amenity}
            </span>
          ))}
          {(property.amenities?.length ?? 0) > 3 && (
            <span className="text-[11px] font-medium text-slate-400 py-1 ml-0.5">+{ (property.amenities?.length ?? 0) - 3}</span>
          )}
        </div>

        <Link
          href={`/properties/${property.id}`}
          className="flex items-center justify-center w-full py-3.5 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors active:scale-[0.98]"
        >
          สำรวจที่พักนี้
        </Link>
      </div>
    </div>
  );
}