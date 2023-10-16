CREATE TABLE point_of_interest (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL
);

-- Insert sample data
INSERT INTO point_of_interest (name, description, latitude, longitude) VALUES
('Point A', 'Description for Point A', 40.730610, -73.935242),
('Point B', 'Description for Point B', 34.052235, -118.243683),
('Point C', 'Description for Point C', 51.507222, -0.1275);

