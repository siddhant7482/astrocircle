'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getHoroscopeReading } from '@/lib/horoscope-service';
import type { UserProfile } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for monthly trends (this should come from your API in production)
const generateMonthlyData = (aspect: string) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    value: Math.floor(Math.random() * (90 - 40 + 1) + 40), // Random value between 40-90 for demo
  }));
};

type AspectData = {
  health: string;
  career: string;
  love: string;
  wealth: string;
  monthlyTrends?: {
    health: Array<{ month: string; value: number }>;
    career: Array<{ month: string; value: number }>;
    love: Array<{ month: string; value: number }>;
    wealth: Array<{ month: string; value: number }>;
  };
};

export function DashboardClient() {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [horoscopeData, setHoroscopeData] = useState<AspectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (!session) {
          throw new Error('No active session');
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) throw profileError;
        if (!profile) throw new Error('Profile not found');

        setUserData(profile);
        fetchHoroscopeData(profile);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load user profile');
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  const fetchHoroscopeData = async (profile: UserProfile) => {
    if (!profile.birth_date || !profile.birth_time || !profile.birth_place) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getHoroscopeReading(
        profile.birth_date,
        profile.birth_time,
        profile.birth_place
      );

      // Add monthly trends data
      const dataWithTrends = {
        ...data,
        monthlyTrends: {
          health: generateMonthlyData('health'),
          career: generateMonthlyData('career'),
          love: generateMonthlyData('love'),
          wealth: generateMonthlyData('wealth'),
        },
      };

      setHoroscopeData(dataWithTrends);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch horoscope data');
      console.error('Error fetching horoscope data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderChart = (data: Array<{ month: string; value: number }>, color: string) => (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <XAxis 
          dataKey="month" 
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip 
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {label}
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].value}%
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-[200px]" />
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto p-6">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>Please sign in to view your astrological dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => window.location.href = '/login'} variant="default">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Astrological Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome back, {userData.full_name}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {horoscopeData?.monthlyTrends && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">Health Trends</CardTitle>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </CardHeader>
                <CardContent>
                  {renderChart(horoscopeData.monthlyTrends.health, '#22c55e')}
                  <p className="text-sm text-muted-foreground mt-4">{horoscopeData.health}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">Career Trends</CardTitle>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  {renderChart(horoscopeData.monthlyTrends.career, '#3b82f6')}
                  <p className="text-sm text-muted-foreground mt-4">{horoscopeData.career}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">Love Trends</CardTitle>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </CardHeader>
                <CardContent>
                  {renderChart(horoscopeData.monthlyTrends.love, '#ec4899')}
                  <p className="text-sm text-muted-foreground mt-4">{horoscopeData.love}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">Wealth Trends</CardTitle>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
                    <path d="M12 18V6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  {renderChart(horoscopeData.monthlyTrends.wealth, '#f59e0b')}
                  <p className="text-sm text-muted-foreground mt-4">{horoscopeData.wealth}</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Birth Details</CardTitle>
            <CardDescription>Your astrological profile is based on these details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Birth Date</p>
                <p className="text-lg">{new Date(userData.birth_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Birth Time</p>
                <p className="text-lg">{userData.birth_time}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Birth Place</p>
                <p className="text-lg">{userData.birth_place}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
}
