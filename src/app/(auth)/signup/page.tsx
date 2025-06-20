'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to register page for consistency
    router.replace('/register')
  }, [router])
  
  return null
} 