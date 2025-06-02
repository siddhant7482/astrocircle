"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Step = 'credentials' | 'personal' | 'birth' | 'verification'

export function RegisterForm() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('credentials')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [verificationEmail, setVerificationEmail] = useState<string>('')
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Sign up with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (authError) throw authError

      // Store the email for verification message
      setVerificationEmail(formData.email)
      // Move to verification step
      setStep('verification')

    } catch (err: any) {
      console.error('Registration error:', err)
      setError(err.message || 'An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProfile = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) throw sessionError
      if (!session) {
        setError('Please verify your email first')
        return
      }

      // Create profile in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: session.user.id,
            full_name: formData.fullName,
            birth_date: formData.birthDate,
            birth_time: formData.birthTime,
            birth_place: formData.birthPlace,
          }
        ])

      if (profileError) throw profileError

      router.push('/dashboard')
    } catch (err: any) {
      console.error('Profile creation error:', err)
      setError(err.message || 'An error occurred while creating your profile')
    } finally {
      setLoading(false)
    }
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 'credentials' && (!formData.email || !formData.password)) {
      setError('Please fill in all credentials')
      return
    }
    if (step === 'personal' && !formData.fullName) {
      setError('Please enter your full name')
      return
    }
    if (step === 'birth' && (!formData.birthDate || !formData.birthTime || !formData.birthPlace)) {
      setError('Please fill in all birth details')
      return
    }

    setError(null)
    if (step === 'credentials') setStep('personal')
    else if (step === 'personal') setStep('birth')
  }

  const prevStep = () => {
    if (step === 'personal') setStep('credentials')
    else if (step === 'birth') setStep('personal')
  }

  if (step === 'verification') {
    return (
      <div className="mx-auto max-w-md space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Check Your Email</h1>
          <p className="text-gray-500">
            We've sent a verification link to {verificationEmail}. Please check your email and verify your account.
          </p>
        </div>
        <div className="space-y-4">
          <Button
            type="button"
            className="w-full"
            onClick={handleCreateProfile}
            disabled={loading}
          >
            {loading ? 'Creating Profile...' : "I've Verified My Email"}
          </Button>
          <p className="text-sm text-center text-gray-500">
            After verifying your email, click the button above to complete your profile setup.
          </p>
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Join AstroCircle</h1>
        <p className="text-gray-500">Enter your details to get started</p>
      </div>

      <form onSubmit={step === 'birth' ? handleSubmit : handleNextStep} className="space-y-4">
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {step === 'credentials' && (
          <>
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
          </>
        )}

        {step === 'personal' && (
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
        )}

        {step === 'birth' && (
          <>
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
                name="birthTime"
                type="time"
                placeholder="Birth Time"
                value={formData.birthTime}
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
          </>
        )}

        <div className="flex gap-4">
          {step !== 'credentials' && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            type="submit"
            className="flex-1"
            disabled={loading}
          >
            {step === 'birth' ? (loading ? 'Creating Account...' : 'Create Account') : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  )
} 