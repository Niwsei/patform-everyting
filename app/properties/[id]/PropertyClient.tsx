'use client'

import { Property } from "@/features/properties/types";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "@/features/properties/components/FavoriteButton";
import {
  Star,
  MapPin,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info,
  Clock,
  Sparkles,
  Zap,
  Globe,
  Lock,
  ArrowRight,
  Cpu,
  Activity,
  BrainCircuit
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCurrencyStore } from "@/stores/useCurrencyStore";
import { ReviewSection } from "@/features/reviews/components/ReviewSection";
import { UnitMap } from "@/components/booking/UnitMap";
import { DirectChat } from "@/components/chat/DirectChat";
import { ImmersivePreview } from "@/components/listing/ImmersivePreview";
import { ShareCard } from "@/components/listing/ShareCard";
import { cn } from "@/lib/utils";

interface PropertyClientProps {
  property: Property;
}

export default function PropertyClient({ property }: PropertyClientProps) {
  const [activeImage, setActiveImage] = useState(0);
  const { formatPrice } = useCurrencyStore();

  const nextImage = () => setActiveImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full -mr-96 -mt-96 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Navigation & Actions */}
        <div className="mb-12 flex items-center justify-between">
          <Link href="/properties" className="group flex items-center gap-3 text-slate-500 hover:text-primary transition-all">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-sm group-hover:shadow-glow group-hover:border-primary/30">
               <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Hub</span>
          </Link>
          <div className="flex items-center gap-4">
            <ShareCard property={property} />
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
            <FavoriteButton propertyId={property.id} />
          </div>
        </div>

        {/* Identity Section */}
        <div className="mb-12 space-y-4">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="inline-flex items-center gap-3 bg-primary/10 text-primary px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20 shadow-glow"
          >
             <Cpu className="w-4 h-4 fill-primary" />
             Asset Class: {property.category.replace('_', ' ')}
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.85]">
            {property.title}
          </h1>
          <div className="flex flex-wrap items-center gap-8 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20">
                 <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
              <div>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Asset Rating</p>
                 <span className="text-lg font-black text-slate-900 dark:text-white">{property.rating} <span className="text-slate-400 text-xs font-bold">({property.reviewCount} Reviews)</span></span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                 <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Deployment Zone</p>
                 <span className="text-lg font-black text-slate-900 dark:text-white">{property.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Immersive Gallery Section */}
        <div className="relative h-[500px] md:h-[750px] w-full rounded-[4rem] overflow-hidden mb-20 group bg-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border border-white/10">
          <ImmersivePreview image={property.images[0]} title={property.title} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={property.images[activeImage] || '/placeholder-home.jpg'}
                alt={property.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between">
             <div className="flex gap-4">
                {property.images.map((_, i) => (
                   <button
                     key={i}
                     onClick={() => setActiveImage(i)}
                     className={cn(
                        "h-1.5 transition-all duration-500 rounded-full shadow-glow",
                        activeImage === i ? "w-12 bg-primary" : "w-4 bg-white/20 hover:bg-white/40"
                     )}
                   />
                ))}
             </div>
             <div className="flex gap-4">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prevImage} className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all">
                  <ChevronLeft className="w-6 h-6 stroke-[3]" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={nextImage} className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-glow hover:brightness-110 transition-all">
                  <ChevronRight className="w-6 h-6 stroke-[3]" />
                </motion.button>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Detailed Content Matrix */}
          <div className="lg:col-span-8 space-y-20">

            {/* Entity Lead Section */}
            <div className="flex items-center justify-between p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-premium">
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24">
                   <div className="w-full h-full rounded-[2rem] overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-xl">
                      <Image src={property.hostImage || '/placeholder-user.jpg'} alt="Host" fill className="object-cover" />
                   </div>
                   <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl border-4 border-white dark:border-slate-900 shadow-glow">
                      <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                   </div>
                </div>
                <div>
                   <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">Entity Lead: {property.hostName}</h2>
                   <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-3 py-1 bg-primary/10 rounded-full border border-primary/20">Elite Partner</span>
                      <div className="h-1 w-1 bg-slate-300 rounded-full" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">98% Res Rate</span>
                   </div>
                </div>
              </div>
              <button className="btn-secondary px-8 py-3 text-[10px]">Audit Bio</button>
            </div>

            {/* Protocol Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {[
                  { icon: Clock, label: 'AVAILABILITY', val: 'Instant Sync' },
                  { icon: Calendar, label: 'MIN WINDOW', val: '6 Months' },
                  { icon: Sparkles, label: 'SPEC CLASS', val: 'Full Furniture' },
                  { icon: Globe, label: 'NETWORK', val: 'Fiber Ready' }
               ].map((item, i) => (
                  <div key={i} className="space-y-4">
                     <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        <item.icon className="w-6 h-6 text-primary" />
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">{item.label}</p>
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{item.val}</p>
                     </div>
                  </div>
               ))}
            </div>

            {/* Neural Strategy Insight */}
            <div className="bg-slate-900 rounded-[4rem] p-12 text-white relative overflow-hidden group shadow-glow">
              <div className="absolute -right-4 -bottom-4 w-48 h-48 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-[2000ms]" />
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-[1.5rem] flex items-center justify-center border border-white/10 shadow-glow">
                   <BrainCircuit className="w-8 h-8 text-primary" />
                </div>
                <div>
                   <h3 className="text-2xl font-black tracking-tighter leading-none">Neural Deployment Analysis</h3>
                   <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mt-1">Real-time Hotzone Intelligence</p>
                </div>
              </div>
              <div className="space-y-8 relative z-10">
                 <p className="text-slate-400 font-bold text-lg leading-relaxed max-w-2xl">
                    Asset performance in <span className="text-white underline decoration-primary underline-offset-8 decoration-2">{property.location.split(',')[0]}</span> is currently 14% higher than the district median. Projected valuation delta suggests high stability for 12-month commitments.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 group hover:bg-white/10 transition-all">
                       <div className="flex items-center justify-between mb-4">
                          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Connectivity Delta</p>
                          <Activity className="w-4 h-4 text-emerald-400" />
                       </div>
                       <p className="text-sm font-bold text-white uppercase tracking-widest">Morning Market Node • 1.2 KM</p>
                    </div>
                    <div className="p-6 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 group hover:bg-white/10 transition-all">
                       <div className="flex items-center justify-between mb-4">
                          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Lifestyle Protocol</p>
                          <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                       </div>
                       <p className="text-sm font-bold text-white uppercase tracking-widest">Mekong Access • 800M Delta</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Inventory Map */}
            {property.units && property.units.length > 0 && (
               <div className="space-y-10">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                        <Activity className="w-6 h-6 text-primary" />
                     </div>
                     <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Inventory Availability</h2>
                  </div>
                  <UnitMap units={property.units} basePrice={property.pricePerMonth} />
               </div>
            )}

            {/* Narrative Description */}
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Asset Narrative</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-bold">
                {property.description}
              </p>
            </div>

            {/* Feature Extraction */}
            <div className="space-y-12">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Integrated Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-5 p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:border-primary/30 transition-all group">
                    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-primary shadow-sm group-hover:shadow-glow transition-all duration-500">
                       <CheckCircle2 className="w-6 h-6 text-slate-300 dark:text-slate-600 group-hover:text-white stroke-[2.5]" />
                    </div>
                    <span className="text-lg font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification & Social Ledger */}
            <div className="pt-20 border-t border-slate-100 dark:border-slate-800">
               <ReviewSection />
            </div>

          </div>

          {/* Operational Commit Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 space-y-8">
               <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 shadow-premium border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                  <div className="flex items-baseline gap-2 mb-10">
                    <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{formatPrice(property.pricePerMonth)}</span>
                    <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">/ MO DEPLOYMENT</span>
                  </div>

                  <div className="space-y-4 mb-10">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                          <label className="block text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">Sync Date</label>
                          <div className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Dec 1, 2024</div>
                       </div>
                       <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                          <label className="block text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">Protocol Window</label>
                          <div className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">6 Months</div>
                       </div>
                    </div>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                       <label className="block text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">Registry Lead</label>
                       <div className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">1 Adult Node</div>
                    </div>
                  </div>

                  <Link
                    href={`/properties/${property.id}/book`}
                    className="flex items-center justify-between w-full py-6 px-10 bg-primary text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-glow hover:brightness-110 active:scale-[0.98] transition-all group/btn"
                  >
                    Initiate Deployment
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform stroke-[3]" />
                  </Link>

                  <div className="mt-8 flex items-center justify-center gap-3 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                     <Lock className="w-4 h-4 text-emerald-500" />
                     <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">No credit commit until lead approval</p>
                  </div>

                  <div className="mt-12 space-y-6 pt-10 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center text-slate-500 font-bold text-sm">
                      <span className="uppercase tracking-widest text-[10px]">Initial Protocol Rate</span>
                      <span className="font-black text-slate-900 dark:text-white">{formatPrice(property.pricePerMonth)}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500 font-bold text-sm">
                      <span className="uppercase tracking-widest text-[10px]">Sync Delta (One-time)</span>
                      <span className="font-black text-slate-900 dark:text-white">{formatPrice(150000)}</span>
                    </div>
                    <div className="h-px bg-slate-100 dark:bg-slate-800" />
                    <div className="flex justify-between items-end pt-2">
                       <div>
                          <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-1">Total Net Commitment</p>
                          <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{formatPrice(property.pricePerMonth + 150000)}</span>
                       </div>
                    </div>
                  </div>
               </div>

               {/* Entity Communications */}
               <DirectChat
                 hostName={property.hostName || 'Entity Lead'}
                 hostAvatar={property.hostImage || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100'}
                 propertyTitle={property.title}
               />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
