'use client';

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function CookiesPage() {
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
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Cookie Policy</h1>
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
                      This is NOT a commercial service. Cookie usage is minimal and primarily for basic functionality. 
                      The creator assumes no liability for any cookie-related issues or privacy concerns.
                    </p>
                    <p className="font-semibold text-red-200">
                      ⚠️ This is a hobby project - use at your own discretion.
                    </p>
                  </div>
                </div>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">What Are Cookies?</h2>
                  <p>
                    Cookies are small text files that are stored on your device when you visit our website. 
                    They help us provide you with a better experience by remembering your preferences and 
                    improving our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Types of Cookies We Use</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Essential Cookies</h3>
                      <p>
                        These cookies are necessary for the website to function properly. They enable core 
                        functionality such as security, network management, and accessibility.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Authentication Cookies</h3>
                      <p>
                        We use secure session cookies to keep you logged in and maintain your authentication 
                        state while using our services.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Preference Cookies</h3>
                      <p>
                        These cookies allow us to remember your preferences and settings to provide you with 
                        a personalized experience.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Analytics Cookies</h3>
                      <p>
                        We use analytics cookies to understand how visitors interact with our website, 
                        helping us improve our services and user experience.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Managing Cookies</h2>
                  <p className="mb-4">
                    You can control and manage cookies in various ways:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Browser settings: Most browsers allow you to view, delete, and block cookies</li>
                    <li>Opt-out tools: You can use browser extensions to manage tracking cookies</li>
                    <li>Privacy settings: Adjust your privacy preferences in your browser</li>
                  </ul>
                  <p className="mt-4">
                    Please note that disabling essential cookies may affect the functionality of our website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Cookies</h2>
                  <p>
                    We may use third-party services that set their own cookies. These services help us 
                    provide better functionality and analyze website usage. We do not have control over 
                    these third-party cookies.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Updates to This Policy</h2>
                  <p>
                    We may update this Cookie Policy from time to time. Any changes will be posted on this 
                    page with an updated &quot;Last updated&quot; date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
                  <p>
                    If you have any questions about our use of cookies, please contact us through our 
                    website or customer support channels.
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