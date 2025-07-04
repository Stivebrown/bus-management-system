-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'customer') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Buses table
CREATE TABLE IF NOT EXISTS buses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  plate_number VARCHAR(20) NOT NULL UNIQUE,
  model VARCHAR(50),
  capacity INT,
  driver_name VARCHAR(100),
  status ENUM('active', 'inactive') DEFAULT 'active'
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  bus_id INT,
  from_city VARCHAR(100) NOT NULL,
  to_city VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (bus_id) REFERENCES buses(id)
);

-- Shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  from_city VARCHAR(100) NOT NULL,
  to_city VARCHAR(100) NOT NULL,
  description TEXT,
  weight DECIMAL(10,2),
  status ENUM('pending', 'in_transit', 'delivered', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
