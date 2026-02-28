import Link from 'next/link'
import Image from 'next/image'
import { Album } from '@/types'

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <Link href={`/albums/${album.slug}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden bg-neutral-900 relative">
        {album.cover_url ? (
          <Image
            src={album.cover_url}
            alt={album.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-700 text-sm">
            No cover
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="mt-3">
        <h2 className="text-sm font-medium tracking-wide">{album.name}</h2>
        {album.description && (
          <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{album.description}</p>
        )}
      </div>
    </Link>
  )
}
