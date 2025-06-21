'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SmoothLink } from "@/components/SmoothLink";
import { SmoothButton } from "@/components/SmoothButton";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

// Mobile Navigation Component
function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="group relative p-2 text-white hover:text-purple-200 transition-all duration-300">
          <div className="flex flex-col items-center justify-center w-8 h-8">
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all duration-300 group-hover:bg-purple-200"></div>
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all duration-300 group-hover:bg-purple-200"></div>
            <div className="w-6 h-0.5 bg-current transition-all duration-300 group-hover:bg-purple-200"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        </button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-80 bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl border-purple-500/20 [&>button]:text-white [&>button]:w-10 [&>button]:h-10 [&>button]:top-4 [&>button]:right-4 [&>button]:hover:bg-white/20 [&>button]:rounded-lg [&>button]:transition-all [&>button]:duration-300 [&>button>svg]:w-6 [&>button>svg]:h-6"
      >
        <SheetHeader className="text-left pb-4 pr-12">
          <SheetTitle className="flex items-center gap-3 text-white text-xl font-bold">
            <span className="text-2xl">🌟</span>
            <span className="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
              AstroCircle
            </span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col gap-4 pt-4">
          {/* Navigation Links */}
          <div className="flex flex-col gap-1">
            <SmoothLink 
              href="/features" 
              className="group flex items-center gap-2 p-2 text-white hover:text-purple-200 bg-white/5 hover:bg-white/10 rounded-md transition-all duration-300"
              onClick={() => setOpen(false)}
            >
              <span className="text-sm group-hover:scale-110 transition-transform duration-300">✨</span>
              <span className="text-xs font-medium">Features</span>
            </SmoothLink>
            
            <SmoothLink 
              href="/about" 
              className="group flex items-center gap-2 p-2 text-white hover:text-purple-200 bg-white/5 hover:bg-white/10 rounded-md transition-all duration-300"
              onClick={() => setOpen(false)}
            >
              <span className="text-sm group-hover:scale-110 transition-transform duration-300">🌙</span>
              <span className="text-xs font-medium">About</span>
            </SmoothLink>
            
            <SmoothLink 
              href="/contact" 
              className="group flex items-center gap-2 p-2 text-white hover:text-purple-200 bg-white/5 hover:bg-white/10 rounded-md transition-all duration-300"
              onClick={() => setOpen(false)}
            >
              <span className="text-sm group-hover:scale-110 transition-transform duration-300">📞</span>
              <span className="text-xs font-medium">Contact</span>
            </SmoothLink>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-2 pt-3 border-t border-white/20">
            <SmoothButton 
              href="/register"
              className="group relative bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 text-white font-medium px-6 py-2.5 rounded-md shadow-md hover:shadow-purple-500/20 transition-all duration-300 w-32"
              onClick={() => setOpen(false)}
            >
              <span className="relative z-10 flex items-center justify-center gap-1 text-xs">
                🚀 Get Started
                <span className="group-hover:animate-bounce text-xs">⭐</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/15 to-blue-400/15 rounded-md blur-sm group-hover:blur-md transition-all duration-300"></div>
            </SmoothButton>
            
            <SmoothButton 
              href="/login"
              className="group relative bg-white/8 hover:bg-white/15 backdrop-blur-md text-white font-medium px-6 py-2.5 rounded-md border border-white/25 hover:border-white/40 transition-all duration-300 w-32"
              onClick={() => setOpen(false)}
            >
              <span className="relative z-10 text-xs bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                Sign In
              </span>
            </SmoothButton>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-8 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 left-8 w-12 h-12 bg-blue-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
      </SheetContent>
    </Sheet>
  );
}

