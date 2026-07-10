import mysql from 'mysql2/promise';

// Prevent multiple database pool allocations during Next.js hot-reloading
const globalForDb = global as unknown as { pool: mysql.Pool };

const pool = globalForDb.pool || mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'm_amin_network',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool;
}

const TABLES_SCHEMAS: Record<string, string> = {
  user: "`id` VARCHAR(255) PRIMARY KEY, `username` VARCHAR(255), `email` VARCHAR(255), `role` VARCHAR(255), `password_hash` VARCHAR(255), `_sort_order` DOUBLE",
  users: "`id` VARCHAR(255) PRIMARY KEY, `username` VARCHAR(255), `role` VARCHAR(255), `email` VARCHAR(255), `lastLogin` VARCHAR(255), `_sort_order` DOUBLE",
  claims: "`id` VARCHAR(255) PRIMARY KEY, `customerName` VARCHAR(255), `packageName` VARCHAR(255), `amount` DOUBLE, `status` VARCHAR(255), `date` VARCHAR(255), `_sort_order` DOUBLE",
  complaints: "`id` VARCHAR(255) PRIMARY KEY, `customerName` VARCHAR(255), `complainType` VARCHAR(255), `details` TEXT, `status` VARCHAR(255), `date` VARCHAR(255), `_sort_order` DOUBLE",
  tickets: "`id` VARCHAR(255) PRIMARY KEY, `customerName` VARCHAR(255), `subject` VARCHAR(255), `priority` VARCHAR(255), `status` VARCHAR(255), `date` VARCHAR(255), `_sort_order` DOUBLE",
  payments: "`id` VARCHAR(255) PRIMARY KEY, `customerName` VARCHAR(255), `packageName` VARCHAR(255), `amount` DOUBLE, `method` VARCHAR(255), `status` VARCHAR(255), `date` VARCHAR(255), `_sort_order` DOUBLE",
  contact_submissions: "`id` VARCHAR(255) PRIMARY KEY, `name` VARCHAR(255), `email` VARCHAR(255), `subject` VARCHAR(255), `message` TEXT, `date` VARCHAR(255), `_sort_order` DOUBLE",
  jobs: "`id` VARCHAR(255) PRIMARY KEY, `title` VARCHAR(255), `department` VARCHAR(255), `type` VARCHAR(255), `location` VARCHAR(255), `status` VARCHAR(255), `_sort_order` DOUBLE",
  job_applications: "`id` VARCHAR(255) PRIMARY KEY, `jobTitle` VARCHAR(255), `applicantName` VARCHAR(255), `applicantEmail` VARCHAR(255), `applicantPhone` VARCHAR(255), `cvUrl` VARCHAR(255), `status` VARCHAR(255), `date` VARCHAR(255), `_sort_order` DOUBLE",
  testimonials: "`id` VARCHAR(255) PRIMARY KEY, `author` VARCHAR(255), `designation` VARCHAR(255), `rating` DOUBLE, `comment` TEXT, `avatar` VARCHAR(255), `_sort_order` DOUBLE",
  faqs: "`id` VARCHAR(255) PRIMARY KEY, `question` VARCHAR(255), `answer` TEXT, `isPublished` BOOLEAN, `_sort_order` DOUBLE",
  service_highlights: "`id` VARCHAR(255) PRIMARY KEY, `title` VARCHAR(255), `description` TEXT, `_sort_order` DOUBLE",
  service_reviews: "`id` VARCHAR(255) PRIMARY KEY, `author` VARCHAR(255), `rating` DOUBLE, `comment` TEXT, `_sort_order` DOUBLE",
  security_logs: "`id` VARCHAR(255) PRIMARY KEY, `event` VARCHAR(255), `ipAddress` VARCHAR(255), `timestamp` VARCHAR(255), `severity` VARCHAR(255), `_sort_order` DOUBLE",
  seo_audits: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `page` VARCHAR(255), `score` DOUBLE, `ssl` BOOLEAN, `mobileFriendly` BOOLEAN, `_sort_order` DOUBLE",
  dashboard_shortcuts: "`id` VARCHAR(255) PRIMARY KEY, `label` VARCHAR(255), `targetTab` VARCHAR(255), `_sort_order` DOUBLE",
  quick_actions: "`id` VARCHAR(255) PRIMARY KEY, `label` VARCHAR(255), `path` VARCHAR(255), `route` VARCHAR(255), `iconName` VARCHAR(255), `bg` VARCHAR(255), `text` VARCHAR(255), `_sort_order` DOUBLE",
  packages_list: "`id` VARCHAR(255) PRIMARY KEY, `name` VARCHAR(255), `speed` VARCHAR(255), `price` DOUBLE, `features` TEXT, `popular` BOOLEAN, `type` VARCHAR(255), `_sort_order` DOUBLE",
  promo_offers: "`id` VARCHAR(255) PRIMARY KEY, `title` VARCHAR(255), `description` TEXT, `badge` VARCHAR(255), `discount` VARCHAR(255), `validity` VARCHAR(255), `_sort_order` DOUBLE",
  coverage_zones: "`id` VARCHAR(255) PRIMARY KEY, `area` VARCHAR(255), `district` VARCHAR(255), `status` VARCHAR(255), `_sort_order` DOUBLE",
  package_requests: "`id` VARCHAR(255) PRIMARY KEY, `packageName` VARCHAR(255), `customerName` VARCHAR(255), `phone` VARCHAR(255), `address` TEXT, `status` VARCHAR(255), `date` VARCHAR(255), `_sort_order` DOUBLE",
  service_cards: "`id` VARCHAR(255) PRIMARY KEY, `title` VARCHAR(255), `description` TEXT, `icon` VARCHAR(255), `_sort_order` DOUBLE",
  system_config: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `peeringBandwidthLimit` VARCHAR(255), `maintenanceMode` BOOLEAN, `_sort_order` DOUBLE",
  site_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `hotline` VARCHAR(255), `supportEmail` VARCHAR(255), `address` TEXT, `_sort_order` DOUBLE",
  hero_typography: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `mainTitle` TEXT, `subtitle` TEXT, `_sort_order` DOUBLE",
  hero_metrics: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `activeUsers` VARCHAR(255), `uptimePercentage` VARCHAR(255), `coverageAreas` VARCHAR(255), `_sort_order` DOUBLE",
  offers_page_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(255), `subtitle` TEXT, `_sort_order` DOUBLE",
  footer_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `aboutText` TEXT, `hotline` VARCHAR(255), `email` VARCHAR(255), `address` TEXT, `facebook` VARCHAR(255), `youtube` VARCHAR(255), `_sort_order` DOUBLE",
  bill_payment_page_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `instructionTitle` VARCHAR(255), `instructionText` TEXT, `_sort_order` DOUBLE",
  support_page_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(255), `subtitle` TEXT, `_sort_order` DOUBLE",
  portal_page_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(255), `subtitle` TEXT, `_sort_order` DOUBLE",
  about_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `storyTitle` VARCHAR(255), `storyBody` TEXT, `_sort_order` DOUBLE",
  contact_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(255), `subtitle` TEXT, `_sort_order` DOUBLE",
  complaint_content_guidelines: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(255), `body` TEXT, `_sort_order` DOUBLE"
};

// Startup table schema auto-creation and seeding
(async () => {
  try {
    const connection = await pool.getConnection();
    
    // Create all tables if not exist
    for (const [table, schema] of Object.entries(TABLES_SCHEMAS)) {
      await connection.query(`CREATE TABLE IF NOT EXISTS \`${table}\` (${schema})`);
    }

    // Seed default admin auth credentials if the user table is empty
    const [userRows]: any = await connection.query("SELECT 1 FROM `user` LIMIT 1");
    if (userRows && userRows.length === 0) {
      await connection.query(
        "INSERT INTO `user` (`id`, `username`, `email`, `role`, `password_hash`, `_sort_order`) VALUES (?, ?, ?, ?, ?, ?)",
        ["USR-1", "admin", "admin@mamin.net", "Super Administrator", "240be518fabd87c0e14e7a0bdf8d3e206b0dcc585f6778937b2d5f8101a0709b", 0]
      );
      console.log("Database user table seeded with default super administrator.");
    }

    connection.release();
    console.log("All database tables verified and created successfully.");
  } catch (error) {
    console.error("Failed to verify/create database tables on startup:", error);
  }
})();

export default pool;
