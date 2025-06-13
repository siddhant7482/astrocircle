"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    birthDate: '',
    birthPlace: '',
    birthTime: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      })
      if (authError) throw authError
      const user = authData.user
      if (!user) throw new Error('No user returned from signup')
      
      // 2. Check if profile already exists (to avoid duplicate key error)
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()
      
      if (!existingProfile) {
        // 3. Create profile row only if it doesn't exist
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              email: formData.email,
              full_name: formData.fullName,
              birth_date: formData.birthDate,
              birth_place: formData.birthPlace,
              birth_time: formData.birthTime
            }
          ])
        if (profileError) throw profileError
      }
      
      // 4. Redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred')
      if (error.message?.includes('already registered')) {
        setError('This email is already registered. Please try logging in instead.')
      } else {
        setError(error.message || 'An error occurred during registration')
      }
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