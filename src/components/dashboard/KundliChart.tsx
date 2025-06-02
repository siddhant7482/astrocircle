'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getChartForUser } from '@/lib/chart-service';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function KundliChart() {
  const [chartSvg, setChartSvg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  async function fetchChart() {
    try {
      setIsLoading(true);
      setError(null);

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (!session) {
        throw new Error('No active session');
      }

      const chartData = await getChartForUser(session.user.id);
      if (!chartData?.svg_code) {
        throw new Error('Failed to load chart');
      }

      setChartSvg(chartData.svg_code);
      setError(null);
    } catch (err) {
      console.error('Error fetching chart:', err);
      setError(err instanceof Error ? err.message : 'Failed to load chart');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchChart();
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchChart();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Birth Chart</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <Skeleton className="h-[400px] w-[400px]" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    // Special handling for incomplete profile
    if (error.includes('Birth details not complete')) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Complete Your Profile
            </CardTitle>
            <CardDescription>
              To generate your birth chart, we need your complete birth details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Please provide the following information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full Name</li>
              <li>Date of Birth</li>
              <li>Time of Birth</li>
              <li>Place of Birth</li>
            </ul>
            <div className="pt-4">
              <Button 
                onClick={() => {
                  const searchParams = new URLSearchParams(window.location.search);
                  searchParams.set('edit', 'profile');
                  window.history.pushState(null, '', `?${searchParams.toString()}`);
                  window.location.reload();
                }}
              >
                Update Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    // API or other errors
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Error Loading Chart</CardTitle>
          <CardDescription>
            {error.includes('API') ? 'There was an error connecting to the astrology service.' : error}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Please try again in a few moments.</p>
          <Button 
            onClick={handleRetry}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!chartSvg) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Birth Chart</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRetry}
          disabled={isLoading}
          title="Refresh chart"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div 
          className="w-full max-w-[400px] aspect-square"
          dangerouslySetInnerHTML={{ __html: chartSvg }} 
        />
      </CardContent>
    </Card>
  );
} 