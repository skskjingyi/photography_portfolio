import { createClient } from '@supabase/supabase-js'

// Public client — safe to use in browser and server components
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
