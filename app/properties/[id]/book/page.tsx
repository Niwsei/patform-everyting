'use client'

import { useState, use } from "react";
import { mockProperties } from "@/features/properties/services/mockData";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ShieldCheck,
  Calendar,
  Users,
  CreditCard,
  Lock,
  CheckCircle,
  ArrowRight,
  Info,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export default function BookPage({ params }: BookPageProps) {
  const { id } = use(params);
  const property = mockProperties.find((p) => p.id === id);
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!property) {
    notFound();
  }

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className="relative inline-block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle className="w-12 h-12 text-emerald-600" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-emerald-400/20 rounded-full"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Booking Requested!</h1>
            <p className="text-slate-600 font-medium leading-relaxed">
              Your application for <span className="text-indigo-600 font-bold">{property.title}</span> has been sent to {property.hostName}.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-left space-y-4">
            <h3 className="font-bold text-slate-900">What's next?</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-slate-600 font-medium">
                <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</div>
                Host reviews your profile (usually within 24h)
              </li>
              <li className="flex gap-3 text-sm text-slate-600 font-medium">
                <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</div>
                If approved, you'll receive a digital contract
              </li>
              <li className="flex gap-3 text-sm text-slate-600 font-medium">
                <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</div>
                Sign & Pay to lock in your new nest!
              </li>
            </ul>
          </div>

          <Link
            href="/dashboard"
            className="block w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl shadow-slate-200"
          >
            Go to My Dashboard
          </Link>

          <Link href="/properties" className="block text-indigo-600 font-bold hover:underline">
            Keep exploring
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4 px-2">
            <h1 className="text-3xl font-black text-slate-900">Book your nest</h1>
            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Step {step} of 3</span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "33%" }}
              animate={{ width: `${(step / 3) * 100}%` }}
              className="h-full bg-indigo-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <h2 className="text-xl font-black text-slate-900">1. Select Move-in Date</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="p-4 bg-white border-2 border-indigo-600 rounded-2xl text-left shadow-lg shadow-indigo-100">
                          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">ASAP</p>
                          <p className="font-bold text-slate-900">Next 7 Days</p>
                        </button>
                        <button type="button" className="p-4 bg-white border border-slate-200 rounded-2xl text-left hover:border-indigo-600 transition-colors">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Standard</p>
                          <p className="font-bold text-slate-900">Next 30 Days</p>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-xl font-black text-slate-900">2. Rental Period</h2>
                      <select className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none appearance-none">
                        <option>6 Months (Standard)</option>
                        <option>12 Months (Best Rate)</option>
                        <option>Month-to-month</option>
                      </select>
                    </div>

                    <div className="pt-6">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                      >
                        Continue <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <h2 className="text-xl font-black text-slate-900">3. Tenant Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                          defaultValue="Alex Smith"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                          defaultValue="alex.smith@example.com"
                        />
                      </div>
                      <textarea
                        placeholder="Tell the host about yourself..."
                        rows={4}
                        className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>

                    <div className="flex gap-4 pt-6">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="w-1/3 bg-white border-2 border-slate-200 text-slate-900 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-2/3 flex items-center justify-center gap-2 bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
                      >
                        Almost there <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-indigo-900 text-white p-8 rounded-[2rem] space-y-6 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />

                      <div className="flex justify-between items-center">
                        <CreditCard className="w-10 h-10 text-indigo-300" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Application Guarantee</span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Lock className="w-4 h-4 text-indigo-300" />
                          <p className="text-sm font-bold opacity-80">Safe & Secure Payment</p>
                        </div>
                        <p className="text-xs font-medium opacity-60 leading-relaxed">
                          We won't charge your card for the rent yet. A small deposit of ₭150,000 (Service Fee) is required to guarantee your application intent. This is fully refundable if the host declines.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl font-bold text-white placeholder:text-white/40 focus:bg-white/20 outline-none transition-all"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl font-bold text-white placeholder:text-white/40 focus:bg-white/20 outline-none transition-all"
                          />
                          <input
                            type="text"
                            placeholder="CVC"
                            className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl font-bold text-white placeholder:text-white/40 focus:bg-white/20 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={isSubmitting}
                        className="w-1/3 bg-white border-2 border-slate-200 text-slate-900 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all disabled:opacity-50"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-2/3 flex items-center justify-center gap-3 bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-80"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>Confirm Booking Request</>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Summary Side */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-slate-100 space-y-8">
              <div className="flex gap-4">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                  <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 line-clamp-2">{property.title}</h3>
                  <div className="flex items-center gap-1 mt-1 text-slate-400">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{property.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest border-b border-slate-50 pb-2">Price Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between font-bold text-slate-600">
                    <span>Monthly Rent</span>
                    <span>₭{property.pricePerMonth.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-600">
                    <span>Service Fee</span>
                    <span>₭150,000</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-slate-100">
                    <span className="text-xl font-black text-slate-900">Total Deposit</span>
                    <span className="text-xl font-black text-indigo-600">₭{(property.pricePerMonth + 150000).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 space-y-3">
                <div className="flex items-center gap-3 text-indigo-700 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  Nest Guarantee Included
                </div>
                <p className="text-xs font-medium text-indigo-600 leading-relaxed">
                  Every booking via Vientiane Nest is protected. If the place doesn't match the photos, we'll find you a new one or refund you 100%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
