"use server";

import pool from "@/lib/db";
import fs from "fs";
import path from "path";

function logDbError(action: string, key: string, error: unknown) {
  const err = error as Error & { code?: string };
  const logMsg = `[${new Date().toISOString()}] Action: ${action}, Key: ${key}\nError: ${err?.message || err}\nStack: ${err?.stack}\n\n`;
  try {
    fs.appendFileSync(path.join(process.cwd(), "db_error.log"), logMsg);
  } catch {
    console.error("Failed to write to db_error.log");
  }
}

/**
 * Fetch a setting (either legacy JSON, or from its dedicated table)
 */
export async function getSetting(key: string): Promise<unknown> {
  try {
    const [metaRows] = await pool.query<import('mysql2').RowDataPacket[]>('SELECT data FROM site_settings WHERE id = ?', [key]);
    
    let isArray = false;
    let isDynamicTable = false;
    let legacyData = null;
    
    if (metaRows && metaRows.length > 0) {
      const dataStr = metaRows[0].data as string;
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
        let rows: import('mysql2').RowDataPacket[];
        try {
          const [orderedRows] = await pool.query<import('mysql2').RowDataPacket[]>(
            `SELECT * FROM \`${tableName}\` ORDER BY \`_sort_order\` ASC`
          );
          rows = orderedRows;
        } catch {
          const [unorderedRows] = await pool.query<import('mysql2').RowDataPacket[]>(
            `SELECT * FROM \`${tableName}\``
          );
          rows = unorderedRows;
        }

        const parsedRows = rows.map(row => {
          const newRow: Record<string, unknown> = {};
          for (const [k, v] of Object.entries(row)) {
            // Exclude our internal auto-generated key if it wasn't requested
            if (k === '_auto_id' || k === '_sort_order') continue;
            
            if (typeof v === 'string' && (v.startsWith('{') || v.startsWith('['))) {
              try { newRow[k] = JSON.parse(v); } catch { newRow[k] = v; }
            } else {
              newRow[k] = v;
            }
          }
          return newRow;
        });
        return isArray ? parsedRows : (parsedRows[0] || null);
      } catch (e: unknown) {
        const err = e as { code?: string };
        if (err.code === 'ER_NO_SUCH_TABLE') {
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

    const rawItems = isArray ? (data as Record<string, unknown>[]) : [data as Record<string, unknown>];
    
    // Inject sort order to preserve insertion sequence in DB queries
    const items = rawItems.map((item, index) => {
      if (item && typeof item === 'object') {
        return { ...item, _sort_order: index };
      }
      return item;
    });

    if (items.length > 0 && items[0] && typeof items[0] === 'object') {
      const sample = items[0];
      
      try {
        await pool.query(`SELECT 1 FROM \`${tableName}\` LIMIT 1`);
        // Check columns
        const [cols] = await pool.query<import('mysql2').RowDataPacket[]>(`SHOW COLUMNS FROM \`${tableName}\``);
        const existingCols = cols.map((c) => c.Field as string);
        
        for (const k of Object.keys(sample)) {
          if (!existingCols.includes(k)) {
            let type = 'LONGTEXT';
            const val = sample[k];
            if (typeof val === 'number') type = 'DOUBLE';
            else if (typeof val === 'boolean') type = 'BOOLEAN';
            await pool.query(`ALTER TABLE \`${tableName}\` ADD COLUMN \`${k}\` ${type}`);
          }
        }
      } catch (e: unknown) {
        const err = e as { code?: string };
        if (err.code === 'ER_NO_SUCH_TABLE') {
          const colDefs = Object.keys(sample).map(k => {
             let type = 'LONGTEXT';
             const val = sample[k];
             if (typeof val === 'number') type = 'DOUBLE';
             else if (typeof val === 'boolean') type = 'BOOLEAN';
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
          const val = item[k];
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
      } catch {
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

