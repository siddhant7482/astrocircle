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
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkSession()
    
    // Failsafe: stop loading after 10 seconds
    const timeout = setTimeout(() => {
      console.warn('Auth check timeout - forcing loading to false')
      setIsLoading(false)
    }, 10000)
    
    return () => clearTimeout(timeout)
  }, [])

  const checkSession = async () => {
    try {
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
      } else {
        setIsAuthenticated(false)
        setUser(null)
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