import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const supabase = supabaseAdmin
    
    // Get user session
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0]

    // Get horoscope for specific date
    const { data, error } = await supabase
      .from('daily_horoscopes')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', date)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ horoscope: null }, { status: 200 })
    }

    return NextResponse.json({ 
      horoscope: {
        date: data.date,
        prediction: data.prediction,
        luckyNumber: data.lucky_number,
        luckyColor: data.lucky_color,
        advice: data.advice,
        planetaryInfluence: data.planetary_influence
      }
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = supabaseAdmin
    
    // Get user session
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { date, prediction, luckyNumber, luckyColor, advice, planetaryInfluence } = body

    if (!date || !prediction || !luckyNumber || !luckyColor || !advice || !planetaryInfluence) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Insert or update horoscope
    const { data, error } = await supabase
      .from('daily_horoscopes')
      .upsert({
        user_id: user.id,
        date,
        prediction,
        lucky_number: luckyNumber,
        lucky_color: luckyColor,
        advice,
        planetary_influence: planetaryInfluence
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to save horoscope' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      horoscope: {
        date: data.date,
        prediction: data.prediction,
        luckyNumber: data.lucky_number,
        luckyColor: data.lucky_color,
        advice: data.advice,
        planetaryInfluence: data.planetary_influence
      }
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 