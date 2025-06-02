import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AspectCardProps {
  title: string;
  description: string;
  score: number;
  gradientColors: {
    from: string;
    to: string;
  };
}

export function AspectCard({ title, description, score, gradientColors }: AspectCardProps) {
  return (
    <Card 
      title={title} 
      className={`bg-gradient-to-br from-${gradientColors.from} to-${gradientColors.to}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Score</span>
          <span className="text-2xl font-bold">{score}%</span>
        </div>
        <Progress value={score} className="h-2" />
        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          {description}
        </p>
      </div>
    </Card>
  );
} 