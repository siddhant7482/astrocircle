import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { cookies } from 'next/headers'
import { getSession, updateSession } from '@/lib/session-store'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('session_id')?.value

    if (!sessionId) {
      return NextResponse.json(
        { user: null, session: null },
        { status: 200 }
      )
    }

    // Get session from our secure store
    const session = getSession(sessionId)
    
    if (!session) {
      return NextResponse.json(
        { user: null, session: null },
        { status: 200 }
      )
    }

    // Verify the session with Supabase using stored token
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(session.supabaseAccessToken)

        if (error || !user) {
      // Try to refresh the token if available
      if (session.supabaseRefreshToken) {
        const { data: refreshData, error: refreshError } = await supabaseAdmin.auth.refreshSession({
          refresh_token: session.supabaseRefreshToken
        })

        if (refreshError || !refreshData.session) {
          // Clear invalid session
          const clearCookieStore = await cookies()
          clearCookieStore.set('session_id', '', { maxAge: 0, path: '/' })
          
          return NextResponse.json(
            { user: null, session: null },
            { status: 200 }
          )
        }

        // Update session with new tokens
        updateSession(sessionId, {
          supabaseAccessToken: refreshData.session.access_token,
          supabaseRefreshToken: refreshData.session.refresh_token
        })

        return NextResponse.json({
          user: {
            id: refreshData.user?.id,
            email: refreshData.user?.email,
          },
          session: {
            access_token: 'hidden', // Never expose actual tokens
            expires_at: refreshData.session.expires_at
          }
        })
      }

      return NextResponse.json(
        { user: null, session: null },
        { status: 200 }
      )
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
      },
      session: {
        access_token: 'hidden', // Never expose actual tokens
        expires_at: null // We'll handle expiry server-side
      }
    })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json(
      { user: null, session: null },
      { status: 200 }
    )
  }
} 