import { supabase } from './supabase';

export interface PlanetaryPosition {
  name: string;
  house: number;
  sign: string;
  degree: number;
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error('OPENROUTER_API_KEY is not set in environment variables');
}

async function calculatePlanetaryPositions(birthDate: string, birthTime: string): Promise<PlanetaryPosition[]> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://astrocircle.vercel.app',
      'X-Title': 'AstroCircle'
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-r1:free',
      messages: [
        {
          role: 'system',
          content: 'You are an expert astrologer specializing in calculating planetary positions. You must respond with a valid JSON array containing exactly 9 planets with their positions. Each planet must have a name (string), house (number 1-12), sign (Sanskrit name string), and degree (number 0-360). Format your response as a pure JSON array with no additional text.'
        },
        {
          role: 'user',
          content: `Calculate the planetary positions for birth date: ${birthDate} and birth time: ${birthTime}. Return an array of exactly 9 objects for Surya (Sun), Chandra (Moon), Mangal (Mars), Budh (Mercury), Guru (Jupiter), Shukra (Venus), Shani (Saturn), Rahu, and Ketu. Each object must follow this format: { "name": string, "house": number 1-12, "sign": string (Sanskrit name), "degree": number 0-360 }`
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenRouter API Error:', errorText);
    throw new Error('Failed to calculate planetary positions');
  }

  const data = await response.json();
  let positions: PlanetaryPosition[];

  try {
    // Parse the response from DeepSeek R1
    const content = data.choices[0].message.content;
    
    // Try to find JSON array in the response
    const match = content.match(/\[[\s\S]*\]/);
    if (!match) {
      throw new Error('No JSON array found in response');
    }
    
    positions = JSON.parse(match[0]);

    // Validate the positions
    if (!Array.isArray(positions) || positions.length !== 9) {
      throw new Error('Invalid positions data format');
    }

    // Ensure all required planets are present
    const requiredPlanets = ['Surya', 'Chandra', 'Mangal', 'Budh', 'Guru', 'Shukra', 'Shani', 'Rahu', 'Ketu'];
    const hasAllPlanets = requiredPlanets.every(planet => 
      positions.some(p => p.name === planet)
    );

    if (!hasAllPlanets) {
      throw new Error('Missing required planets in the response');
    }

    // Validate each position
    positions.forEach(pos => {
      if (
        typeof pos.house !== 'number' || pos.house < 1 || pos.house > 12 ||
        typeof pos.degree !== 'number' || pos.degree < 0 || pos.degree >= 360 ||
        typeof pos.sign !== 'string' || !pos.sign.trim()
      ) {
        throw new Error('Invalid position data format');
      }
    });

  } catch (err) {
    console.error('Error parsing DeepSeek R1 response:', err);
    throw new Error('Failed to parse planetary positions');
  }

  return positions;
}

export async function getPlanetaryPositions(userId: string): Promise<PlanetaryPosition[]> {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    // First try to get from cache
    const { data: cachedData, error: cacheError } = await supabase
      .from('planetary_positions')
      .select('positions, updated_at')
      .eq('user_id', userId)
      .single();

    if (cachedData && !cacheError) {
      // Check if cache is still valid (less than 1 hour old)
      const cacheTime = new Date(cachedData.updated_at).getTime();
      const now = new Date().getTime();
      if (now - cacheTime < 3600000) { // 1 hour in milliseconds
        return cachedData.positions;
      }
    }

    // Get user profile for birth details
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('birth_date, birth_time, birth_place')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError);
      throw new Error('Failed to fetch user profile');
    }
    if (!profile) {
      throw new Error('Please complete your profile first');
    }
    if (!profile.birth_date || !profile.birth_time || !profile.birth_place) {
      throw new Error('Please complete your birth details in your profile');
    }

    // Calculate positions using DeepSeek
    const positions = await calculatePlanetaryPositions(profile.birth_date, profile.birth_time);

    // Cache the results
    const { error: upsertError } = await supabase
      .from('planetary_positions')
      .upsert({
        user_id: userId,
        positions,
        updated_at: new Date().toISOString()
      });

    if (upsertError) {
      console.error('Error caching planetary positions:', upsertError);
      // Don't throw here, we still want to return the positions even if caching failed
    }

    return positions;
  } catch (error) {
    console.error('Error in getPlanetaryPositions:', error);
    throw error;
  }
}

// Helper function to get zodiac sign name in Sanskrit
export function getZodiacSign(degree: number): string {
  const signs = [
    "Mesh", "Vrishabh", "Mithun", "Kark",
    "Singh", "Kanya", "Tula", "Vrishchik",
    "Dhanu", "Makar", "Kumbh", "Meen"
  ];
  const signIndex = Math.floor(degree / 30) % 12;
  return signs[signIndex];
}

// Helper function to get house number (1-12)
export function getHouseNumber(degree: number): number {
  return (Math.floor(degree / 30) % 12) + 1;
} 