import { NextRequest, NextResponse } from 'next/server'

// Enhanced planetary position calculation based on birth data
export async function POST(request: NextRequest) {
  try {
    const { birthDate, birthTime, birthPlace } = await request.json()

    // Calculate more realistic positions based on birth data
    const calculatePlanetaryPositions = (date: string, time: string, place: string) => {
      const birthDateTime = new Date(`${date}T${time}`)
      const year = birthDateTime.getFullYear()
      const month = birthDateTime.getMonth() + 1
      const day = birthDateTime.getDate()
      const hour = birthDateTime.getHours()
      
      // Create a deterministic seed from birth data
      const locationHash = place.toLowerCase().split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0)
        return a & a
      }, 0)
      
      // Calculate Julian day number (simplified)
      const a = Math.floor((14 - month) / 12)
      const y = year + 4800 - a
      const m = month + 12 * a - 3
      const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045
      
      // Hindu zodiac signs with Sanskrit names
      const signs = [
        'Aries (Mesha)', 'Taurus (Vrishabh)', 'Gemini (Mithun)', 'Cancer (Karka)',
        'Leo (Simha)', 'Virgo (Kanya)', 'Libra (Tula)', 'Scorpio (Vrishchik)',
        'Sagittarius (Dhanu)', 'Capricorn (Makar)', 'Aquarius (Kumbh)', 'Pisces (Meen)'
      ]
      
      const planets = [
        { name: 'Sun (Surya)', period: 365.25, base: 0 },
        { name: 'Moon (Chandra)', period: 27.32, base: 120 },
        { name: 'Mars (Mangal)', period: 687, base: 240 },
        { name: 'Mercury (Budh)', period: 88, base: 60 },
        { name: 'Jupiter (Guru)', period: 4333, base: 300 },
        { name: 'Venus (Shukra)', period: 225, base: 180 },
        { name: 'Saturn (Shani)', period: 10759, base: 270 },
        { name: 'Rahu', period: 6793, base: 180 }, // North Node
        { name: 'Ketu', period: 6793, base: 0 }   // South Node (opposite to Rahu)
      ]
      
      return planets.map((planet) => {
        // Calculate approximate position based on orbital periods
        const daysSinceEpoch = jdn - 2451545 // J2000.0 epoch
        const meanLongitude = (planet.base + (360 * daysSinceEpoch / planet.period) + (hour * 15) + (locationHash % 360)) % 360
        
        // Convert to zodiac sign and degree
        const signIndex = Math.floor(meanLongitude / 30)
        const degreeInSign = meanLongitude % 30
        const minutes = Math.floor((degreeInSign % 1) * 60)
        const degree = Math.floor(degreeInSign)
        
        // Calculate house position (simplified)
        const housePosition = ((signIndex + Math.floor(hour / 2) + Math.floor(locationHash / 100)) % 12) + 1
        
        return {
          planet: planet.name,
          house: housePosition,
          sign: signs[signIndex],
          degree: `${degree}°${minutes.toString().padStart(2, '0')}'`,
          longitude: meanLongitude.toFixed(2)
        }
      })
    }

    const positions = calculatePlanetaryPositions(birthDate, birthTime, birthPlace)
    
    return NextResponse.json({
      success: true,
      positions,
      birthData: {
        date: birthDate,
        time: birthTime,
        place: birthPlace
      }
    })

  } catch (error) {
    console.error('Error calculating planetary positions:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to calculate positions',
        positions: [] 
      },
      { status: 500 }
    )
  }
} 