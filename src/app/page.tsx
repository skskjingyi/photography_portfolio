import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
      <h1 className="text-6xl font-light tracking-widest uppercase mb-4">Portfolio</h1>
      <p className="text-neutral-400 text-lg mb-12 max-w-md">
        A personal collection of photography from around the world.
      </p>
      <div className="flex gap-6 flex-wrap justify-center">
        <Link
          href="/gallery"
          className="px-8 py-3 border border-neutral-700 text-sm tracking-widest uppercase hover:border-neutral-400 hover:text-white transition-colors"
        >
          Gallery
        </Link>
        <Link
          href="/albums"
          className="px-8 py-3 border border-neutral-700 text-sm tracking-widest uppercase hover:border-neutral-400 hover:text-white transition-colors"
        >
          Albums
        </Link>
        <Link
          href="/map"
          className="px-8 py-3 border border-neutral-700 text-sm tracking-widest uppercase hover:border-neutral-400 hover:text-white transition-colors"
        >
          World Map
        </Link>
      </div>
    </div>
  )
}
