'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export default function VerificationSuccess() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
      }
    }
    
    checkSession()
  }, [router])

  const handleContinue = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      // Check if profile exists
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (profile) {
        router.push('/dashboard')
      } else {
        router.push('/register')
      }
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="mx-auto max-w-md space-y-6 p-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-green-600">Email Verified!</h1>
          <p className="text-gray-500">
            Your email has been successfully verified. You can now continue to your account.
          </p>
        </div>
        <Button
          onClick={handleContinue}
          className="w-full"
        >
          Continue to Account
        </Button>
      </div>
    </div>
  )
} 