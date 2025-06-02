"use client"

import React from 'react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-64 border-r bg-muted/40 lg:block">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <h2 className="text-lg font-semibold">AstroCircle</h2>
            </div>
            <nav className="flex-1 space-y-2 p-4">
              {/* Add navigation items here */}
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <header className="sticky top-0 z-10 h-14 border-b bg-background/95 backdrop-blur">
            <div className="flex h-full items-center px-4">
              <h1 className="text-sm font-semibold">Dashboard</h1>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
} 