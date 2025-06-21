'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SmoothLink } from "@/components/SmoothLink";

export default function FeaturesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/40 rounded-full animate-float shadow-sm shadow-purple-400/30"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-blue-400/50 rounded-full animate-float-delayed shadow-sm shadow-blue-400/40"></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-indigo-300/60 rounded-full animate-float-slow shadow-sm shadow-indigo-300/50"></div>
        <div className="absolute top-2/3 right-1/3 w-2.5 h-2.5 bg-purple-300/30 rounded-full animate-float-fast shadow-md shadow-purple-300/25"></div>
      </div>

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
              <SmoothLink href="/features" className="relative group px-4 py-2 text-white font-semibold transition-all duration-500 hover:scale-110">
                <span className="relative z-10">Features</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full opacity-100 transition-all duration-500"></div>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 transition-all duration-500 rounded-full"></div>
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
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
              <Button 
                onClick={() => router.push('/register')}
                className="group relative bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 text-white font-bold px-6 py-2.5 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-110 border-2 border-purple-400/50 hover:border-purple-300/70 text-sm lg:text-base"
              >
                <span className="relative z-10 flex items-center gap-2">
                  🚀 Get Started
                  <span className="group-hover:animate-bounce">⭐</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-500 opacity-60"></div>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button (for future mobile implementation) */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              className="text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Bottom Glow Effect */}
        <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
      </header>

      {/* Content */}
      <div className="relative z-10 py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Cosmic <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Features</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the powerful tools and insights that make AstroCircle your ultimate cosmic companion
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* AI-Powered Analysis */}
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
              <CardHeader>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🤖</div>
                <CardTitle className="text-white text-xl">AI-Powered Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Advanced artificial intelligence combined with ancient Vedic wisdom to provide incredibly accurate and personalized astrological insights.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Deep learning algorithms</li>
                  <li>• Real-time planetary calculations</li>
                  <li>• Personalized interpretations</li>
                </ul>
              </CardContent>
            </Card>

            {/* Birth Chart Generation */}
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
              <CardHeader>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">⭐</div>
                <CardTitle className="text-white text-xl">Birth Chart Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Complete Vedic birth chart with detailed planetary positions, houses, and comprehensive interpretations of your cosmic blueprint.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• 12 house analysis</li>
                  <li>• Planetary aspects</li>
                  <li>• Dasha periods</li>
                </ul>
              </CardContent>
            </Card>

            {/* Career Guidance */}
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
              <CardHeader>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💼</div>
                <CardTitle className="text-white text-xl">Career Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Discover your ideal career path, best timing for job changes, and strategies for professional success based on your birth chart.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Ideal career paths</li>
                  <li>• Timing for changes</li>
                  <li>• Success strategies</li>
                </ul>
              </CardContent>
            </Card>

            {/* Relationship Insights */}
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
              <CardHeader>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💕</div>
                <CardTitle className="text-white text-xl">Love & Relationships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Find your perfect match, understand relationship patterns, and discover the best times for marriage and family planning.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Compatibility analysis</li>
                  <li>• Relationship timing</li>
                  <li>• Marriage predictions</li>
                </ul>
              </CardContent>
            </Card>

            {/* Health Insights */}
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
              <CardHeader>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🌿</div>
                <CardTitle className="text-white text-xl">Health & Wellness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Get insights into your health patterns, preventive care guidance, and natural healing recommendations based on planetary influences.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Health predictions</li>
                  <li>• Preventive guidance</li>
                  <li>• Natural remedies</li>
                </ul>
              </CardContent>
            </Card>

            {/* Interactive Chat */}
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
              <CardHeader>
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💬</div>
                <CardTitle className="text-white text-xl">AI Astro Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Chat with our AI astrologer for instant answers to your cosmic questions and personalized guidance available 24/7.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Instant responses</li>
                  <li>• Personalized advice</li>
                  <li>• 24/7 availability</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-12">
              Advanced <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Capabilities</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-8">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">🔮</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Daily Horoscope</h3>
                    <p className="text-gray-300 mb-4">
                      Personalized daily insights, lucky colors, numbers, and timing for important decisions based on current planetary transits.
                    </p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Current planetary transits</li>
                      <li>• Lucky colors and numbers</li>
                      <li>• Optimal timing guidance</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-8">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">🌌</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Cosmic Reports</h3>
                    <p className="text-gray-300 mb-4">
                      Comprehensive astrological reports covering all aspects of your life with detailed explanations and actionable insights.
                    </p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Detailed life analysis</li>
                      <li>• Actionable insights</li>
                      <li>• PDF report generation</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Unlock Your <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Cosmic Potential?</span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have discovered their cosmic destiny through AstroCircle&apos;s powerful features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => router.push('/register')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                Start Your Journey 🚀
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => router.push('/about')}
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

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
  );
} 