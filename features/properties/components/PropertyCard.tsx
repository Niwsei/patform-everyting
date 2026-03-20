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
    <div className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 hover:-translate-y-1 relative">
      <div className="absolute top-4 right-4 z-10">
        <div className="p-1 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm">
           <FavoriteButton propertyId={property.id} />
        </div>
      </div>

      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        <Image
          src={property.images[0] || '/placeholder-home.jpg'}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           <div className="bg-white/90 backdrop-blur-md text-indigo-600 text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wider">
            <Star className="w-3 h-3 fill-indigo-600" />
            Top Rated
          </div>
          <div className="bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3" />
            Verified
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-900/80 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-white text-lg font-black">
                {property.pricePerMonth.toLocaleString()} <span className="text-xs font-normal opacity-70">₭/mo</span>
              </span>
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Available Now</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-2 group-hover:text-indigo-600 transition-colors">
          {property.title}
        </h3>
        <p className="text-gray-500 text-sm font-medium flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
            <MapPin className="w-3 h-3 text-gray-400" />
          </div>
          {property.location}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {property.amenities?.slice(0, 3).map((amenity) => (
            <span key={amenity} className="text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-xl">
              {amenity}
            </span>
          ))}
          {(property.amenities?.length ?? 0) > 3 && (
            <span className="text-[10px] font-bold text-gray-400 py-1.5">+{(property.amenities?.length ?? 0) - 3} More</span>
          )}
        </div>

        <Link
          href={`/properties/${property.id}`}
          className="flex items-center justify-center w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all group-hover:shadow-lg group-hover:shadow-indigo-100"
        >
          View Listing
        </Link>
      </div>
    </div>
  );
}