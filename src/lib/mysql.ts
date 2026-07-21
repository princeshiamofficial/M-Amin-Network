import * as mysql from 'mysql2/promise';

const globalForMysql = global as unknown as { pool: mysql.Pool };

export const DB_NAME = process.env.DB_NAME || process.env.DATABASE_NAME || 'm_amin_network';
export const DB_HOST = process.env.DB_HOST || process.env.DATABASE_HOST || '127.0.0.1';
export const DB_USER = process.env.DB_USER || process.env.DATABASE_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || process.env.DATABASE_PASSWORD || '';
export const DB_PORT = parseInt(process.env.DB_PORT || process.env.DATABASE_PORT || '3306', 10);
export const DB_CHARSET = 'utf8mb4';

export type QueryValue = string | number | boolean | Date | Buffer | null;

const pool = globalForMysql.pool || mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  charset: DB_CHARSET,
});

if (process.env.NODE_ENV !== 'production') {
  globalForMysql.pool = pool;
}

export async function query<T = unknown>(sql: string, params: QueryValue[] = []): Promise<T> {
  const [results] = await pool.execute(sql, params);
  return results as T;
}

export default pool;
