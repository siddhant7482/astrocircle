"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Define which pages require authentication
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/signup') || pathname?.startsWith('/register') || pathname === '/';
  const isProtectedPage = pathname?.startsWith('/dashboard') || pathname?.startsWith('/profile');
  const showDashboard = !isLoading && isAuthenticated && !isAuthPage;

  // Handle authentication redirection
  useEffect(() => {
    if (!isLoading && !isAuthenticated && isProtectedPage) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, isProtectedPage, router]);

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

  // Show loading state for protected pages when checking auth
  if (isLoading && isProtectedPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin mx-auto mb-4 rounded-full border-2 border-white border-t-transparent"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // For auth pages or when not authenticated, just return the children without dashboard layout
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
        {/* Desktop Sidebar */}
        <div className="hidden w-64 lg:block">
          <div className="h-full flex flex-col backdrop-blur-md bg-white/10 border-r border-white/20 shadow-2xl relative overflow-hidden">
            {/* Floating particles in sidebar */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/40 rounded-full animate-float shadow-sm shadow-purple-400/30"></div>
              <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-blue-400/50 rounded-full animate-float-delayed shadow-sm shadow-blue-400/40"></div>
              <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-indigo-300/60 rounded-full animate-float-slow shadow-sm shadow-indigo-300/50"></div>
              <div className="absolute top-2/3 right-1/3 w-2.5 h-2.5 bg-purple-300/30 rounded-full animate-float-fast shadow-md shadow-purple-300/25"></div>
              <div className="absolute top-3/4 left-1/2 w-1.5 h-1.5 bg-blue-300/45 rounded-full animate-float shadow-sm shadow-blue-300/35"></div>
              <div className="absolute top-1/6 right-1/6 w-1 h-1 bg-indigo-400/55 rounded-full animate-float-delayed shadow-sm shadow-indigo-400/45"></div>
              <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-500/35 rounded-full animate-float-slow shadow-sm shadow-purple-500/30"></div>
              <div className="absolute bottom-1/3 right-1/5 w-1.5 h-1.5 bg-blue-500/40 rounded-full animate-float-fast shadow-sm shadow-blue-500/35"></div>
              <div className="absolute bottom-1/6 left-1/5 w-1 h-1 bg-indigo-500/50 rounded-full animate-float shadow-sm shadow-indigo-500/40"></div>
              <div className="absolute top-5/6 right-2/5 w-2.5 h-2.5 bg-purple-400/25 rounded-full animate-float-delayed shadow-md shadow-purple-400/20"></div>
            </div>
            
            <div className="flex h-14 items-center border-b border-white/20 px-4 relative z-10">
              <h2 className="text-lg font-semibold text-white bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                AstroCircle
              </h2>
            </div>
            <nav className="flex-1 space-y-2 p-4 relative z-10">
              <div className="space-y-1">
                <a 
                  href="/dashboard" 
                  className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                    pathname === '/dashboard' 
                      ? 'text-white bg-white/20 shadow-lg shadow-purple-500/20 border border-white/30' 
                      : 'text-gray-200 hover:text-white hover:bg-white/15 hover:shadow-md hover:shadow-blue-500/10'
                  }`}
                >
                  <span className="mr-3">🏠</span>
                  Dashboard
                </a>
                <a 
                  href="/astro-report" 
                  className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                    pathname === '/astro-report' 
                      ? 'text-white bg-white/20 shadow-lg shadow-purple-500/20 border border-white/30' 
                      : 'text-gray-200 hover:text-white hover:bg-white/15 hover:shadow-md hover:shadow-blue-500/10'
                  }`}
                >
                  <span className="mr-3">⭐</span>
                  Astro Report
                </a>
                <a 
                  href="/relationships" 
                  className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                    pathname === '/relationships' 
                      ? 'text-white bg-white/20 shadow-lg shadow-purple-500/20 border border-white/30' 
                      : 'text-gray-200 hover:text-white hover:bg-white/15 hover:shadow-md hover:shadow-blue-500/10'
                  }`}
                >
                  <span className="mr-3">💕</span>
                  Relationships
                </a>
                <a 
                  href="/profile" 
                  className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                    pathname === '/profile' 
                      ? 'text-white bg-white/20 shadow-lg shadow-purple-500/20 border border-white/30' 
                      : 'text-gray-200 hover:text-white hover:bg-white/15 hover:shadow-md hover:shadow-blue-500/10'
                  }`}
                >
                  <span className="mr-3">👤</span>
                  Profile
                </a>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 z-50 w-64 transform transition-transform">
              <div className="h-full flex flex-col backdrop-blur-md bg-white/10 border-r border-white/20 shadow-2xl relative overflow-hidden">
                {/* Floating particles in mobile sidebar */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/40 rounded-full animate-float shadow-sm shadow-purple-400/30"></div>
                  <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-blue-400/50 rounded-full animate-float-delayed shadow-sm shadow-blue-400/40"></div>
                  <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-indigo-300/60 rounded-full animate-float-slow shadow-sm shadow-indigo-300/50"></div>
                  <div className="absolute top-2/3 right-1/3 w-2.5 h-2.5 bg-purple-300/30 rounded-full animate-float-fast shadow-md shadow-purple-300/25"></div>
                  <div className="absolute top-3/4 left-1/2 w-1.5 h-1.5 bg-blue-300/45 rounded-full animate-float shadow-sm shadow-blue-300/35"></div>
                  <div className="absolute top-1/6 right-1/6 w-1 h-1 bg-indigo-400/55 rounded-full animate-float-delayed shadow-sm shadow-indigo-400/45"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-500/35 rounded-full animate-float-slow shadow-sm shadow-purple-500/30"></div>
                  <div className="absolute bottom-1/3 right-1/5 w-1.5 h-1.5 bg-blue-500/40 rounded-full animate-float-fast shadow-sm shadow-blue-500/35"></div>
                  <div className="absolute bottom-1/6 left-1/5 w-1 h-1 bg-indigo-500/50 rounded-full animate-float shadow-sm shadow-indigo-500/40"></div>
                  <div className="absolute top-5/6 right-2/5 w-2.5 h-2.5 bg-purple-400/25 rounded-full animate-float-delayed shadow-md shadow-purple-400/20"></div>
                </div>
                
                <div className="flex h-14 items-center justify-between border-b border-white/20 px-4 relative z-10">
                  <h2 className="text-lg font-semibold text-white bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                    AstroCircle
                  </h2>
                  {/* Close button */}
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="flex-1 space-y-2 p-4 relative z-10">
                  <div className="space-y-1">
                    <a 
                      href="/dashboard" 
                      className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                        pathname === '/dashboard' 
                          ? 'text-white bg-white/20 shadow-lg shadow-purple-500/20 border border-white/30' 
                          : 'text-gray-200 hover:text-white hover:bg-white/15 hover:shadow-md hover:shadow-blue-500/10'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3">🏠</span>
                      Dashboard
                    </a>
                    <a 
                      href="/astro-report" 
                      className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                        pathname === '/astro-report' 
                          ? 'text-white bg-white/20 shadow-lg shadow-purple-500/20 border border-white/30' 
                          : 'text-gray-200 hover:text-white hover:bg-white/15 hover:shadow-md hover:shadow-blue-500/10'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3">⭐</span>
                      Astro Report
                    </a>
                    <a 
                      href="/relationships" 
                      className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                        pathname === '/relationships' 
                          ? 'text-white bg-white/20 shadow-lg shadow-purple-500/20 border border-white/30' 
                          : 'text-gray-200 hover:text-white hover:bg-white/15 hover:shadow-md hover:shadow-blue-500/10'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3">💕</span>
                      Relationships
                    </a>
                    <a 
                      href="/profile" 
                      className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                        pathname === '/profile' 
                          ? 'text-white bg-white/20 shadow-lg shadow-purple-500/20 border border-white/30' 
                          : 'text-gray-200 hover:text-white hover:bg-white/15 hover:shadow-md hover:shadow-blue-500/10'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3">👤</span>
                      Profile
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        )}
        
        {/* Main content */}
        <div className="flex-1 min-h-screen">
          <header className="sticky top-0 z-20 h-14 border-b border-white/20 backdrop-blur-md bg-white/10 shadow-lg">
            <div className="flex h-full items-center justify-between px-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <h1 className="text-sm font-semibold text-white lg:text-left text-center flex-1 lg:flex-none">
                {pathname === '/dashboard' ? 'Dashboard' : pathname === '/profile' ? 'Profile' : 'AstroCircle'}
              </h1>
              
              {/* Spacer for mobile to center the title */}
              <div className="lg:hidden w-10"></div>
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