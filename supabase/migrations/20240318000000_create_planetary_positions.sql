-- Create planetary_positions table
CREATE TABLE IF NOT EXISTS planetary_positions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    positions JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_planetary_positions_user_id ON planetary_positions(user_id);
CREATE INDEX IF NOT EXISTS idx_planetary_positions_updated_at ON planetary_positions(updated_at);

-- Add RLS policies
ALTER TABLE planetary_positions ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own positions
CREATE POLICY "Users can read their own planetary positions"
    ON planetary_positions
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Policy for users to insert their own positions
CREATE POLICY "Users can insert their own planetary positions"
    ON planetary_positions
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own positions
CREATE POLICY "Users can update their own planetary positions"
    ON planetary_positions
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own positions
CREATE POLICY "Users can delete their own planetary positions"
    ON planetary_positions
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id); 