'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/albums', label: 'Albums' },
  { href: '/map', label: 'Map' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
      <Link href="/" className="text-lg font-semibold tracking-widest uppercase text-neutral-100">
        Portfolio
      </Link>
      <div className="flex gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm tracking-wide transition-colors ${
              pathname === href
                ? 'text-white'
                : 'text-neutral-400 hover:text-neutral-100'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
