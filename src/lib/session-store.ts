import { randomBytes } from 'crypto'

interface SessionData {
  userId: string
  email: string
  supabaseAccessToken: string
  supabaseRefreshToken: string
  expiresAt: number
}

// In-memory session store (in production, use Redis or database)
const sessions = new Map<string, SessionData>()

export function generateSessionId(): string {
  return randomBytes(32).toString('hex')
}

export function createSession(data: {
  userId: string
  email: string
  supabaseAccessToken: string
  supabaseRefreshToken: string
  expiresIn?: number
}): string {
  const sessionId = generateSessionId()
  const expiresAt = Date.now() + (data.expiresIn || 7 * 24 * 60 * 60 * 1000) // 7 days default
  
  sessions.set(sessionId, {
    userId: data.userId,
    email: data.email,
    supabaseAccessToken: data.supabaseAccessToken,
    supabaseRefreshToken: data.supabaseRefreshToken,
    expiresAt
  })
  
  return sessionId
}

export function getSession(sessionId: string): SessionData | null {
  const session = sessions.get(sessionId)
  
  if (!session) {
    return null
  }
  
  // Check if session has expired
  if (Date.now() > session.expiresAt) {
    sessions.delete(sessionId)
    return null
  }
  
  return session
}

export function updateSession(sessionId: string, updates: Partial<SessionData>): boolean {
  const session = sessions.get(sessionId)
  
  if (!session) {
    return false
  }
  
  sessions.set(sessionId, { ...session, ...updates })
  return true
}

export function deleteSession(sessionId: string): boolean {
  return sessions.delete(sessionId)
}

export function cleanExpiredSessions(): void {
  const now = Date.now()
  for (const [sessionId, session] of sessions.entries()) {
    if (now > session.expiresAt) {
      sessions.delete(sessionId)
    }
  }
}

// Clean expired sessions every hour
setInterval(cleanExpiredSessions, 60 * 60 * 1000) 