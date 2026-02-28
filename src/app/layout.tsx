import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Photography',
  description: 'A personal photography portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-neutral-950 text-neutral-100 min-h-screen`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
