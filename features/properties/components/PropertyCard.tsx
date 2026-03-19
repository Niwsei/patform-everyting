import Image from "next/image";
import Link from "next/link";
import {Property} from "../types";
import { FavoriteButton } from "./FavoriteButton";

interface PropertyCardProps {
    property: Property;
}


export function  PropertyCard({ property }: PropertyCardProps) {
    return (
        <div className="group border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white relative">
     
        <div className="absolute top-3 right-3 z-10">
            <FavoriteButton propertyId={property.id} />
        </div>


        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
            src={property.images[0] || '/placeholder-home.jpg' }
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw  " 
            className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>


      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
          {property.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{property.location}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-blue-600 font-bold text-lg">
            ₭{property.pricePerMonth.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ เดือน</span>
          </span>

          <Link 
            href={`/properties/${property.id}`}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            ดูรายละเอียด
          </Link>
        </div>
      </div>

    </div>
    )
}