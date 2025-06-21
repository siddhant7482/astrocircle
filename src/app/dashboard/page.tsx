'use client';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Plus, Star, User, Sun, Moon, Sparkles } from 'lucide-react'
import { getUserProfile, UserProfile } from '@/lib/supabase/queries'
import { secureStorage, clearLegacyHoroscopeData } from '@/lib/encryption'

interface DailyHoroscope {
  date: string
  prediction: string
  luckyNumber: number
  luckyColor: string
  advice: string
  planetaryInfluence: string
}

export default function Dashboard() {
  const { user, isLoading, isAuthenticated, isRedirecting, setIsRedirecting } = useAuth()
  const router = useRouter()
  const [profileData, setProfileData] = useState<UserProfile | null>(null)
  const [dailyHoroscope, setDailyHoroscope] = useState<DailyHoroscope | null>(null)
  const [isGeneratingHoroscope, setIsGeneratingHoroscope] = useState(false)

  // Clear any redirect state when user is authenticated
  useEffect(() => {
    if (isAuthenticated && isRedirecting) {
      setIsRedirecting(false)
    }
  }, [isAuthenticated, isRedirecting, setIsRedirecting])

  // Clear legacy unencrypted data on first load
  useEffect(() => {
    clearLegacyHoroscopeData()
  }, [])

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && user.id) {
        try {
          const profile = await getUserProfile(user.id)
          setProfileData(profile)
          
          // Generate horoscope if profile is complete
          if (profile && profile.full_name && profile.birth_date && profile.birth_time && profile.birth_place) {
            setTimeout(() => {
              generateDailyHoroscope(profile)
            }, 1000)
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
        }
      }
    }

    if (user?.id) {
      fetchUserProfile()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  const generateDailyHoroscope = async (profile?: UserProfile) => {
    const userProfile = profile || profileData
    if (!userProfile || !userProfile.full_name || !userProfile.birth_date) return

    setIsGeneratingHoroscope(true)
    try {
      const today = new Date()
      const dateString = today.toISOString().split('T')[0]
      
      // Check if we already have today's horoscope (encrypted)
      const existingHoroscope = secureStorage.getItem(`horoscope_${dateString}_${userProfile.id}`)
      if (existingHoroscope) {
        setDailyHoroscope(existingHoroscope as DailyHoroscope)
        setIsGeneratingHoroscope(false)
        return
      }

      // Call DeepSeek AI for daily horoscope
      const horoscopePrompt = `Based on Hindu Vedic Astrology, generate today's horoscope for:
      Name: ${userProfile.full_name}
      Birth Date: ${userProfile.birth_date}
      Birth Time: ${userProfile.birth_time}
      Birth Place: ${userProfile.birth_place}
      Current Date: ${today.toDateString()}
      
      Please provide a JSON response with:
      {
        "prediction": "detailed daily prediction based on current planetary transits and birth chart",
        "luckyNumber": [number between 1-9],
        "luckyColor": "auspicious color for today",
        "advice": "specific actionable advice for the day",
        "planetaryInfluence": "dominant planetary influence affecting today"
      }
      
      Focus on traditional Hindu astrology with current planetary positions and their effects on the individual's birth chart.`

      const fallbackHoroscope = {
        date: dateString,
        prediction: "Today brings opportunities for growth and positive transformation. The cosmic energies favor those who approach challenges with wisdom and patience.",
        luckyNumber: Math.floor(Math.random() * 9) + 1,
        luckyColor: ["Gold", "Blue", "Green", "Red", "Yellow"][Math.floor(Math.random() * 5)],
        advice: "Focus on your goals with determination. Trust your intuition and maintain harmony in relationships.",
        planetaryInfluence: "Jupiter's blessing brings wisdom and good fortune to your endeavors today."
      }

      const horoscopeData = { ...fallbackHoroscope }

      // Call OpenRouter API with DeepSeek
      try {
        const response = await fetch('/api/openrouter-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: horoscopePrompt
          }),
        })

        if (response.ok) {
          const apiResponse = await response.json()
          
          if (apiResponse.prediction && typeof apiResponse.prediction === 'string') {
            horoscopeData.prediction = apiResponse.prediction
            // Using AI daily prediction
          }
          
          if (apiResponse.luckyNumber && typeof apiResponse.luckyNumber === 'number') {
            horoscopeData.luckyNumber = apiResponse.luckyNumber
          }
          
          if (apiResponse.luckyColor && typeof apiResponse.luckyColor === 'string') {
            horoscopeData.luckyColor = apiResponse.luckyColor
          }
          
          if (apiResponse.advice && typeof apiResponse.advice === 'string') {
            horoscopeData.advice = apiResponse.advice
          }
          
          if (apiResponse.planetaryInfluence && typeof apiResponse.planetaryInfluence === 'string') {
            horoscopeData.planetaryInfluence = apiResponse.planetaryInfluence
          }
        }
      } catch {
        // API call failed, using fallback horoscope
      }

      // Store encrypted in localStorage for today
      secureStorage.setItem(`horoscope_${dateString}_${userProfile.id}`, horoscopeData)
      setDailyHoroscope(horoscopeData)

    } catch (error) {
      console.error('Error generating horoscope:', error)
    } finally {
      setIsGeneratingHoroscope(false)
    }
  }

  if (isLoading || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-white" />
          <p className="text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const AnimatedCard = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [rotateX, setRotateX] = useState(0)
    const [rotateY, setRotateY] = useState(0)
    const [gradientX, setGradientX] = useState(50)
    const [gradientY, setGradientY] = useState(50)
    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      // Calculate rotation based on mouse position
      const rotateXValue = (y - centerY) / centerY * -10
      const rotateYValue = (x - centerX) / centerX * 10
      
      // Calculate gradient position as percentage
      const gradientXValue = (x / rect.width) * 100
      const gradientYValue = (y / rect.height) * 100
      
      setRotateX(rotateXValue)
      setRotateY(rotateYValue)
      setGradientX(gradientXValue)
      setGradientY(gradientYValue)
    }
    
    const handleMouseEnter = () => {
      setIsHovered(true)
    }
    
    const handleMouseLeave = () => {
      setIsHovered(false)
      setRotateX(0)
      setRotateY(0)
      setGradientX(50)
      setGradientY(50)
    }
    
    return (
      <div
        className="w-full h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'translateZ(20px) scale(1.05)' : 'translateZ(0px) scale(1)'}`,
          transition: isHovered 
            ? 'transform 0.15s ease-out' 
            : 'transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)',
          transformStyle: 'preserve-3d',
          animation: isHovered ? 'cardFloat 3s ease-in-out infinite, cardGlow 2s ease-in-out infinite alternate' : 'none'
        }}
      >
        <Card 
          className="relative backdrop-blur-md bg-white/10 border-white/20 transition-all duration-300 w-full h-full overflow-hidden shadow-xl"
          style={{
            background: isHovered 
              ? `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.15) 40%, rgba(255, 255, 255, 0.1) 100%)`
              : 'rgba(255, 255, 255, 0.1)',
            borderColor: isHovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)',
            boxShadow: isHovered 
              ? '0 25px 50px -12px rgba(147, 51, 234, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 10px 25px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
            animationDelay: `${delay}ms`,
            animation: isHovered ? 'cardPulse 2.5s ease-in-out infinite' : 'none'
          }}
        >
          {/* Animated shine effect that loops */}
          {isHovered && (
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(135deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)`,
                animation: 'shineLoop 2s linear infinite',
                pointerEvents: 'none'
              }}
            />
          )}
          
          {/* Floating orbs animation */}
          {isHovered && (
            <>
              <div
                className="absolute w-2 h-2 bg-purple-400/60 rounded-full"
                style={{
                  animation: 'floatingOrb1 4s ease-in-out infinite',
                  top: '20%',
                  left: '10%'
                }}
              />
              <div
                className="absolute w-3 h-3 bg-blue-400/40 rounded-full"
                style={{
                  animation: 'floatingOrb2 3.5s ease-in-out infinite',
                  top: '70%',
                  right: '15%'
                }}
              />
              <div
                className="absolute w-1.5 h-1.5 bg-indigo-400/50 rounded-full"
                style={{
                  animation: 'floatingOrb3 3s ease-in-out infinite',
                  top: '40%',
                  right: '80%'
                }}
              />
            </>
          )}
          
          {/* Content */}
          <div className="relative z-10 p-0">
            {children}
          </div>
        </Card>
        
        <style jsx>{`
          @keyframes cardFloat {
            0%, 100% {
              transform: translateY(0px) translateZ(20px) scale(1.05);
            }
            50% {
              transform: translateY(-8px) translateZ(25px) scale(1.05);
            }
          }
          
          @keyframes cardGlow {
            0% {
              filter: drop-shadow(0 0 20px rgba(147, 51, 234, 0.3));
            }
            100% {
              filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.4));
            }
          }
          
          @keyframes cardPulse {
            0%, 100% {
              backdrop-filter: blur(16px);
            }
            50% {
              backdrop-filter: blur(20px);
            }
          }
          
          @keyframes shineLoop {
            0% {
              transform: translateX(-100%) translateY(-100%) rotate(45deg);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateX(200%) translateY(200%) rotate(45deg);
              opacity: 0;
            }
          }
          
          @keyframes floatingOrb1 {
            0%, 100% {
              transform: translate(0px, 0px);
              opacity: 0.6;
            }
            25% {
              transform: translate(10px, -15px);
              opacity: 0.8;
            }
            50% {
              transform: translate(-5px, -10px);
              opacity: 0.4;
            }
            75% {
              transform: translate(15px, 5px);
              opacity: 0.7;
            }
          }
          
          @keyframes floatingOrb2 {
            0%, 100% {
              transform: translate(0px, 0px) scale(1);
              opacity: 0.4;
            }
            33% {
              transform: translate(-12px, 8px) scale(1.2);
              opacity: 0.6;
            }
            66% {
              transform: translate(8px, -12px) scale(0.8);
              opacity: 0.3;
            }
          }
          
          @keyframes floatingOrb3 {
            0%, 100% {
              transform: translate(0px, 0px);
              opacity: 0.5;
            }
            40% {
              transform: translate(8px, -8px);
              opacity: 0.7;
            }
            80% {
              transform: translate(-6px, 4px);
              opacity: 0.3;
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
          Welcome to your AstroCircle Dashboard
        </h1>
        <p className="text-gray-300 text-lg">
          Explore your astrological insights and create new readings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <AnimatedCard delay={0}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Plus className="h-5 w-5 text-purple-300" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-gray-300">
              Explore your cosmic insights instantly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-700 hover:to-blue-700 text-white border-none backdrop-blur-sm"
              onClick={() => router.push('/astro-report')}
            >
              <Star className="mr-2 h-4 w-4" />
              Complete Astro Report
            </Button>
            <Button 
              className="w-full justify-start bg-gradient-to-r from-green-600/80 to-blue-600/80 hover:from-green-700 hover:to-blue-700 text-white border-none backdrop-blur-sm"
              onClick={() => router.push('/career')}
            >
              💼 Career Analysis
            </Button>
            <Button 
              className="w-full justify-start bg-gradient-to-r from-pink-600/80 to-purple-600/80 hover:from-pink-700 hover:to-purple-700 text-white border-none backdrop-blur-sm"
              onClick={() => router.push('/relationships')}
            >
              💕 Love & Marriage
            </Button>
            <Button 
              className="w-full justify-start bg-gradient-to-r from-emerald-600/80 to-green-600/80 hover:from-emerald-700 hover:to-green-700 text-white border-none backdrop-blur-sm"
              onClick={() => router.push('/health')}
            >
              🌿 Health Analysis
            </Button>
          </CardContent>
        </AnimatedCard>

        {/* Recent Activity */}
        <AnimatedCard delay={100}>
          <CardHeader>
            <CardTitle className="text-white">Cosmic Insights</CardTitle>
            <CardDescription className="text-gray-300">
              Your astrological journey at a glance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">Birth Chart Available</p>
                  <p className="text-gray-400 text-xs">Your cosmic blueprint is ready</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center">
                  <Sun className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">Daily Guidance</p>
                  <p className="text-gray-400 text-xs">Fresh horoscope every day</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">Life Analysis</p>
                  <p className="text-gray-400 text-xs">Career, Love, Health insights</p>
                </div>
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        {/* Profile Summary */}
        <AnimatedCard delay={200}>
          <CardHeader>
            <CardTitle className="text-white">Astrological Profile</CardTitle>
            <CardDescription className="text-gray-300">
              Your cosmic identity and birth chart status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-white font-medium">
                    {profileData?.full_name || user.email}
                  </p>
                  <p className="text-xs text-gray-400">
                    {profileData?.birth_date ? 'Chart Generated' : 'Seeker of Cosmic Wisdom'}
                  </p>
                </div>
              </div>
              
              {profileData?.birth_date && profileData?.birth_time && profileData?.birth_place ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-200 text-xs font-medium">Profile Complete</span>
                    </div>
                    <p className="text-gray-300 text-xs">
                      📅 Born: {new Date(profileData.birth_date).toLocaleDateString()}<br/>
                      🕐 Time: {profileData.birth_time}<br/>
                      📍 Place: {profileData.birth_place}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded bg-white/5">
                      <div className="text-purple-300 text-xs font-medium">Sun Sign</div>
                      <div className="text-white text-sm">♌</div>
                    </div>
                    <div className="p-2 rounded bg-white/5">
                      <div className="text-blue-300 text-xs font-medium">Moon Sign</div>
                      <div className="text-white text-sm">♋</div>
                    </div>
                    <div className="p-2 rounded bg-white/5">
                      <div className="text-green-300 text-xs font-medium">Rising</div>
                      <div className="text-white text-sm">♐</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-orange-200 text-xs font-medium">Complete Your Profile</span>
                  </div>
                  <p className="text-gray-300 text-xs mb-3">
                    Add your birth details to unlock personalized cosmic insights and detailed astrological analysis
                  </p>
                  <Button 
                    size="sm"
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    onClick={() => router.push('/profile')}
                  >
                    Complete Profile
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </AnimatedCard>
      </div>

      {/* Additional cards for more visual impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <AnimatedCard delay={300}>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sun className="h-5 w-5 text-orange-300" />
              Daily Horoscope
            </CardTitle>
            <CardDescription className="text-gray-300">
              Your personalized Vedic astrology guidance for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isGeneratingHoroscope ? (
              <div className="text-center py-4">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-orange-300" />
                <p className="text-gray-300 text-sm">Consulting the stars...</p>
              </div>
            ) : dailyHoroscope ? (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
                  <p className="text-gray-200 text-sm leading-relaxed">{dailyHoroscope.prediction}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 rounded-lg bg-white/5">
                    <div className="text-orange-300 font-semibold text-lg">{dailyHoroscope.luckyNumber}</div>
                    <div className="text-gray-400 text-xs">Lucky Number</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/5">
                    <div className="text-orange-300 font-semibold text-sm">{dailyHoroscope.luckyColor}</div>
                    <div className="text-gray-400 text-xs">Lucky Color</div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-blue-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-blue-200 text-xs font-medium mb-1">Today&apos;s Advice</p>
                      <p className="text-gray-300 text-xs">{dailyHoroscope.advice}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Moon className="h-3 w-3" />
                  <span>{dailyHoroscope.planetaryInfluence}</span>
                </div>
              </div>
            ) : profileData && profileData.full_name && profileData.birth_date ? (
              <div className="text-center py-4">
                <Button 
                  onClick={() => generateDailyHoroscope()}
                  className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700"
                >
                  <Sun className="mr-2 h-4 w-4" />
                  Get Today&apos;s Horoscope
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 flex items-center justify-center">
                  <Sun className="h-6 w-6 text-orange-300" />
                </div>
                <p className="text-gray-300 text-sm">Complete your profile to get personalized daily horoscope</p>
                <Button 
                  className="mt-3 bg-white/10 hover:bg-white/20 text-white border-white/20"
                  onClick={() => router.push('/profile')}
                >
                  Complete Profile
                </Button>
              </div>
            )}
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={400}>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-300" />
              Life Analysis Tools
            </CardTitle>
            <CardDescription className="text-gray-300">
              Deep insights into every aspect of your life
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 text-white border-green-500/30 hover:border-green-500/50 backdrop-blur-sm"
                onClick={() => router.push('/career')}
              >
                💼 Career
              </Button>
              <Button 
                variant="outline" 
                className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 text-white border-pink-500/30 hover:border-pink-500/50 backdrop-blur-sm"
                onClick={() => router.push('/relationships')}
              >
                💕 Love
              </Button>
              <Button 
                variant="outline" 
                className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-green-500/30 text-white border-emerald-500/30 hover:border-emerald-500/50 backdrop-blur-sm"
                onClick={() => router.push('/health')}
              >
                🌿 Health
              </Button>
              <Button 
                variant="outline" 
                className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 text-white border-purple-500/30 hover:border-purple-500/50 backdrop-blur-sm"
                onClick={() => router.push('/astro-report')}
              >
                ⭐ Full Report
              </Button>
            </div>
            
            <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                <span className="text-yellow-200 text-xs font-medium">AI-Powered Analysis</span>
              </div>
              <p className="text-gray-300 text-xs">
                Each tool uses advanced Vedic astrology combined with AI to provide personalized insights based on your birth chart
              </p>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>
    </div>
  )
}  