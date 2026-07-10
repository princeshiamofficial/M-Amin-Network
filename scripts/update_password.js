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
  const [result] = await connection.query(
    'UPDATE `user` SET `password_hash` = ? WHERE `username` = ? OR `email` = ?',
    [correctHash, 'admin', 'admin@mamin.net']
  );

  console.log("Update query result:", result);
  console.log("Admin credentials password hash successfully updated to correct SHA-256 hash of 'admin123'.");

  await connection.end();
})();
