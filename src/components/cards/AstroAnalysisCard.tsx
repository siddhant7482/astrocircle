'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPlanetaryPositions, type PlanetaryPosition } from "@/lib/planetary-service";
import { useUser } from '@/lib/hooks/use-user';
import { Skeleton } from "@/components/ui/skeleton";

export function AstroAnalysisCard() {
  const { user, loading: userLoading } = useUser();
  const [planets, setPlanets] = useState<PlanetaryPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlanetaryPositions() {
      if (userLoading) return; // Wait for user loading to complete
      if (!user?.id) {
        setError('Please log in to view planetary positions');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const positions = await getPlanetaryPositions(user.id);
        setPlanets(positions);
      } catch (err) {
        console.error('Error fetching planetary positions:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch planetary positions');
      } finally {
        setLoading(false);
      }
    }

    fetchPlanetaryPositions();

    // Refresh positions every hour if user is logged in
    let interval: NodeJS.Timeout | null = null;
    if (user?.id) {
      interval = setInterval(fetchPlanetaryPositions, 3600000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [user?.id, userLoading]);

  if (loading || userLoading) {
    return (
      <Card className="w-full bg-white shadow-md">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-medium">Grah Sithi (Planetary Positions)</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full bg-white shadow-md">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-medium">Grah Sithi (Planetary Positions)</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-medium">Grah Sithi (Planetary Positions)</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Planet</TableHead>
                <TableHead className="font-semibold">House</TableHead>
                <TableHead className="font-semibold">Sign</TableHead>
                <TableHead className="font-semibold">Degree</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {planets.map((planet) => (
                <TableRow key={planet.name}>
                  <TableCell className="font-medium text-orange-700">{planet.name}</TableCell>
                  <TableCell>{planet.house}</TableCell>
                  <TableCell>{planet.sign}</TableCell>
                  <TableCell>{planet.degree}°</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
} 