'use client'

import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { mockProperties } from '@/features/properties/services/mockData';
import { HeroSearch } from '@/features/search/components/HeroSearch';
import { NestAIEngine } from '@/features/search/components/NestAIEngine';
import { PageTransition } from '@/components/PageTransition';
import { RelocationConcierge } from '@/features/relocation/components/RelocationConcierge';
import { Truck, Shield, Zap, TrendingUp, Sparkles, ArrowRight, Star, Globe, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function HomePage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <PageTransition>
      <div className="mesh-gradient min-h-screen">
        {/* 1. Hero Search */}
        <HeroSearch />

        {/* 2. Bento Grid Feature Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24 space-y-6">
              <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4"
              >
                 <Star className="w-3 h-3 fill-primary" />
                 Revolutionizing Living
              </motion.div>
              <motion.h2
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9]"
              >
                The New <span className="text-primary italic">Standard</span> <br/> in Southeast Asia
              </motion.h2>
              <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-slate-500 dark:text-slate-400 font-bold text-lg max-w-2xl mx-auto"
              >
                Vientiane Nest combines luxury rentals with seamless logistics, powered by the region's most advanced AI matching engine.
              </motion.p>
            </div>

            <motion.div
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[700px]"
            >
              {/* Main Bento Card - AI Search */}
              <motion.div
                 variants={itemVariants}
                 whileHover={{ y: -8 }}
                 className="md:col-span-7 bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-premium border border-slate-100 dark:border-slate-800 flex flex-col justify-between group overflow-hidden relative"
              >
                 <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-bl-[8rem] -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-1000" />
                 <div className="space-y-8 relative z-10">
                    <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/30 group-hover:rotate-6 transition-transform">
                       <Zap className="w-10 h-10 fill-white" />
                    </div>
                    <div>
                       <h3 className="text-4xl font-black text-slate-900 dark:text-white leading-none mb-4 tracking-tighter">
                          Smart AI <br/>Property Matching
                       </h3>
                       <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-md">
                         {language === 'EN' ? 'Our proprietary algorithm analyzes your lifestyle and budget to suggest perfect homes in under 3 seconds.' : 'อัลกอริทึมของเราวิเคราะห์ไลฟ์สไตล์และงบประมาณของคุณเพื่อแนะนำบ้านที่สมบูรณ์แบบในเวลาไม่ถึง 3 วินาที'}
                       </p>
                    </div>
                 </div>
                 <div className="pt-8 relative z-10">
                    <Link href="/properties" className="btn-primary inline-flex items-center gap-4">
                       Start Exploring <ArrowRight className="w-4 h-4" />
                    </Link>
                 </div>
              </motion.div>

              {/* Service Bento Card */}
              <motion.div
                 variants={itemVariants}
                 whileHover={{ y: -8 }}
                 className="md:col-span-5 bg-primary p-12 rounded-[3.5rem] text-white flex flex-col justify-between relative overflow-hidden group shadow-glow"
              >
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent)]" />
                 <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-6">
                       <h3 className="text-3xl font-black leading-tight tracking-tighter">Elite <br/> Concierge</h3>
                       <p className="text-white/80 font-bold text-sm max-w-[240px]">Full-service relocation, cleaning, and VIP airport transfers at your fingertips.</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/30">
                       <Truck className="w-8 h-8" />
                    </div>
                 </div>
                 <div className="relative z-10 space-y-4">
                    <div className="flex -space-x-3">
                       {[1,2,3,4].map(i => (
                         <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-slate-200 overflow-hidden shadow-lg">
                            <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="partner" className="w-full h-full object-cover" />
                         </div>
                       ))}
                       <div className="w-10 h-10 rounded-full border-2 border-primary bg-white text-primary flex items-center justify-center text-[10px] font-black">+500</div>
                    </div>
                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">Verified Network</span>
                 </div>
              </motion.div>

              {/* Trust Bento Card */}
              <motion.div
                 variants={itemVariants}
                 whileHover={{ y: -8 }}
                 className="md:col-span-4 bg-slate-900 dark:bg-white p-12 rounded-[3.5rem] text-white dark:text-slate-900 flex flex-col justify-between group overflow-hidden relative shadow-premium"
              >
                 <div className="w-16 h-16 bg-primary/20 dark:bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                 </div>
                 <div className="space-y-4 relative z-10">
                    <h3 className="text-2xl font-black leading-none tracking-tight">Zero-Risk <br/> Bookings</h3>
                    <p className="text-slate-400 dark:text-slate-500 font-bold text-sm leading-relaxed">
                       Every property is KYC-verified by our field agents. 100% money-back guarantee.
                    </p>
                 </div>
              </motion.div>

              {/* Neighborhoods Bento Card */}
              <motion.div
                 variants={itemVariants}
                 whileHover={{ y: -8 }}
                 className="md:col-span-8 bg-slate-100 dark:bg-slate-800 p-12 rounded-[3.5rem] flex items-center justify-between group overflow-hidden relative border border-slate-200/50 dark:border-slate-700/50"
              >
                 <div className="flex-1 space-y-4 z-10">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Vientiane <br/> Insider Guides</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm max-w-sm">From Sisattanak to Xaysetha, explore local hotzones, schools, and coffee shops.</p>
                    <button className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 mt-4 hover:gap-4 transition-all">
                       Explore Map <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
                 <div className="hidden sm:block w-1/2 h-full absolute right-0 top-0 opacity-20 dark:opacity-40 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                    <Globe className="w-full h-full text-primary p-12" />
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3. Recommended Properties */}
        <div className="max-w-7xl mx-auto py-32 px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-primary" />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">{t.popular}</span>
              </div>
              <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{t.recommended}</h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-lg max-w-xl">{language === 'EN' ? 'Exclusive listings selected by our relocation specialists.' : 'รายการพิเศษที่คัดเลือกโดยผู้เชี่ยวชาญด้านการย้ายที่อยู่อาศัยของเรา'}</p>
            </div>
            <Link href="/properties" className="btn-secondary group">
              {t.viewAll} <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {mockProperties.slice(0, 4).map((property, idx) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>

          {/* Relocation Bundle Section */}
          <div className="mt-40">
             <RelocationConcierge />
          </div>

          {/* AI Powered Section */}
          <div className="mt-40 p-16 bg-slate-900 rounded-[4rem] text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full -mr-64 -mt-64 blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full -ml-48 -mb-48 blur-[100px] animate-pulse" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                  <Sparkles className="w-4 h-4 fill-primary" />
                  Nest Intelligence v2.0
                </div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.9]">
                  Find Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300">Soul-Home</span>
                </h2>
                <p className="text-lg text-slate-400 font-bold leading-relaxed max-w-lg">
                  Stop searching. Start finding. Our neural network cross-references property data with Vientiane's real-time market trends.
                </p>
                <div className="w-full">
                   <NestAIEngine />
                </div>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-6 w-full">
                 {[
                   { label: 'Match Accuracy', value: '98%', desc: 'Neural precision' },
                   { label: 'Time Saved', value: '14hrs', desc: 'Avg per search' },
                   { label: 'Verified Partners', value: '500+', desc: 'Active network' },
                   { label: 'Satisfaction', value: '100%', desc: 'Startup promise' }
                 ].map((stat, i) => (
                   <motion.div
                     key={i}
                     whileHover={{ scale: 1.05 }}
                     className="bg-white/5 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/10 group hover:bg-white/10 transition-all shadow-premium"
                   >
                      <p className="text-4xl font-black mb-2 group-hover:text-primary transition-colors tracking-tighter">{stat.value}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">{stat.label}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-60">{stat.desc}</p>
                   </motion.div>
                 ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden bg-white dark:bg-slate-950">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="bg-slate-900 dark:bg-primary/10 rounded-[4rem] p-12 md:p-24 text-center space-y-10 border border-slate-800 dark:border-primary/20">
                 <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                    Ready to scale your <br/> <span className="text-primary italic">Rental Business?</span>
                 </h2>
                 <p className="text-slate-400 font-bold text-lg max-w-2xl mx-auto">
                    Join hundreds of landlords and service providers using Vientiane Nest to automate their operations and reach international tenants.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                    <Link href="/onboarding" className="btn-primary scale-125 px-12">
                       List Your Space
                    </Link>
                    <Link href="/services" className="btn-secondary dark:bg-slate-800 scale-125 px-12 text-white">
                       Join as Partner
                    </Link>
                 </div>
              </div>
           </div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary),transparent)] opacity-5 pointer-events-none" />
        </section>
      </div>
    </PageTransition>
  );
}
