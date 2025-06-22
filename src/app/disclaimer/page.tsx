'use client';

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function DisclaimerPage() {
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
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Disclaimer</h1>
            <p className="text-gray-300">Important information about our services</p>
          </div>

          <Card className="backdrop-blur-sm bg-white/10 border-white/20 mb-8">
            <CardContent className="p-8">
              <div className="space-y-8 text-gray-300">
                {/* Personal Project Disclaimer */}
                <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-6 mb-8">
                  <h2 className="text-red-300 font-bold text-xl mb-3 flex items-center gap-2">
                    ⚠️ IMPORTANT: Personal Project Notice
                  </h2>
                  <div className="text-red-100 space-y-3">
                    <p className="font-bold text-lg">
                      AstroCircle is a FUN PERSONAL PROJECT created by Siddhant Bhasin for educational and entertainment purposes ONLY.
                    </p>
                    <p className="font-semibold">
                      This is NOT a professional astrological service or commercial business. It is a hobby project built for learning and entertainment.
                    </p>
                    <div className="bg-red-600/30 border border-red-500/50 rounded p-4 mt-4">
                      <p className="font-bold text-red-100">
                        🚨 COMPLETE LIABILITY WAIVER: Siddhant Bhasin (the creator) assumes ABSOLUTELY NO RESPONSIBILITY or LIABILITY for:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-red-100">
                        <li>Any decisions you make based on this application</li>
                        <li>Any consequences, damages, or losses resulting from use of this service</li>
                        <li>The accuracy or reliability of any astrological content</li>
                        <li>Any technical issues, data loss, or service interruptions</li>
                        <li>Any other issues whatsoever related to this hobby project</li>
                      </ul>
                      <p className="font-bold mt-3 text-red-100">
                        BY USING THIS SERVICE, YOU ACKNOWLEDGE THIS IS A PERSONAL HOBBY PROJECT AND AGREE TO HOLD THE CREATOR COMPLETELY HARMLESS.
                      </p>
                    </div>
                  </div>
                </div>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Entertainment and Guidance Only</h2>
                  <p>
                    AstroCircle provides astrological readings, birth chart analysis, and cosmic insights for 
                    entertainment, self-reflection, and guidance purposes only. Our services are not intended 
                    to be a substitute for professional advice in medical, legal, financial, or psychological matters.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">No Guarantee of Accuracy</h2>
                  <p>
                    While we strive to provide accurate astrological calculations and meaningful interpretations 
                    based on ancient Vedic principles, we make no guarantees about the accuracy, completeness, 
                    or reliability of any predictions, readings, or advice provided through our platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Personal Responsibility</h2>
                  <p>
                    Users are solely responsible for their decisions and actions. You should not make important 
                    life decisions based exclusively on astrological guidance. Always consult with qualified 
                    professionals for medical, legal, financial, or other serious matters.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">AI-Generated Content</h2>
                  <p>
                    Our platform uses artificial intelligence to generate astrological interpretations and insights. 
                    While our AI is trained on traditional Vedic astrology principles, the content is generated 
                    algorithmically and should be understood as such.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Cultural and Religious Considerations</h2>
                  <p>
                    Our services are based on Vedic astrological traditions. We respect all religious and cultural 
                    beliefs and encourage users to consider their own faith and values when using our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Age Restrictions</h2>
                  <p>
                    Our services are intended for users 18 years of age and older. Users under 18 should have 
                    parental guidance when using astrological services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Data Collection and Analytics</h2>
                  <div className="space-y-4">
                    <p>
                      AstroCircle uses Google Analytics to collect anonymous usage data to improve our services. 
                      This is a standard practice for websites and helps us understand how users interact with our platform.
                    </p>
                    <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
                      <h3 className="text-blue-300 font-semibold mb-2">📊 Analytics Disclaimer</h3>
                      <p className="text-blue-100">
                        By using this website, you acknowledge that Google Analytics (tracking ID: G-TZRV127JSN) 
                        may collect data about your visit for statistical purposes. This data is anonymized and 
                        used solely to improve website functionality and user experience.
                      </p>
                      <p className="text-blue-100 mt-2">
                                                 <strong>Your Privacy:</strong> You can opt out of this tracking at any time by using browser 
                         privacy settings or installing Google&apos;s opt-out add-on.
                      </p>
                    </div>
                    <p className="text-sm text-gray-400">
                      As a personal project, we are transparent about all data collection and give users full control 
                      over their privacy preferences.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
                  <p>
                    AstroCircle and its creators shall not be liable for any direct, indirect, incidental, 
                    special, or consequential damages arising from the use of our services or reliance on 
                    the information provided.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Questions or Concerns</h2>
                  <p>
                    If you have any questions about this disclaimer or our services, please contact us 
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