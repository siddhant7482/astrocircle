'use client';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/hooks/use-user'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Plus, Star, Calendar, User } from 'lucide-react'

export default function Dashboard() {
  const { user, loading } = useUser()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!loading && !user) {
      setIsRedirecting(true)
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (loading || isRedirecting) {
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
              Get started with your astrological journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-700 hover:to-blue-700 text-white border-none backdrop-blur-sm">
              <Star className="mr-2 h-4 w-4" />
              Generate Birth Chart
            </Button>
            <Button className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 backdrop-blur-sm">
              <Calendar className="mr-2 h-4 w-4" />
              Daily Horoscope
            </Button>
            <Button className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 backdrop-blur-sm">
              <User className="mr-2 h-4 w-4" />
              Update Profile
            </Button>
          </CardContent>
        </AnimatedCard>

        {/* Recent Activity */}
        <AnimatedCard delay={100}>
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-300">
              Your latest astrological insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center backdrop-blur-sm">
                <Star className="h-8 w-8 text-purple-300" />
              </div>
              <p className="text-gray-300">
                No recent activity yet. Start by generating your first birth chart!
              </p>
            </div>
          </CardContent>
        </AnimatedCard>

        {/* Profile Summary */}
        <AnimatedCard delay={200}>
          <CardHeader>
            <CardTitle className="text-white">Profile Summary</CardTitle>
            <CardDescription className="text-gray-300">
              Your astrological profile information
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
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-400">
                    Astrology Enthusiast
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm">
                <p className="text-sm text-gray-300">
                  Complete your profile to unlock personalized insights and detailed birth chart analysis
                </p>
              </div>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>

      {/* Additional cards for more visual impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <AnimatedCard delay={300}>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-300" />
              Today&apos;s Cosmic Energy
            </CardTitle>
            <CardDescription className="text-gray-300">
              Current planetary influences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Moon Phase</span>
                <span className="text-white font-medium">Waxing Crescent</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Dominant Element</span>
                <span className="text-purple-300 font-medium">Water</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={400}>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-300" />
              Astrological Tools
            </CardTitle>
            <CardDescription className="text-gray-300">
              Explore your cosmic connections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 backdrop-blur-sm">
                Tarot
              </Button>
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 backdrop-blur-sm">
                Numerology
              </Button>
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 backdrop-blur-sm">
                Compatibility
              </Button>
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 backdrop-blur-sm">
                Transits
              </Button>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>
    </div>
  )
}  