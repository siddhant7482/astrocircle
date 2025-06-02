export interface UserProfile {
  id: string;
  full_name: string | null;
  birth_date: string | null;
  birth_time: string | null;
  birth_place: string | null;
  zodiac_sign: string | null;
  created_at: string;
}

export interface ChartData {
  id: string;
  user_id: string;
  svg_code: string;
  created_at: string;
}

export interface ChartRequestParams {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  latitude: number;
  longitude: number;
  timezone: number;
  config: {
    observation_point: "topocentric" | "geocentric";
    ayanamsha: "lahiri";
  };
} 