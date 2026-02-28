'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { CountryStat } from '@/types'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// WorldMap uses react-simple-maps which requires browser APIs
const WorldMap = dynamic(() => import('@/components/WorldMap'), { ssr: false })

export default function MapPage() {
  const [stats, setStats] = useState<CountryStat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('country_stats')
      .select('*')
      .then(({ data }) => {
        setStats((data as CountryStat[]) ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="pt-20 px-4 sm:px-6 pb-12">
      <div className="mt-6 mb-6">
        <h1 className="text-2xl font-light tracking-widest uppercase">World Map</h1>
        <p className="text-neutral-500 text-sm mt-1">
          {stats.length > 0
            ? `Photos from ${stats.length} countr${stats.length === 1 ? 'y' : 'ies'} — click a lit country to explore`
            : 'No photos with location data yet.'}
        </p>
      </div>

      {loading ? (
        <div className="text-center text-neutral-500 py-20">Loading map...</div>
      ) : (
        <WorldMap stats={stats} />
      )}

      {/* Country list */}
      {stats.length > 0 && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {stats
            .sort((a, b) => b.count - a.count)
            .map((s) => (
              <Link
                key={s.country}
                href={`/map/${s.country}`}
                className="flex items-center justify-between px-4 py-3 bg-neutral-900 rounded hover:bg-neutral-800 transition-colors"
              >
                <span className="text-sm">{s.country_name}</span>
                <span className="text-xs text-neutral-500">{s.count}</span>
              </Link>
            ))}
        </div>
      )}
    </div>
  )
}
