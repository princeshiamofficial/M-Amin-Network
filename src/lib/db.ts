import mysql from 'mysql2/promise';

// Prevent multiple database pool allocations during Next.js hot-reloading
const globalForDb = global as unknown as { pool: mysql.Pool };
const DB_NAME = process.env.DB_NAME || 'm_amin_network';
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_CHARSET = 'utf8mb4';

const pool = globalForDb.pool || mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  charset: DB_CHARSET,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool;
}

import { initWebSocketServer } from './wsServer';
try {
  initWebSocketServer();
} catch (e) {
  console.warn("WS init failed on startup:", e);
}

const TABLES_SCHEMAS: Record<string, string> = {
  user: "`id` VARCHAR(255) PRIMARY KEY, `username` VARCHAR(255), `email` VARCHAR(255), `role` VARCHAR(255), `password_hash` VARCHAR(255), `_sort_order` DOUBLE",
  users: "`id` VARCHAR(255) PRIMARY KEY, `username` VARCHAR(255), `role` VARCHAR(255), `email` VARCHAR(255), `lastLogin` VARCHAR(255), `_sort_order` DOUBLE",
  admin_roles: "`id` VARCHAR(255) PRIMARY KEY, `name` VARCHAR(255), `description` TEXT, `pageAccess` LONGTEXT, `_sort_order` DOUBLE",
  claims: "`id` VARCHAR(255) PRIMARY KEY, `name` VARCHAR(255), `phone` VARCHAR(255), `address` TEXT, `promoCode` VARCHAR(255), `promoTitle` VARCHAR(255), `date` VARCHAR(255), `status` VARCHAR(255), `_sort_order` DOUBLE",
  complaints: "`id` VARCHAR(255) PRIMARY KEY, `clientId` VARCHAR(255), `name` VARCHAR(255), `phone` VARCHAR(255), `category` VARCHAR(255), `desc` TEXT, `date` VARCHAR(255), `status` VARCHAR(255), `_sort_order` DOUBLE",
  tickets: "`id` VARCHAR(255) PRIMARY KEY, `clientId` VARCHAR(255), `name` VARCHAR(255), `phone` VARCHAR(255), `category` VARCHAR(255), `desc` TEXT, `date` VARCHAR(255), `status` VARCHAR(255), `_sort_order` DOUBLE",
  payments: "`id` VARCHAR(255) PRIMARY KEY, `clientId` VARCHAR(255), `name` VARCHAR(255), `phone` VARCHAR(255), `packageName` VARCHAR(255), `amount` DOUBLE, `method` VARCHAR(255), `status` VARCHAR(255), `date` VARCHAR(255), `_sort_order` DOUBLE",
  contact_submissions: "`id` VARCHAR(255) PRIMARY KEY, `name` VARCHAR(255), `email` VARCHAR(255), `phone` VARCHAR(255), `subject` VARCHAR(255), `message` TEXT, `date` VARCHAR(255), `_sort_order` DOUBLE",
  jobs: "`id` VARCHAR(255) PRIMARY KEY, `title` VARCHAR(255), `department` VARCHAR(255), `type` VARCHAR(255), `location` VARCHAR(255), `status` VARCHAR(255), `date` VARCHAR(255), `_sort_order` DOUBLE",
  job_applications: "`id` VARCHAR(255) PRIMARY KEY, `jobTitle` VARCHAR(255), `applicantName` VARCHAR(255), `applicantEmail` VARCHAR(255), `applicantPhone` VARCHAR(255), `cvUrl` VARCHAR(255), `status` VARCHAR(255), `date` VARCHAR(255), `_sort_order` DOUBLE",
  testimonials: "`id` VARCHAR(255) PRIMARY KEY, `author` VARCHAR(255), `designation` VARCHAR(255), `rating` DOUBLE, `comment` TEXT, `avatar` VARCHAR(255), `_sort_order` DOUBLE",
  faqs: "`id` VARCHAR(255) PRIMARY KEY, `question` VARCHAR(255), `answer` TEXT, `isPublished` BOOLEAN, `_sort_order` DOUBLE",
  service_highlights: "`id` VARCHAR(255) PRIMARY KEY, `title` VARCHAR(255), `description` TEXT, `_sort_order` DOUBLE",
  service_reviews: "`id` VARCHAR(255) PRIMARY KEY, `author` VARCHAR(255), `rating` DOUBLE, `comment` TEXT, `_sort_order` DOUBLE",
  security_logs: "`id` VARCHAR(255) PRIMARY KEY, `event` VARCHAR(255), `ipAddress` VARCHAR(255), `timestamp` VARCHAR(255), `severity` VARCHAR(255), `_sort_order` DOUBLE",
  seo_audits: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `page` VARCHAR(255), `score` DOUBLE, `ssl` BOOLEAN, `mobileFriendly` BOOLEAN, `_sort_order` DOUBLE",
  dashboard_shortcuts: "`id` VARCHAR(255) PRIMARY KEY, `label` VARCHAR(255), `targetTab` VARCHAR(255), `_sort_order` DOUBLE",
  quick_actions: "`id` VARCHAR(255) PRIMARY KEY, `label` VARCHAR(255), `path` VARCHAR(255), `route` VARCHAR(255), `iconName` VARCHAR(255), `bg` VARCHAR(255), `text` VARCHAR(255), `_sort_order` DOUBLE",
  packages_list: "`id` VARCHAR(255) PRIMARY KEY, `name` VARCHAR(255), `speed` VARCHAR(255), `price` DOUBLE, `features` TEXT, `popular` BOOLEAN, `category` VARCHAR(255), `tagline` VARCHAR(255), `_sort_order` DOUBLE",
  promo_offers: "`code` VARCHAR(255) PRIMARY KEY, `title` VARCHAR(255), `badge` VARCHAR(255), `badgeColor` VARCHAR(255), `details` TEXT, `validUntil` VARCHAR(255), `imageUrl` VARCHAR(255), `_sort_order` DOUBLE",
  coverage_zones: "`id` VARCHAR(255) PRIMARY KEY, `name` VARCHAR(255), `status` VARCHAR(255), `subAreas` TEXT, `_sort_order` DOUBLE",
  package_requests: "`id` VARCHAR(255) PRIMARY KEY, `name` VARCHAR(255), `phone` VARCHAR(255), `email` VARCHAR(255), `zone` VARCHAR(255), `price` DOUBLE, `address` TEXT, `planName` VARCHAR(255), `speed` VARCHAR(255), `status` VARCHAR(255), `date` VARCHAR(255), `referralCode` VARCHAR(255), `_sort_order` DOUBLE",
  service_cards: "`id` VARCHAR(255) PRIMARY KEY, `title` VARCHAR(255), `description` TEXT, `icon` VARCHAR(255), `_sort_order` DOUBLE",
  system_config: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `peeringBandwidthLimit` VARCHAR(255), `maintenanceMode` BOOLEAN, `maintenanceMessage` TEXT, `popupEnabled` BOOLEAN, `popupImage` LONGTEXT, `_sort_order` DOUBLE",
  site_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `siteTitle` VARCHAR(255), `hotline` VARCHAR(255), `supportEmail` VARCHAR(255), `address` TEXT, `_sort_order` DOUBLE",
  hero_typography: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `mainTitle` TEXT, `subtitle` TEXT, `slides` TEXT, `_sort_order` DOUBLE",
  hero_metrics: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `value` VARCHAR(255), `titleEn` VARCHAR(255), `titleBn` VARCHAR(255), `descEn` VARCHAR(255), `descBn` VARCHAR(255), `_sort_order` DOUBLE",
  offers_page_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(255), `subtitle` TEXT, `_sort_order` DOUBLE",
  footer_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `aboutText` TEXT, `hotline` VARCHAR(255), `email` VARCHAR(255), `address` TEXT, `facebook` VARCHAR(255), `youtube` VARCHAR(255), `_sort_order` DOUBLE",
  footer_phones: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `value` VARCHAR(255), `_sort_order` DOUBLE",
  bill_payment_page_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `instructionTitle` VARCHAR(255), `instructionText` TEXT, `_sort_order` DOUBLE",
  support_page_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(255), `subtitle` TEXT, `_sort_order` DOUBLE",
  portal_page_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(255), `subtitle` TEXT, `_sort_order` DOUBLE",
  about_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `storyTitle` VARCHAR(255), `storyBody` TEXT, `_sort_order` DOUBLE",
  contact_content: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(255), `subtitle` TEXT, `_sort_order` DOUBLE",
  complaint_content_guidelines: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `title` VARCHAR(255), `body` TEXT, `_sort_order` DOUBLE",
  network_features: "`id` VARCHAR(255) PRIMARY KEY, `titleEn` VARCHAR(255), `titleBn` VARCHAR(500), `descEn` TEXT, `descBn` TEXT, `iconName` VARCHAR(255), `_sort_order` DOUBLE",
  page_headers: "`_auto_id` INT AUTO_INCREMENT PRIMARY KEY, `packages_bg` VARCHAR(500), `packages_title_en` VARCHAR(255), `packages_title_bn` VARCHAR(255), `packages_title_highlight_en` VARCHAR(255), `packages_title_highlight_bn` VARCHAR(255), `packages_subtitle_en` TEXT, `packages_subtitle_bn` TEXT, `offers_bg` VARCHAR(500), `offers_title_en` VARCHAR(255), `offers_title_bn` VARCHAR(255), `offers_title_highlight_en` VARCHAR(255), `offers_title_highlight_bn` VARCHAR(255), `offers_subtitle_en` TEXT, `offers_subtitle_bn` TEXT, `coverage_bg` VARCHAR(500), `coverage_title_en` VARCHAR(255), `coverage_title_bn` VARCHAR(255), `coverage_title_highlight_en` VARCHAR(255), `coverage_title_highlight_bn` VARCHAR(255), `coverage_subtitle_en` TEXT, `coverage_subtitle_bn` TEXT, `multimedia_bg` VARCHAR(500), `multimedia_title_en` VARCHAR(255), `multimedia_title_bn` VARCHAR(255), `multimedia_title_highlight_en` VARCHAR(255), `multimedia_title_highlight_bn` VARCHAR(255), `multimedia_subtitle_en` TEXT, `multimedia_subtitle_bn` TEXT, `careers_bg` VARCHAR(500), `careers_title_en` VARCHAR(255), `careers_title_bn` VARCHAR(255), `careers_title_highlight_en` VARCHAR(255), `careers_title_highlight_bn` VARCHAR(255), `careers_subtitle_en` TEXT, `careers_subtitle_bn` TEXT, `_sort_order` DOUBLE"
};

