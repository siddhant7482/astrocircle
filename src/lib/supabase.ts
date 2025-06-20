// DEPRECATED: This file is kept for backward compatibility only
// All auth operations should now use the API routes:
// - /api/auth/login
// - /api/auth/register  
// - /api/auth/logout
// - /api/auth/session

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

// This client should ONLY be used for public, non-sensitive operations
// All authentication and database operations should go through API routes
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,  // Disable session persistence
    autoRefreshToken: false, // Disable token refresh
    detectSessionInUrl: false // Disable URL session detection
  }
})

export type UserProfile = {
  id: string
  full_name: string
  birth_date: string
  birth_time: string
  birth_place: string
  zodiac_sign?: string
  created_at: string
} 