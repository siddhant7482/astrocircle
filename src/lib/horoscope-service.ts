interface HoroscopeResponse {
  health: string;
  career: string;
  love: string;
  wealth: string;
  scores: {
    health: number;
    career: number;
    love: number;
    wealth: number;
  };
}

export async function getHoroscopeReading(
  birthDate: string,
  birthTime: string,
  birthPlace: string
): Promise<HoroscopeResponse> {
  try {
    console.log('Sending request with:', JSON.stringify({ birthDate, birthTime, birthPlace }, null, 2));
    const response = await fetch('/api/horoscope', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        birthDate,
        birthTime,
        birthPlace,
      }),
    });

    const errorData = await response.json();
    if (!response.ok) {
      console.error('API error details:', JSON.stringify(errorData, null, 2));
      throw new Error(errorData.error || 'Failed to fetch horoscope reading');
    }

    return errorData;
  } catch (error) {
    console.error('Error fetching horoscope:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to fetch horoscope: ${errorMessage}`);
  }
}

export async function getHistoricalReadings(
  birthDate: string,
  months: number = 3
): Promise<{
  health: Array<{ date: string; value: number }>;
  career: Array<{ date: string; value: number }>;
  love: Array<{ date: string; value: number }>;
  wealth: Array<{ date: string; value: number }>;
}> {
  // In a real application, this would fetch historical data from a database
  // For now, we'll return mock data
  const aspects = ['health', 'career', 'love', 'wealth'] as const;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  const result: {
    health: Array<{ date: string; value: number }>;
    career: Array<{ date: string; value: number }>;
    love: Array<{ date: string; value: number }>;
    wealth: Array<{ date: string; value: number }>;
  } = {
    health: [],
    career: [],
    love: [],
    wealth: []
  };
  
  aspects.forEach(aspect => {
    result[aspect] = Array.from({ length: months }, (_, i) => ({
      date: monthNames[(currentMonth - i + 12) % 12],
      value: Math.floor(Math.random() * 30) + 70 // Random value between 70-100
    })).reverse();
  });
  
  return result;
} 