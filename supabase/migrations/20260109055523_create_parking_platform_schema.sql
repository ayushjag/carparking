/*
  # Parking Platform Database Schema

  ## Overview
  Complete database schema for a two-sided parking marketplace platform.

  ## New Tables

  ### 1. profiles
  - `id` (uuid, FK to auth.users) - User ID
  - `email` (text) - User email
  - `full_name` (text) - User's full name
  - `phone` (text) - Contact phone number
  - `role` (text) - User role: 'driver' or 'owner'
  - `avatar_url` (text) - Profile picture URL
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. parking_spots
  - `id` (uuid, PK) - Parking spot ID
  - `owner_id` (uuid, FK to profiles) - Owner's user ID
  - `title` (text) - Parking spot title
  - `description` (text) - Detailed description
  - `address` (text) - Street address
  - `city` (text) - City name
  - `state` (text) - State/Province
  - `zip_code` (text) - Postal code
  - `country` (text) - Country
  - `latitude` (decimal) - Geographic latitude
  - `longitude` (decimal) - Geographic longitude
  - `price_per_hour` (decimal) - Hourly rate
  - `price_per_day` (decimal) - Daily rate
  - `total_spots` (integer) - Total available spots
  - `spot_type` (text) - Type: 'covered', 'open', 'garage', 'street'
  - `amenities` (jsonb) - Features array: ['security', 'ev_charging', 'cctv', 'lighting']
  - `availability_hours` (jsonb) - Operating hours
  - `images` (jsonb) - Array of image URLs
  - `is_active` (boolean) - Whether listing is active
  - `rating_avg` (decimal) - Average rating
  - `total_reviews` (integer) - Total number of reviews
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. bookings
  - `id` (uuid, PK) - Booking ID
  - `parking_spot_id` (uuid, FK to parking_spots) - Parking spot reference
  - `user_id` (uuid, FK to profiles) - User who booked
  - `start_time` (timestamptz) - Booking start
  - `end_time` (timestamptz) - Booking end
  - `total_price` (decimal) - Total booking cost
  - `status` (text) - Status: 'pending', 'confirmed', 'active', 'completed', 'cancelled'
  - `payment_status` (text) - Payment: 'pending', 'paid', 'refunded'
  - `payment_method` (text) - Payment method used
  - `vehicle_number` (text) - Vehicle registration
  - `notes` (text) - Additional booking notes
  - `created_at` (timestamptz) - Booking creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. reviews
  - `id` (uuid, PK) - Review ID
  - `parking_spot_id` (uuid, FK to parking_spots) - Parking spot reference
  - `user_id` (uuid, FK to profiles) - Reviewer
  - `booking_id` (uuid, FK to bookings) - Related booking
  - `rating` (integer) - Rating 1-5
  - `comment` (text) - Review text
  - `created_at` (timestamptz) - Review timestamp

  ### 5. favorites
  - `id` (uuid, PK) - Favorite ID
  - `user_id` (uuid, FK to profiles) - User who favorited
  - `parking_spot_id` (uuid, FK to parking_spots) - Favorited parking spot
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - RLS enabled on all tables
  - Policies for authenticated users based on ownership and role
  - Public read access for parking spots (search functionality)
  - Secure write access with proper authentication checks
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  role text NOT NULL CHECK (role IN ('driver', 'owner')),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create parking_spots table
CREATE TABLE IF NOT EXISTS parking_spots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text,
  country text DEFAULT 'USA',
  latitude decimal(10, 8) NOT NULL,
  longitude decimal(11, 8) NOT NULL,
  price_per_hour decimal(10, 2) NOT NULL,
  price_per_day decimal(10, 2),
  total_spots integer NOT NULL DEFAULT 1,
  spot_type text CHECK (spot_type IN ('covered', 'open', 'garage', 'street')),
  amenities jsonb DEFAULT '[]'::jsonb,
  availability_hours jsonb DEFAULT '{"monday": {"open": "00:00", "close": "23:59"}, "tuesday": {"open": "00:00", "close": "23:59"}, "wednesday": {"open": "00:00", "close": "23:59"}, "thursday": {"open": "00:00", "close": "23:59"}, "friday": {"open": "00:00", "close": "23:59"}, "saturday": {"open": "00:00", "close": "23:59"}, "sunday": {"open": "00:00", "close": "23:59"}}'::jsonb,
  images jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  rating_avg decimal(3, 2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parking_spot_id uuid NOT NULL REFERENCES parking_spots(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  total_price decimal(10, 2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  payment_method text,
  vehicle_number text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parking_spot_id uuid NOT NULL REFERENCES parking_spots(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  parking_spot_id uuid NOT NULL REFERENCES parking_spots(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, parking_spot_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_parking_spots_owner ON parking_spots(owner_id);
CREATE INDEX IF NOT EXISTS idx_parking_spots_location ON parking_spots(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_parking_spots_active ON parking_spots(is_active);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_parking_spot ON bookings(parking_spot_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(start_time, end_time);
CREATE INDEX IF NOT EXISTS idx_reviews_parking_spot ON reviews(parking_spot_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE parking_spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Parking spots policies (public read for search)
CREATE POLICY "Anyone can view active parking spots"
  ON parking_spots FOR SELECT
  USING (is_active = true OR owner_id = auth.uid());

CREATE POLICY "Owners can create parking spots"
  ON parking_spots FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own parking spots"
  ON parking_spots FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can delete own parking spots"
  ON parking_spots FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Bookings policies
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT owner_id FROM parking_spots WHERE id = parking_spot_id
  ));

CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT owner_id FROM parking_spots WHERE id = parking_spot_id
  ))
  WITH CHECK (auth.uid() = user_id OR auth.uid() IN (
    SELECT owner_id FROM parking_spots WHERE id = parking_spot_id
  ));

-- Reviews policies
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews for their bookings"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE id = booking_id 
      AND user_id = auth.uid() 
      AND status = 'completed'
    )
  );

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Favorites policies
CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update parking spot rating
CREATE OR REPLACE FUNCTION update_parking_spot_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE parking_spots
  SET 
    rating_avg = (
      SELECT AVG(rating)::decimal(3,2)
      FROM reviews
      WHERE parking_spot_id = NEW.parking_spot_id
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM reviews
      WHERE parking_spot_id = NEW.parking_spot_id
    )
  WHERE id = NEW.parking_spot_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update ratings when review is added
CREATE TRIGGER update_rating_on_review_insert
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_parking_spot_rating();

-- Trigger to update ratings when review is updated
CREATE TRIGGER update_rating_on_review_update
AFTER UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_parking_spot_rating();

-- Trigger to update ratings when review is deleted
CREATE TRIGGER update_rating_on_review_delete
AFTER DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_parking_spot_rating();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_parking_spots_updated_at BEFORE UPDATE ON parking_spots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();