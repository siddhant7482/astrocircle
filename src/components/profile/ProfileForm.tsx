'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Calendar, Clock, MapPin, Star, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

interface ProfileFormProps {
  userId: string;
  email: string;
}

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  birth_date: string | null;
  birth_time: string | null;
  birth_place: string | null;
  birth_coordinates: string | null;
  updated_at: string;
}

export function ProfileForm({ userId, email }: ProfileFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [existingProfile, setExistingProfile] = useState<Profile | null>(null);

  // Load existing profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (profile) {
          setExistingProfile(profile);
          setFullName(profile.full_name || '');
          setBirthDate(profile.birth_date || '');
          setBirthTime(profile.birth_time || '');
          setBirthPlace(profile.birth_place || '');
          setIsEditing(false);
        }
      } catch {
        // No existing profile found
      }
    };

    loadProfile();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Validate inputs
      if (!fullName || !birthDate || !birthTime || !birthPlace) {
        throw new Error('Please fill in all required fields');
      }

      // Try to upsert the profile (insert if not exists, update if exists)
      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          email,
          full_name: fullName,
          birth_date: birthDate,
          birth_time: birthTime,
          birth_place: birthPlace,
          birth_coordinates: null,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        });

      if (upsertError) throw upsertError;

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Auto redirect to dashboard after 2 seconds if it's a new profile
      if (!existingProfile) {
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const AnimatedCard = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="w-full h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: isHovered ? 'translateZ(10px) scale(1.02)' : 'translateZ(0px) scale(1)',
          transition: 'transform 0.3s ease-out',
          animationDelay: `${delay}ms`
        }}
      >
        <Card 
          className="relative backdrop-blur-md bg-white/10 border-white/20 transition-all duration-300 w-full h-full overflow-hidden shadow-xl"
          style={{
            borderColor: isHovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)',
            boxShadow: isHovered 
              ? '0 25px 50px -12px rgba(147, 51, 234, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2)'
              : '0 10px 25px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
          }}
        >
          {children}
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            {existingProfile && !isEditing ? 'Your Astrological Profile' : 'Complete Your Profile'}
          </h1>
          <p className="text-gray-300 text-lg">
            {existingProfile && !isEditing 
              ? 'Your cosmic blueprint for personalized readings'
              : 'Provide your birth details for accurate astrological insights'
            }
          </p>
        </div>

        {/* Back to Dashboard button if profile exists */}
        {existingProfile && !isEditing && (
          <div className="flex justify-start mb-6">
            <Button
              onClick={() => router.push('/dashboard')}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 backdrop-blur-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        )}

        <AnimatedCard delay={0}>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-white text-2xl">
              <Star className="h-6 w-6 text-purple-300" />
              {isEditing ? 'Astrological Information' : 'Profile Details'}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {isEditing 
                ? 'Enter your birth information for personalized cosmic insights'
                : 'Your saved astrological information'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-500/50 bg-red-500/10 text-red-300">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-500/50 bg-green-500/10 text-green-300">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white flex items-center gap-2">
                    <User className="h-4 w-4 text-purple-300" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-70"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email (read-only) */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-300" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={email}
                    disabled
                    className="bg-white/5 border-white/10 text-gray-300"
                  />
                </div>

                {/* Birth Date */}
                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-white flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-indigo-300" />
                    Birth Date
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                    disabled={!isEditing}
                    className="bg-white/10 border-white/20 text-white disabled:opacity-70"
                  />
                </div>

                {/* Birth Time */}
                <div className="space-y-2">
                  <Label htmlFor="birthTime" className="text-white flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-300" />
                    Birth Time
                  </Label>
                  <Input
                    id="birthTime"
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    required
                    disabled={!isEditing}
                    step="1"
                    className="bg-white/10 border-white/20 text-white disabled:opacity-70"
                  />
                </div>
              </div>

              {/* Birth Place */}
              <div className="space-y-2">
                <Label htmlFor="birthPlace" className="text-white flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-300" />
                  Birth Place
                </Label>
                <Input
                  id="birthPlace"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  required
                  disabled={!isEditing}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 disabled:opacity-70"
                  placeholder="City, Country (e.g., New York, USA)"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                {isEditing ? (
                  <>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          {existingProfile ? 'Update Profile' : 'Save Profile'}
                        </>
                      )}
                    </Button>
                    {existingProfile && (
                      <Button 
                        type="button"
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30"
                      >
                        Cancel
                      </Button>
                    )}
                  </>
                ) : (
                  <Button 
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 backdrop-blur-sm"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </AnimatedCard>

        {/* Additional Information Card */}
        {!isEditing && existingProfile && (
          <AnimatedCard delay={200}>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-300" />
                Astrological Insights
              </CardTitle>
              <CardDescription className="text-gray-300">
                Based on your birth information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30">
                  <div className="text-2xl font-bold text-purple-300 mb-1">♈</div>
                  <div className="text-sm text-gray-300">Sun Sign</div>
                  <div className="text-white font-medium">Calculated from birth date</div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30">
                  <div className="text-2xl font-bold text-blue-300 mb-1">🌙</div>
                  <div className="text-sm text-gray-300">Moon Phase</div>
                  <div className="text-white font-medium">Based on birth date</div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 border border-indigo-500/30">
                  <div className="text-2xl font-bold text-indigo-300 mb-1">⭐</div>
                  <div className="text-sm text-gray-300">Rising Sign</div>
                  <div className="text-white font-medium">Requires birth time</div>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        )}
      </div>
    </div>
  );
} 