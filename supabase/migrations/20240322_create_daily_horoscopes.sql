-- Create daily_horoscopes table for secure server-side storage
CREATE TABLE daily_horoscopes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  prediction TEXT NOT NULL,
  lucky_number INTEGER NOT NULL,
  lucky_color VARCHAR(50) NOT NULL,
  advice TEXT NOT NULL,
  planetary_influence TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique constraint to ensure one horoscope per user per day
CREATE UNIQUE INDEX daily_horoscopes_user_date_idx ON daily_horoscopes(user_id, date);

-- Enable RLS (Row Level Security)
ALTER TABLE daily_horoscopes ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own horoscopes
CREATE POLICY "Users can view own horoscopes" ON daily_horoscopes
    FOR SELECT USING (auth.uid() = user_id);

-- Create policy: Users can insert their own horoscopes
CREATE POLICY "Users can insert own horoscopes" ON daily_horoscopes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own horoscopes
CREATE POLICY "Users can update own horoscopes" ON daily_horoscopes
    FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_daily_horoscopes_updated_at 
    BEFORE UPDATE ON daily_horoscopes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 