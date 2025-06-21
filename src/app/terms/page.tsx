'use client';

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function TermsPage() {
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
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Terms of Service</h1>
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
                      This is NOT a commercial service and should be treated as a hobby project. All astrological readings, 
                      predictions, and AI-generated content are provided for entertainment purposes only and should not be 
                      relied upon for serious life decisions.
                    </p>
                    <p className="font-semibold text-red-200">
                      ⚠️ IMPORTANT: The creator (Siddhant Bhasin) assumes NO responsibility or liability for any decisions 
                      made based on the content provided by this application. Use at your own discretion and risk.
                    </p>
                  </div>
                </div>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using AstroCircle (&quot;Service&quot;), you accept and agree to be bound by the terms and 
                    provision of this agreement. These Terms of Service govern your use of the AstroCircle website and services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
                  <p>
                    AstroCircle provides Vedic astrology readings, birth chart analysis, and astrological guidance 
                    through AI-powered insights. Our services are for entertainment and guidance purposes and should 
                    not replace professional advice in medical, legal, or financial matters.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate birth information for astrological calculations</li>
                    <li>Use the service responsibly and for lawful purposes only</li>
                    <li>Respect the intellectual property rights of AstroCircle</li>
                    <li>Not attempt to reverse engineer or copy our algorithms</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">4. Privacy and Data Protection</h2>
                  <p>
                    Your privacy is important to us. We collect and use your personal information in accordance with 
                    our Privacy Policy. By using our service, you consent to the collection and use of your information 
                    as outlined in our Privacy Policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability & Disclaimer</h2>
                  <div className="space-y-4">
                    <p>
                      AstroCircle provides astrological insights for entertainment and guidance purposes. We do not guarantee 
                      the accuracy of predictions or readings. Users should not make important life decisions based solely 
                      on astrological guidance without consulting appropriate professionals.
                    </p>
                    <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4">
                      <p className="text-red-200 font-semibold">
                        <strong>COMPLETE LIABILITY WAIVER:</strong> Siddhant Bhasin, the creator of this personal project, 
                        shall NOT be held liable for any direct, indirect, incidental, special, consequential, or punitive 
                        damages arising from your use of this service. This includes but is not limited to:
                      </p>
                      <ul className="list-disc pl-6 mt-2 text-red-200 space-y-1">
                        <li>Financial losses from investment or business decisions</li>
                        <li>Relationship or personal life consequences</li>
                        <li>Medical or health-related decisions</li>
                        <li>Any other life decisions influenced by this application</li>
                      </ul>
                      <p className="text-red-200 font-semibold mt-3">
                        BY USING THIS SERVICE, YOU ACKNOWLEDGE THAT THIS IS A HOBBY PROJECT AND AGREE TO HOLD THE CREATOR HARMLESS.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Information</h2>
                  <p>
                    If you have any questions about these Terms of Service, please contact us through our website 
                    or customer support channels.
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