'use client';

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function PrivacyPage() {
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

      {/* Content */}
      <div className="relative z-10 py-12 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/" className="inline-flex items-center space-x-2 mb-8 text-white hover:text-purple-300 transition-colors">
              <div className="text-2xl">🌟</div>
              <span className="text-xl font-bold">AstroCircle</span>
            </Link>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-300">Last updated: December 2024</p>
          </div>

          <Card className="backdrop-blur-sm bg-white/10 border-white/20 mb-8">
            <CardContent className="p-8">
              <div className="space-y-8 text-gray-300">
                {/* Personal Project Disclaimer */}
                <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-6 mb-8">
                  <h2 className="text-yellow-300 font-bold text-xl mb-3 flex items-center gap-2">
                    🎯 Personal Project Notice
                  </h2>
                  <div className="text-yellow-100 space-y-3">
                    <p className="font-semibold">
                      AstroCircle is a fun personal project created by Siddhant Bhasin for educational and entertainment purposes only.
                    </p>
                    <p>
                      This is NOT a commercial service. While we take privacy seriously, please understand that this is a hobby project 
                      with limited resources. Your data is handled with care, but the creator assumes no liability for any data-related issues.
                    </p>
                    <p className="font-semibold text-red-200">
                      ⚠️ Use this service knowing it&apos;s a personal project and at your own discretion.
                    </p>
                  </div>
                </div>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                  <p className="mb-4">We collect information you provide directly to us, such as:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name, email address, and account credentials</li>
                    <li>Birth date, time, and location for astrological calculations</li>
                    <li>Communications with our support team</li>
                    <li>Usage data and preferences</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                  <p className="mb-4">We use your information to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide personalized astrological readings and insights</li>
                    <li>Calculate accurate birth charts and planetary positions</li>
                    <li>Improve our services and user experience</li>
                    <li>Send you important updates about our services</li>
                    <li>Respond to your inquiries and provide customer support</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties without 
                    your consent, except as described in this policy. We may share your information with trusted 
                    service providers who assist us in operating our website and providing our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
                  <p>
                    We implement appropriate security measures to protect your personal information against unauthorized 
                    access, alteration, disclosure, or destruction. However, no method of transmission over the internet 
                    is 100% secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access and update your personal information</li>
                    <li>Delete your account and associated data</li>
                    <li>Opt out of marketing communications</li>
                    <li>Request a copy of your data</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies and Tracking</h2>
                  <p>
                    We use cookies and similar technologies to enhance your experience on our website, analyze usage 
                    patterns, and provide personalized content. You can control cookie settings through your browser.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please contact us 
                    through our website or customer support channels.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link 
              href="/" 
              className="text-purple-300 hover:text-white transition-colors font-medium"
            >
              ← Back to AstroCircle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 