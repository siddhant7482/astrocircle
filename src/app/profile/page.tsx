'use client';

import { ProfileForm } from "@/components/profile/ProfileForm";
import { useUser } from "@/lib/hooks/use-user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return <ProfileForm userId={user.id} email={user.email!} />;
} 