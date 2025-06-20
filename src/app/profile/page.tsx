'use client';

import { ProfileForm } from "@/components/profile/ProfileForm";
import { useAuth } from "@/lib/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-white" />
          <p className="text-gray-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user || !user.id || !user.email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-white" />
          <p className="text-gray-300">Authenticating...</p>
        </div>
      </div>
    );
  }

  return <ProfileForm userId={user.id} email={user.email} />;
} 