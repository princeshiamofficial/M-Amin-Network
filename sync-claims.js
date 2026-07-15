const mysql = require('mysql2/promise');
const fs = require('fs');

const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, val] = line.split('=');
  if (key && val) acc[key.trim()] = val.trim();
  return acc;
}, {});

(async () => {
  try {
    const pool = mysql.createPool({
      host: env.DB_HOST || 'localhost',
      user: env.DB_USER || 'root',
      password: env.DB_PASSWORD || '',
      database: env.DB_NAME || 'm_amin_network',
    });
    
    // Fetch package_requests
    const [reqRows] = await pool.query('SELECT * FROM `package_requests`');
    // Fetch claims
    const [claimsRows] = await pool.query('SELECT * FROM `claims`');
    
    const existingClaimIds = new Set(claimsRows.map(r => r.id));
    
    for (const reqRow of reqRows) {
      if (!existingClaimIds.has(reqRow.id)) {
        // We need to add this request to claims
        const newClaim = {
          id: reqRow.id,
          name: reqRow.name,
          phone: reqRow.phone,
          address: reqRow.address,
          promoCode: reqRow.referralCode || '',
          promoTitle: reqRow.planName + ' (' + reqRow.speed + ')',
          date: reqRow.date,
          status: reqRow.status
        };
        
        // Let's insert it
        const keys = Object.keys(newClaim);
        const placeholders = keys.map(() => '?').join(', ');
        const values = keys.map(k => newClaim[k]);
        
        await pool.query(
          `INSERT INTO \`claims\` (${keys.map(k => `\`${k}\``).join(', ')}) VALUES (${placeholders})`,
          values
        );
        console.log('Inserted claim for', reqRow.id);
      }
    }
    console.log('Migration done.');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
