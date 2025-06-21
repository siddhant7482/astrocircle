'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  email: string
}

type AuthContextType = {
  isLoading: boolean
  isAuthenticated: boolean
  user: User | null
  isRedirecting: boolean
  setIsRedirecting: (value: boolean) => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()



  useEffect(() => {
    checkSession()
    
    // Failsafe: stop loading after 8 seconds to handle slow network connections
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn('Authentication check timed out - setting loading to false')
        setIsLoading(false)
      }
    }, 8000)
    
    return () => clearTimeout(timeout)
  }, [])

  const checkSession = async () => {
    try {
      setIsLoading(true) // Ensure loading state is set
      
      // First clear any legacy cookies to avoid conflicts
      await fetch('/api/auth/clear-legacy-cookies', {
        method: 'POST',
        credentials: 'include',
      }).catch(() => {}) // Ignore errors from this cleanup call

      const response = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok && data.user) {
        setIsAuthenticated(true)
        setUser(data.user)
        console.log('Authentication successful:', data.user.email)
      } else {
        setIsAuthenticated(false)
        setUser(null)
        console.log('Not authenticated or no valid session')
      }
    } catch (error) {
      console.error('Session check error:', error)
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      
      setIsAuthenticated(false)
      setUser(null)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{
      isLoading,
      isAuthenticated,
      user,
      isRedirecting,
      setIsRedirecting,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 