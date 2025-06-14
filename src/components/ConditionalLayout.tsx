"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { useState, useEffect } from "react";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Don't show sidebar layout on auth pages or if not authenticated
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/signup') || pathname?.startsWith('/register') || pathname === '/';
  const showDashboard = !isLoading && isAuthenticated && !isAuthPage;

  useEffect(() => {
    if (showDashboard) {
      // More aggressive override of body and html background
      document.body.style.background = 'transparent !important';
      document.body.style.backgroundColor = 'transparent !important';
      document.documentElement.style.background = 'linear-gradient(to bottom right, rgb(88, 28, 135), rgb(30, 58, 138), rgb(67, 56, 202)) !important';
      
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }

      window.addEventListener('mousemove', handleMouseMove)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        // Reset backgrounds when leaving dashboard
        document.body.style.background = '';
        document.body.style.backgroundColor = '';
        document.documentElement.style.background = '';
      }
    }
  }, [showDashboard])

  if (!showDashboard) {
    return <main className="h-full">{children}</main>;
  }

  return (
    <>
      {/* Solid background layer */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" style={{ zIndex: -2 }} />
      
      {/* Moving gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.3) 0%, rgba(59, 130, 246, 0.2) 30%, rgba(67, 56, 202, 0.1) 60%, transparent 100%)`,
          zIndex: -1
        }}
      />

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-purple-400/25 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Content layer */}
      <div className="relative z-10 min-h-screen flex" data-dashboard="true">
        {/* Sidebar */}
        <div className="hidden w-64 lg:block">
          <div className="h-full flex flex-col backdrop-blur-md bg-white/10 border-r border-white/20 shadow-2xl">
            <div className="flex h-14 items-center border-b border-white/20 px-4">
              <h2 className="text-lg font-semibold text-white bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                AstroCircle
              </h2>
            </div>
            <nav className="flex-1 space-y-2 p-4">
              <div className="space-y-1">
                <a href="/dashboard" className="flex items-center px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/15 rounded-lg transition-colors">
                  Dashboard
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/15 rounded-lg transition-colors">
                  Birth Chart
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/15 rounded-lg transition-colors">
                  Horoscope
                </a>
                <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/15 rounded-lg transition-colors">
                  Profile
                </a>
              </div>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 min-h-screen">
          <header className="sticky top-0 z-20 h-14 border-b border-white/20 backdrop-blur-md bg-white/10 shadow-lg">
            <div className="flex h-full items-center px-4">
              <h1 className="text-sm font-semibold text-white">Dashboard</h1>
            </div>
          </header>
          <main className="flex-1 relative z-10 bg-transparent">
            {children}
          </main>
        </div>
      </div>
    </>
  );
} 