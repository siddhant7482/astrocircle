import { supabase } from './supabase';
import type { ChartData, ChartRequestParams } from './types';

const API_KEY = 'B48ywQbsNL3opcVBUyiV2UpVObhsKAm4BbMLdr8j';
const API_URL = 'https://json.freeastrologyapi.com/horoscope-chart-svg-code';

interface ApiResponse {
  status?: boolean;
  message?: string;
  svg_code?: string;
  chart_svg?: string;
  data?: {
    svg_code?: string;
    chart_svg?: string;
  };
  statusCode?: number;
  output?: string;
}

export async function getChartForUser(userId: string): Promise<ChartData | null> {
  try {
    // First, try to get cached chart from database
    const { data: chartData, error: dbError } = await supabase
      .from('charts')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (dbError) {
      console.log('DB Error:', dbError);
      // If not found, continue to generate new chart
      if (dbError.code !== 'PGRST116') {
        throw dbError;
      }
    }

    if (chartData) {
      return chartData;
    }

    // If no cached chart, get user profile to fetch birth details
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.log('Profile Error:', profileError);
      throw profileError;
    }
    if (!profile) throw new Error('Profile not found');
    if (!profile.birth_date || !profile.birth_time || !profile.birth_place) {
      throw new Error('Birth details not complete. Please update your profile.');
    }

    // Parse birth date
    const date = new Date(profile.birth_date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // JavaScript months are 0-based
    const day = date.getDate();

    // Parse birth time
    const [hours, minutes] = profile.birth_time.split(':').map(Number);

    // TODO: Get latitude, longitude from birth_place using geocoding service
    // For now using default values
    const params: ChartRequestParams = {
      year,
      month,
      date: day,
      hours,
      minutes,
      seconds: 0,
      latitude: 30.6942, // Default for Panchkula
      longitude: 76.8606, // Default for Panchkula
      timezone: 5.5, // IST
      config: {
        observation_point: "topocentric",
        ayanamsha: "lahiri"
      }
    };

    console.log('API Request:', {
      url: API_URL,
      params,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '***' // Masked for security
      }
    });

    // Fetch chart from API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      console.log('API Error:', {
        status: response.status,
        statusText: response.statusText
      });
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const chartResponse: ApiResponse = await response.json();
    // Process API response for chart data

    // Try to find the SVG code in various possible locations in the response
    const svgCode = 
      chartResponse.output || // New format
      chartResponse.svg_code || 
      chartResponse.chart_svg || 
      chartResponse.data?.svg_code || 
      chartResponse.data?.chart_svg;

    if (!svgCode || typeof svgCode !== 'string') {
      console.log('Invalid API Response Structure:', {
        hasOutput: 'output' in chartResponse,
        hasTopLevelSvg: 'svg_code' in chartResponse,
        hasTopLevelChartSvg: 'chart_svg' in chartResponse,
        hasData: 'data' in chartResponse,
        dataType: chartResponse.data ? typeof chartResponse.data : 'undefined',
        responseKeys: Object.keys(chartResponse)
      });
      throw new Error('API response missing SVG code. Response: ' + JSON.stringify(chartResponse));
    }

    // Save to database
    const { data: savedChart, error: saveError } = await supabase
      .from('charts')
      .insert([
        {
          user_id: userId,
          svg_code: svgCode
        }
      ])
      .select()
      .single();

    if (saveError) {
      console.log('Save Error:', saveError);
      throw saveError;
    }

    if (!savedChart) {
      throw new Error('Failed to save chart');
    }

    return savedChart;

  } catch (error) {
    console.error('Error in getChartForUser:', error);
    throw error;
  }
} 