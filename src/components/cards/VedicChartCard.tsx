import { Card } from "@/components/ui/card";

interface VedicChartCardProps {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}

export function VedicChartCard({ birthDate, birthTime, birthPlace }: VedicChartCardProps) {
  return (
    <Card title="Vedic Birth Chart" className="bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="aspect-square w-full">
        <div className="grid grid-cols-3 grid-rows-3 h-full gap-1">
          {/* Traditional 9-house Vedic chart layout */}
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="border rounded p-2 text-xs bg-white/50 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="font-semibold">House {index + 1}</div>
                <div className="mt-1 text-gray-600">
                  {/* Placeholder for planetary positions */}
                  {/* This will be replaced with actual calculations */}
                  ♈︎ • ♃
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-center text-gray-600">
          Birth Details: {new Date(birthDate).toLocaleDateString()} at {birthTime}, {birthPlace}
        </div>
      </div>
    </Card>
  );
} 