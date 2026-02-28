'use client'

import { useRouter } from 'next/navigation'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'
import { CountryStat } from '@/types'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// Maps numeric ISO 3166-1 numeric codes to alpha-2 codes
// react-simple-maps uses numeric IDs from world-atlas
import { COUNTRIES } from '@/lib/countries'

// Build a lookup: numeric id -> alpha-2 (world-atlas uses ISO 3166-1 numeric)
// We'll match by name since world-atlas geo properties include name
// Actually we'll compare via the geography's properties.ISO_A2 field
// world-atlas 110m has properties: name (string) — no ISO codes by default
// We'll use a separate topojson that includes ISO_A2, or match by name.
// For simplicity, the geography id is ISO 3166-1 numeric — we store alpha-2.
// We use an external lookup table for numeric → alpha-2.

interface Props {
  stats: CountryStat[]
}

export default function WorldMap({ stats }: Props) {
  const router = useRouter()
  const litCountries = new Set(stats.map((s) => s.country))

  return (
    <div className="w-full bg-neutral-900 rounded overflow-hidden">
      <ComposableMap
        projectionConfig={{ scale: 147 }}
        style={{ width: '100%', height: 'auto' }}
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // world-atlas country name → try to find matching country code
                const geoName = geo.properties.name as string
                const match = COUNTRIES.find(
                  (c) => c.name.toLowerCase() === geoName.toLowerCase()
                )
                const code = match?.code
                const isLit = code ? litCountries.has(code) : false
                const stat = stats.find((s) => s.country === code)

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (isLit && code) router.push(`/map/${code}`)
                    }}
                    style={{
                      default: {
                        fill: isLit ? '#e5e5e5' : '#262626',
                        stroke: '#404040',
                        strokeWidth: 0.5,
                        outline: 'none',
                        cursor: isLit ? 'pointer' : 'default',
                        transition: 'fill 0.2s',
                      },
                      hover: {
                        fill: isLit ? '#ffffff' : '#303030',
                        stroke: '#404040',
                        strokeWidth: 0.5,
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#a3a3a3',
                        outline: 'none',
                      },
                    }}
                    title={isLit && stat ? `${stat.country_name} — ${stat.count} photo${stat.count !== 1 ? 's' : ''}` : geoName}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}
