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

  useEffect(() => {
    if (!loading && !user) {
      setIsRedirecting(true)
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to your AstroCircle Dashboard
        </h1>
        <p className="text-gray-600">
          Explore your astrological insights and create new readings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Get started with your astrological journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Star className="mr-2 h-4 w-4" />
              Generate Birth Chart
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Daily Horoscope
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <User className="mr-2 h-4 w-4" />
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest astrological insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">
              No recent activity yet. Start by generating your first birth chart!
            </p>
          </CardContent>
        </Card>

        {/* Profile Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Summary</CardTitle>
            <CardDescription>
              Your astrological profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p className="text-sm text-gray-500">
                Complete your profile to unlock personalized insights
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 