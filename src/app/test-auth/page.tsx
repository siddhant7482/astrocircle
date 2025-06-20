'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/AuthContext'

interface SessionData {
  user?: {
    id: string
    email: string
  } | null
  session?: {
    access_token: string
    expires_at: string
  } | null
  message?: string
}

export default function TestAuth() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testSession = async () => {
      try {
        // First clear any legacy cookies
        await fetch('/api/auth/clear-legacy-cookies', {
          method: 'POST',
          credentials: 'include',
        })

        const response = await fetch('/api/auth/session', {
          method: 'GET',
          credentials: 'include',
        })
        
        const data = await response.json()
        setSessionData(data)
        
        if (!response.ok) {
          setError(`API Error: ${response.status}`)
        }
      } catch (err) {
        setError(`Fetch Error: ${err}`)
      }
    }

    testSession()
  }, [])

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Test</h1>
      
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold">AuthContext State:</h2>
          <p>isLoading: {isLoading ? 'true' : 'false'}</p>
          <p>isAuthenticated: {isAuthenticated ? 'true' : 'false'}</p>
          <p>user: {user ? JSON.stringify(user, null, 2) : 'null'}</p>
        </div>

        <div className="bg-blue-100 p-4 rounded">
          <h2 className="font-semibold">Session API Response:</h2>
          {error ? (
            <p className="text-red-600">Error: {error}</p>
          ) : (
            <pre className="text-sm">{JSON.stringify(sessionData, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  )
} 