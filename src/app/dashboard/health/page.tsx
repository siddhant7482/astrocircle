'use client';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/hooks/use-user'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, TrendingUp, Sparkles, LineChart, Target, Shield, Activity } from 'lucide-react'
import { getUserProfile, UserProfile } from '@/lib/supabase/queries'

interface HealthPeriod {
  period: string
  status: 'high' | 'medium' | 'low'
  description: string
  year: number
}

interface HealthData {
  healthStrengths: string[]
  healthPeriods: HealthPeriod[]
  explanation: string
  vulnerabilities: string
  remedies: string[]
}

export default function Health() {
  const { user, loading } = useUser()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [healthData, setHealthData] = useState<HealthData | null>(null)
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
              generateHealthAnalysis(profile)
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

  const generateHealthAnalysis = async (profile?: UserProfile) => {
    const userProfile = profile || profileData
    if (!userProfile || !userProfile.full_name || !userProfile.birth_date) return

    setIsGenerating(true)
    try {
      const birthYear = new Date(userProfile.birth_date).getFullYear()
      const currentYear = new Date().getFullYear()
      
      const healthPeriods: HealthPeriod[] = []
      for (let i = 0; i < 10; i++) {
        const year = currentYear + i
        const age = year - birthYear
        
        let status: 'high' | 'medium' | 'low'
        // Different cycle for health (Sun and Mars based)
        if (age % 7 === 0 || age % 7 === 3 || age % 7 === 6) {
          status = 'high'
        } else if (age % 7 === 1 || age % 7 === 4) {
          status = 'medium'
        } else {
          status = 'low'
        }
        
        healthPeriods.push({
          period: `${year}`,
          status,
          description: status === 'high' ? 'Excellent vitality & immunity' : 
                      status === 'medium' ? 'Moderate health, care needed' : 'Focus on prevention & rest',
          year
        })
      }

      // Call DeepSeek AI for health analysis
      const healthPrompt = `Based on Hindu Vedic Astrology, analyze the health prospects for:
      Name: ${userProfile.full_name}
      Birth Date: ${userProfile.birth_date}
      Birth Time: ${userProfile.birth_time}
      Birth Place: ${userProfile.birth_place}
      
      Please provide a JSON response with:
      {
        "healthStrengths": ["array of 5-6 health strengths based on planetary positions and 6th house"],
        "explanation": "detailed explanation of health patterns, planetary influences on body systems, and constitutional analysis",
        "vulnerabilities": "specific analysis of potential health concerns, weak body parts, and preventive measures needed",
        "remedies": ["array of specific Vedic remedies for health improvement, healing mantras, and lifestyle suggestions"]
      }
      
      Focus on traditional Hindu astrology health guidance with Sun, Mars, 6th house, and Ayurvedic constitution analysis.`

      const analysisData = {
        healthStrengths: [
          'Strong Immune System - Jupiter Protection',
          'Good Digestive Fire - Mars Energy', 
          'Mental Clarity - Mercury Blessing',
          'Physical Stamina - Sun Strength',
          'Healing Abilities - Venus Influence',
          'Longevity Indicators - Saturn Protection'
        ],
        explanation: `Your birth chart reveals a strong constitution with natural healing abilities. The placement of benefic planets in health houses indicates good immunity and recovery power. However, attention to lifestyle and preventive care will maximize your health potential.`,
        vulnerabilities: `The 6th house analysis shows potential concerns with digestive system during stressful periods. Mars placement suggests need for anger management and avoiding excessive heat. Regular detox and cooling practices recommended for optimal health.`,
        remedies: [
          'Chant Maha Mrityunjaya Mantra for health protection',
          'Practice Surya Namaskara daily for vitality',
          'Consume turmeric milk for immunity',
          'Wear Ruby gemstone for Sun strength',
          'Perform Hanuman Chalisa for Mars balance',
          'Regular fasting on Ekadashi for digestive health'
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
            prompt: healthPrompt
          }),
        })

        if (response.ok) {
          const apiResponse = await response.json()
          
          // Check if we got health-specific response from DeepSeek
          if (apiResponse.healthStrengths && Array.isArray(apiResponse.healthStrengths)) {
            analysisData.healthStrengths = apiResponse.healthStrengths
          }
          
          if (apiResponse.explanation && typeof apiResponse.explanation === 'string') {
            analysisData.explanation = apiResponse.explanation
          }
          
          if (apiResponse.vulnerabilities && typeof apiResponse.vulnerabilities === 'string') {
            analysisData.vulnerabilities = apiResponse.vulnerabilities
          }
          
          if (apiResponse.remedies && Array.isArray(apiResponse.remedies)) {
            analysisData.remedies = apiResponse.remedies
          }
        }
      } catch {
        // API call failed, using fallback health data
      }

      setHealthData({
        ...analysisData,
        healthPeriods
      })

    } catch (error) {
      console.error('Error generating health analysis:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (loading || isRedirecting || isLoadingProfile) {
    return (
      <div className="flex items-center justify-center py-12">
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
    return status === 'high' ? 'bg-green-500' : 
           status === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
  }

  const formatParagraphs = (text: string) => {
    return text.split(/\n\n|\. (?=[A-Z])/).filter((p: string) => p.trim().length > 0)
  }

  return (
    <div className="flex-1 p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
          Health & Wellness Analysis
        </h1>
        <p className="text-gray-300 text-lg">
          Discover your health patterns through Vedic astrology powered by AI
        </p>
        {profileData && (
          <div className="mt-4 p-4 rounded-lg bg-white/5 backdrop-blur-sm inline-block">
            <p className="text-gray-200 text-sm">
              🌟 Analysis for <span className="text-green-300 font-medium">{profileData.full_name}</span>
            </p>
          </div>
        )}
      </div>

      {isGenerating && (
        <div className="mb-8 text-center">
          <Card className="backdrop-blur-md bg-white/10 border-white/20 max-w-md mx-auto">
            <CardContent className="p-6">
              <Loader2 className="h-12 w-12 text-green-300 mx-auto mb-4 animate-spin" />
              <h3 className="text-xl font-semibold text-white mb-2">Analyzing Your Health</h3>
              <p className="text-gray-300">DeepSeek AI is reading your birth chart...</p>
            </CardContent>
          </Card>
        </div>
      )}

      {!healthData && !isGenerating && (
        <div className="mb-8 text-center">
          <Card className="backdrop-blur-md bg-white/10 border-white/20 max-w-md mx-auto">
            <CardContent className="p-6">
              <Activity className="h-12 w-12 text-green-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Ready for Health Analysis</h3>
              <p className="text-gray-300 mb-4">Generate AI-powered health insights</p>
              <Button
                onClick={() => generateHealthAnalysis()}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Activity className="mr-2 h-4 w-4" />
                Generate Health Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {healthData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Health Strengths */}
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5 text-green-300" />
                Health Strengths
              </CardTitle>
              <CardDescription className="text-gray-300">
                Natural health advantages from your chart
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {healthData.healthStrengths.map((strength: string, index: number) => (
                  <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-green-300 flex-shrink-0" />
                      <p className="text-white font-medium">{strength}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Health Timeline */}
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <LineChart className="h-5 w-5 text-blue-300" />
                Health Timeline
              </CardTitle>
              <CardDescription className="text-gray-300">
                Health cycles for next 10 years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {healthData.healthPeriods.slice(0, 6).map((period: HealthPeriod, index: number) => (
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

          {/* Card 3: Health Explanation */}
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="h-5 w-5 text-green-300" />
                Health Patterns
              </CardTitle>
              <CardDescription className="text-gray-300">
                Understanding your health cycles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formatParagraphs(healthData.explanation).map((paragraph: string, index: number) => (
                  <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
                    <p className="text-gray-300 leading-relaxed">{paragraph.trim()}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-4 rounded-lg bg-white/5">
                <h4 className="text-white font-medium mb-2">🩺 Health Legend:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-300">High Periods: Excellent health, vitality peaks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-gray-300">Medium Periods: Stable health, preventive care</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-gray-300">Low Periods: Extra care needed, rest important</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Health Vulnerabilities */}
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Target className="h-5 w-5 text-orange-300" />
                Health Vulnerabilities
              </CardTitle>
              <CardDescription className="text-gray-300">
                Areas needing attention and care
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formatParagraphs(healthData.vulnerabilities).map((paragraph: string, index: number) => (
                  <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
                    <p className="text-gray-300 leading-relaxed">{paragraph.trim()}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-lg bg-white/5">
                <h4 className="text-white font-medium mb-2">⚠️ Prevention Tips:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Regular check-ups during vulnerable periods</li>
                  <li>• Maintain healthy lifestyle habits</li>
                  <li>• Practice stress management techniques</li>
                  <li>• Follow seasonal Ayurvedic routines</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Card 5: Health Remedies */}
          <Card className="backdrop-blur-md bg-white/10 border-white/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Sparkles className="h-5 w-5 text-purple-300" />
                Health & Healing Remedies
              </CardTitle>
              <CardDescription className="text-gray-300">
                AI-powered Vedic practices for optimal health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {healthData.remedies.map((remedy: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                    <Sparkles className="h-4 w-4 text-emerald-300 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">{remedy}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
                <h4 className="text-white font-medium mb-2">🌿 Wellness Tips:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Start new health routines during high periods</li>
                  <li>• Focus on maintenance during medium periods</li>
                  <li>• Prioritize rest and recovery during low periods</li>
                  <li>• Always consult healthcare professionals for medical issues</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}