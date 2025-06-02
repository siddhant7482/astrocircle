"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sendChatMessage } from '@/lib/openrouter'
import { Loader2 } from 'lucide-react'

interface Message {
  id: number
  text: string
  isUser: boolean
}

export function ChatInterface() {
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

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

      const chatMessages = messages.concat(userMessage).map(msg => ({
        role: msg.isUser ? 'user' as const : 'assistant' as const,
        content: msg.text
      }))

      const response = await sendChatMessage(chatMessages)

      setMessages(prev => [...prev, {
        id: Date.now(),
        text: response,
        isUser: false,
      }])
    } catch (err) {
      setError('Failed to get response. Please check your API key and try again.')
      console.error('Chat error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Astrology Chat
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.length === 0 && !isLoading && !error && (
            <div className="flex justify-center items-center h-full text-muted-foreground">
              Ask me anything about Vedic astrology!
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-2 bg-muted flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking...
              </div>
            </div>
          )}
          {error && (
            <div className="flex justify-center">
              <div className="rounded-lg px-4 py-2 bg-destructive text-destructive-foreground">
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
            placeholder="Type your question..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit"
            disabled={isLoading || !inputValue.trim()}
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