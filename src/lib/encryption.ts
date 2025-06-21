// Simple encryption utility for localStorage data
// Note: This is basic obfuscation, not military-grade encryption

import CryptoJS from 'crypto-js'

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'astrocircle-secret-key-2024'

export function encryptData(data: unknown): string {
  try {
    const jsonString = JSON.stringify(data)
    const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString()
    return encrypted
  } catch (error) {
    console.error('Encryption error:', error)
    return JSON.stringify(data) // Fallback to unencrypted
  }
}

export function decryptData(encryptedData: string): unknown {
  try {
    // Check if data looks like it's encrypted (contains the CryptoJS format)
    if (encryptedData.includes('U2FsdGVkX1') || encryptedData.startsWith('U2FsdGVkX1')) {
      // Try to decrypt encrypted data
      const decrypted = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
      const decryptedString = decrypted.toString(CryptoJS.enc.Utf8)
      
      if (decryptedString && decryptedString.length > 0) {
        return JSON.parse(decryptedString)
      } else {
        console.warn('Failed to decrypt data, returning null')
        return null
      }
    } else {
      // Data appears to be plain JSON (backward compatibility)
      return JSON.parse(encryptedData)
    }
  } catch (error) {
    console.error('Decryption error:', error)
    try {
      // Final fallback: try parsing as plain JSON
      return JSON.parse(encryptedData)
    } catch (parseError) {
      console.error('Parse error:', parseError)
      // If all else fails, return null to trigger fresh data generation
      return null
    }
  }
}

// Clear old unencrypted horoscope data
export const clearLegacyHoroscopeData = () => {
  const keysToRemove: string[] = []
  
  // Find all horoscope keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('horoscope_')) {
      keysToRemove.push(key)
    }
  }
  
  // Remove legacy keys
  keysToRemove.forEach(key => {
    localStorage.removeItem(key)
  })
  
  if (keysToRemove.length > 0) {
    console.log(`Cleared ${keysToRemove.length} legacy horoscope entries for security`)
  }
}

// Secure localStorage wrapper
export const secureStorage = {
  setItem: (key: string, value: unknown) => {
    const encrypted = encryptData(value)
    localStorage.setItem(key, encrypted)
  },
  
  getItem: (key: string) => {
    const encrypted = localStorage.getItem(key)
    if (!encrypted) return null
    const decrypted = decryptData(encrypted)
    
    // If decryption failed and this is a horoscope key, clear it
    if (decrypted === null && key.startsWith('horoscope_')) {
      localStorage.removeItem(key)
      console.log(`Cleared corrupted horoscope data: ${key}`)
    }
    
    return decrypted
  },
  
  removeItem: (key: string) => {
    localStorage.removeItem(key)
  },
  
  clear: () => {
    localStorage.clear()
  }
} 