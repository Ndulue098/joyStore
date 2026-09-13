import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceRoleKey = process.env.SUPABASE_KEY!

  if (!serviceRoleKey) {
    throw new Error('SUPABASE_KEY is missing from environment variables.')
  }

  // Pass serviceRoleKey directly as the second parameter
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}