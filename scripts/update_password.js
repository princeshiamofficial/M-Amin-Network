const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

(async () => {
  // Parse .env manually
  const envPath = path.join(__dirname, '..', '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const config = {};
  
  envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      config[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
  });

  const connection = await mysql.createConnection({
    host: config.DB_HOST || 'localhost',
    user: config.DB_USER || 'root',
    password: config.DB_PASSWORD || '',
    database: config.DB_NAME || 'm_amin_network',
    port: parseInt(config.DB_PORT || '3306', 10)
  });

  console.log("Connected to database:", config.DB_NAME);

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
