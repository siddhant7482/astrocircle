import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { cookies } from 'next/headers'
import { createSession } from '@/lib/session-store'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Sign in with Supabase Admin client
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      )
    }

    if (!data.user || !data.session) {
      return NextResponse.json(
        { error: 'Login failed' },
        { status: 401 }
      )
    }

    // Check if profile exists, create minimal one if not
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (profileError && profileError.code === 'PGRST116') {
      // Profile doesn't exist, create minimal one
      const { error: insertError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email,
          full_name: null,
          birth_date: null,
          birth_place: null,
          birth_time: null,
        })

      if (insertError) {
        console.error('Error creating profile:', insertError)
      }
    }

    // Create a custom session that doesn't expose Supabase tokens
    const sessionId = createSession({
      userId: data.user.id,
      email: data.user.email || '',
      supabaseAccessToken: data.session.access_token,
      supabaseRefreshToken: data.session.refresh_token,
      expiresIn: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    // Set HTTP-only cookie with custom session ID (no Supabase data exposed)
    const cookieStore = await cookies()
    cookieStore.set('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })
    


    return NextResponse.json({
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      message: 'Login successful'
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 