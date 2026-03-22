'use client'

import { useState, useEffect, useRef } from 'react'
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox'
import { MapPin, Crosshair, Search } from 'lucide-react'
import 'mapbox-gl/dist/mapbox-gl.css'

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void
  initialLat?: number
  initialLng?: number
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export function LocationPicker({ onLocationSelect, initialLat = 17.9757, initialLng = 102.6331 }: LocationPickerProps) {
  const [viewState, setViewState] = useState({
    latitude: initialLat,
    longitude: initialLng,
    zoom: 13
  })
  const [marker, setMarker] = useState({
    latitude: initialLat,
    longitude: initialLng
  })

  const handleMapClick = (e: any) => {
    const { lng, lat } = e.lngLat
    setMarker({ latitude: lat, longitude: lng })
    onLocationSelect(lat, lng, `พิกัด: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
  }

  const mapRef = useRef<any>(null)

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: 16,
          duration: 2000
        })
        setMarker({ latitude, longitude })
        onLocationSelect(latitude, longitude, `ตำแหน่งปัจจุบันของคุณ`)
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          onClick={handleUseCurrentLocation}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-all border border-indigo-100"
        >
          <Crosshair className="w-3.5 h-3.5" />
          ใช้ตำแหน่งปัจจุบันของฉัน
        </button>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex-1 text-right">
          คลิกบนแผนที่เพื่อปักหมุด
        </div>
      </div>

      <div className="h-64 md:h-80 w-full rounded-3xl overflow-hidden border-2 border-slate-100 shadow-inner relative group">
        {!MAPBOX_TOKEN ? (
           <div className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                <MapPin className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                Mapbox Token Not Found<br/>
                <span className="text-[10px] lowercase opacity-60">กรุณาตั้งค่า NEXT_PUBLIC_MAPBOX_TOKEN ใน .env</span>
              </p>
           </div>
        ) : (
          <Map
            ref={mapRef}
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            onClick={handleMapClick}
            mapStyle="mapbox://styles/mapbox/navigation-day-v1"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            <Marker latitude={marker.latitude} longitude={marker.longitude} anchor="bottom">
              <div className="relative">
                <div className="absolute -inset-4 bg-indigo-500/20 rounded-full animate-ping" />
                <MapPin className="w-8 h-8 text-indigo-600 drop-shadow-lg fill-white stroke-[2.5px]" />
              </div>
            </Marker>
            <NavigationControl position="bottom-right" />
          </Map>
        )}
      </div>

      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <MapPin className="w-4 h-4 text-slate-400" />
        <div className="flex-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">พิกัดที่เลือก</p>
          <p className="text-sm font-bold text-slate-900">{marker.latitude.toFixed(6)}, {marker.longitude.toFixed(6)}</p>
        </div>
      </div>
    </div>
  )
}
