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
    
    return (
      <div
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight / 2) * 0.01}deg) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.01}deg) translateZ(20px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)`,
            transition: 'background 0.3s ease-out'
          }}
        />
        
        {/* Glass card */}
        <Card 
          className="relative backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:shadow-purple-500/20"
          style={{
            animationDelay: `${delay}ms`
          }}
        >
          {children}
        </Card>
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