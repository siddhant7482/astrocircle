"use client"

import { useState, useEffect } from 'react'
import { BirthChartCard } from '@/components/cards/BirthChartCard'
import { ChatInterface } from '@/components/chat/ChatInterface'

export function ClientWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <BirthChartCard
        name="John Doe"
        birthDate="1990-01-01"
        birthTime="12:00"
        birthPlace="New York, USA"
      />
      <ChatInterface />
    </div>
  )
} 