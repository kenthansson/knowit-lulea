SET search_path TO public;
  
-- crete table if not exists
CREATE TABLE IF NOT EXISTS point_of_interest (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL
);

