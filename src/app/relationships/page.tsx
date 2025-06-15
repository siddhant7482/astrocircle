'use client';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/hooks/use-user'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Heart, TrendingUp, Sparkles, LineChart, Target, Users } from 'lucide-react'
import { getUserProfile, UserProfile } from '@/lib/supabase/queries'

interface RelationshipPeriod {
  period: string
  status: 'high' | 'medium' | 'low'
  description: string
  year: number
}

interface RelationshipData {
  relationshipCompatibility: string[]
  relationshipPeriods: RelationshipPeriod[]
  explanation: string
  marriageAnalysis: string
  remedies: string[]
}

export default function Relationships() {
  const { user, loading } = useUser()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [relationshipData, setRelationshipData] = useState<RelationshipData | null>(null)
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
              generateRelationshipAnalysis(profile)
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

  const generateRelationshipAnalysis = async (profile?: UserProfile) => {
    const userProfile = profile || profileData
    if (!userProfile || !userProfile.full_name || !userProfile.birth_date) return

    setIsGenerating(true)
    try {
      const birthYear = new Date(userProfile.birth_date).getFullYear()
      const currentYear = new Date().getFullYear()
      
      const relationshipPeriods: RelationshipPeriod[] = []
      for (let i = 0; i < 10; i++) {
        const year = currentYear + i
        const age = year - birthYear
        
        let status: 'high' | 'medium' | 'low'
        // Different cycle for relationships (Venus-based)
        if (age % 8 === 0 || age % 8 === 2 || age % 8 === 5) {
          status = 'high'
        } else if (age % 8 === 1 || age % 8 === 4 || age % 8 === 7) {
          status = 'medium'
        } else {
          status = 'low'
        }
        
        relationshipPeriods.push({
          period: `${year}`,
          status,
          description: status === 'high' ? 'Perfect for love & marriage' : 
                      status === 'medium' ? 'Building relationships' : 'Focus on self-growth',
          year
        })
      }

      // Call DeepSeek AI for relationship analysis
      const relationshipPrompt = `Based on Hindu Vedic Astrology, analyze the relationship and marriage prospects for:
      Name: ${userProfile.full_name}
      Birth Date: ${userProfile.birth_date}
      Birth Time: ${userProfile.birth_time}
      Birth Place: ${userProfile.birth_place}
      
      Please provide a JSON response with:
      {
        "relationshipCompatibility": ["array of 5-6 compatible partner types based on planetary positions and 7th house"],
        "explanation": "detailed explanation of love patterns, Venus influence, Mars energy, and relationship cycles",
        "marriageAnalysis": "specific analysis of marriage timing, 7th house strength, and marital happiness indicators",
        "remedies": ["array of specific Vedic remedies for love, relationships and marriage success"]
      }
      
      Focus on traditional Hindu astrology relationship guidance with Venus, Mars, 7th house analysis.`

      const analysisData = {
        relationshipCompatibility: [
          'Compatible with Earth signs - Stable Partners',
          'Strong Venus influence - Creative Partners', 
          'Jupiter blessing - Spiritual Partners',
          'Mars energy - Passionate Partners',
          'Mercury connection - Intellectual Partners'
        ],
        explanation: `Your birth chart reveals strong Venus influence indicating a loving nature and potential for deep romantic connections. The 7th house shows favorable marriage indicators with Jupiter's blessing for a harmonious partnership.`,
        marriageAnalysis: `The 7th house in your chart shows excellent marriage potential. Jupiter's blessing suggests a spiritually aligned partner who will bring wisdom and growth to your life. Mars placement indicates passion and commitment in relationships.`,
        remedies: [
          'Worship Lord Krishna and Radha for relationship blessings',
          'Wear Rose Quartz for attracting love',
          'Chant Venus mantras on Fridays',
          'Perform marriage prayers at temples',
          'Donate white flowers for Venus strength'
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
            prompt: relationshipPrompt
          }),
        })

        if (response.ok) {
          const apiResponse = await response.json()
          
          // Check if we got relationship-specific response from DeepSeek
          if (apiResponse.relationshipCompatibility && Array.isArray(apiResponse.relationshipCompatibility)) {
            analysisData.relationshipCompatibility = apiResponse.relationshipCompatibility
            console.log('✅ Using DeepSeek AI relationship compatibility')
          }
          
          if (apiResponse.explanation && typeof apiResponse.explanation === 'string') {
            analysisData.explanation = apiResponse.explanation
            console.log('✅ Using DeepSeek AI relationship explanation')
          }
          
          if (apiResponse.marriageAnalysis && typeof apiResponse.marriageAnalysis === 'string') {
            analysisData.marriageAnalysis = apiResponse.marriageAnalysis
            console.log('✅ Using DeepSeek AI marriage analysis')
          }
          
          if (apiResponse.remedies && Array.isArray(apiResponse.remedies)) {
            analysisData.remedies = apiResponse.remedies
            console.log('✅ Using DeepSeek AI relationship remedies')
          }
          
          console.log('🤖 DeepSeek AI Response:', {
            hasCompatibility: !!apiResponse.relationshipCompatibility,
            hasExplanation: !!apiResponse.explanation,
            hasMarriage: !!apiResponse.marriageAnalysis,
            hasRemedies: !!apiResponse.remedies
          })
        }
      } catch {
        console.log('API call failed, using fallback relationship data')
      }

      setRelationshipData({
        ...analysisData,
        relationshipPeriods
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
    return status === 'high' ? 'bg-pink-500' : 
           status === 'medium' ? 'bg-purple-500' : 'bg-blue-500'
  }

  const formatParagraphs = (text: string) => {
    return text.split(/\n\n|\. (?=[A-Z])/).filter((p: string) => p.trim().length > 0)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
          Relationship & Marriage Analysis
        </h1>
        <p className="text-gray-300 text-lg">
          Discover your love life through Vedic astrology powered by AI
        </p>
        {profileData && (
          <div className="mt-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm inline-block">
            <p className="text-gray-200 text-sm">
              🌟 Analysis for <span className="text-pink-300 font-medium">{profileData.full_name}</span>
            </p>
          </div>
        )}
      </div>

      {isGenerating && (
        <div className="mb-8 text-center">
          <Card className="backdrop-blur-md bg-white/10 border-white/20 max-w-md mx-auto">
            <CardContent className="p-6">
              <Loader2 className="h-12 w-12 text-pink-300 mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-semibold text-white mb-2">Analyzing Your Love Life</h3>
              <p className="text-gray-300">DeepSeek AI is reading your birth chart...</p>
            </CardContent>
          </Card>
        </div>
      )}

      {!relationshipData && !isGenerating && (
        <div className="mb-8 text-center">
          <Card className="backdrop-blur-md bg-white/10 border-white/20 max-w-md mx-auto">
            <CardContent className="p-6">
              <Heart className="h-12 w-12 text-pink-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Ready for Love Analysis</h3>
              <p className="text-gray-300 mb-4">Generate AI-powered relationship insights</p>
              <Button
                onClick={() => generateRelationshipAnalysis()}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
              >
                <Heart className="mr-2 h-4 w-4" />
                Generate Love Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {relationshipData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Compatibility */}
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Target className="h-5 w-5 text-pink-300" />
                Relationship Compatibility
              </CardTitle>
              <CardDescription className="text-gray-300">
                Partner types aligned with your chart
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {relationshipData.relationshipCompatibility.map((item: string, index: number) => (
                  <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20">
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-pink-300 flex-shrink-0" />
                      <p className="text-white font-medium">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Timeline */}
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <LineChart className="h-5 w-5 text-purple-300" />
                Love Timeline
              </CardTitle>
              <CardDescription className="text-gray-300">
                Relationship opportunities ahead
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {relationshipData.relationshipPeriods.slice(0, 6).map((period: RelationshipPeriod, index: number) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                    <div className="text-white font-medium w-16">{period.year}</div>
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

          {/* Card 3: Explanation */}
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="h-5 w-5 text-green-300" />
                Love Patterns
              </CardTitle>
              <CardDescription className="text-gray-300">
                Understanding your relationship cycles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formatParagraphs(relationshipData.explanation).map((paragraph: string, index: number) => (
                  <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
                    <p className="text-gray-300 leading-relaxed">{paragraph.trim()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Marriage Analysis */}
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5 text-yellow-300" />
                Marriage Analysis
              </CardTitle>
              <CardDescription className="text-gray-300">
                Sacred union insights from AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formatParagraphs(relationshipData.marriageAnalysis).map((paragraph: string, index: number) => (
                  <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                    <p className="text-gray-300 leading-relaxed">{paragraph.trim()}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-lg bg-white/5">
                <h4 className="text-white font-medium mb-2">🔮 Marriage Indicators:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• 7th House: Partnership sector</li>
                  <li>• Venus: Love and harmony</li>
                  <li>• Jupiter: Sacred blessings</li>
                  <li>• Mars: Passion and commitment</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Card 5: Remedies */}
          <Card className="backdrop-blur-md bg-white/10 border-white/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Sparkles className="h-5 w-5 text-purple-300" />
                Love & Marriage Remedies
              </CardTitle>
              <CardDescription className="text-gray-300">
                AI-powered Vedic practices for relationship success
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relationshipData.remedies.map((remedy: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20">
                    <Sparkles className="h-4 w-4 text-rose-300 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{remedy}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <h4 className="text-white font-medium mb-2">💖 Love Tips:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Best time for proposals: During high periods</li>
                  <li>• Build relationships during medium periods</li>
                  <li>• Focus on self-love during low periods</li>
                  <li>• Always consult an astrologer for marriage timing</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
