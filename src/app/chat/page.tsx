"use client"

import { ChatInterface } from '@/components/chat/ChatInterface'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, MessageCircle, Star, Zap } from 'lucide-react'

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-2 md:p-4">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white">
              Vedic Astrology Chat
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Get personalized insights from our AI astrologer trained in traditional Vedic astrology principles
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8 px-4 md:px-0">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white text-lg">
                <Sparkles className="h-5 w-5 text-purple-300" />
                Personalized Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Get customized astrological guidance based on your birth chart and planetary positions
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white text-lg">
                <Star className="h-5 w-5 text-yellow-300" />
                Traditional Vedic Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Authentic insights using Sanskrit terminology, planetary periods, and classical texts
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white text-lg">
                <Zap className="h-5 w-5 text-blue-300" />
                Instant Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">
                Ask questions about career, relationships, health, and spiritual growth anytime
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="w-full px-4 md:px-0">
          <ChatInterface />
        </div>

        {/* Sample Questions */}
        <Card className="backdrop-blur-md bg-white/10 border-white/20 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white text-center">
              💫 Popular Questions to Get Started
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium text-purple-300">Personal Growth</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• What are my strongest personality traits?</li>
                  <li>• Which planetary influences shape my character?</li>
                  <li>• What spiritual practices suit my nature?</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-blue-300">Life Guidance</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• What career path aligns with my chart?</li>
                  <li>• How do current transits affect me?</li>
                  <li>• What are my lucky colors and gemstones?</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-green-300">Relationships</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• What should I look for in a partner?</li>
                  <li>• How can I improve my relationships?</li>
                  <li>• What does my 7th house reveal?</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-yellow-300">Health & Remedies</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• What health aspects should I monitor?</li>
                  <li>• Which mantras or remedies help me?</li>
                  <li>• How can I balance my doshas?</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 