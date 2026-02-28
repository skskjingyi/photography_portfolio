'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Photo } from '@/types'

interface Props {
  photos: Photo[]
}

export default function SlideshowViewer({ photos }: Props) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const paginate = (dir: number) => {
    setDirection(dir)
    setCurrent((prev) => (prev + dir + photos.length) % photos.length)
  }

  if (photos.length === 0) return null

  const photo = photos[current]

  return (
    <div className="relative w-full flex flex-col items-center gap-4">
      {/* Main image */}
      <div className="relative w-full max-w-5xl aspect-[3/2] overflow-hidden bg-neutral-900 rounded">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            initial={{ x: direction * 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -60, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={photo.url}
              alt={photo.title ?? ''}
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors z-10"
        >
          ←
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors z-10"
        >
          →
        </button>
      </div>

      {/* Caption */}
      <div className="text-center">
        {photo.title && <p className="text-neutral-200">{photo.title}</p>}
        {photo.country_name && (
          <p className="text-neutral-500 text-sm">{photo.country_name}</p>
        )}
        <p className="text-neutral-600 text-xs mt-1">
          {current + 1} / {photos.length}
        </p>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto max-w-5xl w-full pb-2">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            className={`flex-shrink-0 w-16 h-12 overflow-hidden rounded transition-opacity ${
              i === current ? 'opacity-100 ring-2 ring-white' : 'opacity-40 hover:opacity-70'
            }`}
          >
            <Image src={p.url} alt="" width={64} height={48} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
