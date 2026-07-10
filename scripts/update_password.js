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

  // Update password hash
  const correctHash = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';
  await connection.query(
    'UPDATE `user` SET `password_hash` = ? WHERE `username` = ? OR `email` = ?',
    [correctHash, 'admin', 'admin@mamin.net']
  );
  console.log("Admin credentials password hash successfully updated.");

  // Sync quick actions
  const defaultQuickActions = [
    { id: "qa-1", label: "Packages", path: "/admin/packages", route: "/admin/packages", iconName: "Package", bg: "bg-blue-50", text: "text-blue-600", _sort_order: 0 },
    { id: "qa-2", label: "Offers", path: "/admin/offers", route: "/admin/offers", iconName: "Tag", bg: "bg-violet-50", text: "text-violet-600", _sort_order: 1 },
    { id: "qa-3", label: "Coverage Areas", path: "/admin/coverage", route: "/admin/coverage-areas", iconName: "MapPin", bg: "bg-emerald-50", text: "text-emerald-600", _sort_order: 2 },
    { id: "qa-4", label: "Application", path: "/admin/applications", route: "/admin/applications", iconName: "FileText", bg: "bg-amber-50", text: "text-amber-600", _sort_order: 3 },
    { id: "qa-5", label: "Customer", path: "/admin/customers", route: "/admin/customers", iconName: "Users", bg: "bg-sky-50", text: "text-sky-600", _sort_order: 4 },
    { id: "qa-6", label: "Bills", path: "/admin/bills", route: "/admin/bills", iconName: "Receipt", bg: "bg-teal-50", text: "text-teal-600", _sort_order: 5 },
    { id: "qa-7", label: "Contact Messages", path: "/admin/contact", route: "/admin/contact-messages", iconName: "Mail", bg: "bg-pink-50", text: "text-pink-600", _sort_order: 6 },
    { id: "qa-8", label: "Complaints", path: "/admin/complaints", route: "/admin/complaints", iconName: "AlertTriangle", bg: "bg-red-50", text: "text-red-500", _sort_order: 7 },
    { id: "qa-9", label: "Jobs Add", path: "/admin/jobs", route: "/admin/jobs", iconName: "Briefcase", bg: "bg-orange-50", text: "text-orange-600", _sort_order: 8 },
    { id: "qa-10", label: "Job Applications", path: "/admin/job-applications", route: "/admin/job-applications", iconName: "FileText", bg: "bg-indigo-50", text: "text-indigo-600", _sort_order: 9 },
    { id: "qa-11", label: "Site Content", path: "/admin/content", route: "/admin/site-content", iconName: "Zap", bg: "bg-yellow-50", text: "text-yellow-600", _sort_order: 10 },
    { id: "qa-12", label: "Home Sections", path: "/admin/home-sections", route: "/admin/home-sections", iconName: "LayoutGrid", bg: "bg-fuchsia-50", text: "text-fuchsia-600", _sort_order: 11 },
    { id: "qa-13", label: "Hero Typography", path: "/admin/hero-typography", route: "/admin/hero-typography", iconName: "Type", bg: "bg-cyan-50", text: "text-cyan-600", _sort_order: 12 },
    { id: "qa-14", label: "About Page", path: "/admin/about", route: "/admin/about-page", iconName: "Info", bg: "bg-lime-50", text: "text-lime-600", _sort_order: 13 },
    { id: "qa-15", label: "Contact Page", path: "/admin/contact-page", route: "/admin/contact-page", iconName: "Phone", bg: "bg-rose-50", text: "text-rose-600", _sort_order: 14 },
    { id: "qa-16", label: "Top Bar & Footer", path: "/admin/layout", route: "/admin/topbar-footer", iconName: "PanelTop", bg: "bg-slate-100", text: "text-slate-600", _sort_order: 15 },
    { id: "qa-17", label: "Multimedia", path: "/admin/services", route: "/admin/services-hub", iconName: "Tv2", bg: "bg-purple-50", text: "text-purple-600", _sort_order: 16 },
    { id: "qa-18", label: "Settings", path: "/admin/settings", route: "/admin/settings", iconName: "Settings", bg: "bg-gray-100", text: "text-gray-600", _sort_order: 17 },
    { id: "qa-19", label: "Users & Roles", path: "/admin/users", route: "/admin/users-roles", iconName: "UserCog", bg: "bg-blue-50", text: "text-blue-700", _sort_order: 18 }
  ];

  console.log("Deleting old quick_actions...");
  await connection.query('DELETE FROM `quick_actions`');

  console.log("Inserting all 19 default quick_actions...");
  for (const qa of defaultQuickActions) {
    await connection.query(
      'INSERT INTO `quick_actions` (`id`, `label`, `path`, `route`, `iconName`, `bg`, `text`, `_sort_order`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [qa.id, qa.label, qa.path, qa.route, qa.iconName, qa.bg, qa.text, qa._sort_order]
    );
  }
  console.log("Quick actions successfully populated in database.");

  // Site content title migration
  try {
    await connection.query('ALTER TABLE `site_content` ADD COLUMN `siteTitle` VARCHAR(255)');
    console.log("Column 'siteTitle' successfully added to 'site_content' table.");
  } catch (err) {
    if (err.code === 'ER_DUP_COLUMN_NAME' || err.code === 'ER_DUP_FIELDNAME' || err.errno === 1060) {
      console.log("Column 'siteTitle' already exists in 'site_content' table.");
    } else {
      throw err;
    }
  }

  // Populate default siteTitle if currently empty or null
  const [siteRows] = await connection.query('SELECT `siteTitle` FROM `site_content` LIMIT 1');
  if (siteRows && siteRows.length > 0 && !siteRows[0].siteTitle) {
    await connection.query(
      'UPDATE `site_content` SET `siteTitle` = ? WHERE `_auto_id` = 1',
      ['M Amin Network | Best Broadband ISP in South Keraniganj, Dhaka']
    );
    console.log("Default siteTitle populated in site_content.");
  }

  // Coverage zones table migration
  console.log("Dropping old coverage_zones table...");
  await connection.query('DROP TABLE IF EXISTS `coverage_zones`');
  
  console.log("Recreating coverage_zones table...");
  await connection.query(
    'CREATE TABLE `coverage_zones` (`id` VARCHAR(255) PRIMARY KEY, `name` VARCHAR(255), `status` VARCHAR(255), `subAreas` TEXT, `_sort_order` DOUBLE)'
  );

  console.log("Seeding coverage_zones table...");
  const defaultZones = [
    { id: "cov-1", name: "Kadomtoli", status: "active", subAreas: JSON.stringify(["Kadomtoli Chowrasta", "Aganagar Road", "Babu Mia Mosque Road", "Al-Hira Goli"]), _sort_order: 0 },
    { id: "cov-2", name: "Aganagar", status: "active", subAreas: JSON.stringify(["Main Bazaar Road", "Haji Market area", "Aganagar Union Parishad", "Aganagar High School Road"]), _sort_order: 1 },
    { id: "cov-3", name: "Chunkutia", status: "active", subAreas: JSON.stringify(["Chunkutia East", "Chunkutia West", "Vidyut Office Road", "Girls School Goli"]), _sort_order: 2 },
    { id: "cov-4", name: "Zinjira", status: "active", subAreas: JSON.stringify(["Bazar Road", "Zinjira Launch Ghat Road", "Pachpara", "Rahmatpur"]), _sort_order: 3 },
    { id: "cov-5", name: "Kaliganj", status: "active", subAreas: JSON.stringify(["Iron Market", "Doli Market Road", "Kaliganj Canal Road"]), _sort_order: 4 },
    { id: "cov-6", name: "Telghat", status: "active", subAreas: JSON.stringify(["Lauchat Road", "River view road", "Telghat Ferry Ghat"]), _sort_order: 5 },
    { id: "cov-7", name: "Kholamura", status: "expanding", subAreas: JSON.stringify(["Kholamura Bazar", "Kholamura Ghat", "Model Town Block A & B"]), _sort_order: 6 },
    { id: "cov-8", name: "East Aganagar", status: "expanding", subAreas: JSON.stringify(["East Union Road", "Bypass road sector 2", "Munshiganj Link Road"]), _sort_order: 7 },
    { id: "cov-9", name: "Char Kaliganj", status: "expanding", subAreas: JSON.stringify(["Char Kaliganj Ferry Ghat Road", "Riverbank Road"]), _sort_order: 8 },
    { id: "cov-10", name: "Doleshwar", status: "planned", subAreas: JSON.stringify(["Doleshwar Bazar", "Doleshwar Madrasah Road", "Doleshwar High School"]), _sort_order: 9 },
    { id: "cov-11", name: "Hasnabad", status: "planned", subAreas: JSON.stringify(["Hasnabad Housing", "Hasnabad Cargo Terminal area", "N8 Highway Link"]), _sort_order: 10 }
  ];

  for (const zone of defaultZones) {
    await connection.query(
      'INSERT INTO `coverage_zones` (`id`, `name`, `status`, `subAreas`, `_sort_order`) VALUES (?, ?, ?, ?, ?)',
      [zone.id, zone.name, zone.status, zone.subAreas, zone._sort_order]
    );
  }
  console.log("Coverage zones successfully seeded.");

  // Hero Typography table migration
  console.log("Dropping old hero_typography table if exists...");
  await connection.query('DROP TABLE IF EXISTS `hero_typography`');
  console.log("Creating hero_typography table...");
  await connection.query(
    'CREATE TABLE `hero_typography` (`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `mainTitle` TEXT, `subtitle` TEXT, `slides` TEXT, `_sort_order` DOUBLE) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
  );
  console.log("Seeding hero_typography table...");
  await connection.query(
    'INSERT INTO `hero_typography` (`mainTitle`, `subtitle`, `slides`, `_sort_order`) VALUES (?, ?, ?, ?)',
    [
      "Blazing Fast Fiber | Internet in Keraniganj",
      "M Amin Network (AS150164) is South Keraniganj's leading ISP, offering high-speed, SLA-backed stable internet with dedicated routing.",
      JSON.stringify(["/28ca5e1d52c944ebfc4dd9f2b300980d.jpg","/6c55d74de82b7eee7127c3e2d4939b1f.jpg","/933503ea823535235e8159f65709292f.jpg","/ea82d2834f062ee8d73d8b99aebe0d31.jpg"]),
      0
    ]
  );

  // Hero Metrics table migration
  console.log("Dropping old hero_metrics table if exists...");
  await connection.query('DROP TABLE IF EXISTS `hero_metrics`');
  console.log("Creating hero_metrics table...");
  await connection.query(
    'CREATE TABLE `hero_metrics` (`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `value` VARCHAR(255), `titleEn` VARCHAR(255), `titleBn` VARCHAR(255), `descEn` VARCHAR(255), `descBn` VARCHAR(255), `_sort_order` DOUBLE) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
  );
  console.log("Seeding hero_metrics table...");
  const heroMetricsData = [
    {value:"99.9%", titleEn:"Guaranteed Uptime", titleBn:"গ্যারান্টিড আপটাইম", descEn:"Redundant upstream connections", descBn:"অতিরিক্ত আপস্ট্রিম সংযোগ", _sort_order:0},
    {value:"2,000+", titleEn:"Active Clients", titleBn:"সক্রিয় গ্রাহক", descEn:"Trusted by homes & businesses", descBn:"বাসা ও ব্যবসার বিশ্বস্ত অংশীদার", _sort_order:1},
    {value:"10+", titleEn:"Cities Served", titleBn:"পরিষেবা এলাকা", descEn:"Across South Keraniganj", descBn:"দক্ষিণ কেরানীগঞ্জ জুড়ে", _sort_order:2},
    {value:"24/7", titleEn:"Support Response", titleBn:"সহায়তা প্রতিক্রিয়া", descEn:"Expert technical field support", descBn:"দক্ষ টেকনিক্যাল ফিল্ড সাপোর্ট", _sort_order:3}
  ];
  for (const m of heroMetricsData) {
    await connection.query(
      'INSERT INTO `hero_metrics` (`value`, `titleEn`, `titleBn`, `descEn`, `descBn`, `_sort_order`) VALUES (?, ?, ?, ?, ?, ?)',
      [m.value, m.titleEn, m.titleBn, m.descEn, m.descBn, m._sort_order]
    );
  }

  await connection.end();
})();
