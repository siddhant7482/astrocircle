'use client';

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, TrendingUp, Sparkles, LineChart, Target, Users } from 'lucide-react'

interface RelationshipData {
  compatibility: string[]
  timeline: Array<{ year: string; status: string; description: string }>
  explanation: string
  marriage: string
  remedies: string[]
}

export default function Relationships() {
  const [data, setData] = useState<RelationshipData | null>(null)

  const generateAnalysis = () => {
    setData({
      compatibility: [
        'Compatible with Earth signs - Stable Partners',
        'Strong Venus influence - Creative Partners', 
        'Jupiter blessing - Spiritual Partners',
        'Mars energy - Passionate Partners',
        'Mercury connection - Intellectual Partners'
      ],
      timeline: [
        { year: '2025', status: 'high', description: 'Perfect for love & marriage' },
        { year: '2026', status: 'medium', description: 'Building relationships' },
        { year: '2027', status: 'low', description: 'Focus on self-growth' },
        { year: '2028', status: 'high', description: 'New romantic opportunities' }
      ],
      explanation: 'Your birth chart reveals strong Venus influence indicating a loving nature and potential for deep romantic connections. The 7th house shows favorable marriage indicators.',
      marriage: 'The 7th house in your chart shows excellent marriage potential. Jupiter\'s blessing suggests a spiritually aligned partner who will bring wisdom and growth to your life.',
      remedies: [
        'Worship Lord Krishna and Radha for relationship blessings',
        'Wear Rose Quartz for attracting love',
        'Chant Venus mantras on Fridays',
        'Perform marriage prayers at temples',
        'Donate white flowers for Venus strength'
      ]
    })
  }

  const getStatusColor = (status: string) => {
    return status === 'high' ? 'bg-pink-500' : 
           status === 'medium' ? 'bg-purple-500' : 'bg-blue-500'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
          Relationship & Marriage Analysis
        </h1>
        <p className="text-gray-300 text-lg">
          Discover your love life through Vedic astrology
        </p>
      </div>

      {!data && (
        <div className="mb-8 text-center">
          <Card className="backdrop-blur-md bg-white/10 border-white/20 max-w-md mx-auto">
            <CardContent className="p-6">
              <Heart className="h-12 w-12 text-pink-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Ready for Love Analysis</h3>
              <p className="text-gray-300 mb-4">Generate personalized relationship insights</p>
              <Button
                onClick={generateAnalysis}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
              >
                <Heart className="mr-2 h-4 w-4" />
                Generate Love Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {data && (
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
                {data.compatibility.map((item, index) => (
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
                {data.timeline.map((period, index) => (
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
              <div className="p-6 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
                <p className="text-gray-300 leading-relaxed">{data.explanation}</p>
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
                Sacred union insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                <p className="text-gray-300 leading-relaxed">{data.marriage}</p>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-white/5">
                <h4 className="text-white font-medium mb-2">🔮 Marriage Indicators:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• 7th House: Partnership sector</li>
                  <li>• Venus: Love and harmony</li>
                  <li>• Jupiter: Sacred blessings</li>
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
                Vedic practices for relationship success
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.remedies.map((remedy, index) => (
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