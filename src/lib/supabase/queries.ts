import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Keep the direct client for non-auth database operations only
const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type QueryParams = Record<string, string | number | boolean | null>;

export async function executeQuery<T = unknown>(
  queryName: string,
  params: QueryParams = {}
): Promise<T[]> {
  try {
    const { data, error } = await supabaseClient.rpc(queryName, params);
    
    if (error) {
      console.error(`Error executing query ${queryName}:`, error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error(`Error executing query ${queryName}:`, error);
    throw error;
  }
}

// Profile Queries - Now using API routes
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  birth_date: string | null;
  birth_place: string | null;
  birth_time: string | null;
  created_at: string;
  updated_at: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getUserProfile(_userId: string): Promise<UserProfile | null> {
  try {
    const response = await fetch('/api/profile', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.profile;
  } catch {
    return null;
  }
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<boolean> {
  try {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      console.error('Error updating user profile:', response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    return false;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createUserProfile(_profile: Omit<UserProfile, 'created_at' | 'updated_at'>): Promise<boolean> {
  try {
    // Profile creation is now handled by the auth API routes
    console.warn('createUserProfile is deprecated - profiles are created automatically during registration');
    return true;
  } catch (error) {
    console.error('Error in createUserProfile:', error);
    return false;
  }
}

// Birth Chart Queries - These can still use direct client as they're non-auth operations
export async function getUserCharts(userId: string) {
  return executeQuery<Database['public']['Tables']['birth_charts']['Row']>(
    'get-user-charts',
    { user_id: userId }
  );
}

export async function createBirthChart(
  profileId: string,
  chartData: {
    chart_type: string;
    chart_data: Record<string, unknown>;
  }
) {
  return executeQuery<Database['public']['Tables']['birth_charts']['Row']>(
    'create-birth-chart',
    {
      profile_id: profileId,
      chart_type: chartData.chart_type,
      chart_data: JSON.stringify(chartData.chart_data)
    }
  );
}

export async function getChartWithPositions(chartId: string, userId: string) {
  return executeQuery(
    'get-chart-with-positions',
    {
      chart_id: chartId,
      user_id: userId
    }
  );
} 