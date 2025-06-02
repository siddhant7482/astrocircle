CREATE TABLE horoscope_analysis (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  analysis TEXT NOT NULL,
  grah_sthiti JSONB NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Add RLS policies
ALTER TABLE horoscope_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own analysis"
  ON horoscope_analysis
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analysis"
  ON horoscope_analysis
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);