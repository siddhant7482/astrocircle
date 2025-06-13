-- name: get-user-charts
SELECT c.*, p.full_name, p.birth_date, p.birth_place
FROM birth_charts c
JOIN profiles p ON p.id = c.profile_id
WHERE c.profile_id = :user_id
ORDER BY c.created_at DESC;

-- name: create-birth-chart
INSERT INTO birth_charts (
    profile_id,
    chart_type,
    chart_data
)
VALUES (
    :profile_id,
    :chart_type,
    :chart_data
)
RETURNING *;

-- name: get-chart-with-positions
WITH chart_data AS (
    SELECT c.*, p.full_name, p.birth_date, p.birth_place
    FROM birth_charts c
    JOIN profiles p ON p.id = c.profile_id
    WHERE c.id = :chart_id
    AND c.profile_id = :user_id
)
SELECT 
    cd.*,
    json_agg(
        json_build_object(
            'planet', pp.planet,
            'zodiac_sign', pp.zodiac_sign,
            'degree', pp.degree,
            'house', pp.house,
            'is_retrograde', pp.is_retrograde,
            'strength', pp.strength
        )
    ) as planetary_positions
FROM chart_data cd
LEFT JOIN planetary_positions pp ON pp.birth_chart_id = cd.id
GROUP BY cd.id, cd.profile_id, cd.chart_type, cd.chart_data, cd.created_at, cd.updated_at,
         cd.full_name, cd.birth_date, cd.birth_place; 