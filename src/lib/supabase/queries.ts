import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { supabase } from '../supabase';

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

// Profile Queries
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

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) {
      console.error('Error updating user profile:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    return false;
  }
}

export async function createUserProfile(profile: Omit<UserProfile, 'created_at' | 'updated_at'>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('profiles')
      .insert([profile]);

    if (error) {
      console.error('Error creating user profile:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in createUserProfile:', error);
    return false;
  }
}

// Birth Chart Queries
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