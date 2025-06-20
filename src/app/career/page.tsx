'use client';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/hooks/use-user'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Briefcase, TrendingUp, Star, Sparkles, LineChart, Target } from 'lucide-react'
import { getUserProfile, UserProfile } from '@/lib/supabase/queries'

interface CareerPeriod {
  period: string
  status: 'high' | 'medium' | 'low'
  description: string
  year: number
}

interface CareerData {
  suitableCareers: string[]
  careerPeriods: CareerPeriod[]
  explanation: string
  remedies: string[]
}

export default function Career() {
  const { user, loading } = useUser()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [careerData, setCareerData] = useState<CareerData | null>(null)
  const [profileData, setProfileData] = useState<UserProfile | null>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      setIsRedirecting(true)
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && user.id) {
        setIsLoadingProfile(true)
        try {
          const profile = await getUserProfile(user.id)
          setProfileData(profile)
          
          if (profile && profile.full_name && profile.birth_date && profile.birth_time && profile.birth_place) {
            setTimeout(() => {
              generateCareerAnalysis(profile)
            }, 500)
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
        } finally {
          setIsLoadingProfile(false)
        }
      }
    }

    fetchUserProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const generateCareerAnalysis = async (profile?: UserProfile) => {
    const userProfile = profile || profileData
    if (!userProfile || !userProfile.full_name || !userProfile.birth_date) return

    setIsGenerating(true)
    try {
      const birthYear = new Date(userProfile.birth_date).getFullYear()
      const currentYear = new Date().getFullYear()
      
      const careerPeriods: CareerPeriod[] = []
      for (let i = 0; i < 10; i++) {
        const year = currentYear + i
        const age = year - birthYear
        
        let status: 'high' | 'medium' | 'low'
        if (age % 12 === 0 || age % 12 === 5 || age % 12 === 9) {
          status = 'high'
        } else if (age % 12 === 3 || age % 12 === 6 || age % 12 === 8) {
          status = 'medium'
        } else {
          status = 'low'
        }
        
        careerPeriods.push({
          period: `${year}`,
          status,
          description: status === 'high' ? 'Excellent opportunities' : 
                      status === 'medium' ? 'Moderate growth' : 'Focus on preparation',
          year
        })
      }

      // Call DeepSeek AI for career analysis
      const careerPrompt = `Based on Hindu Vedic Astrology, analyze the career prospects for:
      Name: ${userProfile.full_name}
      Birth Date: ${userProfile.birth_date}
      Birth Time: ${userProfile.birth_time}
      Birth Place: ${userProfile.birth_place}
      
      Please provide a JSON response with:
      {
        "suitableCareers": ["array of 5-6 suitable career paths based on planetary positions"],
        "explanation": "detailed explanation of career patterns, planetary influences, and timing cycles",
        "remedies": ["array of specific Vedic remedies for career success"]
      }
      
      Focus on traditional Hindu astrology career guidance with specific career recommendations.`

      const analysisData = {
        suitableCareers: [
          'Technology & Innovation',
          'Finance & Banking',
          'Education & Teaching',
          'Healthcare & Medicine',
          'Business & Entrepreneurship'
        ],
        explanation: `Your birth chart reveals strong indicators for career success through disciplined effort and strategic planning. The planetary positions suggest natural leadership abilities and the capacity for long-term achievement in your chosen field.`,
        remedies: [
          'Recite Gayatri Mantra daily for career success',
          'Wear Yellow Sapphire for Jupiter\'s blessings in career',
          'Donate to educational institutions on Thursdays',
          'Perform Lakshmi puja for financial prosperity'
        ]
      }

      // Call OpenRouter API with DeepSeek
      try {
        const response = await fetch('/api/openrouter-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: careerPrompt
          }),
        })

        if (response.ok) {
          const apiResponse = await response.json()
          
          // Check if we got career-specific response from DeepSeek
          if (apiResponse.suitableCareers && Array.isArray(apiResponse.suitableCareers)) {
            analysisData.suitableCareers = apiResponse.suitableCareers
            // Using DeepSeek AI career recommendations
          }
          
          if (apiResponse.explanation && typeof apiResponse.explanation === 'string') {
            analysisData.explanation = apiResponse.explanation
            // Using DeepSeek AI career explanation
          }
          
          if (apiResponse.remedies && Array.isArray(apiResponse.remedies)) {
            analysisData.remedies = apiResponse.remedies
            // Using DeepSeek AI career remedies
          }
          
          // DeepSeek AI Response processed
        }
              } catch {
          // API call failed, using fallback career data
        }

      setCareerData({
        ...analysisData,
        careerPeriods
      })

    } catch (error) {
      console.error('Error generating career analysis:', error)
    } finally {
      setIsGenerating(false)
    }
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
          Career Analysis & Guidance
        </h1>
        <p className="text-gray-300 text-lg">
          Discover your ideal career path through Vedic astrology insights
        </p>
      </div>

      {!careerData && profileData && (
        <div className="mb-8 text-center">
          <Card className="backdrop-blur-md bg-white/10 border-white/20 max-w-md mx-auto">
            <CardContent className="p-6">
              <Briefcase className="h-12 w-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Ready for Career Analysis</h3>
              <p className="text-gray-300 mb-4">Generate your personalized career insights based on your birth chart</p>
              <Button
                onClick={() => generateCareerAnalysis()}
                disabled={isGenerating}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Generate Career Analysis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {careerData && (
          <>
            <Card className="backdrop-blur-md bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="h-5 w-5 text-purple-300" />
                  Suitable Career Paths
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Career fields aligned with your planetary influences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {careerData.suitableCareers.map((career, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                        <div>
                          <p className="text-white font-medium">{career}</p>
                          <p className="text-gray-400 text-sm">Strong planetary support</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <LineChart className="h-5 w-5 text-blue-300" />
                  Career Timeline (Next 10 Years)
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Predicted highs and lows based on planetary cycles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {careerData.careerPeriods.map((period, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                      <div className="text-white font-medium w-16">{period.period}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(period.status)}`}></div>
                          <span className="text-white text-sm capitalize">{period.status} Period</span>
                        </div>
                        <p className="text-gray-400 text-xs">{period.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="h-5 w-5 text-green-300" />
                  Career Cycle Explanation
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Understanding your career patterns through astrology
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
                  <div className="text-gray-300 leading-relaxed space-y-3">
                    {careerData.explanation.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-sm md:text-base">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 p-4 rounded-lg bg-white/5">
                  <h4 className="text-white font-medium mb-2">Legend:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-gray-300">High Periods: Ideal for major career moves, promotions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-gray-300">Medium Periods: Steady progress, skill development</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-gray-300">Low Periods: Focus on learning, patience required</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Sparkles className="h-5 w-5 text-purple-300" />
                  Career Boosting Remedies
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Vedic practices to enhance your professional success
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {careerData.remedies.map((remedy, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20">
                      <Sparkles className="h-4 w-4 text-orange-300 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{remedy}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                  <h4 className="text-white font-medium mb-2">💡 Pro Tips:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Best time for job changes: During high periods</li>
                    <li>• Use medium periods for skill enhancement</li>
                    <li>• During low periods, focus on networking and preparation</li>
                    <li>• Always consult an astrologer for major career decisions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
