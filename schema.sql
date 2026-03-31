-- IndraMart E-Commerce Database Schema
-- Database: Ecommerce_db
-- Run this in phpMyAdmin SQL tab

CREATE DATABASE IF NOT EXISTS Ecommerce_db;
USE Ecommerce_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'seller') DEFAULT 'user',
    image_url VARCHAR(500) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    offer_price DECIMAL(10, 2) NOT NULL,
    category ENUM('Earphone', 'Headphone', 'Watch', 'Smartphone', 'Laptop', 'Camera', 'Accessories') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Product Images Table
CREATE TABLE IF NOT EXISTS product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Cart Items Table
CREATE TABLE IF NOT EXISTS cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    UNIQUE KEY unique_cart_item (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Addresses Table
CREATE TABLE IF NOT EXISTS addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    area TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('Order Placed', 'Packing', 'Shipped', 'Out for Delivery', 'Delivered') DEFAULT 'Order Placed',
    payment_method VARCHAR(50) DEFAULT 'COD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (address_id) REFERENCES addresses(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =============================================
-- SEED DATA
-- =============================================

-- Demo Seller User (password: seller123)
INSERT INTO users (name, email, password, role) VALUES
('IndraMart Seller', 'seller@indramart.com', '$2a$10$8K1p/a0dL1LXMIgoEDFrwOfMQkOYv0e1r1lBwI0YDlGRv.Q5JYuHy', 'seller');

-- Demo Customer (password: user123)
INSERT INTO users (name, email, password, role) VALUES
('Demo User', 'user@indramart.com', '$2a$10$8K1p/a0dL1LXMIgoEDFrwOfMQkOYv0e1r1lBwI0YDlGRv.Q5JYuHy', 'user');

-- Products (10 products)
INSERT INTO products (user_id, name, description, price, offer_price, category) VALUES
(1, 'Apple AirPods Pro 2nd gen', 'Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.', 499.99, 399.99, 'Earphone'),
(1, 'Bose QuietComfort 45', 'The Bose QuietComfort 45 headphones are engineered for exceptional sound quality and unparalleled noise cancellation. With a 24-hour battery life and comfortable, lightweight design, these headphones deliver premium audio for any environment.', 429.99, 329.99, 'Headphone'),
(1, 'Samsung Galaxy S23', 'The Samsung Galaxy S23 offers an all-encompassing mobile experience with its advanced AMOLED display, offering vibrant visuals and smooth interactions. Equipped with top-of-the-line fitness tracking features and cutting-edge technology.', 899.99, 799.99, 'Smartphone'),
(1, 'Garmin Venu 2', 'The Garmin Venu 2 smartwatch blends advanced fitness tracking with sophisticated design, offering heart rate monitoring, GPS, and sleep tracking. Built with a 24-hour battery life, ideal for fitness enthusiasts.', 399.99, 349.99, 'Watch'),
(1, 'PlayStation 5', 'The PlayStation 5 takes gaming to the next level with ultra-HD graphics, a powerful 825GB SSD, and ray tracing technology for realistic visuals. Fast loading times, seamless gameplay, and stunning visuals.', 599.99, 499.99, 'Accessories'),
(1, 'Canon EOS R5', 'The Canon EOS R5 is a game-changing mirrorless camera with a 45MP full-frame sensor, offering ultra-high resolution and the ability to shoot 8K video. Exceptional clarity, speed, and color accuracy.', 4199.99, 3899.99, 'Camera'),
(1, 'MacBook Pro 16', 'The MacBook Pro 16, powered by Apple M2 Pro chip, offers outstanding performance with 16GB RAM and a 512GB SSD. Stunning Retina display with True Tone technology, a top choice for professionals.', 2799.99, 2499.99, 'Laptop'),
(1, 'Sony WF-1000XM5', 'Sony WF-1000XM5 true wireless earbuds deliver immersive sound with Hi-Res Audio and advanced noise cancellation technology. Designed for comfort and quality with a stable, snug fit.', 349.99, 299.99, 'Earphone'),
(1, 'Samsung Projector 4k', 'The Samsung 4K Projector offers an immersive cinematic experience with ultra-high-definition visuals and realistic color accuracy. Built-in speaker with rich sound quality, perfect for movie nights.', 1699.99, 1499.99, 'Accessories'),
(1, 'ASUS ROG Zephyrus G16', 'The ASUS ROG Zephyrus G16 gaming laptop is powered by Intel Core i9 processor with RTX 4070 GPU. 16GB RAM and 1TB SSD, designed for gamers who demand extreme power and speed.', 2199.99, 1999.99, 'Laptop');

-- Product Images (using GitHub raw URLs from existing dummy data)
INSERT INTO product_images (product_id, image_url, sort_order) VALUES
(1, 'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/k4dafzhwhgcn5tnoylrw.webp', 0),
(1, 'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/j212frakb8hdrhvhajhg.webp', 1),
(1, 'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/imwuugqxsajuwqpkegb5.webp', 2),
(1, 'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/k1oqaslw5tb3ebw01vvj.webp', 3),
(2, 'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/m16coelz8ivkk9f0nwrz.webp', 0),
(3, 'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/xjd4eprpwqs7odbera1w.webp', 0),
(4, 'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/hdfi4u3fmprazpnrnaga.webp', 0),
(5, 'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/dd3l13vfoartrgbvkkh5.webp', 0),
(6, 'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/r5h370zuujvrw461c6wy.webp', 0),
(7, 'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/rzri7kytphxalrm9rubd.webp', 0),
(8, 'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/e3zjaupyumdkladmytke.webp', 0),
(9, 'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/qqdcly8a8vkyciy9g0bw.webp', 0),
(10, 'https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/wig1urqgnkeyp4t2rtso.webp', 0);

-- Demo Address
INSERT INTO addresses (user_id, full_name, phone_number, pincode, area, city, state) VALUES
(2, 'Demo User', '0123456789', '654321', 'Main Road, 123 Street, G Block', 'Mumbai', 'Maharashtra');
