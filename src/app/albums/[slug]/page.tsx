'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Photo, Album, LayoutMode } from '@/types'
import LayoutSwitcher from '@/components/LayoutSwitcher'
import PhotoGrid from '@/components/PhotoGrid'
import SlideshowViewer from '@/components/SlideshowViewer'
import { supabase } from '@/lib/supabase'

export default function AlbumPage() {
  const { slug } = useParams<{ slug: string }>()
  const [album, setAlbum] = useState<Album | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [mode, setMode] = useState<LayoutMode>('grid')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('galleryLayout') as LayoutMode | null
    if (saved) setMode(saved)
  }, [])

  useEffect(() => {
    async function load() {
      const { data: albumData } = await supabase
        .from('albums')
        .select('*')
        .eq('slug', slug)
        .single()

      if (!albumData) { setLoading(false); return }
      setAlbum(albumData)

      const { data: photosData } = await supabase
        .from('photos')
        .select('*')
        .eq('album_id', albumData.id)
        .order('taken_at', { ascending: false })

      setPhotos(photosData ?? [])
      setLoading(false)
    }
    load()
  }, [slug])

  const handleModeChange = (m: LayoutMode) => {
    setMode(m)
    localStorage.setItem('galleryLayout', m)
  }

  if (loading) return <div className="pt-32 text-center text-neutral-500">Loading...</div>
  if (!album) return <div className="pt-32 text-center text-neutral-500">Album not found.</div>

  return (
    <div className="pt-20 px-4 sm:px-6 pb-12">
      <div className="flex items-start justify-between mb-8 mt-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-light tracking-widest uppercase">{album.name}</h1>
          {album.description && (
            <p className="text-neutral-400 mt-1 text-sm">{album.description}</p>
          )}
          <p className="text-neutral-600 text-xs mt-2">{photos.length} photos</p>
        </div>
        <LayoutSwitcher mode={mode} onChange={handleModeChange} />
      </div>

      {photos.length === 0 && (
        <div className="text-center text-neutral-500 py-20">No photos in this album yet.</div>
      )}

      {photos.length > 0 && (
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
