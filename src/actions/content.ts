"use server";

import pool from "@/lib/db";

/**
 * Fetch a JSON setting by its key
 */
export async function getSetting(key: string): Promise<unknown> {
  try {
    const [rows] = await pool.query<import('mysql2').RowDataPacket[]>(
      'SELECT data FROM site_settings WHERE id = ?',
      [key]
    );
    if (rows && rows.length > 0) {
      const data = rows[0].data;
      if (typeof data === 'string') {
        try {
          return JSON.parse(data);
        } catch {
          return data;
        }
      }
      return data;
    }
    return null;
  } catch (error) {
    console.error("Database error fetching setting:", key, error);
    return null;
  }
}

/**
 * Update or insert a JSON setting by its key
 */
export async function setSetting(key: string, data: unknown): Promise<boolean> {
  try {
    const jsonData = JSON.stringify(data);
    await pool.query(
      'INSERT INTO site_settings (id, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = ?',
      [key, jsonData, jsonData]
    );
    return true;
  } catch (error) {
    console.error("Database error updating setting:", key, error);
    return false;
  }
}
