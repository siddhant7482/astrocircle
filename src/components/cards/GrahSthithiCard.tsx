'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { PlanetaryPosition } from "@/lib/planetary-service";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useUser } from '@/lib/hooks/use-user';

interface PlanetaryInterpretation {
  planet: string;
  interpretation: string;
  strength: 'Strong' | 'Moderate' | 'Weak';
  characteristics: string[];
}

function interpretPlanetaryPosition(position: PlanetaryPosition): PlanetaryInterpretation {
  const { name, house, sign, degree } = position;
  let interpretation = '';
  let strength: 'Strong' | 'Moderate' | 'Weak' = 'Moderate';
  let characteristics: string[] = [];

  // Basic interpretations based on houses
  const houseInterpretations: Record<number, string> = {
    1: "influences self-identity and physical appearance",
    2: "affects wealth and values",
    3: "impacts communication and siblings",
    4: "relates to home, mother, and emotional foundation",
    5: "influences creativity and romance",
    6: "affects health and service",
    7: "impacts partnerships and relationships",
    8: "relates to transformation and hidden matters",
    9: "influences higher learning and spirituality",
    10: "affects career and public image",
    11: "impacts friendships and aspirations",
    12: "relates to spirituality and isolation"
  };

  // Determine planetary strength based on degree
  if (degree >= 0 && degree <= 30) {
    if (degree >= 5 && degree <= 25) {
      strength = 'Strong';
    } else {
      strength = 'Moderate';
    }
  }

  // Planet-specific interpretations
  switch (name) {
    case 'Surya':
      interpretation = `The Sun in house ${house} ${houseInterpretations[house]}. At ${degree}° in ${sign}, it ${
        strength === 'Strong' ? 'powerfully influences your leadership abilities and self-expression' :
        strength === 'Moderate' ? 'moderately affects your confidence and vitality' :
        'may challenge your self-identity'
      }.`;
      characteristics = ['Leadership', 'Authority', 'Self-expression'];
      break;
    case 'Chandra':
      interpretation = `The Moon in house ${house} ${houseInterpretations[house]}. At ${degree}° in ${sign}, it ${
        strength === 'Strong' ? 'strongly influences your emotional nature and intuition' :
        strength === 'Moderate' ? 'brings balance to your emotional responses' :
        'may create emotional sensitivity'
      }.`;
      characteristics = ['Emotions', 'Intuition', 'Nurturing'];
      break;
    case 'Mangal':
      interpretation = `Mars in house ${house} ${houseInterpretations[house]}. At ${degree}° in ${sign}, it ${
        strength === 'Strong' ? 'empowers your drive and determination' :
        strength === 'Moderate' ? 'provides balanced energy and initiative' :
        'may create challenges in assertiveness'
      }.`;
      characteristics = ['Energy', 'Action', 'Courage'];
      break;
    case 'Budh':
      interpretation = `Mercury in house ${house} ${houseInterpretations[house]}. At ${degree}° in ${sign}, it ${
        strength === 'Strong' ? 'enhances your intellectual capabilities and communication' :
        strength === 'Moderate' ? 'supports balanced thinking and expression' :
        'may present communication challenges'
      }.`;
      characteristics = ['Communication', 'Intelligence', 'Adaptability'];
      break;
    case 'Guru':
      interpretation = `Jupiter in house ${house} ${houseInterpretations[house]}. At ${degree}° in ${sign}, it ${
        strength === 'Strong' ? 'brings significant expansion and wisdom' :
        strength === 'Moderate' ? 'provides balanced growth and understanding' :
        'may limit opportunities for growth'
      }.`;
      characteristics = ['Wisdom', 'Growth', 'Fortune'];
      break;
    case 'Shukra':
      interpretation = `Venus in house ${house} ${houseInterpretations[house]}. At ${degree}° in ${sign}, it ${
        strength === 'Strong' ? 'enhances your capacity for love and creativity' :
        strength === 'Moderate' ? 'brings harmony to relationships and artistic expression' :
        'may create challenges in relationships'
      }.`;
      characteristics = ['Love', 'Beauty', 'Harmony'];
      break;
    case 'Shani':
      interpretation = `Saturn in house ${house} ${houseInterpretations[house]}. At ${degree}° in ${sign}, it ${
        strength === 'Strong' ? 'brings discipline and structure' :
        strength === 'Moderate' ? 'provides balanced responsibility and patience' :
        'may create delays and restrictions'
      }.`;
      characteristics = ['Discipline', 'Responsibility', 'Time'];
      break;
    case 'Rahu':
      interpretation = `Rahu (North Node) in house ${house} ${houseInterpretations[house]}. At ${degree}° in ${sign}, it ${
        strength === 'Strong' ? 'strongly influences your spiritual growth and ambitions' :
        strength === 'Moderate' ? 'provides balanced karmic development' :
        'may create confusion about life direction'
      }.`;
      characteristics = ['Desires', 'Innovation', 'Growth'];
      break;
    case 'Ketu':
      interpretation = `Ketu (South Node) in house ${house} ${houseInterpretations[house]}. At ${degree}° in ${sign}, it ${
        strength === 'Strong' ? 'brings spiritual wisdom and detachment' :
        strength === 'Moderate' ? 'provides balanced spiritual insight' :
        'may create confusion about past karma'
      }.`;
      characteristics = ['Spirituality', 'Liberation', 'Past karma'];
      break;
  }

  return {
    planet: name,
    interpretation,
    strength,
    characteristics
  };
}

export default function GrahSthithiCard() {
  const [positions, setPositions] = useState<PlanetaryPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    async function fetchPositions() {
      try {
        if (!user) {
          setError('Please log in to view your planetary positions.');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/planetary-positions', {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch planetary positions');
        }

        setPositions(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching planetary positions:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load planetary positions. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPositions();
  }, [user]);

  if (!user) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Grah Sthithi Analysis</CardTitle>
          <CardDescription>Detailed interpretation of your planetary positions</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Required</AlertTitle>
            <AlertDescription>Please log in to view your planetary positions.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Grah Sthithi Analysis</CardTitle>
          <CardDescription>Loading your detailed planetary analysis...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Grah Sthithi Analysis</CardTitle>
          <CardDescription>Unable to load planetary analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const interpretations = positions.map(interpretPlanetaryPosition);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Grah Sthithi Analysis</CardTitle>
        <CardDescription>
          Detailed interpretation of your planetary positions and their influences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {interpretations.map((interpretation, index) => (
            <AccordionItem key={interpretation.planet} value={`item-${index}`}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <span>{interpretation.planet}</span>
                  <span className={`text-sm px-2 py-0.5 rounded ${
                    interpretation.strength === 'Strong' ? 'bg-green-100 text-green-800' :
                    interpretation.strength === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {interpretation.strength}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">{interpretation.interpretation}</p>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Influences:</h4>
                    <div className="flex flex-wrap gap-2">
                      {interpretation.characteristics.map((char, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
} 