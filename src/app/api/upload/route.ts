import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { auth } from '@/lib/auth'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { cloudinaryId, url, width, height, title, albumId, country, countryName, lat, lng, takenAt } = body

  // Optionally set the album cover if it has none yet
  const { data: album } = await supabaseAdmin
    .from('albums')
    .select('cover_url')
    .eq('id', albumId)
    .single()

  const updates: Record<string, string> = {}
  if (!album?.cover_url) updates.cover_url = url

  if (Object.keys(updates).length > 0) {
    await supabaseAdmin.from('albums').update(updates).eq('id', albumId)
  }

  const { data, error } = await supabaseAdmin
    .from('photos')
    .insert({
      cloudinary_id: cloudinaryId,
      url,
      width,
      height,
      title,
      album_id: albumId,
      country,
      country_name: countryName,
      lat,
      lng,
      taken_at: takenAt || null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
