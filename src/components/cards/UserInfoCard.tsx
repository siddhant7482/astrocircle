import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserInfoCardProps {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  onUpdate?: (data: { name: string; birthDate: string; birthTime: string; birthPlace: string }) => void;
  isEditable?: boolean;
}

export function UserInfoCard({ name, birthDate, birthTime, birthPlace, onUpdate, isEditable = false }: UserInfoCardProps) {
  const handleChange = (field: string, value: string) => {
    if (onUpdate) {
      onUpdate({
        name: field === 'name' ? value : name,
        birthDate: field === 'birthDate' ? value : birthDate,
        birthTime: field === 'birthTime' ? value : birthTime,
        birthPlace: field === 'birthPlace' ? value : birthPlace,
      });
    }
  };

  return (
    <Card title="Personal Information" className="bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="space-y-4">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handleChange('name', e.target.value)}
            disabled={!isEditable}
            className="bg-white/50"
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="birthDate">Date of Birth</Label>
          <Input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
            disabled={!isEditable}
            className="bg-white/50"
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="birthTime">Time of Birth</Label>
          <Input
            type="time"
            id="birthTime"
            value={birthTime}
            onChange={(e) => handleChange('birthTime', e.target.value)}
            disabled={!isEditable}
            className="bg-white/50"
          />
        </div>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="birthPlace">Place of Birth</Label>
          <Input
            type="text"
            id="birthPlace"
            value={birthPlace}
            onChange={(e) => handleChange('birthPlace', e.target.value)}
            disabled={!isEditable}
            className="bg-white/50"
            placeholder="City, Country"
          />
        </div>
      </div>
    </Card>
  );
} 