const SEED_DATA: Record<string, Record<string, unknown>[]> = {
  user: [
    { id: "USR-1", username: "admin", email: "admin@mamin.net", role: "Super Administrator", password_hash: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9", _sort_order: 0 }
  ],
  users: [
    { id: "USR-1", username: "admin", role: "Super Administrator", email: "admin@maminnetwork.test", lastLogin: "7/3/2026, 10:30 AM", _sort_order: 0 },
    { id: "USR-2", username: "moderator_support", role: "Support Staff", email: "support@maminnetwork.test", lastLogin: "7/2/2026, 04:15 PM", _sort_order: 1 }
  ],
  admin_roles: [
    { id: "ROLE-1", name: "Super Administrator", description: "Full dashboard access with all management permissions.", pageAccess: "[]", _sort_order: 0 },
    { id: "ROLE-2", name: "Support Staff", description: "Support desk access for customer communication and issue handling.", pageAccess: "[]", _sort_order: 1 }
  ],
  claims: [
    { id: "CLM-72648-2849", name: "Mehan Ahmed", phone: "01707009267", address: "House 12, Road 4, Kadomtoli, South Keraniganj", promoCode: "ANNUAL10", promoTitle: "Pay 10 Months, Get 12", date: "7/2/2026, 11:34 AM", status: "Pending", _sort_order: 0 },
    { id: "CLM-19472-8829", name: "Nasrin Sultana", phone: "01819284920", address: "Block C, Bashundhara R/A, South Keraniganj", promoCode: "FREEINSTALL2026", promoTitle: "Zero Installation Fee", date: "7/2/2026, 2:15 PM", status: "Approved", _sort_order: 1 }
  ],
  package_requests: [
    { id: "REQ-88293-1920", name: "Mehan Ahmed", phone: "01707009267", email: "mehan@mamin.net", zone: "Kadomtoli", price: 1250, address: "House No. 12, Road 4, Kadomtoli, South Keraniganj", planName: "Enterprise Splice", speed: "100 Mbps", status: "Pending", date: "7/5/2026, 11:34 AM", referralCode: "N/A", _sort_order: 0 },
    { id: "REQ-19402-2849", name: "Kamrul Hasan", phone: "01812345678", email: "kamrul@gmail.com", zone: "Aganagar", price: 800, address: "Lane 2, Block A, Aganagar, South Keraniganj", planName: "Home Standard", speed: "20 Mbps", status: "Completed", date: "7/4/2026, 4:15 PM", referralCode: "N/A", _sort_order: 1 }
  ],
  complaints: [
    { id: "CMP-88239-1102", clientId: "SUB-88293", name: "Mehan Ahmed", phone: "01707009267", category: "Billing Dispute", desc: "Charged double for the standard premium plan subscription this month without notice.", date: "7/2/2026, 1:44 PM", status: "Pending", _sort_order: 0 },
    { id: "CMP-38492-9903", clientId: "SUB-19402", name: "Sheikh Nabil", phone: "01928492049", category: "Frequent Disconnections", desc: "Fiber optic connection drops out every 10 minutes in Kadomtoli area.", date: "7/2/2026, 4:50 PM", status: "Investigating", _sort_order: 1 }
  ],
  tickets: [
    { id: "TCK-19482-9902", clientId: "SUB-88293", name: "Mehan Ahmed", phone: "01707009267", category: "Hardware", desc: "ONU device power indicator is red, no optical signal received.", date: "7/2/2026, 3:12 PM", status: "Open", _sort_order: 0 }
  ],
  payments: [
    { id: "TXN-99883-29402", clientId: "SUB-88293", name: "Mehan Ahmed", phone: "01707009267", packageName: "Premium Home", amount: 1250, method: "bKash", status: "Success", date: "7/2/2026, 12:30 PM", _sort_order: 0 },
    { id: "TXN-12049-88392", clientId: "SUB-19402", name: "Sheikh Nabil", phone: "01928492049", packageName: "Standard Starter", amount: 800, method: "Nagad", status: "Success", date: "7/2/2026, 4:12 PM", _sort_order: 1 }
  ],
  contact_submissions: [
    { id: "MSG-00192-2849", name: "Rashedul Karim", email: "rashed@gmail.com", phone: "01712345678", subject: "Corporate Pricing Query", message: "Please send corporate peering rates for a 100Mbps dedicated splice link in Aganagar.", date: "7/2/2026, 10:15 AM", _sort_order: 0 }
  ],
  jobs: [
    { id: "JOB-001", title: "Network Support Engineer", department: "Technical Operations", type: "Full-Time", location: "South Keraniganj", status: "Open", date: "7/1/2026", _sort_order: 0 },
    { id: "JOB-002", title: "Fiber Splicer Technician", department: "Field Infrastructure", type: "Full-Time", location: "Field Office", status: "Open", date: "7/2/2026", _sort_order: 1 }
  ],
  job_applications: [
    { id: "APP-4829", jobTitle: "Network Support Engineer", applicantName: "Mehedi Hasan", applicantEmail: "mehedi@gmail.com", applicantPhone: "01728394012", cvUrl: "/resumes/mehedi.pdf", status: "Reviewing", date: "7/2/2026, 11:34 AM", _sort_order: 0 }
  ],
  faqs: [
    { id: "FAQ-001", question: "How long does it take to get a new optical fiber connection?", answer: "Address checks and fiber connection setup generally take 24 to 48 working hours depending on location availability.", isPublished: true, _sort_order: 0 },
    { id: "FAQ-002", question: "Do you provide dedicated IPs for home connections?", answer: "Yes, we offer fully redundant peering connections for businesses and corporations in Southern Keraniganj.", isPublished: true, _sort_order: 1 }
  ],
  service_highlights: [
    { id: "SRV-1", title: "Dedicated GGC/SNA Peering Cache", description: "Direct connectivity to YouTube and Facebook caches for buffer-free delivery.", _sort_order: 0 },
    { id: "SRV-2", title: "Optical Fiber SLA Gateway", description: "Redundant link pathways keeping fiber uptime metrics above BTRC rules.", _sort_order: 1 }
  ],
  service_reviews: [
    { id: "REV-1", author: "Kamrul Islam", rating: 5, comment: "Zero latency during midnight working slots, highly recommended!", _sort_order: 0 }
  ],
  security_logs: [
    { id: "LOG-1", event: "Super Admin Session Authenticated", ipAddress: "192.168.1.50", timestamp: "7/3/2026, 10:30 AM", severity: "Info", _sort_order: 0 },
    { id: "LOG-2", event: "Failed Authentication Attempt", ipAddress: "203.0.113.88", timestamp: "7/2/2026, 04:15 PM", severity: "Warning", _sort_order: 1 }
  ],
  seo_audits: [
    { page: "Homepage (/) ", score: 98, ssl: true, mobileFriendly: true, _sort_order: 0 },
    { page: "Packages (/packages)", score: 95, ssl: true, mobileFriendly: true, _sort_order: 1 }
  ],
  dashboard_shortcuts: [
    { id: "SC-1", label: "Grievances Queue", targetTab: "Complaints", _sort_order: 0 },
    { id: "SC-2", label: "Transactions Log", targetTab: "Bills", _sort_order: 1 },
    { id: "SC-3", label: "Openings (Jobs)", targetTab: "Jobs", _sort_order: 2 }
  ],
  footer_phones: [
    { value: "+880 1707-009267", _sort_order: 0 }
  ],
  quick_actions: [
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
    { id: "qa-13", label: "Hero Typography", path: "/admin/hero-typography", route: "/admin/hero-typography", iconName: "Type", bg: "bg-cyan-50", text: "text-cyan-600", _sort_order: 12 },
    { id: "qa-14", label: "About Page", path: "/admin/about", route: "/admin/about-page", iconName: "Info", bg: "bg-lime-50", text: "text-lime-600", _sort_order: 13 },
    { id: "qa-15", label: "Contact Page", path: "/admin/contact-page", route: "/admin/contact-page", iconName: "Phone", bg: "bg-rose-50", text: "text-rose-600", _sort_order: 14 },
    { id: "qa-16", label: "Top Bar & Footer", path: "/admin/layout", route: "/admin/topbar-footer", iconName: "PanelTop", bg: "bg-slate-100", text: "text-slate-600", _sort_order: 15 },
    { id: "qa-17", label: "Multimedia", path: "/admin/services", route: "/admin/services-hub", iconName: "Tv2", bg: "bg-purple-50", text: "text-purple-600", _sort_order: 16 },
    { id: "qa-18", label: "Settings", path: "/admin/settings", route: "/admin/settings", iconName: "Settings", bg: "bg-gray-100", text: "text-gray-600", _sort_order: 17 },
    { id: "qa-19", label: "Manage User", path: "/admin/users", route: "/admin/manage-user", iconName: "UserCog", bg: "bg-blue-50", text: "text-blue-700", _sort_order: 18 }
  ],
  packages_list: [
    { id: "plan-1", name: "Eco Starter", speed: "10 Mbps", price: 500, features: ["Unlimited Data", "24/7 Support", "Ideal for 1-2 devices"], popular: false, category: "home", tagline: "Great for casual browsing & SD streaming", _sort_order: 0 },
    { id: "plan-2", name: "Standard Home", speed: "20 Mbps", price: 800, features: ["Unlimited Data", "Youtube Cache", "Best for family"], popular: true, category: "home", tagline: "Perfect for families & HD streaming", _sort_order: 1 },
    { id: "plan-3", name: "Premium Splice", speed: "50 Mbps", price: 1500, features: ["Dedicated Core", "Real IP Included", "Priority Support"], popular: false, category: "corporate", tagline: "Symmetric bandwidth for small businesses", _sort_order: 2 }
  ],
  promo_offers: [
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
  ],
  coverage_zones: [
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
  ],
  service_cards: [
    { id: "card-1", title: "Broadband Internet", description: "High-speed stable fiber internet for homes and offices.", icon: "Wifi", _sort_order: 0 },
    { id: "card-2", title: "Corporate Splice", description: "Dedicated redundant connectivity for critical systems.", icon: "Activity", _sort_order: 1 }
  ],
  system_config: [
    {
      peeringBandwidthLimit: "10 Gbps",
      maintenanceMode: false,
      maintenanceMessage: "M-Amin Network is currently undergoing scheduled backend fiber infrastructure upgrades. We will be back online shortly.",
      popupEnabled: true,
      popupImage: "/popup.webp",
      _sort_order: 0
    }
  ],
  site_content: [
    { siteTitle: "M Amin Network | Best Broadband ISP in South Keraniganj, Dhaka", hotline: "+880 1707 009267", supportEmail: "support@maminnetwork.com", address: "Kadomtoli, South Keraniganj, Dhaka", _sort_order: 0 }
  ],
  hero_typography: [
    { mainTitle: "Blazing Fast Fiber | Internet in Keraniganj", subtitle: "M Amin Network (AS150164) is South Keraniganj's leading ISP, offering high-speed, SLA-backed stable internet with dedicated routing.", slides: JSON.stringify(["/28ca5e1d52c944ebfc4dd9f2b300980d.jpg","/6c55d74de82b7eee7127c3e2d4939b1f.jpg","/933503ea823535235e8159f65709292f.jpg","/ea82d2834f062ee8d73d8b99aebe0d31.jpg"]), _sort_order: 0 }
  ],
  hero_metrics: [
    { value: "99.9%", titleEn: "Guaranteed Uptime", titleBn: "গ্যারান্টিড আপটাইম", descEn: "Redundant upstream connections", descBn: "অতিরিক্ত আপস্ট্রিম সংযোগ", _sort_order: 0 },
    { value: "2,000+", titleEn: "Active Clients", titleBn: "সক্রিয় গ্রাহক", descEn: "Trusted by homes & businesses", descBn: "বাসা ও ব্যবসার বিশ্বস্ত অংশীদার", _sort_order: 1 },
    { value: "10+", titleEn: "Cities Served", titleBn: "পরিষেবা এলাকা", descEn: "Across South Keraniganj", descBn: "দক্ষিণ কেরানীগঞ্জ জুড়ে", _sort_order: 2 },
    { value: "24/7", titleEn: "Support Response", titleBn: "সহায়তা প্রতিক্রিয়া", descEn: "Expert technical field support", descBn: "দক্ষ টেকনিক্যাল ফিল্ড সাপোর্ট", _sort_order: 3 }
  ],
  offers_page_content: [
    { title: "Monsoon Campaigns & Discounts", subtitle: "Unlock high-speed splicing broadband peering plans at zero installation fees.", _sort_order: 0 }
  ],
  footer_content: [
    { aboutText: "M-Amin Network is a leading ISP providing optical fiber internet services in South Keraniganj, Dhaka.", hotline: "+880 1707 009267", email: "info@maminnetwork.com", address: "Kadomtoli, South Keraniganj, Dhaka", facebook: "https://facebook.com/maminnetwork", youtube: "https://youtube.com/maminnetwork", _sort_order: 0 }
  ],
  bill_payment_page_content: [
    { instructionTitle: "Easy Bill Payment Gateway Instructions", instructionText: "Dial *247# or open bKash / Nagad App, choose Pay Bill, select M-Amin Network, enter your Subscriber ID and complete payment.", _sort_order: 0 }
  ],
  support_page_content: [
    { title: "Splicing Core Help Desk", subtitle: "Open a ticket or submit a complaint. Our NOC engineers are active 24/7.", _sort_order: 0 }
  ],
  portal_page_content: [
    { title: "Subscriber Splicing Portal", subtitle: "Monitor your active internet packages, check billing history, and pay online.", _sort_order: 0 }
  ],
  about_content: [
    { storyTitle: "Redefining Connectivity Since 2018", storyBody: "M-Amin Network started with a vision to provide stable, affordable broadband internet to every household in South Keraniganj. Today, we are proud to serve over 1,500 active subscribers.", _sort_order: 0 }
  ],
  contact_content: [
    { title: "Get In Touch With Our NOC Office", subtitle: "Reach out for home broadband setup, corporate splice queries, or local support.", _sort_order: 0 }
  ],
  complaint_content_guidelines: [
    { title: "BTRC Internet Complaint Desk", body: "Under BTRC guidelines, you can report direct splicing issues or SLA dispute reports to our NOC team for instant resolving.", _sort_order: 0 }
  ],
  network_features: [
    { id: "nf-1", titleEn: "100% Fiber Optic (FTTH)", titleBn: "১০০% ফাইবার অপটিক (FTTH)", descEn: "Pure optical fiber direct to your home. No copper line degradation, providing immune connectivity to atmospheric interference and electrical storms.", descBn: "সরাসরি আপনার বাসায় বিশুদ্ধ অপটিক্যাল ফাইবার। কোনো তামার তারের অবনতি নেই, যা বায়ুমণ্ডলীয় হস্তক্ষেপ ও বজ্রপাত থেকে নিরাপদ সংযোগ প্রদান করে।", iconName: "Zap", _sort_order: 0 },
    { id: "nf-2", titleEn: "Dedicated BGP Routing", titleBn: "ডেডিকেটেড বিজিপি রাউটিং", descEn: "Operating AS150164 enables smart routing policies. We peer directly with BDIX, GGC (Google), SNA (Facebook), and major localized content delivery caches.", descBn: "AS150164 পরিচালনা আমাদের স্মার্ট রাউটিং পলিসি সক্ষম করে। আমরা সরাসরি BDIX, GGC (গুগল), SNA (ফেসবুক) এবং প্রধান লোকাল ক্যাশ সার্ভারের সাথে যুক্ত।", iconName: "Wifi", _sort_order: 1 },
    { id: "nf-3", titleEn: "Low-Ping Gamer Optimizations", titleBn: "লো-পিং গেমার অপ্টিমাইজেশান", descEn: "Specialized low-latency paths to Southeast Asia and European servers (PUBG, Free Fire, CS2, Valorant). Zero packet loss, steady pings, and jitter control.", descBn: "দক্ষিণ-পূর্ব এশিয়া ও ইউরোপীয় সার্ভারে বিশেষায়িত লো-লেটেন্সি পাথ (PUBG, Free Fire, CS2, Valorant)। শূন্য প্যাকেট লস, স্থির পিং এবং জিটার কন্ট্রোল।", iconName: "Gamepad2", _sort_order: 2 },
    { id: "nf-4", titleEn: "24/7 Priority SLA Support", titleBn: "২৪/৭ অগ্রাধিকার SLA সাপোর্ট", descEn: "No waiting for hours. Our localized support hub in South Keraniganj ensures our field technicians are dispatched to your home or office in record time.", descBn: "ঘণ্টার পর ঘণ্টা অপেক্ষা করতে হবে না। দক্ষিণ কেরানীগঞ্জে আমাদের লোকাল সাপোর্ট হাব নিশ্চিত করে যে আমাদের টেকনিশিয়ানরা রেকর্ড সময়ে আপনার বাসা বা অফিসে পৌঁছে যাবে।", iconName: "LifeBuoy", _sort_order: 3 },
    { id: "nf-5", titleEn: "BDIX & Local FTP Access", titleBn: "BDIX ও লোকাল এফটিপি অ্যাক্সেস", descEn: "Get unlimited speeds of up to 100 Mbps to localized Bangladesh Internet Exchange (BDIX) resources, local FTP server movies, live TV, and games caches.", descBn: "বাংলাদেশ ইন্টারনেট এক্সচেঞ্জ (BDIX) রিসোর্স, লোকাল এফটিপি মুভি, লাইভ টিভি এবং গেম ক্যাশে ১০০ এমবিপিএস পর্যন্ত আনলিমিটেড স্পিড পান।", iconName: "Cloud", _sort_order: 4 },
    { id: "nf-6", titleEn: "Corporate Dedicated Backup", titleBn: "কর্পোরেট ডেডিকেটেড ব্যাকআপ", descEn: "Dual backbones with auto-failover, ensuring continuous SLA-backed business operations. Static IPs, multi-router protocols, and direct client portal support.", descBn: "অটো-ফেইলওভার সহ ডুয়াল ব্যাকবোন, যা অব্যাহত SLA-সমর্থিত ব্যবসায়িক কার্যক্রম নিশ্চিত করে। স্ট্যাটিক আইপি এবং ডিরেক্ট ক্লায়েন্ট সাপোর্ট।", iconName: "Building2", _sort_order: 5 }
  ],
  page_headers: [
    {
      packages_bg: "/video/package-header.mp4",
      packages_title_en: "Flexible & Premium",
      packages_title_bn: "ফ্লেক্সিবল ও প্রিমিয়াম",
      packages_title_highlight_en: "Broadband Plans",
      packages_title_highlight_bn: "ব্রডব্যান্ড প্ল্যান",
      packages_subtitle_en: "Choose from our diverse range of fiber optic broadband connections. All plans come with unlimited volume, high-speed peers, and 24/7 technical monitoring.",
      packages_subtitle_bn: "আমাদের বিভিন্ন ফাইবার অপটিক ব্রডব্যান্ড সংযোগ থেকে বেছে নিন। সমস্ত প্ল্যানে আনলিমিটেড ভলিউম, হাই-স্পিড পিয়ার্স এবং ২৪/৭ মনিটরিং অন্তর্ভুক্ত।",
      
      offers_bg: "/offer.jpg",
      offers_title_en: "Monsoon Campaigns",
      offers_title_bn: "বর্ষা মৌসুমী ক্যাম্পেইন",
      offers_title_highlight_en: "& Discounts",
      offers_title_highlight_bn: "ও ছাড়",
      offers_subtitle_en: "Unlock high-speed splicing broadband peering plans at zero installation fees.",
      offers_subtitle_bn: "শূন্য ইনস্টলেশন ফি-তে হাই-স্পিড ব্রডব্যান্ড পিয়ারিং প্ল্যান আনলক করুন।",
      
      coverage_bg: "/coverage.jpg",
      coverage_title_en: "Active Coverage",
      coverage_title_bn: "সক্রিয় কভারেজ",
      coverage_title_highlight_en: "& Splicing Zones",
      coverage_title_highlight_bn: "ও স্প্লাইসিং জোন",
      coverage_subtitle_en: "Check if our fiber optic broadband coverage is available in your neighborhood of South Keraniganj.",
      coverage_subtitle_bn: "দক্ষিণ কেরানীগঞ্জে আপনার এলাকায় আমাদের ফাইবার অপটিক ব্রডব্যান্ড সংযোগ আছে কিনা তা পরীক্ষা করুন।",
      
      multimedia_bg: "/Multimedia.jpg",
      multimedia_title_en: "Multimedia",
      multimedia_title_bn: "মাল্টিমিডিয়া",
      multimedia_title_highlight_en: "& BDIX Portal",
      multimedia_title_highlight_bn: "ও বিডিআইএক্স পোর্টাল",
      multimedia_subtitle_en: "Access our high-speed local entertainment gateways to stream movies, play games, and watch live TV at speeds up to 100 Mbps.",
      multimedia_subtitle_bn: "মুভি স্ট্রিম করতে, গেম খেলতে এবং লাইভ টিভি দেখতে আমাদের হাই-স্পিড লোকাল বিনোদন গেটওয়েগুলো অ্যাক্সেস করুন।",
      
      careers_bg: "/footer-bg.jpg",
      careers_title_en: "Build Your Career",
      careers_title_bn: "আপনার ক্যারিয়ার গড়ুন",
      careers_title_highlight_en: "With NOC Splicers",
      careers_title_highlight_bn: "এনওসি স্প্লাইসারদের সাথে",
      careers_subtitle_en: "Explore open opportunities, engineering apprenticeships, and localized support roles at South Keraniganj.",
      careers_subtitle_bn: "দক্ষিণ কেরানীগঞ্জে আমাদের সাথে নতুন সুযোগ, ইঞ্জিনিয়ারিং শিক্ষানবিস এবং লোকাল সাপোর্ট ভূমিকা অন্বেষণ করুন।",
      
      _sort_order: 0
    }
  ]
};

function quoteIdentifier(identifier: string): string {
  return `\`${identifier.replace(/`/g, "``")}\``;
}

