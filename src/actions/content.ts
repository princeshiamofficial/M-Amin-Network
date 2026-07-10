"use server";

import pool from "@/lib/db";
import fs from "fs";
import path from "path";

const OBJECT_KEYS = [
  "system_config",
  "admin_auth",
  "site_content",
  "hero_typography",
  "offers_page_content",
  "footer_content",
  "bill_payment_page_content",
  "support_page_content",
  "portal_page_content",
  "about_content",
  "contact_content",
  "complaint_content_guidelines",
  "system_config",
  "admin_auth",
  "site_content",
  "hero_typography",
  "offers_page_content",
  "footer_content",
  "bill_payment_page_content",
  "support_page_content",
  "portal_page_content",
  "about_content",
  "contact_content",
  "complaint_content_guidelines"
];

function isObjectKey(key: string): boolean {
  return OBJECT_KEYS.includes(key);
}

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
 * Fetch a setting from its dedicated table
 */
export async function getSetting(key: string): Promise<unknown> {
  try {
    let tableName = key.startsWith("") ? key.replace("", "") : key;
    
    // Map specific custom tables
    if (tableName === "admin_users" || tableName === "admin_user") {
      tableName = "users";
    }
    if (tableName === "admin_auth") {
      tableName = "user";
    }

    const isArray = !isObjectKey(key);

    try {
      let rows: import('mysql2').RowDataPacket[];
      if (isArray) {
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
      } else {
        const [objRows] = await pool.query<import('mysql2').RowDataPacket[]>(
          `SELECT * FROM \`${tableName}\` LIMIT 1`
        );
        rows = objRows;
      }

      const parsedRows = rows.map(row => {
        const newRow: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(row)) {
          // Exclude our internal auto-generated keys
          if (k === '_auto_id' || k === '_sort_order') continue;
          
          let keyName = k;
          // Map password_hash back to password property for JS compatibility
          if (tableName === "user" && k === "password_hash") {
            keyName = "password";
          }

          if (typeof v === 'string' && (v.startsWith('{') || v.startsWith('['))) {
            try { newRow[keyName] = JSON.parse(v); } catch { newRow[keyName] = v; }
          } else {
            newRow[keyName] = v;
          }
        }
        return newRow;
      });

      return isArray ? parsedRows : (parsedRows[0] || null);
    } catch (error: unknown) {
      const e = error as { code?: string };
      if (e.code === 'ER_NO_SUCH_TABLE') {
        return isArray ? [] : null;
      }
      logDbError("getSetting SELECT", key, error);
      throw error;
    }
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
    let tableName = key.startsWith("") ? key.replace("", "") : key;
    
    // Map specific custom tables
    if (tableName === "admin_users" || tableName === "admin_user") {
      tableName = "users";
    }
    if (tableName === "admin_auth") {
      tableName = "user";
    }

    if (data === null || typeof data !== 'object') {
      try {
        await pool.query(`CREATE TABLE IF NOT EXISTS \`${tableName}\` (\`value\` TEXT)`);
        await pool.query(`DELETE FROM \`${tableName}\``);
        await pool.query(`INSERT INTO \`${tableName}\` (\`value\`) VALUES (?)`, [data]);
      } catch (e) {
        logDbError("setSetting primitive", key, e);
        return false;
      }
      return true;
    }

    const isArray = Array.isArray(data);
    
    // Process input data for user/users structure mappings
    let processedData: unknown = data;
    const mapUserFields = (item: unknown): Record<string, unknown> => {
      if (!item || typeof item !== 'object') return {} as Record<string, unknown>;
      const newItem = { ...(item as Record<string, unknown>) };
      
      // If saving to user login table, enforce password_hash & role columns
      if (tableName === "user") {
        if (newItem.password !== undefined) {
          newItem.password_hash = newItem.password;
          delete newItem.password;
        }
        if (newItem.role === undefined) {
          newItem.role = "Super Administrator";
        }
      }
      return newItem;
    };

    if (isArray) {
      processedData = (data as Record<string, unknown>[]).map(mapUserFields);
    } else {
      processedData = mapUserFields(data);
    }

    const rawItems = isArray ? (processedData as Record<string, unknown>[]) : [processedData as Record<string, unknown>];
    
    // Inject sort order to preserve insertion sequence in DB queries
    const items: Record<string, unknown>[] = rawItems.map((item, index) => {
      if (item && typeof item === 'object') {
        return { ...item, _sort_order: index } as Record<string, unknown>;
      }
      return item as Record<string, unknown>;
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
            let type = 'VARCHAR(255)';
            const val = sample[k];
            if (typeof val === 'number') type = 'DOUBLE';
            else if (typeof val === 'boolean') type = 'BOOLEAN';
            else if (typeof val === 'string' && val.length > 255) type = 'TEXT';
            else if (typeof val === 'object' && val !== null) type = 'TEXT';
            await pool.query(`ALTER TABLE \`${tableName}\` ADD COLUMN \`${k}\` ${type}`);
          }
        }
      } catch (e: unknown) {
        const err = e as { code?: string };
        if (err.code === 'ER_NO_SUCH_TABLE') {
          const colDefs = Object.keys(sample).map(k => {
             let type = 'VARCHAR(255)';
             const val = sample[k];
             if (typeof val === 'number') type = 'DOUBLE';
             else if (typeof val === 'boolean') type = 'BOOLEAN';
             else if (typeof val === 'string' && val.length > 255) type = 'TEXT';
             else if (typeof val === 'object' && val !== null) type = 'TEXT';
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

