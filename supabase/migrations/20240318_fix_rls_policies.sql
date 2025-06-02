-- First, drop all existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON profiles;
DROP POLICY IF EXISTS "Users can view their own charts" ON charts;
DROP POLICY IF EXISTS "Users can insert their own charts" ON charts;

-- Enable RLS on both tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE charts ENABLE ROW LEVEL SECURITY;

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

-- Create policies for charts table
CREATE POLICY "Enable read access for own charts"
    ON charts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Enable insert access for own charts"
    ON charts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Grant necessary permissions
GRANT ALL ON profiles TO authenticated;
GRANT ALL ON charts TO authenticated; 