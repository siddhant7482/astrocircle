'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function VerificationError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="mx-auto max-w-md space-y-6 p-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-destructive">Verification Failed</h1>
          <p className="text-gray-500">
            We couldn't verify your email. This might be because:
          </p>
          <ul className="text-sm text-gray-500 list-disc list-inside space-y-1">
            <li>The verification link has expired</li>
            <li>The link has already been used</li>
            <li>There was a technical issue</li>
          </ul>
        </div>
        <div className="space-y-4">
          <Link href="/login">
            <Button className="w-full">
              Return to Login
            </Button>
          </Link>
          <p className="text-sm text-gray-500">
            Need help? Contact support at support@astrocircle.com
          </p>
        </div>
      </div>
    </div>
  )
} 