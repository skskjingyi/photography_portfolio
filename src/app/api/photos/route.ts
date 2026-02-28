import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const albumId = searchParams.get('albumId')
  const country = searchParams.get('country')

  let query = supabase.from('photos').select('*').order('taken_at', { ascending: false })

  if (albumId) query = query.eq('album_id', albumId)
  if (country) query = query.eq('country', country)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
