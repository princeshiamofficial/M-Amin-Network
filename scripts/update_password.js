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
    port: parseInt(process.env.DB_PORT || '3306', 10)
  });

  console.log("Connected to database:", process.env.DB_NAME);

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
    if (err.code === 'ER_DUP_COLUMN_NAME') {
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

  await connection.end();
})();
