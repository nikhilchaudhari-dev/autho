-- ================================================
-- Full-Stack Authentication Database Schema
-- ================================================
-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS auth_db;
-- Use the database
USE auth_db;
-- ================================================
-- Users Table
-- ================================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ================================================
-- Sample Data (Optional - for testing)
-- ================================================
-- Note: Password is hashed with bcrypt - this is just an example
-- DO NOT insert plain text passwords in production
-- To create a test user manually, you would need to:
-- 1. Hash the password using bcrypt (in Node.js or online tool)
-- 2. Insert the hashed password
-- Example:
-- INSERT INTO users (name, email, password) VALUES 
-- ('Test User', 'test@example.com', '$2a$10$hashed_password_here');
-- ================================================
-- Useful Queries
-- ================================================
-- Get all users (for debugging)
-- SELECT * FROM users;
-- Get user by email
-- SELECT * FROM users WHERE email = 'user@example.com';
-- Delete user by ID
-- DELETE FROM users WHERE id = 1;
-- Count total users
-- SELECT COUNT(*) as total_users FROM users;