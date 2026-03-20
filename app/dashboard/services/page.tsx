'use client'

import { cn } from "@/lib/utils";
import { Truck, Plus, MapPin, CheckCircle2, MoreVertical, Edit, Trash, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MyServicesPage() {
  // Mocking my listed services
  const myServices = [
    {
      id: 'sv-001',
      title: 'Expert Home Cleaning',
      category: 'Cleaning',
      price: 150000,
      location: 'Xaysetha',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?q=80&w=400&auto=format&fit=crop'
    },
    {
       id: 'sv-002',
       title: 'Professional Truck Move',
       category: 'Logistics',
       price: 450000,
       location: 'Sisattanak',
       status: 'pending',
       image: 'https://images.unsplash.com/photo-1586191582151-f73773950201?q=80&w=400&auto=format&fit=crop'
     }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">My Services</h1>
            <p className="text-slate-500 font-bold mt-2">Manage your specialized moving and home maintenance offerings.</p>
          </div>
          <Link
            href="/onboarding"
            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-black transition-all"
          >
            <Plus className="w-5 h-5" />
            Add New Service
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-[2.5rem] p-6 shadow-premium border border-slate-100 group relative overflow-hidden"
            >
              <div className="relative h-48 w-full rounded-3xl overflow-hidden mb-6">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={cn(
                  "absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/20",
                  service.status === 'active' ? "text-emerald-600" : "text-amber-600"
                )}>
                  {service.status === 'active' ? 'Active' : 'Under Review'}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 line-clamp-1">{service.title}</h3>
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs mt-1">
                    <Truck className="w-3.5 h-3.5 text-indigo-500" />
                    {service.category} • {service.location}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Starting From</p>
                    <p className="font-black text-slate-900">₭{service.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
                    <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                    <span className="font-black text-[10px] text-indigo-700 uppercase tracking-widest">Verified</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all">
                    <Edit className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-100 text-slate-400 rounded-xl font-bold text-xs hover:text-red-500 hover:border-red-100 transition-all">
                    <Trash className="w-3.5 h-3.5" />
                    Archive
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* New Service Placeholder */}
          <Link
            href="/onboarding"
            className="bg-slate-200/50 rounded-[2.5rem] border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-12 text-center group hover:border-indigo-300 hover:bg-indigo-50/50 transition-all"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Plus className="w-8 h-8 text-slate-400 group-hover:text-white" />
            </div>
            <h3 className="font-black text-slate-900">Add a new service</h3>
            <p className="text-slate-500 text-xs font-bold mt-2 uppercase tracking-widest">Reach more customers</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
