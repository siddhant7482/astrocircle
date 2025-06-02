import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    try {
      await supabase.auth.exchangeCodeForSession(code)
      
      // After successful verification, redirect to a verification success page
      return NextResponse.redirect(requestUrl.origin + '/auth/verification-success')
    } catch (error) {
      // If verification fails, redirect to verification error page
      return NextResponse.redirect(requestUrl.origin + '/auth/verification-error')
    }
  }

  // If no code is present, redirect to login
  return NextResponse.redirect(requestUrl.origin + '/login')
} 