import { createClient } from '@supabase/supabase-js'

// Admin client — server-side only (API routes, server actions)
// SUPABASE_SERVICE_ROLE_KEY is not exposed to the browser
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
