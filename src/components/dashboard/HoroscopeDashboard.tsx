'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserInfoCard } from "@/components/cards/UserInfoCard";
import { VedicChartCard } from "@/components/cards/VedicChartCard";
import { AspectCard } from "@/components/cards/AspectCard";

interface AspectData {
  date: string;
  value: number;
}

export interface HoroscopeData {
  health: string;
  career: string;
  love: string;
  wealth: string;
  scores: {
    health: number;
    career: number;
    love: number;
    wealth: number;
  };
}

interface HoroscopeResponse {
  health: string;
  career: string;
  love: string;
  wealth: string;
  scores: {
    health: number;
    career: number;
    love: number;
    wealth: number;
  };
}

interface HoroscopeDashboardProps {
  userData: {
    name: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
  };
  horoscopeData: HoroscopeData | null;
  onUserDataUpdate?: (data: { name: string; birthDate: string; birthTime: string; birthPlace: string }) => void;
  isLoading?: boolean;
}

const AspectChart = ({ 
  data, 
  title, 
  color, 
  currentScore, 
  description 
}: { 
  data: AspectData[], 
  title: string, 
  color: string,
  currentScore: number,
  description: string
}) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="mb-4 text-sm text-gray-600">{description}</p>
      <div className="mb-4">
        <div className="text-2xl font-bold" style={{ color }}>
          {currentScore}%
        </div>
        <div className="text-sm text-gray-500">Current Score</div>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export function HoroscopeDashboard({
  userData,
  horoscopeData,
  onUserDataUpdate,
  isLoading = false,
}: HoroscopeDashboardProps) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Info Card */}
        <UserInfoCard
          {...userData}
          onUpdate={onUserDataUpdate}
          isEditable={true}
        />

        {/* Vedic Chart Card */}
        <VedicChartCard
          birthDate={userData.birthDate}
          birthTime={userData.birthTime}
          birthPlace={userData.birthPlace}
        />
      </div>

      {/* Aspect Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {horoscopeData ? (
          <>
            <AspectCard
              title="Health"
              description={horoscopeData.health}
              score={horoscopeData.scores.health}
              gradientColors={{ from: "green-50", to: "emerald-50" }}
            />
            <AspectCard
              title="Career"
              description={horoscopeData.career}
              score={horoscopeData.scores.career}
              gradientColors={{ from: "blue-50", to: "indigo-50" }}
            />
            <AspectCard
              title="Love"
              description={horoscopeData.love}
              score={horoscopeData.scores.love}
              gradientColors={{ from: "pink-50", to: "rose-50" }}
            />
            <AspectCard
              title="Wealth"
              description={horoscopeData.wealth}
              score={horoscopeData.scores.wealth}
              gradientColors={{ from: "yellow-50", to: "amber-50" }}
            />
          </>
        ) : (
          <div className="col-span-4 text-center py-12">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3">Calculating your horoscope...</span>
              </div>
            ) : (
              <p className="text-gray-500">
                Enter your birth details to see your personalized horoscope reading
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 