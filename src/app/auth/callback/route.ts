import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Exchange the code for a session
    const { data: { session }, error: authError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.redirect(`${requestUrl.origin}/login?error=auth`);
    }

    if (!session?.user) {
      console.error('No user in session');
      return NextResponse.redirect(`${requestUrl.origin}/login?error=no_user`);
    }

    // After successful verification, redirect to profile completion
    return NextResponse.redirect(new URL('/profile', requestUrl.origin));
  }

  // If no code is present, redirect to login
  return NextResponse.redirect(new URL('/login', requestUrl.origin));
} 