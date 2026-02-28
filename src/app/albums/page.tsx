'use client'

import { useEffect, useState } from 'react'
import { Album } from '@/types'
import AlbumCard from '@/components/AlbumCard'

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/albums')
      .then((r) => r.json())
      .then((data) => { setAlbums(data); setLoading(false) })
  }, [])

  return (
    <div className="pt-20 px-4 sm:px-6 pb-12">
      <h1 className="text-2xl font-light tracking-widest uppercase mt-6 mb-8">Albums</h1>

      {loading && (
        <div className="text-center text-neutral-500 py-20">Loading...</div>
      )}

      {!loading && albums.length === 0 && (
        <div className="text-center text-neutral-500 py-20">No albums yet.</div>
      )}

      {!loading && albums.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}
    </div>
  )
}
