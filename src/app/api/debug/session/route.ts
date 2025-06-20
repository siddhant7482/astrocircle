import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies()
    
    // Get all cookies
    const allCookies = cookieStore.getAll()
    
    // Check for specific session cookies
    const sessionId = cookieStore.get('session_id')?.value
    const legacyAuth = cookieStore.get('supabase-auth-token')?.value
    const legacyRefresh = cookieStore.get('supabase-refresh-token')?.value
    
    return NextResponse.json({
      hasSessionId: !!sessionId,
      sessionId: sessionId ? 'present' : 'missing',
      hasLegacyAuth: !!legacyAuth,
      hasLegacyRefresh: !!legacyRefresh,
      totalCookies: allCookies.length,
      cookieNames: allCookies.map(c => c.name),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Debug session error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    )
  }
} 