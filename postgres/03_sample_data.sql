SET search_path TO public;

-- Insert sample data
INSERT INTO category (name) VALUES
('Kantareller'),
('Trattkantareller'),
('Åkerbär'),
('Hjortron');

INSERT INTO point_of_interest (name, description, lat, lng, category, created, updated) VALUES
('Point A', 'Description for Point A', 40.730610, -73.935242, 1,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Point B', 'Description for Point B', 34.052235, -118.243683, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Point C', 'Description for Point C', 51.507222, -0.1275, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

