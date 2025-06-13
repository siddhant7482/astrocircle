-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email text UNIQUE NOT NULL,
    full_name text,
    birth_date date,
    birth_time time,
    birth_place text,
    birth_coordinates text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read only their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

-- Create policy to allow users to update only their own profile
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Create policy to allow users to insert their own profile
CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Create policy to allow authenticated users to insert their profile during signup
CREATE POLICY "Allow authenticated users to insert profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Create birth charts table linked to profiles
CREATE TABLE IF NOT EXISTS public.birth_charts (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    chart_type text NOT NULL,
    chart_data jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.birth_charts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read only their own birth charts
CREATE POLICY "Users can view own birth charts"
    ON public.birth_charts FOR SELECT
    USING (auth.uid() = profile_id);

-- Create policy to allow users to create birth charts for themselves
CREATE POLICY "Users can create own birth charts"
    ON public.birth_charts FOR INSERT
    WITH CHECK (auth.uid() = profile_id);

-- Create policy to allow users to update their own birth charts
CREATE POLICY "Users can update own birth charts"
    ON public.birth_charts FOR UPDATE
    USING (auth.uid() = profile_id);

-- Create planetary positions table linked to birth charts
CREATE TABLE IF NOT EXISTS public.planetary_positions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    birth_chart_id uuid REFERENCES public.birth_charts(id) ON DELETE CASCADE NOT NULL,
    planet text NOT NULL,
    zodiac_sign text NOT NULL,
    degree numeric(5,2) NOT NULL,
    house integer NOT NULL,
    is_retrograde boolean DEFAULT false NOT NULL,
    strength text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.planetary_positions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read only their own planetary positions
CREATE POLICY "Users can view own planetary positions"
    ON public.planetary_positions FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.birth_charts bc
            WHERE bc.id = planetary_positions.birth_chart_id
            AND bc.profile_id = auth.uid()
        )
    );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_birth_charts_profile_id ON public.birth_charts(profile_id);
CREATE INDEX IF NOT EXISTS idx_planetary_positions_birth_chart_id ON public.planetary_positions(birth_chart_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_birth_charts_updated_at
    BEFORE UPDATE ON public.birth_charts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add helpful comments
COMMENT ON TABLE public.profiles IS 'User profiles containing birth information and preferences';
COMMENT ON TABLE public.birth_charts IS 'Astrological birth charts linked to user profiles';
COMMENT ON TABLE public.planetary_positions IS 'Planetary positions for each birth chart';

COMMENT ON COLUMN public.profiles.birth_coordinates IS 'Geographic coordinates of birth location (longitude, latitude)';
COMMENT ON COLUMN public.birth_charts.chart_type IS 'Type of astrological chart (e.g., natal, transit, composite)';
COMMENT ON COLUMN public.birth_charts.chart_data IS 'Complete chart data in JSON format';
COMMENT ON COLUMN public.planetary_positions.strength IS 'Planet strength in its position (Strong, Moderate, Weak)'; 