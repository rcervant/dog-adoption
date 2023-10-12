-- Create or use a specific database
CREATE DATABASE IF NOT EXISTS my_db;
USE my_db;

-- Create a table
CREATE TABLE example (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);
