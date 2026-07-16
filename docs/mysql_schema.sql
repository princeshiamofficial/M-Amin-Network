-- MySQL Schema Reference for M-Amin Network
-- Structured to follow the ERP app database layout while preserving this app's existing tables.

-- 1. Identity & Access Management
CREATE TABLE user_roles (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(20) DEFAULT '#6b7280',
    is_default BOOLEAN DEFAULT FALSE,
    priority INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    _sort_order DOUBLE
);

CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255),
    name VARCHAR(255),
    role VARCHAR(255),
    role_id VARCHAR(255),
    email VARCHAR(255),
    lastLogin VARCHAR(255),
    status VARCHAR(255),
    avatarUrl TEXT,
    avatar_url TEXT,
    password VARCHAR(255),
    phone VARCHAR(255),
    address TEXT,
    companyName VARCHAR(255),
    company_name VARCHAR(255),
    is_banned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    _sort_order DOUBLE
);

CREATE TABLE user (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    role VARCHAR(255),
    password_hash VARCHAR(255),
    sessionVersion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    _sort_order DOUBLE
);

CREATE TABLE admin_roles (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    pageAccess LONGTEXT,
    color VARCHAR(20),
    is_default BOOLEAN DEFAULT FALSE,
    priority INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    _sort_order DOUBLE
);

-- 2. System Settings
CREATE TABLE global_settings (
    id VARCHAR(50) PRIMARY KEY,
    settings_json JSON NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    _sort_order DOUBLE
);

CREATE TABLE system_config (
    _auto_id INT AUTO_INCREMENT PRIMARY KEY,
    peeringBandwidthLimit VARCHAR(255),
    maintenanceMode BOOLEAN,
    maintenanceMessage TEXT,
    popupEnabled BOOLEAN,
    popupImage LONGTEXT,
    _sort_order DOUBLE
);

-- 3. Website Content
CREATE TABLE site_content (
    _auto_id INT AUTO_INCREMENT PRIMARY KEY,
    siteTitle VARCHAR(255),
    hotline VARCHAR(255),
    supportEmail VARCHAR(255),
    address TEXT,
    _sort_order DOUBLE
);

CREATE TABLE page_headers (
    _auto_id INT AUTO_INCREMENT PRIMARY KEY,
    packages_bg VARCHAR(500),
    offers_bg VARCHAR(500),
    coverage_bg VARCHAR(500),
    multimedia_bg VARCHAR(500),
    careers_bg VARCHAR(500),
    _sort_order DOUBLE
);

-- 4. Operations
CREATE TABLE package_requests (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(255),
    email VARCHAR(255),
    zone VARCHAR(255),
    price DOUBLE,
    address TEXT,
    planName VARCHAR(255),
    speed VARCHAR(255),
    status VARCHAR(255),
    date VARCHAR(255),
    referralCode VARCHAR(255),
    _sort_order DOUBLE
);

CREATE TABLE complaints (
    id VARCHAR(255) PRIMARY KEY,
    clientId VARCHAR(255),
    name VARCHAR(255),
    phone VARCHAR(255),
    category VARCHAR(255),
    `desc` TEXT,
    date VARCHAR(255),
    status VARCHAR(255),
    _sort_order DOUBLE
);

CREATE TABLE tickets (
    id VARCHAR(255) PRIMARY KEY,
    clientId VARCHAR(255),
    name VARCHAR(255),
    phone VARCHAR(255),
    category VARCHAR(255),
    `desc` TEXT,
    date VARCHAR(255),
    status VARCHAR(255),
    _sort_order DOUBLE
);

CREATE TABLE payments (
    id VARCHAR(255) PRIMARY KEY,
    clientId VARCHAR(255),
    name VARCHAR(255),
    phone VARCHAR(255),
    packageName VARCHAR(255),
    amount DOUBLE,
    method VARCHAR(255),
    status VARCHAR(255),
    date VARCHAR(255),
    _sort_order DOUBLE
);
