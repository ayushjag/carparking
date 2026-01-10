import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: 'driver' | 'owner';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type ParkingSpot = {
  id: string;
  owner_id: string;
  title: string;
  description: string | null;
  address: string;
  city: string;
  state: string;
  zip_code: string | null;
  country: string;
  latitude: number;
  longitude: number;
  price_per_hour: number;
  price_per_day: number | null;
  total_spots: number;
  spot_type: 'covered' | 'open' | 'garage' | 'street';
  amenities: string[];
  availability_hours: any;
  images: string[];
  is_active: boolean;
  rating_avg: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: string;
  parking_spot_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'refunded';
  payment_method: string | null;
  vehicle_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Review = {
  id: string;
  parking_spot_id: string;
  user_id: string;
  booking_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
};
