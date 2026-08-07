export type Region = 'new-england' | 'mid-atlantic' | 'southeast' | 'rockies' | 'west-coast' | 'midwest';
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
  
  // Phase 4 Extensions
  country: string;
  elevation_ft: number | null;
  beginner_percent: number | null;
  intermediate_percent: number | null;
  advanced_percent: number | null;
  expert_percent: number | null;
  terrain_parks: boolean;
  family_score: number | null;
  nightlife_score: number | null;
  lift_ticket_url: string | null;
  images: string[];

  // Phase 5: Trail counts
  green_trails: number | null;
  blue_trails: number | null;
  black_trails: number | null;
  double_black_trails: number | null;
  
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

// Phase 6: Group Trip Planning + Friends

export type FriendStatus = 'pending' | 'accepted' | 'declined';
export type TripMemberRole = 'organizer' | 'member';
export type TripMemberStatus = 'invited' | 'accepted' | 'declined';

export interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  status: FriendStatus;
  created_at: string;
  // Joined data
  profile?: Profile;
  friend_profile?: Profile;
}

export interface TripMember {
  id: string;
  trip_id: string;
  user_id: string;
  role: TripMemberRole;
  status: TripMemberStatus;
  created_at: string;
  profile?: Profile;
}

export interface TripItinerary {
  id: string;
  trip_id: string;
  day_date: string;
  title: string;
  description: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  creator?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string | null;
  link: string | null;
  read: boolean;
  created_at: string;
}

