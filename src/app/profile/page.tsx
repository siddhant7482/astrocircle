'use client';

import { ProfileForm } from "@/components/profile/ProfileForm";
import { useUser } from "@/lib/hooks/use-user";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-white" />
          <p className="text-gray-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300">Please log in to access your profile.</p>
        </div>
      </div>
    );
  }

  return <ProfileForm userId={user.id} email={user.email!} />;
} 