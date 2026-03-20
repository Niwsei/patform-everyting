'use client'

import { Property } from '@/features/properties/types'
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Info, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface PropertyMapProps {
  properties: Property[]
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export function PropertyMap({ properties }: PropertyMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  const markers = useMemo(() => properties.filter(p => p.lat && p.lng).map(property => (
    <Marker
      key={property.id}
      latitude={property.lat!}
      longitude={property.lng!}
      anchor="bottom"
      onClick={e => {
        e.originalEvent.stopPropagation()
        setSelectedProperty(property)
      }}
    >
      <motion.div
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="group relative cursor-pointer"
      >
        <div className="bg-white text-slate-900 px-3 py-1.5 rounded-2xl text-xs font-black shadow-premium border-2 border-indigo-600 transition-all group-hover:bg-indigo-600 group-hover:text-white flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-[10px] opacity-60 font-bold group-hover:text-white/60 text-slate-400">₭</span>
          {(property.pricePerMonth / 1000000).toFixed(1)}M
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-600 rotate-45 border-r border-b border-indigo-600" />
      </motion.div>
    </Marker>
  )), [properties])

  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-premium bg-slate-100 relative group/map">
      <Map
        initialViewState={{
          latitude: 17.9757,
          longitude: 102.6331,
          zoom: 12
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" />
        {markers}

        <AnimatePresence>
          {selectedProperty && (
            <Popup
              latitude={selectedProperty.lat!}
              longitude={selectedProperty.lng!}
              anchor="bottom"
              onClose={() => setSelectedProperty(null)}
              closeButton={false}
              offset={40}
              className="property-popup z-50"
            >
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="p-1 max-w-[240px] bg-white rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="relative w-full h-32 rounded-2xl overflow-hidden mb-3">
                  <Image
                    src={selectedProperty.images[0]}
                    alt={selectedProperty.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-[10px] font-black text-indigo-600">
                    ₭{selectedProperty.pricePerMonth.toLocaleString()}
                  </div>
                </div>
                <div className="px-3 pb-3 space-y-2">
                  <h3 className="font-black text-sm text-slate-900 line-clamp-1">{selectedProperty.title}</h3>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    <MapPin className="w-3 h-3 text-indigo-500" />
                    {selectedProperty.location}
                  </div>
                  <Link
                    href={`/properties/${selectedProperty.id}`}
                    className="block text-center bg-slate-900 text-white text-[10px] font-black py-2.5 rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200"
                  >
                    Explore Nest
                  </Link>
                </div>
              </motion.div>
            </Popup>
          )}
        </AnimatePresence>
      </Map>

      {/* Floating Info Badge */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-3xl border border-white/20 shadow-premium flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Interactive View</p>
              <p className="text-sm font-bold text-slate-900">{properties.length} Active Listings</p>
            </div>
          </div>
          <div className="flex -space-x-2">
            {properties.slice(0, 3).map((p, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                <Image src={p.images[0]} alt="p" width={32} height={32} className="object-cover h-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
