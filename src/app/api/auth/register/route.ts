import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'
import { cookies } from 'next/headers'
import { createSession } from '@/lib/session-store'

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName, birthDate, birthPlace, birthTime } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Sign up with Supabase Admin client
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (authError) {
      if (authError.message?.includes('already registered')) {
        return NextResponse.json(
          { error: 'This email is already registered. Please try logging in instead.' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    const user = authData.user
    if (!user) {
      return NextResponse.json(
        { error: 'No user returned from signup' },
        { status: 500 }
      )
    }

    // Check if profile already exists (to avoid duplicate key error)
    const { data: existingProfile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!existingProfile) {
      // Create profile row only if it doesn't exist
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert([
          {
            id: user.id,
            email: email,
            full_name: fullName,
            birth_date: birthDate,
            birth_place: birthPlace,
            birth_time: birthTime
          }
        ])

      if (profileError) {
        // Clean up the user if profile creation fails
        await supabaseAdmin.auth.admin.deleteUser(user.id)
        return NextResponse.json(
          { error: 'Failed to create user profile' },
          { status: 500 }
        )
      }
    }

    // Skip session generation link as we'll sign in directly

    // Sign in the user to get a proper session
    const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    })

    if (signInError || !signInData.session) {
      return NextResponse.json(
        { error: 'Registration successful but login failed. Please try logging in.' },
        { status: 201 }
      )
    }

    // Create a custom session that doesn't expose Supabase tokens
    const sessionId = createSession({
      userId: user.id,
      email: user.email || '',
      supabaseAccessToken: signInData.session.access_token,
      supabaseRefreshToken: signInData.session.refresh_token,
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
        id: user.id,
        email: user.email,
      },
      message: 'Registration successful'
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 