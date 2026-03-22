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
  MessageSquare,
  Wallet,
  ArrowUpRight,
  BarChart2,
  Package,
  LayoutGrid,
  Gift,
  BrainCircuit,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalyticsSkeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import { useCurrencyStore } from "@/stores/useCurrencyStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { translations } from "@/lib/translations";
import { PartnerAnalytics } from "@/features/dashboard/components/PartnerAnalytics";
import { TenantKYC } from "@/components/kyc/TenantKYC";
import { DigitalLease } from "@/components/kyc/DigitalLease";
import { HostBookingManager } from "@/components/booking/HostBookingManager";
import { UnitManagement } from "@/components/dashboard/UnitManagement";
import { ReferralRewards } from "@/components/dashboard/ReferralRewards";
import { MarketReport } from "@/components/dashboard/MarketReport";
import { AIVisionOptimizer } from "@/components/ai-vision/AIVisionOptimizer";
import { ServiceJobCalendar } from "@/components/dashboard/ServiceJobCalendar";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [isLoading, setIsLoading] = useState(false);
  const { formatPrice } = useCurrencyStore();
  const { language } = useLanguageStore();
  const t = translations[language];

  const handleTabChange = (tab: string) => {
     if (tab !== activeTab) {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 800);
        setActiveTab(tab);
     }
  }

  const myBookings = [
    {
      id: 'bk-001',
      property: mockProperties[0],
      status: 'pending',
      date: 'Dec 20, 2024',
      amount: 3650000,
      host: mockProperties[0].hostName,
      type: 'property'
    },
    {
      id: 'srv-001',
      property: {
        title: 'Premium Moving & Setup',
        location: 'Vientiane Capital',
        images: ['https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=600&auto=format&fit=crop'],
      },
      status: 'confirmed',
      date: 'Dec 22, 2024',
      amount: 450000,
      host: 'Vientiane Nest Logistics',
      type: 'service'
    }
  ];

  const navItems = [
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'analytics', label: 'Partner Metrics', icon: BarChart2 },
    { id: 'manage_bookings', label: 'Booking Requests', icon: Package },
    { id: 'manage_units', label: 'Estate Inventory', icon: LayoutGrid },
    { id: 'rewards', label: 'Referral Alpha', icon: Gift },
    { id: 'market_report', label: 'AI Market Pulse', icon: TrendingUp },
    { id: 'ai_vision', label: 'Visual Optimizer', icon: BrainCircuit },
    { id: 'service_calendar', label: 'Service Ops', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Sidebar Navigation - Startup Style */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-premium border border-slate-100 dark:border-slate-800 space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-[1.5rem] flex items-center justify-center text-white text-xl font-black shadow-glow">
                  AS
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Alex Smith</h2>
                  <p className="text-primary font-black text-[9px] mt-2 uppercase tracking-[0.2em] px-2 py-0.5 bg-primary/10 rounded-full inline-block">Elite Partner</p>
                </div>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] transition-all relative group",
                      activeTab === item.id
                        ? "bg-slate-900 dark:bg-primary text-white shadow-premium"
                        : "text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                    )}
                  >
                    <item.icon className={cn("w-4 h-4", activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-primary")} />
                    {item.label}
                    {activeTab === item.id && (
                       <motion.div layoutId="nav-glow" className="absolute inset-0 bg-primary/20 blur-xl -z-10 rounded-2xl" />
                    )}
                  </button>
                ))}

                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />

                <Link
                  href="/favorites"
                  className="w-full flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                >
                  <Heart className="w-4 h-4" />
                  Saved Estates
                </Link>
                <button className="w-full flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </nav>
            </div>

            {/* Promo Card */}
            <div className="bg-primary rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-glow">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
               <Gift className="w-10 h-10 mb-6 opacity-40" />
               <h4 className="font-black text-2xl mb-2 tracking-tighter leading-none">Refer & Earn Alpha</h4>
               <p className="text-sm font-bold text-white/70 mb-8">Earn ₭250k for every verified landlord you refer.</p>
               <button className="w-full py-4 bg-white text-primary rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:shadow-2xl transition-all">
                  Generate Link
               </button>
            </div>

            <div className="space-y-4">
               <h3 className="px-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Required Protocol</h3>
               <TenantKYC />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-12">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <AnalyticsSkeleton />
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {activeTab === 'analytics' ? <PartnerAnalytics /> :
                   activeTab === 'manage_bookings' ? <HostBookingManager /> :
                   activeTab === 'manage_units' ? <UnitManagement /> :
                   activeTab === 'rewards' ? <ReferralRewards /> :
                   activeTab === 'market_report' ? <MarketReport /> :
                   activeTab === 'ai_vision' ? <AIVisionOptimizer /> :
                   activeTab === 'service_calendar' ? <ServiceJobCalendar /> :
                   (
                    <div className="space-y-12">
                      {/* Dashboard Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {[
                           { label: 'Total Equity Managed', val: '₭12.4M', icon: Wallet, trend: '+14%', color: 'primary' },
                           { label: 'Active Reservations', val: '04', icon: Package, trend: 'Stable', color: 'emerald' },
                           { label: 'Nest Credit Score', val: '785', icon: BrainCircuit, trend: 'Top 5%', color: 'indigo' }
                         ].map((stat, i) => (
                           <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-premium border border-slate-100 dark:border-slate-800 group hover:-translate-y-1 transition-all duration-500">
                              <div className="flex items-center justify-between mb-6">
                                 <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", `bg-${stat.color === 'primary' ? 'primary' : stat.color + '-500'}`)}>
                                    <stat.icon className="w-7 h-7" />
                                 </div>
                                 <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full uppercase tracking-widest">{stat.trend}</span>
                              </div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                              <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.val}</p>
                           </div>
                         ))}
                      </div>

                      {/* Section Title */}
                      <div className="flex items-center justify-between">
                         <div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Operations Control</h2>
                            <p className="text-slate-500 dark:text-slate-400 font-bold mt-3 text-sm">Real-time status of your active property and service bookings.</p>
                         </div>
                         <button className="btn-secondary px-8 py-3">Filter Logic</button>
                      </div>

                      {/* Booking Feed */}
                      <div className="space-y-6">
                        {myBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-premium border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-8 relative overflow-hidden group hover:border-primary/50 transition-all duration-500"
                          >
                            <div className={cn(
                              "absolute top-0 right-0 px-8 py-3 rounded-bl-[2rem] font-black text-[9px] uppercase tracking-[0.2em] border-l border-b transition-all",
                              booking.status === 'pending' ? "bg-amber-500 text-white border-amber-600 shadow-glow" : "bg-emerald-500 text-white border-emerald-600 shadow-glow"
                            )}>
                              {booking.status === 'pending' ? 'Verification Pending' : 'Confirmed Active'}
                            </div>

                            <div className="relative w-full md:w-56 h-48 rounded-[2rem] overflow-hidden shrink-0 shadow-2xl border border-white/10">
                              <Image src={booking.property.images?.[0] || booking.property.images[0]} alt="Property" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                            </div>

                            <div className="flex-1 flex flex-col justify-center">
                              <div className="space-y-1 mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className={cn(
                                    "px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border",
                                    booking.type === 'property' ? "bg-primary/10 text-primary border-primary/20" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                  )}>
                                    {booking.type === 'property' ? 'Real Estate Asset' : 'Managed Service'}
                                  </span>
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors tracking-tighter leading-none">{booking.property.title}</h3>
                                <p className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider mt-2">
                                  <MapPin className="w-4 h-4 text-primary" />
                                  {booking.property.location}
                                </p>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-6 border-t border-slate-50 dark:border-slate-800">
                                <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Operation Date</p>
                                  <p className="font-black text-slate-900 dark:text-white text-sm">{booking.date}</p>
                                </div>
                                <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Entity Lead</p>
                                  <p className="font-black text-slate-900 dark:text-white text-sm">{booking.host}</p>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Contract</p>
                                  <p className="font-black text-primary text-sm">{formatPrice(booking.amount)}</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex md:flex-col justify-end gap-3 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-slate-50 dark:border-slate-800 md:pl-10">
                               <button className="flex-1 md:flex-none px-8 py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all shadow-premium">
                                  Audit Details
                                </button>
                               <button className="flex-1 md:flex-none px-8 py-4 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:text-rose-500 hover:border-rose-500 transition-all">
                                  Terminate
                               </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Empty State Upgrade */}
                      <div className="bg-slate-900 dark:bg-white/5 rounded-[4rem] p-16 text-center border border-white/10 relative overflow-hidden group">
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary),transparent)] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" />
                         <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-glow backdrop-blur-xl">
                            <TrendingUp className="w-10 h-10 text-primary" />
                         </div>
                         <h3 className="text-3xl font-black text-white tracking-tighter leading-none">Expand Your Portfolio?</h3>
                         <p className="text-slate-400 font-bold mt-4 mb-10 max-w-sm mx-auto">Discover high-yield properties in Vientiane's emerging hotzones.</p>
                         <Link
                          href="/properties"
                          className="btn-primary inline-flex items-center gap-4 px-12 py-5 scale-110"
                         >
                           Explore New Assets
                           <ArrowRight className="w-5 h-5" />
                         </Link>
                      </div>
                    </div>
                   )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
