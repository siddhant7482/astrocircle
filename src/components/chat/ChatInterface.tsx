"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sendChatMessage } from '@/lib/openrouter'
import { getUserProfile, UserProfile } from '@/lib/supabase/queries'
import { Loader2, Sparkles, User, Calendar, MapPin, Clock } from 'lucide-react'

interface Message {
  id: number
  text: string
  isUser: boolean
}

interface UserInfo {
  name: string
  dateOfBirth: string
  timeOfBirth: string
  placeOfBirth: string
}

export function ChatInterface() {
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: ''
  })
  const [profileLoaded, setProfileLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      // For now, we'll use a placeholder approach since we need user authentication
      // In a real app, you'd get the userId from your auth system
      const userId = 'placeholder-user-id' // This should come from your auth context
      const profile: UserProfile | null = await getUserProfile(userId)
      if (profile) {
        setUserInfo({
          name: profile.full_name || '',
          dateOfBirth: profile.birth_date || '',
          timeOfBirth: profile.birth_time || '',
          placeOfBirth: profile.birth_place || ''
        })
        setProfileLoaded(true)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      // For demo purposes, set some sample data
      setUserInfo({
        name: 'Demo User',
        dateOfBirth: '1990-01-15',
        timeOfBirth: '14:30',
        placeOfBirth: 'New Delhi, India'
      })
      setProfileLoaded(true)
    }
  }

  const suggestedQuestions = [
    "What does my birth chart reveal about my personality?",
    "What are my strongest planetary influences?",
    "What career path suits me according to Vedic astrology?",
    "How do the current planetary transits affect me?",
    "What are my lucky days and colors?",
    "Tell me about my relationship compatibility",
    "What health aspects should I be aware of?",
    "What spiritual practices would benefit me?"
  ]

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
  }

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputValue.trim() || isLoading) return

    setError(null)
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      isUser: true,
    }

    try {
      setMessages(prev => [...prev, userMessage])
      setInputValue('')
      setIsLoading(true)

      // Create enhanced system message with user profile data
      const systemMessage = {
        role: 'system' as const,
        content: `You are an expert Vedic astrologer with deep knowledge of Hindu astrology, Sanskrit texts, and traditional astrological principles. You provide personalized insights based on birth chart analysis.

${profileLoaded && userInfo.name ? `
USER PROFILE:
- Name: ${userInfo.name}
- Date of Birth: ${userInfo.dateOfBirth}
- Time of Birth: ${userInfo.timeOfBirth}
- Place of Birth: ${userInfo.placeOfBirth}

Please provide personalized insights based on this birth information when relevant to the user's questions.
` : 'The user has not provided complete birth details yet. Encourage them to complete their profile for personalized insights.'}

GUIDELINES:
- Use traditional Vedic astrology principles and terminology
- Reference Sanskrit names of planets (Surya, Chandra, Mangal, Budh, Guru, Shukra, Shani, Rahu, Ketu)
- Explain concepts in an accessible way while maintaining authenticity
- Provide practical remedies and suggestions when appropriate
- Be encouraging and positive while being honest about challenges
- Reference houses (bhavas), signs (rashis), and planetary periods (dashas) when relevant
- Always maintain respect for the sacred nature of Vedic astrology`
      }

      const chatMessages = [systemMessage, ...messages.concat(userMessage).map(msg => ({
        role: msg.isUser ? 'user' as const : 'assistant' as const,
        content: msg.text
      }))]

      const response = await sendChatMessage(chatMessages)

      setMessages(prev => [...prev, {
        id: Date.now(),
        text: response,
        isUser: false,
      }])
    } catch (err) {
      setError('Failed to get response. Please try again.')
      console.error('Chat error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <Card className="w-full h-[700px] flex flex-col backdrop-blur-md bg-white/10 border-white/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-300" />
            Vedic Astrology Chat
          </div>
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-purple-300" />}
        </CardTitle>
        
        {/* User Profile Status */}
        {profileLoaded && userInfo.name && (
          <div className="flex items-center gap-4 text-sm text-gray-300 bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-blue-300" />
              <span>{userInfo.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-green-300" />
              <span>{userInfo.dateOfBirth}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-yellow-300" />
              <span>{userInfo.timeOfBirth}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-purple-300" />
              <span>{userInfo.placeOfBirth}</span>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {messages.length === 0 && !isLoading && !error && (
            <div className="space-y-4">
              <div className="flex justify-center items-center text-gray-300 text-center">
                <div className="space-y-2">
                  <div className="text-lg font-medium">🔮 Ask Your Vedic Astrology Questions</div>
                  <div className="text-sm opacity-75">
                    {profileLoaded && userInfo.name 
                      ? "I have access to your birth details for personalized insights!"
                      : "Complete your profile for personalized astrological guidance"
                    }
                  </div>
                </div>
              </div>
              
              {/* Suggested Questions */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-purple-300 text-center">💫 Suggested Questions:</div>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-left justify-start h-auto py-2 px-3 text-xs bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white transition-all"
                      disabled={isLoading}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-4 py-3 max-w-[85%] ${
                  message.isUser
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-white/10 text-gray-100 border border-white/20'
                }`}
              >
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-3 bg-white/10 border border-white/20 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-purple-300" />
                <span className="text-gray-300">Consulting the stars...</span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="flex justify-center">
              <div className="rounded-lg px-4 py-3 bg-red-500/20 border border-red-500/30 text-red-300">
                {error}
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about your birth chart, planetary influences, remedies..."
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
            disabled={isLoading}
          />
          <Button 
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </span>
            ) : (
              'Send'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 