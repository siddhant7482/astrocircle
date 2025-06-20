'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DebugData {
  hasSessionId: boolean
  sessionId: string
  hasLegacyAuth: boolean
  hasLegacyRefresh: boolean
  totalCookies: number
  cookieNames: string[]
  timestamp: string
}

export default function ResetAuth() {
  const [status, setStatus] = useState('Resetting authentication...')
  const [debug, setDebug] = useState<DebugData | null>(null)
  const router = useRouter()

  const resetAuth = useCallback(async () => {
    try {
      // Step 1: Check current state
      setStatus('Checking current authentication state...')
      const debugResponse = await fetch('/api/debug/session')
      const debugData = await debugResponse.json()
      setDebug(debugData)

      // Step 2: Clear all cookies
      setStatus('Clearing legacy cookies...')
      await fetch('/api/auth/clear-legacy-cookies', {
        method: 'POST',
        credentials: 'include',
      })

      // Step 3: Logout from current session
      setStatus('Logging out from current session...')
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      // Step 4: Clear browser storage
      setStatus('Clearing browser storage...')
      localStorage.clear()
      sessionStorage.clear()

      // Step 5: Final check
      setStatus('Verifying cleanup...')
      await fetch('/api/debug/session')
      
      setStatus('Authentication reset complete!')
      
      setTimeout(() => {
        router.push('/login')
      }, 2000)

    } catch (error) {
      console.error('Reset error:', error)
      setStatus('Reset failed. Please manually clear cookies and try again.')
    }
  }, [router])

  useEffect(() => {
    resetAuth()
  }, [resetAuth])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <Card className="w-full max-w-md backdrop-blur-sm bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-center">Authentication Reset</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin mx-auto mb-4 rounded-full border-2 border-white border-t-transparent"></div>
            <p className="text-gray-300">{status}</p>
          </div>
          
          {debug && (
            <div className="bg-black/20 p-3 rounded text-xs text-gray-300">
              <p>Session ID: {debug.sessionId}</p>
              <p>Legacy Auth: {debug.hasLegacyAuth ? 'Yes' : 'No'}</p>
              <p>Total Cookies: {debug.totalCookies}</p>
            </div>
          )}

          <div className="text-center">
            <Button 
              onClick={() => router.push('/login')}
              variant="outline"
              className="mt-4 text-white border-white/20 hover:bg-white/10"
            >
              Go to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 