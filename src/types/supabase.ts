export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          birth_date: string | null
          birth_time: string | null
          birth_place: string | null
          birth_coordinates: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          birth_date?: string | null
          birth_time?: string | null
          birth_place?: string | null
          birth_coordinates?: string | null
        }
        Update: {
          full_name?: string | null
          birth_date?: string | null
          birth_time?: string | null
          birth_place?: string | null
          birth_coordinates?: string | null
        }
      }
      birth_charts: {
        Row: {
          id: string
          profile_id: string
          chart_type: string
          chart_data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          profile_id: string
          chart_type: string
          chart_data: Json
        }
        Update: {
          chart_type?: string
          chart_data?: Json
        }
      }
      planetary_positions: {
        Row: {
          id: string
          birth_chart_id: string
          planet: string
          zodiac_sign: string
          degree: number
          house: number
          is_retrograde: boolean
          strength: number
          created_at: string
        }
        Insert: {
          birth_chart_id: string
          planet: string
          zodiac_sign: string
          degree: number
          house: number
          is_retrograde: boolean
          strength: number
        }
      }
    }
    Functions: {
      get_profile_by_id: {
        Args: { user_id: string }
        Returns: Database['public']['Tables']['profiles']['Row'][]
      }
      update_profile: {
        Args: {
          user_id: string
          full_name?: string | null
          birth_date?: string | null
          birth_time?: string | null
          birth_place?: string | null
          birth_coordinates?: string | null
        }
        Returns: Database['public']['Tables']['profiles']['Row'][]
      }
      create_profile: {
        Args: {
          user_id: string
          email: string
          full_name: string
          birth_date: string
          birth_time: string
          birth_place: string
          birth_coordinates?: string | null
        }
        Returns: Database['public']['Tables']['profiles']['Row'][]
      }
      get_user_charts: {
        Args: { user_id: string }
        Returns: (Database['public']['Tables']['birth_charts']['Row'] & {
          full_name: string
          birth_date: string
          birth_place: string
        })[]
      }
      create_birth_chart: {
        Args: {
          profile_id: string
          chart_type: string
          chart_data: Json
        }
        Returns: Database['public']['Tables']['birth_charts']['Row'][]
      }
      get_chart_with_positions: {
        Args: {
          chart_id: string
          user_id: string
        }
        Returns: (Database['public']['Tables']['birth_charts']['Row'] & {
          full_name: string
          birth_date: string
          birth_place: string
          planetary_positions: Json
        })[]
      }
    }
  }
} 