async function ensureDatabaseExists() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    charset: DB_CHARSET,
  });

  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${quoteIdentifier(DB_NAME)} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
  } finally {
    await connection.end();
  }
}

async function verifyAndMigrateTable(connection: mysql.PoolConnection, table: string, schema: string) {
  // 1. Create table if not exists
  await connection.query(
    `CREATE TABLE IF NOT EXISTS ${quoteIdentifier(table)} (${schema}) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );

  // 2. Fetch current columns from MySQL database
  const [columnsResult] = await connection.query<import('mysql2').RowDataPacket[]>(
    `SHOW COLUMNS FROM ${quoteIdentifier(table)}`
  );
  const existingColumns = new Set(columnsResult.map(row => row.Field.toLowerCase()));

  // 3. Parse schema definition to extract column definitions
  const columnDefs: string[] = [];
  let currentDef = "";
  let parenDepth = 0;
  for (let i = 0; i < schema.length; i++) {
    const char = schema[i];
    if (char === '(') parenDepth++;
    else if (char === ')') parenDepth--;
    
    if (char === ',' && parenDepth === 0) {
      columnDefs.push(currentDef.trim());
      currentDef = "";
    } else {
      currentDef += char;
    }
  }
  if (currentDef.trim()) {
    columnDefs.push(currentDef.trim());
  }

  // 4. Check for missing columns and run ALTER TABLE statement if needed
  for (const def of columnDefs) {
    const match = def.match(/^`?([a-zA-Z0-9_-]+)`?\s/);
    if (match) {
      const colName = match[1];
      if (!existingColumns.has(colName.toLowerCase())) {
        console.log(`Table \`${table}\` is missing column \`${colName}\`. Running ALTER TABLE migration...`);
        let alterDef = def;
        if (def.toUpperCase().includes("PRIMARY KEY")) {
          alterDef = def.replace(/PRIMARY\s+KEY/i, "");
        }
        try {
          await connection.query(`ALTER TABLE ${quoteIdentifier(table)} ADD COLUMN ${alterDef}`);
          console.log(`Successfully added column \`${colName}\` to table \`${table}\`.`);
        } catch (alterErr: unknown) {
          const err = alterErr as Error;
          console.error(`Failed to alter table \`${table}\` for column \`${colName}\`:`, err.message);
        }
      }
    }
  }
}

