export type Region = 'new-england' | 'mid-atlantic' | 'southeast';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type TripStatus = 'planned' | 'completed' | 'cancelled';

export interface Profile {
  id: string; // UUID matching auth.users
  full_name: string | null;
  avatar_url: string | null;
  home_location: string | null;
  skill_level: SkillLevel | null;
  created_at: string;
  updated_at: string;
}

export interface Resort {
  id: string; // UUID
  name: string;
  slug: string;
  state: string;
  region: Region;
  latitude: number;
  longitude: number;
  vertical_drop_ft: number | null;
  num_trails: number | null;
  num_lifts: number | null;
  skiable_acres: number | null;
  lift_ticket_price_usd: number | null;
  difficulty_level: DifficultyLevel | null;
  website_url: string | null;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  resort_id: string;
  created_at: string;
  resort?: Resort; // Joined data
}

export interface Trip {
  id: string;
  user_id: string;
  resort_id: string;
  start_date: string;
  end_date: string;
  notes: string | null;
  status: TripStatus;
  created_at: string;
  updated_at: string;
  resort?: Resort; // Joined data
}

export interface WeatherData {
  current: {
    temperature_f: number;
    weather_code: number;
    weather_description: string;
    wind_speed_mph: number;
    snowfall_inches: number;
    snow_depth_inches: number;
  };
  forecast: Array<{
    date: string;
    snowfall_inches: number;
    temp_high_f: number;
    temp_low_f: number;
  }>;
}

export interface ParsedFilters {
  max_price?: number;
  regions?: Region[];
  difficulty?: DifficultyLevel;
  origin_city?: string;
  max_distance_miles?: number;
  sort_by?: 'price' | 'snow' | 'size' | 'distance';
}
