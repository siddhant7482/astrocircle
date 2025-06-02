import { UserProfileCard } from '@/components/dashboard/UserProfile';
import { KundliChart } from '@/components/dashboard/KundliChart';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <UserProfileCard />
        <KundliChart />
      </div>
    </div>
  );
}
