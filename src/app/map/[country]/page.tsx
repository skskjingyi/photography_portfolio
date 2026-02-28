'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Photo, LayoutMode } from '@/types'
import { getCountryName } from '@/lib/countries'
import LayoutSwitcher from '@/components/LayoutSwitcher'
import PhotoGrid from '@/components/PhotoGrid'
import SlideshowViewer from '@/components/SlideshowViewer'

export default function CountryPage() {
  const { country } = useParams<{ country: string }>()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [mode, setMode] = useState<LayoutMode>('grid')
  const [loading, setLoading] = useState(true)
  const countryName = getCountryName(country.toUpperCase())

  useEffect(() => {
    const saved = localStorage.getItem('galleryLayout') as LayoutMode | null
    if (saved) setMode(saved)
  }, [])

  useEffect(() => {
    fetch(`/api/photos?country=${country.toUpperCase()}`)
      .then((r) => r.json())
      .then((data) => { setPhotos(data); setLoading(false) })
  }, [country])

  const handleModeChange = (m: LayoutMode) => {
    setMode(m)
    localStorage.setItem('galleryLayout', m)
  }

  return (
    <div className="pt-20 px-4 sm:px-6 pb-12">
      <div className="flex items-start justify-between mb-8 mt-6 gap-4 flex-wrap">
        <div>
          <Link href="/map" className="text-neutral-500 text-xs hover:text-neutral-300 tracking-widest uppercase mb-2 inline-block">
            ← World Map
          </Link>
          <h1 className="text-2xl font-light tracking-widest uppercase">{countryName}</h1>
          {!loading && <p className="text-neutral-600 text-xs mt-2">{photos.length} photos</p>}
        </div>
        <LayoutSwitcher mode={mode} onChange={handleModeChange} />
      </div>

      {loading && <div className="text-center text-neutral-500 py-20">Loading...</div>}

      {!loading && photos.length === 0 && (
        <div className="text-center text-neutral-500 py-20">No photos from {countryName}.</div>
      )}

      {!loading && photos.length > 0 && (
        <>
          {mode === 'slideshow' ? (
            <SlideshowViewer photos={photos} />
          ) : (
            <PhotoGrid photos={photos} mode={mode} />
          )}
        </>
      )}
    </div>
  )
}
