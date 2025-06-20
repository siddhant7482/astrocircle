"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sendChatMessage } from '@/lib/openrouter'
import { useUser } from '@/lib/hooks/use-user'
import { getUserProfile, UserProfile } from '@/lib/supabase/queries'
import { Loader2, Sparkles, User, Calendar, Clock } from 'lucide-react'

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
  const { user, loading: userLoading } = useUser()
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
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (user && user.id) {
      fetchUserProfile()
    }
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUserProfile = async () => {
    if (!user || !user.id) return
    
    try {
      // Fetching profile for user
      const profile: UserProfile | null = await getUserProfile(user.id)
      if (profile) {
        // Profile loaded successfully
        setUserInfo({
          name: profile.full_name || '',
          dateOfBirth: profile.birth_date || '',
          timeOfBirth: profile.birth_time || '',
          placeOfBirth: profile.birth_place || ''
        })
        setProfileLoaded(true)
      } else {
        // No profile found for user
        setProfileLoaded(false)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      setProfileLoaded(false)
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
        content: `You are a Vedic astrologer. Give concise, direct answers (2-3 sentences max). Use Sanskrit planet names when relevant.

${profileLoaded && userInfo.name ? `
USER: ${userInfo.name}, born ${userInfo.dateOfBirth} at ${userInfo.timeOfBirth} in ${userInfo.placeOfBirth}
Provide personalized insights based on this birth data.
` : 'User profile incomplete. Encourage profile completion for personalized insights.'}

STYLE: Brief, practical, encouraging. Include 1 remedy/suggestion when relevant.`
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
      console.error('Chat error:', err)
      
      // More specific error handling
      let errorMessage = 'Failed to get response. Please try again.'
      if (err instanceof Error) {
        if (err.message.includes('rate limit') || err.message.includes('429')) {
          errorMessage = 'DeepSeek is busy. Please wait a moment and try again.'
        } else if (err.message.includes('token') || err.message.includes('length')) {
          errorMessage = 'Message too long. Please try a shorter question.'
        } else if (err.message.includes('network') || err.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.'
        }
      }
      
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted || userLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto h-[400px] sm:h-[500px] lg:h-[600px] flex flex-col backdrop-blur-md bg-white/10 border-white/20">
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-300" />
            <p className="text-gray-300">Loading chat...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <style jsx>{`
        .chat-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .chat-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .chat-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
      <Card className="w-full max-w-4xl mx-auto h-[400px] sm:h-[500px] lg:h-[600px] flex flex-col backdrop-blur-md bg-white/10 border-white/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-300" />
            Vedic Astrology Chat
          </div>
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-purple-300" />}
        </CardTitle>
        
        {/* User Profile Status */}
        {profileLoaded && userInfo.name && (
          <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs text-gray-300 bg-white/5 rounded-lg p-2 border border-white/10">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 text-blue-300" />
              <span className="truncate max-w-16 md:max-w-none">{userInfo.name}</span>
            </div>
            <span className="text-gray-500">•</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-green-300" />
              <span className="hidden sm:inline">{userInfo.dateOfBirth}</span>
              <span className="sm:hidden">{userInfo.dateOfBirth.split('-')[0]}</span>
            </div>
            <span className="text-gray-500 hidden sm:inline">•</span>
            <div className="flex items-center gap-1 hidden sm:flex">
              <Clock className="h-3 w-3 text-yellow-300" />
              <span>{userInfo.timeOfBirth}</span>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
        <div 
          className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 chat-scroll" 
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent'
          }}
        >
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
              <div className="space-y-1">
                <div className="text-xs font-medium text-purple-300 text-center">💫 Quick Start:</div>
                <div className="grid grid-cols-1 gap-1 max-h-24 md:max-h-32 overflow-y-auto">
                  {suggestedQuestions.slice(0, 4).map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-left justify-start h-auto py-1 px-2 text-xs bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white transition-all"
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
          
          {/* Auto-scroll target */}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSendMessage} className="flex gap-2 flex-shrink-0">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about your birth chart, planetary influences, remedies..."
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 h-10"
            disabled={isLoading}
          />
          <Button 
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 h-10 px-4"
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
    </>
  )
} 