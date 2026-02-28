export interface Album {
  id: string
  name: string
  slug: string
  description: string | null
  cover_photo_id: string | null
  cover_url: string | null
  created_at: string
  photo_count?: number
}

export interface Photo {
  id: string
  album_id: string
  cloudinary_id: string
  url: string
  width: number
  height: number
  title: string | null
  country: string | null       // ISO 3166-1 alpha-2, e.g. "JP"
  country_name: string | null  // e.g. "Japan"
  lat: number | null
  lng: number | null
  taken_at: string | null
  created_at: string
}

export type LayoutMode = 'grid' | 'masonry' | 'slideshow'

export interface CountryStat {
  country: string
  country_name: string
  count: number
}
