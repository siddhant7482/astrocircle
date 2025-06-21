// Simple encryption utility for localStorage data
// Note: This is basic obfuscation, not military-grade encryption

import CryptoJS from 'crypto-js'

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'astrocircle-secret-key-2024'

export function encryptData(data: any): string {
  try {
    const jsonString = JSON.stringify(data)
    const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString()
    return encrypted
  } catch (error) {
    console.error('Encryption error:', error)
    return JSON.stringify(data) // Fallback to unencrypted
  }
}

export function decryptData(encryptedData: string): any {
  try {
    // Try to decrypt first
    const decrypted = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY)
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8)
    
    if (decryptedString) {
      return JSON.parse(decryptedString)
    } else {
      // If decryption fails, try parsing as plain JSON (backward compatibility)
      return JSON.parse(encryptedData)
    }
  } catch (error) {
    console.error('Decryption error:', error)
    try {
      // Fallback to plain JSON parsing
      return JSON.parse(encryptedData)
    } catch (parseError) {
      console.error('Parse error:', parseError)
      return null
    }
  }
}

// Secure localStorage wrapper
export const secureStorage = {
  setItem: (key: string, value: any) => {
    const encrypted = encryptData(value)
    localStorage.setItem(key, encrypted)
  },
  
  getItem: (key: string) => {
    const encrypted = localStorage.getItem(key)
    if (!encrypted) return null
    return decryptData(encrypted)
  },
  
  removeItem: (key: string) => {
    localStorage.removeItem(key)
  },
  
  clear: () => {
    localStorage.clear()
  }
} 