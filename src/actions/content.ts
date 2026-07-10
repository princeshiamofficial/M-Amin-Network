"use server";

import pool from "@/lib/db";
import fs from "fs";
import path from "path";

function logDbError(action: string, key: string, error: any) {
  const logMsg = `[${new Date().toISOString()}] Action: ${action}, Key: ${key}\nError: ${error?.message || error}\nStack: ${error?.stack}\n\n`;
  try {
    fs.appendFileSync(path.join(process.cwd(), "db_error.log"), logMsg);
  } catch (e) {
    console.error("Failed to write to db_error.log", e);
  }
}

/**
 * Fetch a setting (either legacy JSON, or from its dedicated table)
 */
export async function getSetting(key: string): Promise<unknown> {
  try {
    const [metaRows]: any = await pool.query('SELECT data FROM site_settings WHERE id = ?', [key]);
    
    let isArray = false;
    let isDynamicTable = false;
    let legacyData = null;
    
    if (metaRows && metaRows.length > 0) {
      const dataStr = metaRows[0].data;
      if (dataStr === '{"__meta_type":"array"}') {
        isArray = true;
        isDynamicTable = true;
      } else if (dataStr === '{"__meta_type":"object"}') {
        isArray = false;
        isDynamicTable = true;
      } else {
        // Legacy JSON string or primitive
        try {
          legacyData = JSON.parse(dataStr);
        } catch {
          legacyData = dataStr;
        }
      }
    }
    
    const tableName = key.startsWith("m_amin_") ? key.replace("m_amin_", "") : key;
    
    if (isDynamicTable) {
      try {
        const [rows]: any = await pool.query(`SELECT * FROM \`${tableName}\``);
        const parsedRows = (rows as any[]).map(row => {
          const newRow: any = {};
          for (const [k, v] of Object.entries(row)) {
            // Exclude our internal auto-generated key if it wasn't requested
            if (k === '_auto_id') continue;
            
            if (typeof v === 'string' && (v.startsWith('{') || v.startsWith('['))) {
              try { newRow[k] = JSON.parse(v); } catch { newRow[k] = v; }
            } else {
              newRow[k] = v;
            }
          }
          return newRow;
        });
        return isArray ? parsedRows : (parsedRows[0] || null);
      } catch (e: any) {
        if (e.code === 'ER_NO_SUCH_TABLE') {
          return isArray ? [] : null;
        }
        logDbError("getSetting SELECT", key, e);
        throw e;
      }
    }
    
    return legacyData;
  } catch (error) {
    console.error("Database error fetching setting:", key, error);
    logDbError("getSetting", key, error);
    return null;
  }
}

/**
 * Update or insert a setting (dynamically auto-creating tables)
 */
export async function setSetting(key: string, data: unknown): Promise<boolean> {
  try {
    if (data === null || typeof data !== 'object') {
      const jsonData = JSON.stringify(data);
      await pool.query(
        'INSERT INTO site_settings (id, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = ?',
        [key, jsonData, jsonData]
      );
      return true;
    }

    const isArray = Array.isArray(data);
    const metaData = JSON.stringify({ __meta_type: isArray ? "array" : "object" });
    await pool.query(
      'INSERT INTO site_settings (id, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = ?',
      [key, metaData, metaData]
    );

    const tableName = key.startsWith("m_amin_") ? key.replace("m_amin_", "") : key;

    const items = isArray ? (data as any[]) : [data];

    if (items.length > 0 && items[0] && typeof items[0] === 'object') {
      const sample = items[0];
      
      try {
        await pool.query(`SELECT 1 FROM \`${tableName}\` LIMIT 1`);
        // Check columns
        const [cols]: any = await pool.query(`SHOW COLUMNS FROM \`${tableName}\``);
        const existingCols = cols.map((c: any) => c.Field);
        
        for (const k of Object.keys(sample)) {
          if (!existingCols.includes(k)) {
            let type = 'LONGTEXT';
            if (typeof sample[k] === 'number') type = 'DOUBLE';
            else if (typeof sample[k] === 'boolean') type = 'BOOLEAN';
            await pool.query(`ALTER TABLE \`${tableName}\` ADD COLUMN \`${k}\` ${type}`);
          }
        }
      } catch (e: any) {
        if (e.code === 'ER_NO_SUCH_TABLE') {
          const colDefs = Object.keys(sample).map(k => {
             let type = 'LONGTEXT';
             if (typeof sample[k] === 'number') type = 'DOUBLE';
             else if (typeof sample[k] === 'boolean') type = 'BOOLEAN';
             if (k === 'id') type = 'VARCHAR(255) PRIMARY KEY';
             return `\`${k}\` ${type}`;
          });
          
          if (!Object.keys(sample).includes('id')) {
            colDefs.unshift('`_auto_id` INT AUTO_INCREMENT PRIMARY KEY');
          }
          
          await pool.query(`CREATE TABLE \`${tableName}\` (${colDefs.join(', ')})`);
        } else {
          logDbError("setSetting CREATE/ALTER", key, e);
          throw e;
        }
      }
      
      await pool.query(`DELETE FROM \`${tableName}\``);
      
      for (const item of items) {
        if (!item || typeof item !== 'object') continue;
        const keys = Object.keys(item);
        if (keys.length === 0) continue;
        
        const values = keys.map(k => {
          const val = (item as any)[k];
          if (val === undefined) return null;
          if (typeof val === 'object' && val !== null) return JSON.stringify(val);
          if (typeof val === 'boolean') return val ? 1 : 0;
          return val;
        });
        const placeholders = keys.map(() => '?').join(', ');
        await pool.query(
          `INSERT INTO \`${tableName}\` (${keys.map(k => `\`${k}\``).join(', ')}) VALUES (${placeholders})`,
          values
        );
      }
    } else if (items.length === 0) {
      try {
        await pool.query(`DELETE FROM \`${tableName}\``);
      } catch (e) {
        // Ignore if table doesn't exist
      }
    }
    
    return true;
  } catch (error) {
    console.error("Database error updating setting:", key, error);
    logDbError("setSetting", key, error);
    return false;
  }
}

