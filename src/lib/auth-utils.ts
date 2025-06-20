import { cookies } from 'next/headers'
import { supabaseAdmin } from './supabase-server'
import { getSession } from './session-store'

export type AuthUser = {
  id: string
  email: string
}

export async function getServerSession(): Promise<{ user: AuthUser | null, session: { access_token: string } | null }> {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('session_id')?.value

    if (!sessionId) {
      return { user: null, session: null }
    }

    // Get session from our secure store
    const session = getSession(sessionId)
    
    if (!session) {
      return { user: null, session: null }
    }

    // Verify the session with Supabase using stored token
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(session.supabaseAccessToken)

    if (error || !user) {
      return { user: null, session: null }
    }

    return {
      user: {
        id: user.id,
        email: user.email || ''
      },
      session: { access_token: 'hidden' } // Never expose actual tokens
    }
  } catch (error) {
    console.error('Session verification error:', error)
    return { user: null, session: null }
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const { user } = await getServerSession()
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  return user
} 