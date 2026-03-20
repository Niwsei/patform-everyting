'use client'

import { mockProperties } from "@/features/properties/services/mockData";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { FavoriteButton } from "@/features/properties/components/FavoriteButton";
import {
  Star,
  MapPin,
  ShieldCheck,
  Calendar,
  Users,
  CheckCircle2,
  Share2,
  ChevronLeft,
  ChevronRight,
  Info
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { use } from "react";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const { id } = use(params);
  const property = mockProperties.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);

  if (!property) {
    notFound();
  }

  const nextImage = () => setActiveImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumbs / Back */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/properties" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-all group">
            <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:bg-indigo-50 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </div>
            Back to Explore
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
              <Share2 className="w-5 h-5 text-slate-600" />
            </button>
            <FavoriteButton propertyId={property.id} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content (Images + Details) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery Section */}
            <div className="relative h-[400px] md:h-[550px] w-full rounded-[2.5rem] overflow-hidden shadow-premium group">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
              >
                <Image
                  src={property.images[activeImage] || '/placeholder-home.jpg'}
                  alt={property.title}
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>

              {/* Overlay Badges */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-indigo-600 text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  Top Rated
                </span>
                <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-slate-900 rounded-full text-xs font-black uppercase tracking-widest shadow-lg border border-white/20">
                  Verified
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={prevImage} className="p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl hover:bg-white transition-all active:scale-90">
                  <ChevronLeft className="w-6 h-6 text-slate-900" />
                </button>
                <button onClick={nextImage} className="p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl hover:bg-white transition-all active:scale-90">
                  <ChevronRight className="w-6 h-6 text-slate-900" />
                </button>
              </div>

              {/* Indicator Pips */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {property.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "h-1.5 transition-all duration-300 rounded-full",
                      idx === activeImage ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Title and Rating Section */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-premium border border-slate-100">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-black border border-amber-100">
                      <Star className="w-4 h-4 fill-amber-600 mr-1" />
                      {property.rating}
                    </div>
                    <span className="text-slate-400 font-bold">•</span>
                    <span className="text-slate-500 font-bold underline cursor-pointer">{property.reviewCount} reviews</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-slate-500 font-semibold">
                    <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                  <span className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Status</span>
                  <span className="text-emerald-600 font-black flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Available Now
                  </span>
                </div>
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                  <span className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Contract</span>
                  <span className="text-slate-900 font-black">Flexible</span>
                </div>
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                  <span className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Type</span>
                  <span className="text-slate-900 font-black">Apartment</span>
                </div>
                <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                  <span className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Furnished</span>
                  <span className="text-slate-900 font-black">Fully</span>
                </div>
              </div>

              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-black text-slate-900">About this property</h2>
                <p className="text-slate-600 leading-relaxed text-lg font-medium">
                  {property.description}
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-700 rounded-2xl text-sm font-bold border border-indigo-100/50">
                      <CheckCircle2 className="w-4 h-4" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Host Section */}
              <div className="mt-12 pt-10 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="relative w-16 h-16 rounded-3xl overflow-hidden shadow-lg">
                    <Image src={property.hostImage || ''} alt="Host" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900">Hosted by {property.hostName}</h4>
                    <p className="text-slate-500 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Verified Nest Host
                    </p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                  Contact Host
                </button>
              </div>
            </div>
          </div>

          {/* Booking Card - Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-[2.5rem] p-8 shadow-premium border border-slate-100 space-y-6">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <span className="text-3xl font-black text-slate-900">₭{property.pricePerMonth.toLocaleString()}</span>
                  <span className="text-slate-500 font-bold ml-2">/ month</span>
                </div>
                <div className="bg-indigo-50 px-3 py-1 rounded-full text-xs font-bold text-indigo-600 border border-indigo-100">
                  Best Value
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Move-in Date</p>
                      <p className="text-sm font-bold text-slate-900">Oct 1, 2023</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-indigo-500" />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Residents</p>
                      <p className="text-sm font-bold text-slate-900">1 Person</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between font-bold text-slate-600">
                  <span>First Month Rent</span>
                  <span>₭{property.pricePerMonth.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-600">
                  <span>Service Fee (One-time)</span>
                  <span>₭150,000</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100">
                  <span className="text-lg font-black text-slate-900">Total Deposit</span>
                  <span className="text-lg font-black text-indigo-600">₭{(property.pricePerMonth + 150000).toLocaleString()}</span>
                </div>
              </div>

              <Link
                href={`/properties/${property.id}/book`}
                className="block w-full text-center bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-[0.98]"
              >
                Reserve This Nest
              </Link>

              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
                <Info className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-xs font-bold text-amber-800 leading-tight">
                  No credit card required until the landlord approves your application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper for class names
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
