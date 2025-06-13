-- First drop existing policies and tables
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Enable read access for own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert access for own profile" ON profiles;
DROP POLICY IF EXISTS "Enable update access for own profile" ON profiles;
DROP POLICY IF EXISTS "Enable read access for own birth_charts" ON birth_charts;
DROP POLICY IF EXISTS "Enable insert access for own birth_charts" ON birth_charts;
DROP POLICY IF EXISTS "Users can view own birth charts" ON birth_charts;
DROP POLICY IF EXISTS "Users can create own birth charts" ON birth_charts;
DROP POLICY IF EXISTS "Users can update own birth charts" ON birth_charts;
DROP POLICY IF EXISTS "Users can view own planetary positions" ON planetary_positions;
DROP POLICY IF EXISTS "Users can create own planetary positions" ON planetary_positions;
DROP POLICY IF EXISTS "Users can update own planetary positions" ON planetary_positions;

-- Drop existing tables (WARNING: This will delete all existing data)
DROP TABLE IF EXISTS planetary_positions;
DROP TABLE IF EXISTS birth_charts;
DROP TABLE IF EXISTS profiles;

-- Create profiles table with email field
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    birth_date DATE,
    birth_time TIME,
    birth_place TEXT,
    birth_coordinates POINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create birth_charts table
CREATE TABLE birth_charts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    chart_type TEXT NOT NULL,
    chart_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create planetary_positions table
CREATE TABLE planetary_positions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    birth_chart_id UUID REFERENCES birth_charts(id) ON DELETE CASCADE NOT NULL,
    planet TEXT NOT NULL,
    zodiac_sign TEXT NOT NULL,
    degree NUMERIC(5,2) NOT NULL,
    house INTEGER NOT NULL,
    is_retrograde BOOLEAN DEFAULT false NOT NULL,
    strength TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE birth_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE planetary_positions ENABLE ROW LEVEL SECURITY;

-- Grant access to authenticated users
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON birth_charts TO authenticated;
GRANT ALL ON planetary_positions TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Create policies for profiles table
CREATE POLICY "Enable read access for own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Enable insert access for own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update access for own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Create policies for birth_charts table
CREATE POLICY "Enable read access for own birth_charts"
    ON birth_charts FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = birth_charts.profile_id
            AND profiles.id = auth.uid()
        )
    );

CREATE POLICY "Enable insert access for own birth_charts"
    ON birth_charts FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = birth_charts.profile_id
            AND profiles.id = auth.uid()
        )
    );

-- Create policies for planetary_positions table
CREATE POLICY "Users can view own planetary positions"
    ON planetary_positions FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM birth_charts
            JOIN profiles ON profiles.id = birth_charts.profile_id
            WHERE birth_charts.id = planetary_positions.birth_chart_id
            AND profiles.id = auth.uid()
        )
    );

CREATE POLICY "Users can create own planetary positions"
    ON planetary_positions FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM birth_charts
            JOIN profiles ON profiles.id = birth_charts.profile_id
            WHERE birth_charts.id = planetary_positions.birth_chart_id
            AND profiles.id = auth.uid()
        )
    );

CREATE POLICY "Users can update own planetary positions"
    ON planetary_positions FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM birth_charts
            JOIN profiles ON profiles.id = birth_charts.profile_id
            WHERE birth_charts.id = planetary_positions.birth_chart_id
            AND profiles.id = auth.uid()
        )
    );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_birth_charts_updated_at
    BEFORE UPDATE ON birth_charts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_profiles_id ON profiles(id);
CREATE INDEX idx_birth_charts_profile_id ON birth_charts(profile_id);
CREATE INDEX idx_planetary_positions_birth_chart_id ON planetary_positions(birth_chart_id);
CREATE INDEX idx_profiles_email ON profiles(email);

-- Add comment descriptions
COMMENT ON TABLE profiles IS 'User profiles containing birth information and preferences';
COMMENT ON TABLE birth_charts IS 'Astrological birth charts linked to user profiles';
COMMENT ON TABLE planetary_positions IS 'Planetary positions for each birth chart';

COMMENT ON COLUMN profiles.email IS 'User''s email address';
COMMENT ON COLUMN profiles.full_name IS 'User''s full name';
COMMENT ON COLUMN profiles.birth_date IS 'User''s date of birth';
COMMENT ON COLUMN profiles.birth_time IS 'User''s time of birth';
COMMENT ON COLUMN profiles.birth_place IS 'User''s place of birth';
COMMENT ON COLUMN profiles.birth_coordinates IS 'Geographic coordinates of birth location (longitude, latitude)';

COMMENT ON COLUMN birth_charts.chart_type IS 'Type of astrological chart (e.g., natal, transit, composite)';
COMMENT ON COLUMN birth_charts.chart_data IS 'Complete chart data in JSON format';

COMMENT ON COLUMN planetary_positions.planet IS 'Name of the planet';
COMMENT ON COLUMN planetary_positions.zodiac_sign IS 'Zodiac sign the planet is in';
COMMENT ON COLUMN planetary_positions.degree IS 'Degree position in the zodiac sign';
COMMENT ON COLUMN planetary_positions.house IS 'House number (1-12)';
COMMENT ON COLUMN planetary_positions.is_retrograde IS 'Whether the planet is in retrograde motion';
COMMENT ON COLUMN planetary_positions.strength IS 'Planet strength in its position (Strong, Moderate, Weak)'; 