import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'm_amin_network',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Auto-create site_settings table if it doesn't exist
(async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id VARCHAR(255) PRIMARY KEY,
        data JSON NOT NULL
      )
    `);
    connection.release();
    console.log("Database tables verified/created successfully.");
  } catch (error) {
    console.error("Failed to verify/create database tables:", error);
  }
})();

export default pool;
