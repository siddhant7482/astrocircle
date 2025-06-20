"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    birthDate: '',
    birthPlace: '',
    birthTime: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          birthDate: formData.birthDate,
          birthPlace: formData.birthPlace,
          birthTime: formData.birthTime
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Redirect to dashboard on success
      router.push('/dashboard')
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred')
      setError(error.message || 'An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Join AstroCircle</h1>
        <p className="text-gray-500">Enter your details to get started</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            minLength={6}
          />
        </div>
        <div className="space-y-2">
          <Input
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            name="birthDate"
            type="date"
            placeholder="Birth Date"
            value={formData.birthDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            name="birthPlace"
            type="text"
            placeholder="Birth Place"
            value={formData.birthPlace}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            name="birthTime"
            type="time"
            placeholder="Birth Time"
            value={formData.birthTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  )
} 