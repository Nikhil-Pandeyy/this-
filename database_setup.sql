-- SQL Script to create the database structure for Conqify Tech Solution
-- This matches the current schema in db.json

-- Create database
CREATE DATABASE conqify_db;
\c conqify_db;

-- Settings table
CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    summary TEXT,
    currency VARCHAR(10) DEFAULT 'INR'
);

-- Pricing Plans
CREATE TABLE plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price VARCHAR(20) NOT NULL,
    period VARCHAR(20) DEFAULT 'month',
    description TEXT,
    isPopular BOOLEAN DEFAULT false,
    features JSONB -- Array of strings
);

-- Blog Posts
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    author VARCHAR(100),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image TEXT,
    category VARCHAR(50)
);

-- Careers / Jobs
CREATE TABLE careers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    type VARCHAR(50),
    location VARCHAR(100),
    salary VARCHAR(50),
    description TEXT,
    requirements JSONB -- Array of strings
);

-- Services
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    category VARCHAR(20) -- 'software' or 'placement'
);

-- Clients
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    industry VARCHAR(100),
    logo TEXT
);

-- Promo Codes
CREATE TABLE promos (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    discount DECIMAL(10, 2) NOT NULL,
    type VARCHAR(20), -- 'percentage' or 'fixed'
    planId VARCHAR(50) -- 'all' or specific plan ID
);

-- Orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customerName VARCHAR(100),
    customerEmail VARCHAR(100),
    planName VARCHAR(100),
    amount DECIMAL(10, 2),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending'
);

-- Consultations
CREATE TABLE consultations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    service VARCHAR(100),
    message TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ad Banners
CREATE TABLE banners (
    id SERIAL PRIMARY KEY,
    text TEXT,
    ctaText VARCHAR(50),
    ctaLink TEXT,
    active BOOLEAN DEFAULT true
);
