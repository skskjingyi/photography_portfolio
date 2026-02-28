'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { Photo } from '@/types'

interface Props {
  photos: Photo[]
  mode: 'grid' | 'masonry'
}

export default function PhotoGrid({ photos, mode }: Props) {
  const [index, setIndex] = useState(-1)

  const slides = photos.map((p) => ({ src: p.url, width: p.width, height: p.height }))

  return (
    <>
      <div
        className={
          mode === 'masonry'
            ? 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2'
            : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'
        }
      >
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            onClick={() => setIndex(i)}
            className={`cursor-pointer overflow-hidden group ${mode === 'masonry' ? 'mb-2 break-inside-avoid' : 'aspect-square'}`}
          >
            <Image
              src={photo.url}
              alt={photo.title ?? ''}
              width={photo.width || 800}
              height={photo.height || 600}
              className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                mode === 'grid' ? 'h-full' : ''
              }`}
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        on={{ view: ({ index: i }) => setIndex(i) }}
      />
    </>
  )
}
