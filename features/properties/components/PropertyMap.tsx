'use client'

import { Property } from '@/features/properties/types'
import Map, { Marker, Popup, NavigationControl, MapRef, Source, Layer } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useState, useMemo, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Info, MapPin, Sparkles, Building2, Hospital, School, ShoppingBag, Flame, Layers, Plus, Check, Navigation2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useCurrencyStore } from '@/stores/useCurrencyStore'
import { useComparisonStore } from '@/stores/useComparisonStore'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { translations } from '@/lib/translations'

interface PropertyMapProps {
  properties: Property[]
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
const PATUXAY_COORDS = { lat: 17.9702, lng: 102.6125 }

const ESSENTIALS = [
  { id: 'h1', name: 'Mittaphab Hospital', type: 'hospital', lat: 17.9935, lng: 102.6285 },
  { id: 'h2', name: 'Mahosot Hospital', type: 'hospital', lat: 17.9601, lng: 102.6133 },
  { id: 's1', name: 'Vientiane International School', type: 'school', lat: 17.9482, lng: 102.6365 },
  { id: 's2', name: 'Lycée Français Josué Hoffet', type: 'school', lat: 17.9712, lng: 102.6395 },
  { id: 'm1', name: 'Parkson Vientiane', type: 'mall', lat: 17.9664, lng: 102.6045 },
  { id: 'm2', name: 'Vientiane Center', type: 'mall', lat: 17.9645, lng: 102.6055 },
]

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export function PropertyMap({ properties }: PropertyMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [showEssentials, setShowEssentials] = useState(false)

  const mapRef = useRef<MapRef>(null)
  const { formatPrice } = useCurrencyStore()
  const { propertyIds, addToCompare, removeFromCompare } = useComparisonStore()
  const { language } = useLanguageStore()
  const t = translations[language]

  const onMarkerClick = useCallback((property: Property) => {
    setSelectedProperty(property)
    mapRef.current?.flyTo({
      center: [property.lng!, property.lat!],
      zoom: 14,
      duration: 2000,
      essential: true
    })
  }, [])

  const heatmapData = useMemo(() => ({
    type: 'FeatureCollection',
    features: properties.filter(p => p.lat && p.lng).map(p => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [p.lng!, p.lat!] },
      properties: { price: p.pricePerMonth }
    }))
  }), [properties])

  const markers = useMemo(() => properties.filter(p => p.lat && p.lng).map(property => (
    <Marker
      key={property.id}
      latitude={property.lat!}
      longitude={property.lng!}
      anchor="bottom"
      onClick={e => {
        e.originalEvent.stopPropagation()
        onMarkerClick(property)
      }}
    >
      <motion.div
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="group relative cursor-pointer"
      >
        <div className={cn(
          "bg-white px-3 py-1.5 rounded-2xl text-[11px] font-black shadow-2xl border-2 transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap",
          selectedProperty?.id === property.id
            ? "bg-indigo-600 text-white border-white scale-110"
            : "text-slate-900 border-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
        )}>
          {property.isFeatured && <Sparkles className="w-3 h-3 fill-current" />}
          {formatPrice(property.pricePerMonth).replace(' LAK', '').replace('₭', '').replace(/,/g, '').length > 7
            ? `${(property.pricePerMonth / 1000000).toFixed(1)}M`
            : formatPrice(property.pricePerMonth)}
        </div>
        <div className={cn(
          "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b transition-colors duration-300",
          selectedProperty?.id === property.id
            ? "bg-indigo-600 border-white"
            : "bg-indigo-600 border-indigo-600 group-hover:bg-indigo-600 group-hover:border-indigo-600"
        )} />
      </motion.div>
    </Marker>
  )), [properties, selectedProperty, formatPrice, onMarkerClick])

  const essentialMarkers = useMemo(() => showEssentials ? ESSENTIALS.map(poi => (
    <Marker
      key={poi.id}
      latitude={poi.lat}
      longitude={poi.lng}
      anchor="center"
    >
      <div className="p-2 bg-white rounded-full shadow-lg border border-slate-200 text-slate-600 hover:text-indigo-600 transition-colors group">
        {poi.type === 'hospital' && <Hospital className="w-4 h-4" />}
        {poi.type === 'school' && <School className="w-4 h-4" />}
        {poi.type === 'mall' && <ShoppingBag className="w-4 h-4" />}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {poi.name}
        </div>
      </div>
    </Marker>
  )) : [], [showEssentials])

  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-premium bg-slate-100 relative group/map">
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: 17.9757,
          longitude: 102.6331,
          zoom: 12
        }}
        mapStyle="mapbox://styles/mapbox/navigation-day-v1"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" />

        {showHeatmap && (
          <Source id="property-heatmap" type="geojson" data={heatmapData as any}>
            <Layer
              id="heatmap-layer"
              type="heatmap"
              paint={{
                'heatmap-weight': ['interpolate', ['linear'], ['get', 'price'], 0, 0, 10000000, 1],
                'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 15, 3],
                'heatmap-color': [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0, 'rgba(33,102,172,0)',
                  0.2, 'rgb(103,169,207)',
                  0.4, 'rgb(209,229,240)',
                  0.6, 'rgb(253,219,199)',
                  0.8, 'rgb(239,138,98)',
                  1, 'rgb(178,24,43)'
                ],
                'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 15, 20],
                'heatmap-opacity': 0.6
              }}
            />
          </Source>
        )}

        {markers}
        {essentialMarkers}

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
                  <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                    <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-[10px] font-black text-indigo-600 shadow-sm">
                      ₭{selectedProperty.pricePerMonth.toLocaleString()}
                    </div>
                    <div className="bg-indigo-600 px-2 py-1 rounded-full text-[8px] font-black text-white flex items-center gap-1 shadow-sm">
                      <Navigation2 className="w-2 h-2 fill-current" />
                      {calculateDistance(selectedProperty.lat!, selectedProperty.lng!, PATUXAY_COORDS.lat, PATUXAY_COORDS.lng).toFixed(1)} km {t.distanceToCenter}
                    </div>
                  </div>
                </div>
                <div className="px-3 pb-3 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-black text-sm text-slate-900 line-clamp-1">{selectedProperty.title}</h3>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        if (propertyIds.includes(selectedProperty.id)) {
                          removeFromCompare(selectedProperty.id)
                        } else {
                          addToCompare(selectedProperty.id)
                        }
                      }}
                      className={cn(
                        "p-1.5 rounded-lg transition-all",
                        propertyIds.includes(selectedProperty.id)
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-slate-100 text-slate-400 hover:text-indigo-600"
                      )}
                    >
                      {propertyIds.includes(selectedProperty.id) ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                    <MapPin className="w-3 h-3 text-indigo-500" />
                    {selectedProperty.location}
                  </div>
                  <Link
                    href={`/properties/${selectedProperty.id}`}
                    className="block text-center bg-slate-900 text-white text-[10px] font-black py-2.5 rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200"
                  >
                    {language === 'EN' ? 'View Details' : language === 'LO' ? 'ລາຍລະອຽດທີ່ພັກ' : 'รายละเอียดที่พัก'}
                  </Link>
                </div>
              </motion.div>
            </Popup>
          )}
        </AnimatePresence>
      </Map>

      {/* Layer Controls */}
      <div className="absolute top-6 left-6 flex flex-col gap-2">
        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={cn(
            "p-3 rounded-2xl shadow-xl border transition-all flex items-center gap-2 backdrop-blur-xl",
            showHeatmap
              ? "bg-indigo-600 border-indigo-400 text-white"
              : "bg-white/80 border-white text-slate-600 hover:bg-white"
          )}
        >
          <Flame className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-wider">{t.hotzones}</span>
        </button>
        <button
          onClick={() => setShowEssentials(!showEssentials)}
          className={cn(
            "p-3 rounded-2xl shadow-xl border transition-all flex items-center gap-2 backdrop-blur-xl",
            showEssentials
              ? "bg-indigo-600 border-indigo-400 text-white"
              : "bg-white/80 border-white text-slate-600 hover:bg-white"
          )}
        >
          <Layers className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-wider">{t.essentials}</span>
        </button>
      </div>

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
