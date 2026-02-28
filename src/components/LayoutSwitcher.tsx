'use client'

import { LayoutMode } from '@/types'

interface Props {
  mode: LayoutMode
  onChange: (mode: LayoutMode) => void
}

const modes: { value: LayoutMode; label: string }[] = [
  { value: 'grid', label: 'Grid' },
  { value: 'masonry', label: 'Masonry' },
  { value: 'slideshow', label: 'Slideshow' },
]

export default function LayoutSwitcher({ mode, onChange }: Props) {
  return (
    <div className="flex gap-1 bg-neutral-900 rounded p-1">
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => onChange(m.value)}
          className={`px-4 py-1.5 text-xs tracking-widest uppercase rounded transition-colors ${
            mode === m.value
              ? 'bg-neutral-100 text-neutral-900'
              : 'text-neutral-400 hover:text-neutral-100'
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
