'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/use-user";
import { useEffect } from "react";
import Link from "next/link";

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
        <header className="flex items-center justify-between p-6 lg:px-12">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🌟</div>
            <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
              AstroCircle
            </h1>
          </div>
          <Button 
            onClick={() => router.push('/login')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started
          </Button>
        </header>

        {/* Hero Section */}
        <section className="text-center py-20 lg:py-32 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Unlock Your
              <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent"> Cosmic </span>
              Destiny
            </h2>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Discover the ancient wisdom of Vedic astrology with AI-powered insights. 
              Get personalized readings, career guidance, and cosmic predictions tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                onClick={() => router.push('/register')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-lg"
              >
                Start Your Journey 🚀
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => router.push('/login')}
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              >
                Already a Member?
              </Button>
            </div>
          </div>
        </section>

        {/* Vedic Science Section */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                The Sacred Science of 
                <span className="bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent"> Vedic Astrology</span>
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                For over 5,000 years, Hindu Vedic astrology has guided souls toward their highest potential. 
                Now, we blend this ancient wisdom with modern AI to bring you precise, personalized insights.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Your Complete 
                <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"> Cosmic Toolkit</span>
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Everything you need to navigate life&apos;s journey with cosmic wisdom and clarity
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <Button 
              size="lg"
              onClick={() => router.push('/register')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-xl"
            >
              Get Your Free Reading Now ✨
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 lg:px-12 border-t border-white/20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="text-2xl">🌟</div>
                  <h3 className="text-xl font-bold text-white">AstroCircle</h3>
                </div>
                <p className="text-gray-400">
                  Your gateway to cosmic wisdom and personal transformation through Vedic astrology.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Birth Chart Analysis</li>
                  <li>Career Guidance</li>
                  <li>Love Compatibility</li>
                  <li>Health Insights</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Daily Horoscope</li>
                  <li>Vedic Calendar</li>
                  <li>Astrology Blog</li>
                  <li>Learning Center</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                  <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 AstroCircle. All rights reserved. | Unlock your cosmic potential with ancient wisdom.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
