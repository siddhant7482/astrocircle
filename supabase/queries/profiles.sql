-- name: get-profile-by-id
SELECT *
FROM profiles
WHERE id = :user_id;

-- name: update-profile
UPDATE profiles
SET 
    full_name = COALESCE(:full_name, full_name),
    birth_date = COALESCE(:birth_date, birth_date),
    birth_place = COALESCE(:birth_place, birth_place),
    birth_coordinates = COALESCE(:birth_coordinates, birth_coordinates),
    updated_at = NOW()
WHERE id = :user_id
RETURNING *;

-- name: create-profile
INSERT INTO profiles (
    id,
    email,
    full_name,
    birth_date,
    birth_place,
    birth_coordinates
)
VALUES (
    :user_id,
    :email,
    :full_name,
    :birth_date,
    :birth_place,
    :birth_coordinates
)
RETURNING *; 