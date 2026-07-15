/* eslint-disable @typescript-eslint/no-require-imports */
const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());

const mysql = require('mysql2/promise');

const dbName = process.env.DB_NAME || 'm_amin_network';
const quoteIdentifier = (identifier) => `\`${identifier.replace(/`/g, '``')}\``;

(async () => {
  const serverConnection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    charset: 'utf8mb4'
  });

  await serverConnection.query(
    `CREATE DATABASE IF NOT EXISTS ${quoteIdentifier(dbName)} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await serverConnection.end();

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: dbName,
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

  // Packages list table has already been successfully migrated.
  // We remove it from dropping/recreating here to preserve custom production packages.

  // Promo offers table migration to fix schema key and field mismatches
  console.log("Creating promo_offers table if missing...");
  await connection.query(
    'CREATE TABLE IF NOT EXISTS `promo_offers` (`code` VARCHAR(255) PRIMARY KEY, `title` VARCHAR(255), `badge` VARCHAR(255), `badgeColor` VARCHAR(255), `details` TEXT, `validUntil` VARCHAR(255), `_sort_order` DOUBLE) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
  );
  const [columns] = await connection.query('SHOW COLUMNS FROM `promo_offers`');
  const existingColumns = new Set(columns.map((column) => column.Field));
  const requiredColumns = {
    code: '`code` VARCHAR(255)',
    title: '`title` VARCHAR(255)',
    badge: '`badge` VARCHAR(255)',
    badgeColor: '`badgeColor` VARCHAR(255)',
    details: '`details` TEXT',
    validUntil: '`validUntil` VARCHAR(255)',
    imageUrl: '`imageUrl` VARCHAR(255)',
    _sort_order: '`_sort_order` DOUBLE'
  };

  for (const [columnName, columnDefinition] of Object.entries(requiredColumns)) {
    if (!existingColumns.has(columnName)) {
      console.log(`Adding missing promo_offers column: ${columnName}`);
      await connection.query(`ALTER TABLE \`promo_offers\` ADD COLUMN ${columnDefinition}`);
    }
  }

  const [existingRows] = await connection.query('SELECT 1 FROM `promo_offers` LIMIT 1');
  if (existingRows.length > 0) {
    console.log("promo_offers already has data. Existing records preserved; seed skipped.");
    await connection.end();
    return;
  }

  console.log("Seeding empty promo_offers table...");
  const promoOffersSeed = [
    {
      title: "Zero Installation Fee",
      badge: "New Connection",
      badgeColor: "bg-brand-cyan/15 border-brand-cyan/30 text-brand-cyan",
      details: "Subscribe to any 20 Mbps or higher home internet package for a minimum contract of 6 months, and get standard installation & optical fiber line connection completely free (saves ৳1,000 BDT).",
      code: "FREEINSTALL2026",
      validUntil: "31 Dec 2026",
      _sort_order: 0
    },
    {
      title: "Pay 10 Months, Get 12",
      badge: "Best Value",
      badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 animate-pulse",
      details: "Pay for 10 months upfront on any Home Broadband or Gamer Pack plan, and get an additional 2 months of subscription completely free (saves up to ৳3,000 BDT).",
      code: "ANNUAL10",
      validUntil: "Ongoing Promotion",
      _sort_order: 1
    },
    {
      title: "Free Public IP for Gamers",
      badge: "Gamer Special",
      badgeColor: "bg-brand-blue/15 border-brand-blue/30 text-brand-blue",
      details: "Subscribe to the 30 Mbps Gamer Pack or higher and receive a dedicated Static Public IP address for hosting lobbies and obtaining lowest pings at 0 extra monthly cost (saves ৳150/month).",
      code: "GAMERIP",
      validUntil: "31 Oct 2026",
      _sort_order: 2
    },
    {
      title: "Refer a Friend",
      badge: "Community Deal",
      badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
      details: "Refer a neighbor or friend in South Keraniganj. Once their connection is activated, both you and your referred friend get a 50% discount on your next month's internet bill.",
      code: "REFER50",
      validUntil: "Ongoing Promotion",
      _sort_order: 3
    }
  ];
  for (const o of promoOffersSeed) {
    await connection.query(
      'INSERT INTO `promo_offers` (`code`, `title`, `badge`, `badgeColor`, `details`, `validUntil`, `_sort_order`) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [o.code, o.title, o.badge, o.badgeColor, o.details, o.validUntil, o._sort_order]
    );
  }
  console.log("Promo offers successfully seeded.");

  await connection.end();
})();
