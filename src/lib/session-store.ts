import { randomBytes } from 'crypto'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'

interface SessionData {
  userId: string
  email: string
  supabaseAccessToken: string
  supabaseRefreshToken: string
  expiresAt: number
}

// In-memory session store with file persistence for development
const sessions = new Map<string, SessionData>()

// File path for session persistence in development
const sessionFilePath = join(process.cwd(), '.sessions.json')

// Load sessions from file on startup (development only)
function loadSessionsFromFile() {
  if (process.env.NODE_ENV === 'development' && existsSync(sessionFilePath)) {
    try {
      const data = readFileSync(sessionFilePath, 'utf-8')
      const savedSessions = JSON.parse(data)
      const now = Date.now()
      
      // Only load non-expired sessions
      for (const [sessionId, sessionData] of Object.entries(savedSessions)) {
        if ((sessionData as SessionData).expiresAt > now) {
          sessions.set(sessionId, sessionData as SessionData)
        }
      }
    } catch (error) {
      console.error('Error loading sessions from file:', error)
    }
  }
}

// Save sessions to file (development only)
function saveSessionsToFile() {
  if (process.env.NODE_ENV === 'development') {
    try {
      const sessionObject = Object.fromEntries(sessions)
      writeFileSync(sessionFilePath, JSON.stringify(sessionObject, null, 2))
    } catch (error) {
      console.error('Error saving sessions to file:', error)
    }
  }
}

// Load sessions on module initialization
loadSessionsFromFile()

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
  
  // Save to file in development
  saveSessionsToFile()
  
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
  const result = sessions.delete(sessionId)
  // Save to file in development
  saveSessionsToFile()
  return result
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