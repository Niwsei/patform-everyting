'use client'

import { useState } from "react";
import { mockProperties } from "@/features/properties/services/mockData";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Search,
  MapPin,
  Calendar,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  LayoutDashboard,
  Settings,
  Heart,
  MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('bookings');

  // Simulated data
  const myBookings = [
    {
      id: 'bk-001',
      property: mockProperties[0],
      status: 'pending',
      date: 'Sep 24, 2023',
      amount: 3650000,
      host: mockProperties[0].hostName
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Sidebar Nav */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-premium border border-slate-100 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-lg">
                  AS
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 leading-none">Alex Smith</h2>
                  <p className="text-slate-400 font-bold text-xs mt-1 uppercase tracking-widest">Premium Member</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={cn("w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all", activeTab === 'dashboard' ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "text-slate-500 hover:bg-slate-50")}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={cn("w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all", activeTab === 'bookings' ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "text-slate-500 hover:bg-slate-50")}
                >
                  <Calendar className="w-5 h-5" />
                  Bookings
                </button>
                <Link
                  href="/favorites"
                  className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  <Heart className="w-5 h-5" />
                  Saved Nests
                </Link>
                <button
                  className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  Messages
                  <span className="ml-auto w-5 h-5 bg-indigo-600 text-white text-[10px] rounded-full flex items-center justify-center">2</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
              </nav>
            </div>

            <div className="bg-indigo-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
               <h4 className="font-black text-xl mb-2 relative z-10">Refer a friend</h4>
               <p className="text-sm font-medium opacity-80 mb-6 relative z-10">Get ₭100,000 for every friend who books their first nest.</p>
               <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black text-sm relative z-10 hover:shadow-xl transition-all">
                  Share Referral Code
               </button>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-9 space-y-10">
            {/* Header / Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">My Bookings</h1>
                <p className="text-slate-500 font-bold mt-2">Manage your active and past rental requests.</p>
              </div>
              <div className="flex gap-4">
                 <div className="bg-white px-6 py-4 rounded-[1.5rem] shadow-sm border border-slate-100 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Requests</p>
                    <p className="text-2xl font-black text-slate-900">01</p>
                 </div>
                 <div className="bg-white px-6 py-4 rounded-[1.5rem] shadow-sm border border-slate-100 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Saved</p>
                    <p className="text-2xl font-black text-indigo-600">08</p>
                 </div>
              </div>
            </div>

            {/* Booking List */}
            <div className="space-y-6">
              {myBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-slate-100 flex flex-col md:flex-row gap-8 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 bg-amber-50 text-amber-600 px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest border-l border-b border-amber-100/50">
                    Pending Host Review
                  </div>

                  <div className="relative w-full md:w-48 h-40 rounded-3xl overflow-hidden shrink-0 shadow-lg">
                    <Image src={booking.property.images[0]} alt="Property" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">{booking.property.title}</h3>
                      <p className="flex items-center gap-1.5 text-slate-400 font-bold text-sm">
                        <MapPin className="w-4 h-4 text-indigo-500" />
                        {booking.property.location}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-slate-50">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Move-in Date</p>
                        <p className="font-bold text-slate-900">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Host</p>
                        <p className="font-bold text-slate-900">{booking.host}</p>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Deposit Paid</p>
                        <p className="font-bold text-indigo-600">₭{booking.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col justify-end gap-3 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-slate-50 md:pl-8">
                     <button className="flex-1 md:flex-none px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:shadow-xl transition-all">
                        View Details
                     </button>
                     <button className="flex-1 md:flex-none px-6 py-4 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl font-bold text-sm hover:text-slate-600 hover:border-slate-200 transition-all">
                        Cancel
                     </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State / Recommended */}
            <div className="bg-slate-200/50 rounded-[2.5rem] p-12 text-center border-2 border-dashed border-slate-200">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <TrendingUp className="w-8 h-8 text-indigo-600" />
               </div>
               <h3 className="text-xl font-black text-slate-900">Looking for more?</h3>
               <p className="text-slate-500 font-medium mt-2 mb-8 max-w-sm mx-auto">Discover trending properties in your preferred neighborhoods.</p>
               <Link
                href="/properties"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black shadow-sm hover:shadow-md transition-all"
               >
                 Browse Properties
                 <ChevronRight className="w-4 h-4" />
               </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
