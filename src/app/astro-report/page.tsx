'use client';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/hooks/use-user'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Star, User, Calendar, Clock, MapPin, FileText, Sparkles } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getUserProfile, UserProfile } from '@/lib/supabase/queries'

interface UserInfo {
  name: string
  dateOfBirth: string
  timeOfBirth: string
  placeOfBirth: string
}

interface PlanetPosition {
  planet: string
  house: number
  sign: string
  degree: string
}

interface ReportData {
  chartAnalysis: string
  planetPositions: PlanetPosition[]
  detailedAnalysis: string
  remedies: string[]
  yogas?: string[]
  dashaAnalysis?: string
}

export default function AstroReport() {
  const { user, loading } = useUser()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: ''
  })
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [profileData, setProfileData] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      setIsRedirecting(true)
      router.push('/login')
    }
  }, [user, loading, router])

  // Fetch user profile data when user is available
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && user.id) {
        setIsLoadingProfile(true)
        try {
          const profile = await getUserProfile(user.id)
          setProfileData(profile)
          
          if (profile) {
            // Pre-populate form with existing data
            setUserInfo({
              name: profile.full_name || '',
              dateOfBirth: profile.birth_date || '',
              timeOfBirth: profile.birth_time || '',
              placeOfBirth: profile.birth_place || ''
            })
            
            // If all required data is available, set step to show we're ready to generate
            if (profile.full_name && profile.birth_date && profile.birth_time && profile.birth_place) {
              setCurrentStep(1) // Ready to generate chart
            }
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
        } finally {
          setIsLoadingProfile(false)
        }
      }
    }

    fetchUserProfile()
  }, [user])

  // Generate dynamic planetary positions based on birth data
  const generatePlanetaryPositions = (birthDate: string, birthTime: string, birthPlace: string): PlanetPosition[] => {
    // Create a simple hash from birth data to generate consistent but different positions
    const dataString = `${birthDate}${birthTime}${birthPlace}`.toLowerCase()
    const hash = Array.from(dataString).reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    
    // Use hash to seed random-like but consistent positions
    const seededRandom = (seed: number, index: number) => {
      const x = Math.sin(seed + index) * 10000
      return Math.abs(x - Math.floor(x))
    }
    
    const signs = [
      'Aries (Mesha)', 'Taurus (Vrishabh)', 'Gemini (Mithun)', 'Cancer (Karka)',
      'Leo (Simha)', 'Virgo (Kanya)', 'Libra (Tula)', 'Scorpio (Vrishchik)',
      'Sagittarius (Dhanu)', 'Capricorn (Makar)', 'Aquarius (Kumbh)', 'Pisces (Meen)'
    ]
    
    const planets = [
      'Sun (Surya)', 'Moon (Chandra)', 'Mars (Mangal)', 'Mercury (Budh)',
      'Jupiter (Guru)', 'Venus (Shukra)', 'Saturn (Shani)', 'Rahu', 'Ketu'
    ]
    
    return planets.map((planet, index) => {
      const houseRandom = seededRandom(hash, index * 2)
      const signRandom = seededRandom(hash, index * 3)
      const degreeRandom = seededRandom(hash, index * 4)
      
      const house = Math.floor(houseRandom * 12) + 1
      const sign = signs[Math.floor(signRandom * 12)]
      const degree = Math.floor(degreeRandom * 30)
      const minutes = Math.floor((degreeRandom * 60) % 60)
      
      return {
        planet,
        house,
        sign,
        degree: `${degree}°${minutes}'`
      }
    })
  }

  const generateAstroChart = async () => {
    setIsGenerating(true)
    try {
      console.log('Generating chart for:', userInfo)
      
      // First try to get calculated positions from API
      let dynamicPlanetPositions: PlanetPosition[]
      
      try {
        const positionResponse = await fetch('/api/calculate-positions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            birthDate: userInfo.dateOfBirth,
            birthTime: userInfo.timeOfBirth,
            birthPlace: userInfo.placeOfBirth
          }),
        })
        
        if (positionResponse.ok) {
          const positionData = await positionResponse.json()
          dynamicPlanetPositions = positionData.positions
          console.log('API calculated positions:', dynamicPlanetPositions)
        } else {
          throw new Error('API calculation failed')
        }
      } catch (apiError) {
        console.log('API failed, using fallback calculation:', apiError)
        // Fallback to client-side calculation
        dynamicPlanetPositions = generatePlanetaryPositions(
          userInfo.dateOfBirth,
          userInfo.timeOfBirth,
          userInfo.placeOfBirth
        )
      }

      setReportData({
        chartAnalysis: 'Loading detailed Hindu astrology analysis...',
        planetPositions: dynamicPlanetPositions,
        detailedAnalysis: 'Loading detailed analysis...',
        remedies: ['Loading remedies...']
      })

      setCurrentStep(2)
      await generateDetailedAnalysis(dynamicPlanetPositions)
    } catch (error) {
      console.error('Error generating astro chart:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateDetailedAnalysis = async (positions: PlanetPosition[]) => {
    try {
      // Call OpenRouter API for Hindu astrology analysis
      const analysisPrompt = `Based on Hindu Vedic Astrology, analyze this birth chart:
      Birth Details: ${userInfo.name}, born on ${userInfo.dateOfBirth} at ${userInfo.timeOfBirth} in ${userInfo.placeOfBirth}
      
      Planet Positions:
      ${positions.map(p => `${p.planet}: ${p.house}th house in ${p.sign} at ${p.degree}`).join('\n')}
      
      Please provide:
      1. Overall chart analysis focusing on Hindu astrology principles
      2. Detailed explanation of each planet's position and its impact
      3. Vedic remedies and suggestions
      
      Focus on traditional Hindu astrology concepts like dashas, yogas, and nakshatras.`

      const response = await fetch('/api/openrouter-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: analysisPrompt,
          userInfo,
          planetPositions: positions
        }),
      })

      if (response.ok) {
        const rawResponse = await response.json()
        console.log('Raw API Response:', rawResponse)
        
        // Extract clean text content, removing any JSON formatting
        let cleanContent = rawResponse
        
        // If the response is a string that contains JSON, try to parse it
        if (typeof rawResponse === 'string') {
          try {
            cleanContent = JSON.parse(rawResponse)
          } catch (e) {
            // If parsing fails, treat as plain text
            cleanContent = { detailedAnalysis: rawResponse }
          }
        }
        
        // Clean up any markdown/JSON formatting from the content
        const cleanText = (text: any): string => {
          if (typeof text !== 'string') return String(text || '')
          return text
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .replace(/^\s*{[\s\S]*?}\s*$/g, (match) => {
              try {
                const parsed = JSON.parse(match)
                return Object.values(parsed).join('\n\n')
              } catch (e) {
                return match
              }
            })
            .trim()
        }
        
        const parsedAnalysis = {
          chartAnalysis: cleanText(cleanContent.chartAnalysis) || 'Chart analysis based on Hindu Vedic principles...',
          detailedAnalysis: cleanText(cleanContent.detailedAnalysis) || 'Detailed planetary analysis reveals important life patterns...',
          yogas: cleanContent.yogas || cleanContent.dominantYogas || [],
          dashaAnalysis: cleanText(cleanContent.dashaAnalysis) || 'Dasha analysis shows current planetary periods...',
          remedies: cleanContent.remedies || []
        }
        
        // Ensure remedies is always an array
        if (!Array.isArray(parsedAnalysis.remedies)) {
          parsedAnalysis.remedies = [parsedAnalysis.remedies].filter(Boolean)
        }
        
        // Ensure yogas is always an array
        if (!Array.isArray(parsedAnalysis.yogas)) {
          parsedAnalysis.yogas = [parsedAnalysis.yogas].filter(Boolean)
        }
        
        setReportData(prev => prev ? {
          ...prev,
          ...parsedAnalysis
        } : null)
      } else {
        // Fallback to mock data if API fails
        setReportData(prev => prev ? {
          ...prev,
          chartAnalysis: 'Your Hindu astrology chart reveals a strong emphasis on spiritual growth and material success. The placement of planets suggests a balanced life path with opportunities for both personal and professional advancement.',
          detailedAnalysis: 'Sun in 1st house brings leadership qualities and strong personality. Moon in 4th house indicates emotional stability and strong family connections. Jupiter in 5th house suggests wisdom, learning, and spiritual inclinations.',
          yogas: [
            'Raja Yoga - Jupiter in 5th house brings wisdom and authority',
            'Gaja Kesari Yoga - Moon and Jupiter combination for prosperity',
            'Dharma Karma Adhipati Yoga - Strong career and spiritual growth'
          ],
          dashaAnalysis: 'Currently running through a favorable planetary period. Jupiter dasha brings wisdom, growth, and spiritual advancement. This is an excellent time for learning, teaching, and expanding knowledge.',
          remedies: [
            'Recite Gayatri Mantra 108 times daily',
            'Wear Ruby for Sun strength',
            'Donate white rice on Mondays for Moon',
            'Visit Hanuman temple on Tuesdays',
            'Perform Guru puja on Thursdays'
          ]
        } : null)
      }
    } catch (error) {
      console.error('Error generating detailed analysis:', error)
    }
  }

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }))
  }

  if (loading || isRedirecting || isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-white" />
          <p className="text-gray-300">
            {isLoadingProfile ? 'Loading your profile...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
          Hindu Vedic Astrology Report
        </h1>
        <p className="text-gray-300 text-lg">
          Comprehensive astrological analysis based on ancient Hindu Vedic principles
        </p>
      </div>

      <div className="space-y-6">
        {/* Card 1: User Information */}
        <Card className="backdrop-blur-md bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <User className="h-5 w-5 text-purple-300" />
              Personal Information
            </CardTitle>
            <CardDescription className="text-gray-300">
              {profileData && userInfo.name ? 
                'Your saved birth details (you can edit if needed)' : 
                'Enter your birth details for accurate Hindu astrology analysis'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={userInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-white">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={userInfo.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tob" className="text-white">Time of Birth</Label>
                <Input
                  id="tob"
                  type="time"
                  value={userInfo.timeOfBirth}
                  onChange={(e) => handleInputChange('timeOfBirth', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pob" className="text-white">Place of Birth</Label>
                <Input
                  id="pob"
                  placeholder="City, State, Country"
                  value={userInfo.placeOfBirth}
                  onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {profileData && userInfo.name && userInfo.dateOfBirth && userInfo.timeOfBirth && userInfo.placeOfBirth && (
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-green-300 text-sm flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Profile data loaded successfully! Chart will be generated based on: {userInfo.dateOfBirth} at {userInfo.timeOfBirth} in {userInfo.placeOfBirth}
                  </p>
                </div>
              )}
              
              {userInfo.name && userInfo.dateOfBirth && userInfo.timeOfBirth && userInfo.placeOfBirth && (
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <p className="text-blue-300 text-sm">
                    💡 <strong>Chart Updates:</strong> Each time you change your birth details and regenerate, the planetary positions will update based on your new data.
                  </p>
                </div>
              )}
              
              <Button
                onClick={generateAstroChart}
                disabled={isGenerating || !userInfo.name || !userInfo.dateOfBirth || !userInfo.timeOfBirth || !userInfo.placeOfBirth}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Hindu Astrology Chart...
                  </>
                ) : (
                  <>
                    <Star className="mr-2 h-4 w-4" />
                    Generate Vedic Chart
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Astro Chart (Hindu Astrology) */}
        {currentStep >= 2 && (
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Sparkles className="h-5 w-5 text-purple-300" />
                Hindu Vedic Birth Chart
              </CardTitle>
              <CardDescription className="text-gray-300">
                Traditional 12-house chart based on Hindu astrology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square w-full max-w-lg mx-auto">
                <div className="relative border-2 border-white/20 rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm">
                  {/* Diamond shape chart - Traditional Hindu/Vedic layout */}
                  <div className="grid grid-cols-4 grid-rows-4 h-96 gap-1 p-2">
                    {Array.from({ length: 16 }, (_, index) => {
                      const houseNumbers = [12, 1, 2, 3, 11, '', '', 4, 10, '', '', 5, 9, 8, 7, 6]
                      const house = houseNumbers[index]
                      const isEmpty = house === ''
                      
                      return (
                        <div
                          key={index}
                          className={`border rounded-lg p-2 text-xs flex flex-col items-center justify-center transition-all duration-300 ${
                            isEmpty 
                              ? 'border-transparent bg-transparent' 
                              : 'bg-white/10 border-white/30 hover:bg-white/20 hover:border-purple-300/50'
                          }`}
                        >
                          {house && (
                            <>
                              <div className="font-bold text-purple-200 text-sm mb-1">
                                {house}
                              </div>
                              <div className="text-gray-300 text-xs text-center min-h-[40px] flex flex-col justify-center">
                                {reportData?.planetPositions
                                  .filter(p => p.house === Number(house))
                                  .map((p, idx) => (
                                    <div key={idx} className="mb-1">
                                      <span className="text-yellow-300 font-medium">
                                        {p.planet.includes('(') ? p.planet.split(' ')[0] : p.planet}
                                      </span>
                                      <br />
                                      <span className="text-xs text-gray-400">
                                        {p.sign.split(' ')[0]}
                                      </span>
                                    </div>
                                  ))}
                                {reportData?.planetPositions.filter(p => p.house === Number(house)).length === 0 && 
                                  <span className="text-gray-500 text-xs">Empty</span>
                                }
                              </div>
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* Center label */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      Rashi Chart
                    </div>
                  </div>
                </div>
                
                {/* Chart legend */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="text-yellow-300 font-medium">Planets</div>
                    <div className="text-gray-400">Current Positions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-300 font-medium">Houses</div>
                    <div className="text-gray-400">Life Areas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-300 font-medium">Signs</div>
                    <div className="text-gray-400">Zodiac Influence</div>
                  </div>
                </div>
              </div>
                             <div className="mt-4 p-6 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 min-h-[150px]">
                 <div className="text-gray-300 leading-relaxed space-y-3">
                   {reportData?.chartAnalysis.split('\n\n').map((paragraph, index) => (
                     <p key={index} className="text-sm md:text-base">
                       {paragraph.trim()}
                     </p>
                   ))}
                 </div>
               </div>
            </CardContent>
          </Card>
        )}

        {/* Card 3: Planet Positions Table */}
        {reportData && (
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="h-5 w-5 text-purple-300" />
                Planetary Positions
              </CardTitle>
              <CardDescription className="text-gray-300">
                Detailed positions of planets in houses and signs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20">
                    <TableHead className="text-white">Planet</TableHead>
                    <TableHead className="text-white">House</TableHead>
                    <TableHead className="text-white">Sign</TableHead>
                    <TableHead className="text-white">Degree</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.planetPositions.map((position, index) => (
                    <TableRow key={index} className="border-white/10">
                      <TableCell className="text-gray-300 font-medium">{position.planet}</TableCell>
                      <TableCell className="text-gray-300">{position.house}</TableCell>
                      <TableCell className="text-gray-300">{position.sign}</TableCell>
                      <TableCell className="text-gray-300">{position.degree}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

                 {/* Card 4: Detailed Analysis */}
         {reportData && reportData.detailedAnalysis && (
           <Card className="backdrop-blur-md bg-white/10 border-white/20">
             <CardHeader>
               <CardTitle className="flex items-center gap-2 text-white">
                 <Star className="h-5 w-5 text-purple-300" />
                 Detailed Planetary Analysis
               </CardTitle>
               <CardDescription className="text-gray-300">
                 In-depth explanation of planetary positions and their impacts
               </CardDescription>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 <div className="p-6 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 min-h-[200px]">
                   <div className="text-gray-300 leading-relaxed space-y-4">
                     {reportData.detailedAnalysis.split('\n\n').map((paragraph, index) => (
                       <p key={index} className="text-sm md:text-base">
                         {paragraph.trim()}
                       </p>
                     ))}
                   </div>
                 </div>
               </div>
             </CardContent>
           </Card>
         )}

                 {/* Card 5: Yogas */}
         {reportData && reportData.yogas && reportData.yogas.length > 0 && (
           <Card className="backdrop-blur-md bg-white/10 border-white/20">
             <CardHeader>
               <CardTitle className="flex items-center gap-2 text-white">
                 <Star className="h-5 w-5 text-yellow-300" />
                 Planetary Yogas
               </CardTitle>
               <CardDescription className="text-gray-300">
                 Special planetary combinations in your birth chart
               </CardDescription>
             </CardHeader>
             <CardContent>
               <div className="space-y-3">
                 {reportData.yogas.map((yoga, index) => (
                   <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                     <div className="flex items-start gap-3">
                       <Star className="h-5 w-5 text-yellow-300 mt-1 flex-shrink-0" />
                       <div>
                         <p className="text-yellow-200 font-medium mb-1">
                           {yoga.split(' - ')[0]}
                         </p>
                         <p className="text-gray-300 text-sm">
                           {yoga.split(' - ')[1] || yoga}
                         </p>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
         )}

         {/* Card 6: Dasha Analysis */}
         {reportData && reportData.dashaAnalysis && (
           <Card className="backdrop-blur-md bg-white/10 border-white/20">
             <CardHeader>
               <CardTitle className="flex items-center gap-2 text-white">
                 <Clock className="h-5 w-5 text-blue-300" />
                 Dasha Analysis
               </CardTitle>
               <CardDescription className="text-gray-300">
                 Current planetary time periods and their influences
               </CardDescription>
             </CardHeader>
             <CardContent>
               <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
                 <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                   {reportData.dashaAnalysis}
                 </p>
               </div>
             </CardContent>
           </Card>
         )}

         {/* Card 7: Remedies */}
         {reportData && (
           <Card className="backdrop-blur-md bg-white/10 border-white/20">
             <CardHeader>
               <CardTitle className="flex items-center gap-2 text-white">
                 <Sparkles className="h-5 w-5 text-purple-300" />
                 Vedic Remedies & Suggestions
               </CardTitle>
               <CardDescription className="text-gray-300">
                 Traditional Hindu remedies to enhance positive planetary influences
               </CardDescription>
             </CardHeader>
             <CardContent>
               <div className="space-y-3">
                 {reportData.remedies.map((remedy, index) => (
                   <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                     <Star className="h-4 w-4 text-purple-300 mt-1 flex-shrink-0" />
                     <span className="text-gray-300">{remedy}</span>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
         )}
      </div>
    </div>
  )
} 