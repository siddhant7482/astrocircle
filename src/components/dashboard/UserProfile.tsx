'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import type { UserProfile } from '@/lib/types';

export function UserProfileCard() {
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(searchParams.get('edit') === 'profile');
  const [formData, setFormData] = useState({
    full_name: '',
    birth_date: '',
    birth_time: '',
    birth_place: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    setIsEditing(searchParams.get('edit') === 'profile');
  }, [searchParams]);

  async function handleLogin() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err) {
      console.error('Error logging in:', err);
      setError(err instanceof Error ? err.message : 'Failed to login');
    }
  }

  async function fetchProfile() {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      
      if (!session) {
        setIsLoading(false);
        return; // Don't throw error, just return to show login button
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          // Profile doesn't exist, create one
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([
              {
                id: session.user.id,
                full_name: session.user.user_metadata.full_name || null
              }
            ])
            .select()
            .single();

          if (createError) throw createError;
          setProfile(newProfile);
          setFormData({
            full_name: newProfile.full_name || '',
            birth_date: newProfile.birth_date || '',
            birth_time: newProfile.birth_time || '',
            birth_place: newProfile.birth_place || ''
          });
          return;
        }
        throw profileError;
      }

      setProfile(profileData);
      setFormData({
        full_name: profileData.full_name || '',
        birth_date: profileData.birth_date || '',
        birth_time: profileData.birth_time || '',
        birth_place: profileData.birth_place || ''
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          birth_date: formData.birth_date,
          birth_time: formData.birth_time,
          birth_place: formData.birth_place
        })
        .eq('id', session.user.id);

      if (updateError) throw updateError;

      // Remove the edit parameter from URL
      const newSearchParams = new URLSearchParams(window.location.search);
      newSearchParams.delete('edit');
      window.history.pushState(null, '', newSearchParams.toString() ? `?${newSearchParams.toString()}` : window.location.pathname);

      // Refresh profile data
      await fetchProfile();
      setIsEditing(false);

      // Reload the page to regenerate the chart
      window.location.reload();
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Error Loading Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
          <Button onClick={fetchProfile} className="mt-4">Retry</Button>
        </CardContent>
      </Card>
    );
  }

  // Show login button if no profile and not loading
  if (!profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Welcome to AstroCircle</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Please log in to view your astrological profile</p>
          <Button onClick={handleLogin}>
            Login with Google
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birth_date">Date of Birth</Label>
              <Input
                id="birth_date"
                type="date"
                value={formData.birth_date}
                onChange={(e) => setFormData(prev => ({ ...prev, birth_date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birth_time">Time of Birth</Label>
              <Input
                id="birth_time"
                type="time"
                value={formData.birth_time}
                onChange={(e) => setFormData(prev => ({ ...prev, birth_time: e.target.value }))}
                step="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birth_place">Place of Birth</Label>
              <Input
                id="birth_place"
                value={formData.birth_place}
                onChange={(e) => setFormData(prev => ({ ...prev, birth_place: e.target.value }))}
                placeholder="Enter your place of birth"
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit">Save Changes</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{profile.full_name || 'Your Profile'}</CardTitle>
        <Button variant="outline" onClick={() => setIsEditing(true)}>Edit</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Birth Date</Label>
          <p>{profile.birth_date || 'Not set'}</p>
        </div>
        <div>
          <Label>Birth Time</Label>
          <p>{profile.birth_time || 'Not set'}</p>
        </div>
        <div>
          <Label>Birth Place</Label>
          <p>{profile.birth_place || 'Not set'}</p>
        </div>
      </CardContent>
    </Card>
  );
} 