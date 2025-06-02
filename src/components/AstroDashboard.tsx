"use client";

import React, { useEffect, useState } from 'react';
import AstroChart from './AstroChart';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";

interface UserData {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

interface AstroReport {
  career: string;
  relationships: string;
  health: string;
  wealth: string;
  chartData: {
    houses: any[];
    planets: any[];
  };
}

const AstroDashboard: React.FC = () => {
  const [userData] = useState<UserData>({
    fullName: "Siddhant Bhasin",
    dateOfBirth: "12 November, 2002",
    timeOfBirth: "8:10 pm",
    placeOfBirth: "Panchkula"
  });
  const [report, setReport] = useState<AstroReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Try to load saved data from localStorage
    const savedReport = localStorage.getItem('astroReport');
    if (savedReport) {
      setReport(JSON.parse(savedReport));
    } else {
      fetchAstroReport();
    }
  }, []);

  const fetchAstroReport = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/astro-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      setReport(data);
      localStorage.setItem('astroReport', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Your Astro Report</h1>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for insights..."
              className="w-full max-w-xl pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Welcome Siddhant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>
              <span className="text-gray-600">Full Name</span>
              <span className="text-orange-700"> - {userData.fullName}</span>
            </p>
            <p>
              <span className="text-gray-600">Date of Birth</span>
              <span className="text-orange-700"> - {userData.dateOfBirth}</span>
            </p>
            <p>
              <span className="text-gray-600">Time of Birth</span>
              <span className="text-orange-700"> - {userData.timeOfBirth}</span>
            </p>
            <p>
              <span className="text-gray-600">Place of Birth</span>
              <span className="text-orange-700"> - {userData.placeOfBirth}</span>
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Career Outlook</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-[#E6EFE9] rounded-lg p-6">
                <img 
                  src="/career-illustration.svg" 
                  alt="" 
                  className="w-full h-32 object-contain mb-4" 
                />
                <p className="text-sm text-gray-600 leading-relaxed">
                  The current planetary positions favor physical and mental well-being. 
                  Incorporate regular exercise and mindfulness practices to maintain balance 
                  and vitality. The current planetary positions favor physical and mental well-being.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              {report && (
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-100 rounded-lg">
                    <div className="relative">
                      <AstroChart chartData={report.chartData} />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Health & Wellness</CardTitle>
            </CardHeader>
            <CardContent className="flex items-start space-x-4">
              <img src="/health-illustration.svg" alt="" className="w-16 h-16" />
              <p className="text-sm text-gray-600">{report?.health}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Wealth</CardTitle>
            </CardHeader>
            <CardContent className="flex items-start space-x-4">
              <img src="/wealth-illustration.svg" alt="" className="w-16 h-16" />
              <p className="text-sm text-gray-600">{report?.wealth}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Chatbot Assistance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <Input
                type="text"
                placeholder="Ask me anything about your predictions..."
                className="flex-1"
              />
              <Button>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AstroDashboard; 