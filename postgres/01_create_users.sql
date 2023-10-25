-- This script must be run before the tables are created

-- Create the user
CREATE ROLE dbadmin WITH LOGIN PASSWORD 'Knowit123';

-- Grant privileges on the database
GRANT ALL PRIVILEGES ON DATABASE platspinnendb TO dbadmin;

-- Grant privileges on all tables, sequences, and other objects
-- You need to run this SQL block for each schema in the platspinnendb database
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL PRIVILEGES ON TABLES TO dbadmin;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL PRIVILEGES ON SEQUENCES TO dbadmin;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT USAGE ON TYPES TO dbadmin;