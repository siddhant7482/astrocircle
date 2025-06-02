import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST(req: Request) {
  try {
    // Debug log to check environment variable
    console.log('API Key available:', !!process.env.OPENROUTER_API_KEY)
    console.log('API Key value:', process.env.OPENROUTER_API_KEY)

    const { messages } = await req.json()
    const headersList = await headers()
    const referer = headersList.get('referer') || 'http://localhost:3001'

    const messagesWithSystem = [
      {
        role: 'system' as const,
        content: 'You are an expert astrologer helping users understand their birth charts and answering questions about Vedic astrology.'
      },
      ...messages
    ]

    // Log the headers we're sending
    console.log('Request headers:', {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY?.slice(0, 10)}...`,
      'HTTP-Referer': referer,
      'X-Title': 'AstroCircle'
    })

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': referer,
        'X-Title': 'AstroCircle'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
        messages: messagesWithSystem,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenRouter API Error:', error)  // Add error logging
      return NextResponse.json(
        { error: error.error?.message || 'Failed to get response' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 