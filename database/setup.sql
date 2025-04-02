-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS school_management;

-- Use the created database
USE school_management;

-- Create the schools table if it doesn't exist
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Primary key
    name VARCHAR(255) NOT NULL,        -- School name
    address VARCHAR(255) NOT NULL,     -- School address
    latitude FLOAT NOT NULL,           -- Latitude coordinate
    longitude FLOAT NOT NULL           -- Longitude coordinate
);
