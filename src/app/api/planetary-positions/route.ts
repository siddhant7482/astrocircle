import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getPlanetaryPositions } from '@/lib/planetary-service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Check if user is authenticated
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError || !session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if profile exists and has birth details
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('birth_date, birth_time, birth_place')
      .eq('id', session.user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Please complete your profile first' },
        { status: 400 }
      );
    }

    if (!profile.birth_date || !profile.birth_time || !profile.birth_place) {
      return NextResponse.json(
        { error: 'Please complete your birth details in your profile' },
        { status: 400 }
      );
    }

    // Get planetary positions for the user
    const positions = await getPlanetaryPositions(session.user.id);
    
    return NextResponse.json(positions);
  } catch (error) {
    console.error('Error in planetary positions API:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to fetch planetary positions' },
      { status: 500 }
    );
  }
} 