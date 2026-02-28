'use client'

import { useEffect, useState, useRef } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { Album } from '@/types'
import { COUNTRIES } from '@/lib/countries'
import { signOut } from 'next-auth/react'

interface UploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
}

export default function AdminPage() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState('')
  const selectedAlbumRef = useRef('')
  const [country, setCountry] = useState('')
  const [title, setTitle] = useState('')
  const [takenAt, setTakenAt] = useState('')
  const [status, setStatus] = useState('')
  const [newAlbumName, setNewAlbumName] = useState('')
  const [newAlbumDesc, setNewAlbumDesc] = useState('')
  const [showNewAlbum, setShowNewAlbum] = useState(false)

  useEffect(() => {
    fetch('/api/albums').then((r) => r.json()).then(setAlbums)
  }, [])

  // Keep ref in sync so Cloudinary's cached onSuccess always reads the latest value
  useEffect(() => {
    selectedAlbumRef.current = selectedAlbum
  }, [selectedAlbum])

  async function createAlbum() {
    if (!newAlbumName.trim()) return
    const res = await fetch('/api/albums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newAlbumName, description: newAlbumDesc }),
    })
    const album = await res.json()
    setAlbums((prev) => [album, ...prev])
    setSelectedAlbum(album.id)
    setNewAlbumName('')
    setNewAlbumDesc('')
    setShowNewAlbum(false)
  }

  async function handleUploadSuccess(result: UploadResult) {
    const albumId = selectedAlbumRef.current
    const countryObj = COUNTRIES.find((c) => c.code === country)
    setStatus('Saving to database...')

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cloudinaryId: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        title: title || null,
        albumId,
        country: country || null,
        countryName: countryObj?.name ?? null,
        takenAt: takenAt || null,
      }),
    })

    if (res.ok) {
      setStatus('Photo uploaded successfully!')
      setTitle('')
      setTakenAt('')
    } else {
      const err = await res.json()
      setStatus(`Error: ${err.error}`)
    }
  }

  return (
    <div className="px-4 sm:px-6 pb-12 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mt-6 mb-8">
        <h1 className="text-2xl font-light tracking-widest uppercase">Upload</h1>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-xs text-neutral-500 hover:text-neutral-300 tracking-widest uppercase"
        >
          Sign Out
        </button>
      </div>

      {/* Album selector */}
      <section className="mb-6">
        <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">Album</label>
        <div className="flex gap-2">
          <select
            value={selectedAlbum}
            onChange={(e) => setSelectedAlbum(e.target.value)}
            className="flex-1 bg-beige-100 border border-neutral-700 px-4 py-2.5 text-sm rounded focus:outline-none focus:border-neutral-400"
          >
            <option value="">Select album...</option>
            {albums.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
          <button
            onClick={() => setShowNewAlbum((v) => !v)}
            className="px-4 py-2.5 text-xs bg-beige-100 border border-neutral-700 rounded hover:bg-neutral-700 transition-colors"
          >
            + New
          </button>
        </div>

        {showNewAlbum && (
          <div className="mt-3 p-4 bg-beige-100 border border-neutral-800 rounded flex flex-col gap-3">
            <input
              placeholder="Album name"
              value={newAlbumName}
              onChange={(e) => setNewAlbumName(e.target.value)}
              className="bg-beige-100 border border-beige-200 px-3 py-2 text-sm rounded focus:outline-none focus:border-neutral-400"
            />
            <input
              placeholder="Description (optional)"
              value={newAlbumDesc}
              onChange={(e) => setNewAlbumDesc(e.target.value)}
              className="bg-beige-100 border border-neutral-700 px-3 py-2 text-sm rounded focus:outline-none focus:border-neutral-400"
            />
            <button
              onClick={createAlbum}
              className="bg-beige-200 text-neutral-900 py-2 text-xs tracking-widest uppercase rounded hover:bg-white transition-colors"
            >
              Create Album
            </button>
          </div>
        )}
      </section>

      {/* Photo metadata */}
      <section className="mb-6 flex flex-col gap-4">
        <div>
          <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">Title (optional)</label>
          <input
            placeholder="e.g. Shibuya Crossing at Night"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-beige-100 border border-neutral-700 px-4 py-2.5 text-sm rounded focus:outline-none focus:border-neutral-400"
          />
        </div>

        <div>
          <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full bg-beige-100 border border-neutral-700 px-4 py-2.5 text-sm rounded focus:outline-none focus:border-neutral-400"
          >
            <option value="">No country</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">Date taken (optional)</label>
          <input
            type="date"
            value={takenAt}
            onChange={(e) => setTakenAt(e.target.value)}
            className="w-full bg-beige-100 border border-neutral-700 px-4 py-2.5 text-sm rounded focus:outline-none focus:border-neutral-400"
          />
        </div>
      </section>

      {/* Upload button */}
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={(result) => {
          if (result.info && typeof result.info === 'object') {
            handleUploadSuccess(result.info as UploadResult)
          }
        }}
        options={{
          multiple: true,
          resourceType: 'image',
          maxFileSize: 20000000,
        }}
      >
        {({ open }) => (
          <button
            onClick={() => {
              if (!selectedAlbum) {
                setStatus('Please select an album before uploading.')
                return
              }
              setStatus('')
              open()
            }}
            className="w-full py-4 border-2 border-dashed border-neutral-700 rounded text-neutral-400 text-sm tracking-widest uppercase hover:border-neutral-500 hover:text-neutral-200 transition-colors"
          >
            Click to select photos
          </button>
        )}
      </CldUploadWidget>

      {status && (
        <p className={`mt-4 text-sm ${status.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
          {status}
        </p>
      )}
    </div>
  )
}
