-- Create functions for profiles
CREATE OR REPLACE FUNCTION get_profile_by_id(user_id UUID)
RETURNS SETOF profiles
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT * FROM profiles WHERE id = user_id;
$$;

CREATE OR REPLACE FUNCTION update_profile(
    user_id UUID,
    full_name TEXT DEFAULT NULL,
    birth_date DATE DEFAULT NULL,
    birth_time TIME DEFAULT NULL,
    birth_place TEXT DEFAULT NULL,
    birth_coordinates TEXT DEFAULT NULL
)
RETURNS SETOF profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    UPDATE profiles
    SET 
        full_name = COALESCE(update_profile.full_name, profiles.full_name),
        birth_date = COALESCE(update_profile.birth_date, profiles.birth_date),
        birth_time = COALESCE(update_profile.birth_time, profiles.birth_time),
        birth_place = COALESCE(update_profile.birth_place, profiles.birth_place),
        birth_coordinates = CASE 
            WHEN update_profile.birth_coordinates IS NOT NULL 
            THEN POINT(split_part(update_profile.birth_coordinates, ',', 1)::float, split_part(update_profile.birth_coordinates, ',', 2)::float)
            ELSE profiles.birth_coordinates
        END,
        updated_at = NOW()
    WHERE id = user_id
    RETURNING *;
END;
$$;

CREATE OR REPLACE FUNCTION create_profile(
    user_id UUID,
    email TEXT,
    full_name TEXT DEFAULT NULL,
    birth_date DATE DEFAULT NULL,
    birth_time TIME DEFAULT NULL,
    birth_place TEXT DEFAULT NULL,
    birth_coordinates TEXT DEFAULT NULL
)
RETURNS SETOF profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    INSERT INTO profiles (
        id,
        email,
        full_name,
        birth_date,
        birth_time,
        birth_place,
        birth_coordinates
    )
    VALUES (
        user_id,
        email,
        full_name,
        birth_date,
        birth_time,
        birth_place,
        CASE 
            WHEN birth_coordinates IS NOT NULL 
            THEN POINT(split_part(birth_coordinates, ',', 1)::float, split_part(birth_coordinates, ',', 2)::float)
            ELSE NULL
        END
    )
    RETURNING *;
END;
$$;

-- Create functions for birth charts
CREATE OR REPLACE FUNCTION get_user_charts(user_id UUID)
RETURNS TABLE (
    id UUID,
    profile_id UUID,
    chart_type TEXT,
    chart_data JSONB,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    full_name TEXT,
    birth_date DATE,
    birth_place TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT 
        c.*,
        p.full_name,
        p.birth_date,
        p.birth_place
    FROM birth_charts c
    JOIN profiles p ON p.id = c.profile_id
    WHERE c.profile_id = user_id
    ORDER BY c.created_at DESC;
$$;

CREATE OR REPLACE FUNCTION create_birth_chart(
    profile_id UUID,
    chart_type TEXT,
    chart_data JSONB
)
RETURNS SETOF birth_charts
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    INSERT INTO birth_charts (
        profile_id,
        chart_type,
        chart_data
    )
    VALUES (
        profile_id,
        chart_type,
        chart_data
    )
    RETURNING *;
$$;

CREATE OR REPLACE FUNCTION get_chart_with_positions(chart_id UUID, user_id UUID)
RETURNS TABLE (
    id UUID,
    profile_id UUID,
    chart_type TEXT,
    chart_data JSONB,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    full_name TEXT,
    birth_date DATE,
    birth_place TEXT,
    planetary_positions JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    WITH chart_data AS (
        SELECT c.*, p.full_name, p.birth_date, p.birth_place
        FROM birth_charts c
        JOIN profiles p ON p.id = c.profile_id
        WHERE c.id = chart_id
        AND c.profile_id = user_id
    )
    SELECT 
        cd.*,
        COALESCE(
            (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'planet', pp.planet,
                        'zodiac_sign', pp.zodiac_sign,
                        'degree', pp.degree,
                        'house', pp.house,
                        'is_retrograde', pp.is_retrograde,
                        'strength', pp.strength
                    )
                )
                FROM planetary_positions pp
                WHERE pp.birth_chart_id = cd.id
            ),
            '[]'::jsonb
        ) as planetary_positions
    FROM chart_data cd;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION get_profile_by_id(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION update_profile(UUID, TEXT, DATE, TIME, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION create_profile(UUID, TEXT, TEXT, DATE, TIME, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_charts(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION create_birth_chart(UUID, TEXT, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION get_chart_with_positions(UUID, UUID) TO authenticated;

-- Add additional policy for initial profile creation
CREATE POLICY "Allow initial profile creation"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL); 