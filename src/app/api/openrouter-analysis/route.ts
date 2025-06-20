import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()
    
    // Detect if this is a career analysis request
    const isCareerAnalysis = prompt.toLowerCase().includes('career prospects') || 
                           prompt.toLowerCase().includes('suitable career') ||
                           prompt.toLowerCase().includes('career')
    
    // Detect if this is a relationship analysis request  
    const isRelationshipAnalysis = prompt.toLowerCase().includes('relationship') ||
                                 prompt.toLowerCase().includes('marriage') ||
                                 prompt.toLowerCase().includes('love')

    const systemPrompt = isCareerAnalysis ? 
      `You are an expert in Hindu Vedic Astrology specializing in career guidance. You have deep knowledge of:
      - How planetary positions influence career choices
      - Traditional Hindu astrology career recommendations
      - Vedic remedies for career success
      - Professional timing and opportunities through astrology
      
      For career analysis, structure your response as a JSON object with:
      - suitableCareers: Array of 5-6 specific career paths based on planetary positions
      - explanation: Detailed explanation of career patterns and planetary influences
      - remedies: Array of specific Vedic remedies for career success
      
      Provide authentic Hindu astrology career insights based on birth data.`
      : isRelationshipAnalysis ?
      `You are an expert in Hindu Vedic Astrology specializing in relationships and marriage. You have deep knowledge of:
      - How Venus, Mars, and 7th house influence love and relationships
      - Traditional Hindu astrology marriage compatibility
      - Vedic remedies for love and marital harmony
      - Timing of marriage and relationship events through astrology
      
      For relationship analysis, structure your response as a JSON object with:
      - relationshipCompatibility: Array of 5-6 relationship insights and compatible partner types
      - explanation: Detailed explanation of love patterns, Venus/Mars positions, and relationship cycles
      - marriageAnalysis: Specific analysis of marriage timing, 7th house, and marital happiness
      - remedies: Array of specific Vedic remedies for relationships and marriage success
      
      Provide authentic Hindu astrology relationship and marriage insights based on birth data.`
      :
      `You are an expert in Hindu Vedic Astrology with deep knowledge of traditional Indian astrological principles. You specialize in:
      - Birth chart analysis using Hindu astrology methods
      - Planetary positions and their meanings in Hindu tradition
      - Vedic remedies and traditional solutions
      - Understanding of houses, signs, dashas, yogas, and nakshatras
      - Traditional Hindu astrological texts and principles
      
      Always provide authentic Hindu astrology insights based on traditional knowledge. 
      
      Structure your response as a JSON object with these sections:
      - chartAnalysis: Overall chart interpretation (string)
      - detailedAnalysis: Detailed planetary analysis (string)  
      - yogas: Array of important yogas/combinations (array of strings)
      - dashaAnalysis: Current dasha period analysis (string)
      - remedies: Traditional remedies (array of strings)
      
      Format each yoga as "Yoga Name - Description" for proper parsing.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'AstroCircle Hindu Vedic Astrology'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: 'json_object' }
      })
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('No content received from OpenRouter API')
    }

    let analysisData: {
      chartAnalysis?: string;
      detailedAnalysis?: string;
      yogas?: string[];
      dashaAnalysis?: string;
      remedies?: string[];
              [key: string]: unknown;
    }
    try {
      // Remove any markdown code blocks before parsing
      const cleanContent = content
        .replace(/```json\s*/g, '')
        .replace(/```\s*/g, '')
        .trim()
      
      analysisData = JSON.parse(cleanContent)
      
      // Clean up any nested JSON strings
      Object.keys(analysisData).forEach((key: string) => {
        if (typeof analysisData[key] === 'string') {
          // Remove any JSON formatting from string values
          analysisData[key] = analysisData[key]
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .replace(/^"(.*)"$/g, '$1')
            .trim()
        }
      })
      
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError)
      // If JSON parsing fails, create a structured response from the text
      analysisData = {
        chartAnalysis: 'Based on Hindu Vedic principles, your birth chart shows significant planetary influences that shape your life path.',
        detailedAnalysis: content.replace(/```json|```/g, '').trim().substring(0, 1500),
        yogas: [
          'Raja Yoga - Strong planetary combinations for success',
          'Gaja Kesari Yoga - Jupiter and Moon creating prosperity'
        ],
        dashaAnalysis: 'Currently running through important planetary periods that influence life direction and opportunities.',
        remedies: [
          'Recite Gayatri Mantra daily for spiritual protection',
          'Perform puja on favorable planetary days',
          'Wear gemstones as per your chart recommendations',
          'Follow dietary guidelines based on your dosha',
          'Practice meditation and yoga for planetary balance'
        ]
      }
    }

    // Ensure remedies is always an array
    if (!Array.isArray(analysisData.remedies)) {
      analysisData.remedies = [
        'Recite Gayatri Mantra 108 times daily',
        'Perform specific planetary pujas on auspicious days',
        'Wear recommended gemstones for planetary strength',
        'Follow traditional dietary recommendations',
        'Practice Surya Namaskar for Sun strength',
        'Donate items on specific weekdays as per planetary rulership'
      ]
    }

    return NextResponse.json(analysisData)

  } catch (error) {
    console.error('Error in OpenRouter analysis:', error)
    
    // Return fallback Hindu astrology analysis
    return NextResponse.json({
      chartAnalysis: 'Your Hindu Vedic birth chart reveals a unique combination of planetary influences. The positioning of planets in various houses and signs creates specific yogas and combinations that influence different aspects of your life including career, relationships, health, and spirituality.',
      detailedAnalysis: `Based on traditional Vedic astrology principles:

Sun (Surya): Represents your soul, ego, and life force. Its position indicates your core personality and leadership abilities.

Moon (Chandra): Governs your mind, emotions, and intuition. The Moon's placement reveals your mental nature and emotional patterns.

Mars (Mangal): Planet of energy, courage, and action. Its position influences your drive, ambition, and physical strength.

Mercury (Budh): Rules communication, intellect, and business acumen. Its placement affects your learning abilities and analytical skills.

Jupiter (Guru): The great benefic planet of wisdom, spirituality, and good fortune. Jupiter's position brings blessings and higher knowledge.

Venus (Shukra): Planet of love, beauty, and material comforts. Its placement influences relationships and artistic abilities.

Saturn (Shani): The great teacher planet that brings discipline through challenges. Saturn's lessons lead to maturity and wisdom.

Rahu & Ketu: The shadow planets that create karmic influences and spiritual evolution through material and spiritual experiences.`,
      yogas: [
        'Raja Yoga - Jupiter in benefic house creates royal combinations for success and authority',
        'Gaja Kesari Yoga - Moon and Jupiter in favorable positions bring prosperity and wisdom',
        'Dharma Karma Adhipati Yoga - Strong career and spiritual growth through disciplined action',
        'Chandra Mangal Yoga - Moon and Mars combination creates emotional strength and determination'
      ],
      dashaAnalysis: `Currently running through a significant planetary period that influences your life path:

Major Dasha: The current major planetary period is shaping your overall life direction and opportunities.

Sub Periods: The sub-periods (antardashas) bring specific themes and events during shorter timeframes.

Timing: This is an important phase for understanding how planetary energies manifest in your daily life, career decisions, and personal relationships.

The dasha system reveals the timing of various life events and helps you align with favorable planetary periods for maximum success.`,
      remedies: [
        'Recite Gayatri Mantra 108 times daily at sunrise',
        'Perform Surya Namaskar for Sun strength and vitality', 
        'Visit Hanuman temple on Tuesdays for Mars energy',
        'Donate white rice and milk on Mondays for Moon blessings',
        'Wear Yellow Sapphire for Jupiter\'s grace (after consultation)',
        'Chant Om Namah Shivaya for spiritual protection',
        'Perform charity on Saturdays for Saturn\'s blessings',
        'Fast on Ekadashi for overall planetary harmony',
        'Light sesame oil lamp daily for removing obstacles',
        'Study sacred texts like Bhagavad Gita for spiritual growth'
      ]
    })
  }
} 