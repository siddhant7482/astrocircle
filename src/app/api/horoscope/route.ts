import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const API_KEY = process.env.OPENROUTER_API_KEY;
  console.log('API Key available:', !!API_KEY);
  console.log('API Key length:', API_KEY?.length);
  
  if (!API_KEY) {
    console.error('OpenRouter API key is missing');
    return NextResponse.json(
      { error: 'OpenRouter API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    // Validate request body
    const { birthDate, birthTime, birthPlace } = body;

    // Validate required parameters
    if (!birthDate || !birthTime || !birthPlace) {
      const missingParams = {
        birthDate: !birthDate,
        birthTime: !birthTime,
        birthPlace: !birthPlace
      };
      console.log('Missing parameters:', JSON.stringify(missingParams, null, 2));
      return NextResponse.json(
        { error: 'Missing required parameters: birthDate, birthTime, and birthPlace are required', missing: missingParams },
        { status: 400 }
      );
    }

    console.log('Making request to OpenRouter API...');
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'HTTP-Referer': 'https://astrocircle.com',
        'X-Title': 'AstroCircle'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: [
          {
            role: 'system',
            content: 'You are an expert astrologer. Return ONLY a JSON object with the following structure, with no additional text or explanation: { health: "description", career: "description", love: "description", wealth: "description", scores: { health: number, career: number, love: number, wealth: number } }'
          },
          {
            role: 'user',
            content: `Generate a horoscope reading for someone born on ${birthDate} at ${birthTime} in ${birthPlace}. Include specific insights for health, career, love, and wealth aspects, along with numerical scores for each aspect.`
          }
        ]
      })
    });

    const responseData = await response.json();
    console.log('OpenRouter API response status:', response.status);
    
    if (!response.ok) {
      console.error('OpenRouter API error:', JSON.stringify(responseData, null, 2));
      return NextResponse.json(
        { error: 'Failed to fetch horoscope reading', details: responseData },
        { status: response.status }
      );
    }

    if (!responseData.choices?.[0]?.message?.content) {
      console.error('Invalid API response format:', JSON.stringify(responseData, null, 2));
      return NextResponse.json(
        { error: 'Invalid response from OpenRouter API' },
        { status: 500 }
      );
    }

    let content = responseData.choices[0].message.content;
    // Parse the AI response content

    // Extract JSON from the content if it contains markdown code blocks
    if (content.includes('```json')) {
      content = content.split('```json')[1].split('```')[0].trim();
    }
    
    try {
      const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
      
      // Validate the parsed content structure
      if (!parsedContent.health || !parsedContent.career || !parsedContent.love || !parsedContent.wealth || !parsedContent.scores) {
        console.error('Invalid content structure:', JSON.stringify(parsedContent, null, 2));
        throw new Error('Invalid response format from AI');
      }

      return NextResponse.json({
        health: parsedContent.health,
        career: parsedContent.career,
        love: parsedContent.love,
        wealth: parsedContent.wealth,
        scores: {
          health: parsedContent.scores.health || 50,
          career: parsedContent.scores.career || 50,
          love: parsedContent.scores.love || 50,
          wealth: parsedContent.scores.wealth || 50
        }
      });
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse horoscope reading' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 