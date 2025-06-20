import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: NextRequest) {
  try {
    const cookieStore = await cookies()
    
    // Clear any legacy Supabase cookies
    cookieStore.set('supabase-auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    })

    cookieStore.set('supabase-refresh-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    })

    // Also clear any client-side Supabase cookies
    const response = NextResponse.json({ message: 'Legacy cookies cleared' })
    
    response.cookies.set('sb-access-token', '', { maxAge: 0, path: '/' })
    response.cookies.set('sb-refresh-token', '', { maxAge: 0, path: '/' })
    
    return response
  } catch (error) {
    console.error('Clear cookies error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 