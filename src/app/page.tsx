'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/use-user";
import { useEffect } from "react";
import Link from "next/link";
import { SmoothLink } from "@/components/SmoothLink";
import { SmoothButton } from "@/components/SmoothButton";

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">AstroCircle</CardTitle>
            <CardDescription className="text-gray-300">Loading...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-purple-400/25 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
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
        <div className="absolute top-1/5 left-3/4 w-1.5 h-1.5 bg-blue-300/35 rounded-full animate-float-slow shadow-sm shadow-blue-300/30"></div>
        <div className="absolute top-4/5 left-4/5 w-2 h-2 bg-purple-400/30 rounded-full animate-float shadow-sm shadow-purple-400/25"></div>
        <div className="absolute top-1/8 left-1/8 w-1 h-1 bg-indigo-400/45 rounded-full animate-float-fast shadow-sm shadow-indigo-400/35"></div>
        <div className="absolute top-7/8 right-1/8 w-1.5 h-1.5 bg-blue-400/35 rounded-full animate-float-delayed shadow-sm shadow-blue-400/30"></div>
        <div className="absolute top-3/8 right-3/8 w-2 h-2 bg-purple-300/25 rounded-full animate-float-slow shadow-sm shadow-purple-300/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="relative z-30 py-4 px-6 lg:px-12">
          {/* Glassmorphism Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-2xl border-b border-white/20 shadow-2xl"></div>
          
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-4 left-1/4 w-12 h-12 bg-purple-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -top-2 right-1/3 w-8 h-8 bg-blue-400/25 rounded-full blur-lg animate-pulse delay-1000"></div>
            <div className="absolute -bottom-4 left-1/2 w-10 h-10 bg-indigo-400/15 rounded-full blur-xl animate-pulse delay-2000"></div>
          </div>

          <div className="max-w-7xl mx-auto flex items-center relative z-10">
            {/* Enhanced Logo - Left section */}
            <div className="flex-1 flex justify-start max-w-xs">
              <SmoothLink href="/" className="group flex items-center space-x-3 text-white hover:text-purple-200 transition-all duration-500 transform hover:scale-105">
                <div className="relative">
                  <div className="text-3xl lg:text-4xl group-hover:animate-spin-slow transition-all duration-700">🌟</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
                    AstroCircle
                  </span>
                  <span className="text-xs text-purple-300 font-medium tracking-wider opacity-80">
                    Cosmic Wisdom
                  </span>
                </div>
              </SmoothLink>
            </div>
            
            {/* Enhanced Navigation Menu - Center section */}
            <div className="flex-1 flex justify-center">
              <nav className="hidden lg:flex items-center space-x-8">
              <SmoothLink href="/features" className="relative group px-4 py-2 text-gray-100 hover:text-white font-semibold transition-all duration-500 hover:scale-110">
                <span className="relative z-10">Features</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100"></div>
                <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
              </SmoothLink>
              <SmoothLink href="/about" className="relative group px-4 py-2 text-gray-100 hover:text-white font-semibold transition-all duration-500 hover:scale-110">
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100"></div>
                <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
              </SmoothLink>
              <SmoothLink href="/contact" className="relative group px-4 py-2 text-gray-100 hover:text-white font-semibold transition-all duration-500 hover:scale-110">
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100"></div>
                <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
                <div className="absolute -top-1 left-1/2 w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
              </SmoothLink>
              </nav>
            </div>

            {/* Enhanced Action Buttons - Right section */}
                        <div className="flex-1 flex justify-end max-w-xs">
              <div className="flex items-center">
                <SmoothButton 
                  href="/register"
                  className="group relative bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 text-white font-bold px-6 py-2.5 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-110 border-2 border-purple-400/50 hover:border-purple-300/70 text-sm lg:text-base"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    🚀 Get Started
                    <span className="group-hover:animate-bounce">⭐</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-500 opacity-60"></div>
                </SmoothButton>
              </div>
            </div>

                      {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-2">
            <SmoothButton 
              href="/register"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-4 py-2 rounded-full text-sm"
            >
              🚀 Start
            </SmoothButton>
          </div>
          </div>

          {/* Bottom Glow Effect */}
          <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
        </header>

        {/* Hero Section */}
        <section className="relative text-center py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-12 overflow-hidden">
          {/* Hero Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Large pulsing orbs */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-indigo-400/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
            
            {/* Shooting stars effect */}
            <div className="absolute top-1/6 left-1/6 w-1 h-1 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-ping delay-500"></div>
            <div className="absolute bottom-1/4 right-1/6 w-1 h-1 bg-blue-300 rounded-full animate-ping delay-1000"></div>
            <div className="absolute top-3/4 left-1/5 w-1 h-1 bg-indigo-300 rounded-full animate-ping delay-1500"></div>
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            {/* Animated cosmic symbols */}
            <div className="absolute -top-8 left-1/4 text-4xl animate-float opacity-60">✨</div>
            <div className="absolute -top-4 right-1/4 text-3xl animate-float-delayed opacity-50">🌙</div>
            <div className="absolute top-8 left-1/6 text-2xl animate-float-slow opacity-40">⭐</div>
            <div className="absolute top-12 right-1/6 text-3xl animate-float-fast opacity-60">🔮</div>
            
            {/* Main heading with enhanced effects */}
            <div className="relative mb-6 md:mb-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 md:mb-6 leading-tight relative">
                <span className="relative inline-block">
                  Unlock Your
                  <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl rounded-full animate-pulse"></div>
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-200 via-blue-200 to-purple-300 bg-clip-text text-transparent animate-pulse relative inline-block">
                  Cosmic Destiny
                  <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-purple-400/30 to-blue-400/30 blur-lg rounded-full"></div>
                </span>
              </h2>
              
              {/* Magical sparkle effects around text */}
              <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
              <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping delay-300 opacity-60"></div>
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-300 rounded-full animate-ping delay-700 opacity-80"></div>
              <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-indigo-300 rounded-full animate-ping delay-1000 opacity-50"></div>
            </div>
            
            {/* Enhanced description with glow effect */}
            <div className="relative mb-8 md:mb-12">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-3 md:mb-4 leading-relaxed max-w-4xl mx-auto relative px-4">
                <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-medium">
                  Discover the ancient wisdom of Vedic astrology with AI-powered insights.
                </span>
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-purple-200 leading-relaxed max-w-3xl mx-auto px-4">
                Get personalized readings, career guidance, and cosmic predictions tailored just for you.
              </p>
              
              {/* Subtle glow behind text */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl rounded-full"></div>
            </div>
            
            {/* Enhanced CTA buttons with better visibility */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <SmoothButton 
                href="/register"
                size="lg"
                className="group relative bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 text-white font-bold px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full shadow-2xl hover:shadow-purple-500/25 transform hover:scale-110 transition-all duration-500 text-base sm:text-lg md:text-xl border-2 border-purple-400/30 hover:border-purple-300/50 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Journey 
                  <span className="text-lg sm:text-xl md:text-2xl group-hover:animate-bounce">🚀</span>
                </span>
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              </SmoothButton>
              
              <SmoothButton 
                href="/login"
                size="lg"
                className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full border-2 border-white/40 hover:border-white/60 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-base sm:text-lg md:text-xl w-full sm:w-auto"
              >
                <span className="relative z-10 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent font-semibold">
                  Already a Member?
                </span>
                {/* Button backdrop glow */}
                <div className="absolute inset-0 bg-white/5 rounded-full blur-lg group-hover:bg-white/10 transition-all duration-300"></div>
              </SmoothButton>
            </div>
          </div>
          
          {/* Additional floating cosmic elements */}
          <div className="absolute bottom-10 left-10 text-6xl opacity-20 animate-float-slow">🌌</div>
          <div className="absolute top-20 right-10 text-5xl opacity-15 animate-float">🪐</div>
          <div className="absolute bottom-20 right-20 text-4xl opacity-25 animate-float-delayed">🌟</div>
        </section>

        {/* Vedic Science Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
                The Sacred Science of 
                <span className="bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent"> Vedic Astrology</span>
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                For over 5,000 years, Hindu Vedic astrology has guided souls toward their highest potential. 
                Now, we blend this ancient wisdom with modern AI to bring you precise, personalized insights.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="backdrop-blur-sm bg-white/10 border-white/20 text-center p-6 hover:bg-white/15 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🕉️</div>
                <h4 className="text-xl font-semibold text-white mb-2">Ancient Wisdom</h4>
                <p className="text-gray-300">Rooted in 5,000+ years of Hindu spiritual tradition</p>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/10 border-white/20 text-center p-6 hover:bg-white/15 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🌙</div>
                <h4 className="text-xl font-semibold text-white mb-2">Lunar Calendar</h4>
                <p className="text-gray-300">Based on precise lunar calculations and planetary positions</p>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/10 border-white/20 text-center p-6 hover:bg-white/15 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📿</div>
                <h4 className="text-xl font-semibold text-white mb-2">Karmic Insights</h4>
                <p className="text-gray-300">Understand your past-life influences and soul purpose</p>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/10 border-white/20 text-center p-6 hover:bg-white/15 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🌟</div>
                <h4 className="text-xl font-semibold text-white mb-2">Divine Guidance</h4>
                <p className="text-gray-300">Sacred remedies and mantras for spiritual growth</p>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
                Your Complete 
                <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> Cosmic Toolkit</span>
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                Everything you need to navigate life&apos;s journey with cosmic wisdom and clarity
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
                <CardHeader>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">💼</div>
                  <CardTitle className="text-white text-xl">Career Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Discover your ideal career path, best timing for job changes, and strategies for professional success based on your birth chart.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
                <CardHeader>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">💕</div>
                  <CardTitle className="text-white text-xl">Love & Relationships</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Find your perfect match, understand relationship patterns, and discover the best times for marriage and family planning.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
                <CardHeader>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🌿</div>
                  <CardTitle className="text-white text-xl">Health & Wellness</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Get insights into your health patterns, preventive care guidance, and natural healing recommendations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
                <CardHeader>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">⭐</div>
                  <CardTitle className="text-white text-xl">Birth Chart Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Complete Vedic birth chart with planetary positions, houses, and detailed interpretations of your cosmic blueprint.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
                <CardHeader>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">💬</div>
                  <CardTitle className="text-white text-xl">AI Astro Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Chat with our AI astrologer for instant answers to your cosmic questions and personalized guidance.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
                <CardHeader>
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🔮</div>
                  <CardTitle className="text-white text-xl">Daily Horoscope</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Personalized daily insights, lucky colors, numbers, and timing for important decisions based on current planetary transits.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Exactly Do Section */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                How We Transform 
                <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent"> Your Life</span>
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We don&apos;t just tell your future - we empower you to create it
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <h4 className="text-3xl font-bold text-white mb-4">📊 Precision Cosmic Analysis</h4>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    We calculate your exact planetary positions down to the minute, analyzing over 27 stellar constellations, 
                    9 planets, and 12 houses to create your unique cosmic fingerprint. No generic horoscopes - just pure, 
                    personalized astrological science.
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <Card className="backdrop-blur-sm bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-white/20 p-8">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🌌</div>
                      <h5 className="text-xl font-semibold text-white">Your Cosmic DNA</h5>
                    </div>
                  </Card>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                <div className="lg:w-1/2">
                  <h4 className="text-3xl font-bold text-white mb-4">🎯 Life-Changing Predictions</h4>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    We don&apos;t just predict what might happen - we show you exactly WHEN to make major life decisions. 
                    Should you start that business in March? Is September perfect for love? We give you the cosmic timing 
                    that billionaires and celebrities use.
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <Card className="backdrop-blur-sm bg-gradient-to-br from-green-500/20 to-purple-500/20 border-white/20 p-8">
                    <div className="text-center">
                      <div className="text-6xl mb-4">⏰</div>
                      <h5 className="text-xl font-semibold text-white">Perfect Timing</h5>
                    </div>
                  </Card>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <h4 className="text-3xl font-bold text-white mb-4">🚀 Instant Transformation</h4>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Get immediate access to powerful Vedic remedies, mantras, and gemstone recommendations that can 
                    shift your energy instantly. See results in days, not years. Our users report life changes within 
                    the first week of following their cosmic guidance.
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <Card className="backdrop-blur-sm bg-gradient-to-br from-orange-500/20 to-pink-500/20 border-white/20 p-8">
                    <div className="text-center">
                      <div className="text-6xl mb-4">⚡</div>
                      <h5 className="text-xl font-semibold text-white">Instant Results</h5>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Change Your Life?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands who&apos;ve already unlocked their cosmic potential
            </p>
            <SmoothButton 
              href="/register"
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-xl"
            >
              Get Your Free Reading Now ✨
            </SmoothButton>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 mt-20 py-12 px-6 lg:px-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="text-2xl">🌟</div>
                  <span className="text-xl font-bold text-white">AstroCircle</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Unlock your cosmic destiny with AI-powered Vedic astrology insights.
                </p>
              </div>

              {/* Navigation */}
              <div>
                <h4 className="text-white font-semibold mb-4">Navigation</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-white font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Birth Chart</Link></li>
                  <li><Link href="/career" className="text-gray-400 hover:text-white transition-colors">Career</Link></li>
                  <li><Link href="/relationships" className="text-gray-400 hover:text-white transition-colors">Relationships</Link></li>
                  <li><Link href="/health" className="text-gray-400 hover:text-white transition-colors">Health</Link></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="/disclaimer" className="text-gray-400 hover:text-white transition-colors">Disclaimer</Link></li>
                  <li><Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className="pt-8 border-t border-white/10 text-center">
              <p className="text-gray-400 text-sm">
                © 2024 Siddhant Bhasin Production. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
