"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BirthChartCardProps {
  name: string
  birthDate: string
  birthTime: string
  birthPlace: string
}

export function BirthChartCard({ name, birthDate, birthTime, birthPlace }: BirthChartCardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // or a loading placeholder
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Birth Chart Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-lg font-semibold">{name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Birth Date</p>
              <p className="text-lg font-semibold">{birthDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Birth Time</p>
              <p className="text-lg font-semibold">{birthTime}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Birth Place</p>
              <p className="text-lg font-semibold">{birthPlace}</p>
            </div>
          </div>
          {/* Placeholder for birth chart visualization */}
          <div className="h-64 w-full rounded-lg border border-dashed flex items-center justify-center">
            <p className="text-muted-foreground">Birth Chart Visualization</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 