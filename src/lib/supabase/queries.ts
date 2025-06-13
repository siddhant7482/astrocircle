import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type QueryParams = Record<string, string | number | boolean | null>;

export async function executeQuery<T = any>(
  queryName: string,
  params: QueryParams = {}
): Promise<T[]> {
  try {
    const { data, error } = await supabase.rpc(queryName, params);
    
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

// Helper function to convert coordinates array to string
function coordinatesToString(coordinates: [number, number]): string {
  return `${coordinates[0]},${coordinates[1]}`;
}

// Profile Queries
export async function getProfileById(userId: string) {
  return executeQuery<Database['public']['Tables']['profiles']['Row']>(
    'get-profile-by-id',
    { user_id: userId }
  );
}

export async function updateProfile(
  userId: string,
  profileData: Partial<{
    full_name: string;
    birth_date: string;
    birth_time: string;
    birth_place: string;
    birth_coordinates: string | null;
  }>
) {
  const params: QueryParams = {
    user_id: userId,
    full_name: profileData.full_name || null,
    birth_date: profileData.birth_date || null,
    birth_time: profileData.birth_time || null,
    birth_place: profileData.birth_place || null,
    birth_coordinates: profileData.birth_coordinates || null
  };

  return executeQuery<Database['public']['Tables']['profiles']['Row']>(
    'update-profile',
    params
  );
}

export async function createProfile(
  userId: string,
  profileData: {
    email: string;
    full_name: string;
    birth_date: string;
    birth_time: string;
    birth_place: string;
    birth_coordinates: string | null;
  }
) {
  const params: QueryParams = {
    user_id: userId,
    email: profileData.email,
    full_name: profileData.full_name,
    birth_date: profileData.birth_date,
    birth_time: profileData.birth_time,
    birth_place: profileData.birth_place,
    birth_coordinates: profileData.birth_coordinates || null
  };

  return executeQuery<Database['public']['Tables']['profiles']['Row']>(
    'create-profile',
    params
  );
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
    chart_data: any;
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