export default function AboutPage() {
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
            <SmoothLink href="/features" className="relative group px-4 py-2 text-gray-100 hover:text-white font-semibold transition-all duration-500 hover:scale-110">
              <span className="relative z-10">Features</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100"></div>
              <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
            </SmoothLink>
            <SmoothLink href="/about" className="relative group px-4 py-2 text-white font-semibold transition-all duration-500 hover:scale-110">
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full opacity-100 transition-all duration-500"></div>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 transition-all duration-500 rounded-full"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            </SmoothLink>
            <SmoothLink href="/contact" className="relative group px-4 py-2 text-gray-100 hover:text-white font-semibold transition-all duration-500 hover:scale-110">
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100"></div>
              <div className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
              <div className="absolute -top-1 left-1/2 w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
            </SmoothLink>
            </nav>
          </div>

          {/* Enhanced Action Buttons - Right section - Desktop Only */}
          <div className="flex-1 hidden lg:flex justify-end max-w-xs">
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
          <div className="flex-1 lg:hidden flex justify-end">
            <MobileNav />
          </div>
        </div>

        {/* Bottom Glow Effect */}
        <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
      </header>

      {/* Content */}
      <div className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
              About <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">AstroCircle</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Where ancient wisdom meets modern technology to unlock your cosmic potential
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-4 sm:p-6 md:p-8 lg:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Our <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Mission</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                AstroCircle bridges the gap between ancient Vedic wisdom and modern artificial intelligence to provide 
                personalized, accurate, and accessible astrological insights that empower you to make informed decisions 
                and unlock your true cosmic potential.
              </p>
            </Card>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 md:mb-16">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4 lg:px-0">
                The <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Story</span>
              </h2>
              <div className="space-y-4 sm:space-y-6 text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed px-4 lg:px-0">
                <p>
                  AstroCircle was born from a passion for making the profound wisdom of Vedic astrology accessible 
                  to everyone in our modern digital age. For over 5,000 years, this ancient science has guided 
                  countless souls toward their highest potential.
                </p>
                <p>
                  Our founder, <span className="text-purple-300 font-semibold">Siddhant Bhasin</span>, recognized 
                  the need to preserve and modernize this sacred knowledge, combining traditional astrological 
                  principles with cutting-edge AI technology to create personalized insights for the digital generation.
                </p>
                <p>
                  What started as a personal project to explore the intersection of technology and spirituality 
                  has evolved into a comprehensive platform that serves thousands of users seeking cosmic guidance 
                  in their daily lives.
                </p>
              </div>
            </div>

            <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">Why AstroCircle?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-4xl sm:text-5xl md:text-6xl">🔮</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-sm sm:text-base md:text-lg">Ancient Wisdom</h4>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">Rooted in 5,000+ years of Vedic tradition</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-4xl sm:text-5xl md:text-6xl">🤖</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-sm sm:text-base md:text-lg">Modern Technology</h4>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">AI-powered analysis for precise insights</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-4xl sm:text-5xl md:text-6xl">🎯</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-sm sm:text-base md:text-lg">Personalized</h4>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">Tailored specifically to your birth chart</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-4xl sm:text-5xl md:text-6xl">🌍</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-sm sm:text-base md:text-lg">Accessible</h4>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">Available 24/7 from anywhere in the world</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Values Section */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 sm:mb-10 md:mb-12">
              Our <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Values</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-4">🙏</div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-3">Authenticity</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-300">
                  We honor the sacred traditions of Vedic astrology while making them accessible to modern seekers.
                </p>
              </Card>

              <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-4">💡</div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-3">Innovation</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-300">
                  We continuously evolve our technology to provide the most accurate and helpful insights possible.
                </p>
              </Card>

              <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-4">🤝</div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-3">Empowerment</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-300">
                  We believe everyone deserves access to cosmic wisdom to make informed life decisions.
                </p>
              </Card>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 sm:mb-10 md:mb-12">
              Meet the <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Creator</span>
            </h2>
            <Card className="backdrop-blur-sm bg-white/10 border-white/20 p-8 lg:p-12">
              <div className="text-center">
                <div className="text-6xl mb-6">👨‍💻</div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">Siddhant Bhasin</h3>
                <p className="text-purple-300 font-semibold mb-6">Founder & Creator</p>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  A passionate developer and spiritual seeker who believes in the power of technology to preserve 
                  and share ancient wisdom. Siddhant created AstroCircle as a personal project to explore the 
                  fascinating intersection of AI and astrology, making cosmic insights accessible to everyone.
                </p>
              </div>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready to Begin Your <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Cosmic Journey?</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto">
              Join our community of cosmic explorers and discover what the stars have in store for you.
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg"
                onClick={() => router.push('/register')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-base sm:text-lg md:text-xl"
              >
                Get Started 🚀
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-20 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl">🌟</div>
                <span className="text-sm sm:text-base font-bold text-white">AstroCircle</span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Unlock your cosmic destiny with AI-powered Vedic astrology insights.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-white text-sm sm:text-base font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white text-sm sm:text-base font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Birth Chart</Link></li>
                <li><Link href="/career" className="text-gray-400 hover:text-white transition-colors">Career</Link></li>
                <li><Link href="/relationships" className="text-gray-400 hover:text-white transition-colors">Relationships</Link></li>
                <li><Link href="/health" className="text-gray-400 hover:text-white transition-colors">Health</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white text-sm sm:text-base font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/disclaimer" className="text-gray-400 hover:text-white transition-colors">Disclaimer</Link></li>
                <li><Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2024 Siddhant Bhasin Production. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 