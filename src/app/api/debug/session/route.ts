import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSession } from '@/lib/session-store'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('session_id')?.value

    const debugInfo: Record<string, unknown> = {
      hasSessionIdCookie: !!sessionId,
      sessionId: sessionId ? sessionId.substring(0, 16) + '...' : null, // Only show first 16 chars for security
      sessionExists: sessionId ? !!getSession(sessionId) : false,
      allCookies: Object.fromEntries(
        cookieStore.getAll().map(cookie => [cookie.name, cookie.value.substring(0, 20) + '...'])
      )
    }

    if (sessionId) {
      const session = getSession(sessionId)
      if (session) {
        debugInfo.sessionValid = true
        debugInfo.sessionExpiry = new Date(session.expiresAt).toISOString()
        debugInfo.isExpired = Date.now() > session.expiresAt
      } else {
        debugInfo.sessionValid = false
      }
    }

    return NextResponse.json(debugInfo)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
} 