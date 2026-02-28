'use client'

import { useEffect, useState } from 'react'
import { Photo, LayoutMode } from '@/types'
import LayoutSwitcher from '@/components/LayoutSwitcher'
import PhotoGrid from '@/components/PhotoGrid'
import SlideshowViewer from '@/components/SlideshowViewer'

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [mode, setMode] = useState<LayoutMode>('grid')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('galleryLayout') as LayoutMode | null
    if (saved) setMode(saved)
  }, [])

  useEffect(() => {
    fetch('/api/photos')
      .then((r) => r.json())
      .then((data) => { setPhotos(data); setLoading(false) })
  }, [])

  const handleModeChange = (m: LayoutMode) => {
    setMode(m)
    localStorage.setItem('galleryLayout', m)
  }

  return (
    <div className="pt-20 px-4 sm:px-6 pb-12">
      <div className="flex items-center justify-between mb-8 mt-6">
        <h1 className="text-2xl font-light tracking-widest uppercase">Gallery</h1>
        <LayoutSwitcher mode={mode} onChange={handleModeChange} />
      </div>

      {loading && (
        <div className="text-center text-neutral-500 py-20">Loading...</div>
      )}

      {!loading && photos.length === 0 && (
        <div className="text-center text-neutral-500 py-20">No photos yet.</div>
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