async function seedTableIfEmpty(connection: mysql.PoolConnection, table: string, items: Record<string, unknown>[]) {
  const [rows] = await connection.query<import('mysql2').RowDataPacket[]>(
    `SELECT 1 FROM ${quoteIdentifier(table)} LIMIT 1`
  );
  if (rows && rows.length === 0 && items.length > 0) {
    for (const item of items) {
      const keys = Object.keys(item);
      const values = keys.map(k => {
        const val = item[k];
        if (typeof val === 'object' && val !== null) return JSON.stringify(val);
        if (typeof val === 'boolean') return val ? 1 : 0;
        return val;
      });
      const placeholders = keys.map(() => '?').join(', ');
      await connection.query(
        `INSERT INTO ${quoteIdentifier(table)} (${keys.map(quoteIdentifier).join(', ')}) VALUES (${placeholders})`,
        values
      );
    }
    console.log(`Database table \`${table}\` seeded successfully with default records.`);
  }
}

// Startup table schema auto-creation and seeding
export const dbInitPromise = (async () => {
  try {
    await ensureDatabaseExists();
    const connection = await pool.getConnection();

    try {
      // Create & migrate all tables if not exist. Existing rows are preserved.
      for (const [table, schema] of Object.entries(TABLES_SCHEMAS)) {
        await verifyAndMigrateTable(connection, table, schema);
      }

      // Seed only brand-new/empty tables. Existing production data is never replaced.
      for (const [table, items] of Object.entries(SEED_DATA)) {
        await seedTableIfEmpty(connection, table, items);
      }
    } finally {
      connection.release();
    }

    console.log("All database tables verified, created, migrated and seeded successfully.");
  } catch (error) {
    console.error("Failed to verify/create/seed database tables on startup:", error);
  }
})();

export default pool;
