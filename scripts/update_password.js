/* eslint-disable @typescript-eslint/no-require-imports */
const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());

const mysql = require('mysql2/promise');

(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'm_amin_network',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    charset: 'utf8mb4'
  });

  console.log("Connected to database:", process.env.DB_NAME);
  // Ensure the session uses utf8mb4 for proper Unicode storage
  await connection.query('SET NAMES utf8mb4');


  // Password hash update removed to prevent resetting custom admin credentials.


  // Quick actions and site content migrations have already been successfully run.
  // We remove them here to avoid altering existing production configurations.
  // The other tables (coverage_zones, hero_typography, hero_metrics) have already been migrated.
  // We keep their current data intact and do not drop/recreate them to prevent data loss.

  // Packages list table migration
  console.log("Dropping old packages_list table if exists...");
  await connection.query('DROP TABLE IF EXISTS `packages_list`');
  console.log("Creating packages_list table...");
  await connection.query(
    'CREATE TABLE `packages_list` (`id` VARCHAR(255) PRIMARY KEY, `name` VARCHAR(255), `speed` VARCHAR(255), `price` DOUBLE, `features` TEXT, `popular` BOOLEAN, `category` VARCHAR(255), `tagline` VARCHAR(255), `_sort_order` DOUBLE) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
  );
  console.log("Seeding packages_list table...");
  const packagesListSeed = [
    { id: "plan-1", name: "Eco Starter", speed: "10 Mbps", price: 500, features: JSON.stringify(["Unlimited Data", "24/7 Support", "Ideal for 1-2 devices"]), popular: false, category: "home", tagline: "Great for casual browsing & SD streaming", _sort_order: 0 },
    { id: "plan-2", name: "Standard Home", speed: "20 Mbps", price: 800, features: JSON.stringify(["Unlimited Data", "Youtube Cache", "Best for family"]), popular: true, category: "home", tagline: "Perfect for families & HD streaming", _sort_order: 1 },
    { id: "plan-3", name: "Premium Splice", speed: "50 Mbps", price: 1500, features: JSON.stringify(["Dedicated Core", "Real IP Included", "Priority Support"]), popular: false, category: "corporate", tagline: "Symmetric bandwidth for small businesses", _sort_order: 2 }
  ];
  for (const p of packagesListSeed) {
    await connection.query(
      'INSERT INTO `packages_list` (`id`, `name`, `speed`, `price`, `features`, `popular`, `category`, `tagline`, `_sort_order`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [p.id, p.name, p.speed, p.price, p.features, p.popular ? 1 : 0, p.category, p.tagline, p._sort_order]
    );
  }
  console.log("Packages list successfully seeded.");

  await connection.end();
})();
