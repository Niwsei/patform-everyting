'use client'

import Image from "next/image";
import Link from "next/link";
import { Property } from "../types";
import { FavoriteButton } from "./FavoriteButton";
import { MapPin, Star, ShieldCheck, Zap, ArrowRightLeft, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrencyStore } from "@/stores/useCurrencyStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { translations } from "@/lib/translations";
import { useComparisonStore } from "@/stores/useComparisonStore";
import { motion } from "framer-motion";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { formatPrice } = useCurrencyStore()
  const { language } = useLanguageStore()
  const { propertyIds, addToCompare, removeFromCompare } = useComparisonStore()
  const t = translations[language]

  const isComparing = propertyIds.includes(property.id)

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-premium hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 relative flex flex-col h-full"
    >
      {/* Actions Overlay */}
      <div className="absolute top-5 right-5 z-20 flex flex-col gap-2">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-premium border border-white/20 dark:border-white/10"
        >
           <FavoriteButton propertyId={property.id} />
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault()
            isComparing ? removeFromCompare(property.id) : addToCompare(property.id)
          }}
          className={cn(
            "p-2.5 rounded-2xl shadow-premium border transition-all backdrop-blur-xl",
            isComparing
              ? "bg-primary text-white border-primary shadow-glow"
              : "bg-white/80 dark:bg-slate-900/80 text-slate-400 border-white/20 dark:border-white/10 hover:text-primary"
          )}
        >
           <ArrowRightLeft className="w-5 h-5 stroke-[2.5]" />
        </motion.button>
      </div>

      {/* Image Section */}
      <div className="relative h-72 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={property.images[0] || '/placeholder-home.jpg'}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />

        {/* Floating Badges */}
        <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
          {property.isFeatured && (
            <div className="bg-primary text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-2 rounded-xl flex items-center gap-2 shadow-glow border border-white/20 backdrop-blur-md">
              <Sparkles className="w-3 h-3 fill-white" />
              {t.featured}
            </div>
          )}
          <div className="bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-[10px] font-black px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-premium border border-white/20 backdrop-blur-md">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {t.topRated}
          </div>
        </div>

        {/* Price Overlay - Immersive Style */}
        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
           <div className="flex justify-between items-end">
              <div>
                <p className="text-white/60 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Monthly Investment</p>
                <span className="text-white text-2xl font-black tracking-tighter">
                  {formatPrice(property.pricePerMonth)}
                </span>
                <span className="text-white/60 text-xs font-bold ml-1">/ mo</span>
              </div>
              {property.isAvailable && (
                <div className="flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/30">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_var(--emerald-400)]" />
                  <span className="text-emerald-400 text-[9px] font-black uppercase tracking-[0.2em]">{t.available}</span>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-7 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-4 mb-2">
           <h3 className="text-xl font-black text-slate-900 dark:text-white line-clamp-1 tracking-tight group-hover:text-primary transition-colors">
             {property.title}
           </h3>
           <ShieldCheck className="w-6 h-6 text-primary shrink-0 opacity-80" />
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold flex items-center gap-2 mb-6 uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-primary" />
          {property.location}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.1em] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            {property.category === 'hotel' ? (language === 'EN' ? 'Hotel' : language === 'LO' ? 'ໂຮງແຮມ' : 'โรงแรม') :
             property.category === 'guesthouse' ? (language === 'EN' ? 'Guesthouse' : language === 'LO' ? 'ເກສເຮົ້າສ໌' : 'เกสต์เฮ้าส์') :
             property.category === 'vacation_home' ? (language === 'EN' ? 'Vacation Home' : language === 'LO' ? 'ເຮືອນພັກ' : 'บ้านพักตากอากาศ') :
             (language === 'EN' ? 'Apartment' : language === 'LO' ? 'ອາພາດເມັນ' : 'อพาร์ทเมนท์')}
          </span>
          {property.tags?.slice(0, 2).map(tag => (
             <span key={tag} className="text-[10px] font-black uppercase tracking-[0.1em] text-primary bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20">
                {tag}
             </span>
          ))}
        </div>

        {/* Feature Grid - Icon focused */}
        <div className="grid grid-cols-2 gap-4 mb-8">
           {property.amenities?.slice(0, 4).map((amenity) => (
             <div key={amenity} className="flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full" />
                {amenity}
             </div>
           ))}
        </div>

        <div className="mt-auto">
          <Link
            href={`/properties/${property.id}`}
            className="flex items-center justify-between w-full py-4 px-6 bg-slate-900 dark:bg-slate-800 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] group/btn transition-all hover:bg-primary hover:shadow-glow active:scale-[0.98]"
          >
            {language === 'EN' ? 'View Estate' : language === 'LO' ? 'ເບິ່ງລາຍລະອຽດ' : 'ดูรายละเอียด'}
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
