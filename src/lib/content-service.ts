import 'server-only';

import pool, { dbInitPromise } from './db';
import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';

const OBJECT_KEYS = [
  "system_config",
  "admin_auth",
  "site_content",
  "site_logo",
  "hero_typography",
  "offers_page_content",
  "seo_settings",
  "footer_content",
  "bill_payment_page_content",
  "support_page_content",
  "portal_page_content",
  "about_content",
  "about_content_full",
  "contact_content",
  "contact_content_full",
  "complaint_content_guidelines",
  "topbar_content",
  "page_headers",
  "why_choose_content",
  "testimonials_content",
  "packages_content"
];

function isObjectKey(key: string): boolean {
  return OBJECT_KEYS.includes(key);
}

function getTableName(key: string): string {
  let tableName = key.startsWith("") ? key.replace("", "") : key;

  if (tableName === "admin_users" || tableName === "admin_user") {
    tableName = "users";
  }
  if (tableName === "admin_auth") {
    tableName = "user";
  }

  return tableName;
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

function getTextValue(item: Record<string, unknown>, keys: string[], fallback = ""): string {
  for (const key of keys) {
    const value = item[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return fallback;
}

function createPromoCodeFallback(item: Record<string, unknown>, index: number): string {
  const title = getTextValue(item, ["title", "campaignTitle", "campaign_title", "name"], `Offer ${index + 1}`);
  const slug = title
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${slug || "OFFER"}-${index + 1}`;
}

function ensureUniqueCode(code: string, usedCodes: Set<string>): string {
  let uniqueCode = code;
  let counter = 2;

  while (usedCodes.has(uniqueCode)) {
    uniqueCode = `${code}-${counter}`;
    counter += 1;
  }

  usedCodes.add(uniqueCode);
  return uniqueCode;
}

function normalizePromoOfferItems(items: Record<string, unknown>[]): Record<string, unknown>[] {
  const usedCodes = new Set<string>();

  return items.map((item, index) => {
    const rawCode = getTextValue(
      item,
      ["code", "promoCode", "promo_code", "couponCode", "coupon_code", "coupon"]
    ).toUpperCase();
    const code = ensureUniqueCode(rawCode || createPromoCodeFallback(item, index), usedCodes);

    return {
      ...item,
      code,
    };
  });
}

function normalizePrimitiveListItems(items: unknown[]): Record<string, unknown>[] {
  return items.map((item) => {
    if (item === null || typeof item !== "object") {
      return { value: item };
    }

    return item as Record<string, unknown>;
  });
}

export function normalizeBooleanValue(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") return !["false", "0", "off", "no"].includes(value.toLowerCase());
  return fallback;
}

function isSha256Hash(value: string): boolean {
  return /^[a-f0-9]{64}$/i.test(value);
}

export function hashPasswordServer(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

function normalizePasswordForStorage(password: unknown): unknown {
  if (typeof password !== "string") return password;
  if (!password) return password;
  return isSha256Hash(password) ? password.toLowerCase() : hashPasswordServer(password);
}

export function passwordMatchesInput(storedPassword: unknown, passwordInput: string, hashedInput: string): boolean {
  if (typeof storedPassword !== "string" || !storedPassword) return false;
  return isSha256Hash(storedPassword)
    ? storedPassword.toLowerCase() === hashedInput
    : storedPassword === passwordInput;
}

function normalizeUserCompatibilityFields(newRow: Record<string, unknown>): Record<string, unknown> {
  if (newRow.username === undefined && typeof newRow.name === "string") {
    newRow.username = newRow.name;
  }
  if (newRow.name === undefined && typeof newRow.username === "string") {
    newRow.name = newRow.username;
  }
  if (newRow.companyName === undefined && typeof newRow.company_name === "string") {
    newRow.companyName = newRow.company_name;
  }
  if (newRow.company_name === undefined && typeof newRow.companyName === "string") {
    newRow.company_name = newRow.companyName;
  }
  if (newRow.avatarUrl === undefined && typeof newRow.avatar_url === "string") {
    newRow.avatarUrl = newRow.avatar_url;
  }
  if (newRow.avatar_url === undefined && typeof newRow.avatarUrl === "string") {
    newRow.avatar_url = newRow.avatarUrl;
  }
  if (newRow.role === undefined && typeof newRow.role_id === "string") {
    newRow.role = newRow.role_id;
  }
  if (newRow.role_id === undefined && typeof newRow.role === "string") {
    newRow.role_id = newRow.role;
  }
  if (newRow.status === undefined && newRow.is_banned !== undefined) {
    newRow.status = normalizeBooleanValue(newRow.is_banned) ? "Banned" : "Active";
  }
  if (newRow.is_banned === undefined && typeof newRow.status === "string") {
    newRow.is_banned = newRow.status === "Banned";
  }

  return newRow;
}

function mapUserFields(item: unknown, tableName: string): Record<string, unknown> {
  if (!item || typeof item !== 'object') return {} as Record<string, unknown>;
  const newItem = { ...(item as Record<string, unknown>) };

  if (tableName === "user") {
    if (newItem.password !== undefined) {
      newItem.password_hash = normalizePasswordForStorage(newItem.password);
      delete newItem.password;
    }
    if (newItem.role === undefined) {
      newItem.role = "Super Administrator";
    }
  }
  if (tableName === "users") {
    normalizeUserCompatibilityFields(newItem);
    if (newItem.password !== undefined) {
      newItem.password = normalizePasswordForStorage(newItem.password);
    }
  }
  return newItem;
}

const settingCache = new Map<string, { value: unknown; expiresAt: number }>();
const CACHE_TTL_MS = 5000;

export function invalidateSettingCache(key?: string) {
  if (key) {
    settingCache.delete(key);
  } else {
    settingCache.clear();
  }
}

export async function getSettingInternal(key: string): Promise<unknown> {
  const now = Date.now();
  const cached = settingCache.get(key);
  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  await dbInitPromise;
  try {
    const tableName = getTableName(key);
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
          if (k === '_auto_id' || k === '_sort_order') continue;

          let keyName = k;
          if (tableName === "user" && k === "password_hash") {
            keyName = "password";
          }

          if (typeof v === 'string' && (v.startsWith('{') || v.startsWith('['))) {
            try { newRow[keyName] = JSON.parse(v); } catch { newRow[keyName] = v; }
          } else {
            newRow[keyName] = v;
          }
        }
        if (tableName === "users") {
          normalizeUserCompatibilityFields(newRow);
        }
        return newRow;
      });

      if (isArray && parsedRows.every((row) => {
        const keys = Object.keys(row);
        return keys.length === 1 && keys[0] === "value";
      })) {
        const resultVal = parsedRows.map((row) => row.value);
        settingCache.set(key, { value: resultVal, expiresAt: now + CACHE_TTL_MS });
        return resultVal;
      }

      const resultVal = isArray ? parsedRows : (parsedRows[0] || null);
      settingCache.set(key, { value: resultVal, expiresAt: now + CACHE_TTL_MS });
      return resultVal;
    } catch (error: unknown) {
      const e = error as { code?: string };
      if (e.code === 'ER_NO_SUCH_TABLE') {
        const emptyVal = isArray ? [] : null;
        settingCache.set(key, { value: emptyVal, expiresAt: now + CACHE_TTL_MS });
        return emptyVal;
      }
      logDbError("getSetting SELECT", key, error);
      throw error;
    }
  } catch (error) {
    console.warn("Database error fetching setting:", key, (error as Error).message);
    logDbError("getSetting", key, error);
    return null;
  }
}

export async function getSettingTableRowCount(key: string): Promise<number | null> {
  await dbInitPromise;
  const tableName = getTableName(key);
  try {
    const [rows] = await pool.query<import('mysql2').RowDataPacket[]>(
      `SELECT COUNT(*) as count FROM \`${tableName}\``
    );
    return Number(rows[0]?.count || 0);
  } catch {
    return null;
  }
}

export async function setSettingInternal(key: string, data: unknown): Promise<boolean> {
  settingCache.delete(key);
  await dbInitPromise;
  try {
    const tableName = getTableName(key);

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
    const processedData = isArray
      ? normalizePrimitiveListItems(data as unknown[]).map((item) => mapUserFields(item, tableName))
      : mapUserFields(data, tableName);

    const rawItems = isArray ? (processedData as Record<string, unknown>[]) : [processedData as Record<string, unknown>];
    const normalizedRawItems = tableName === "promo_offers" ? normalizePromoOfferItems(rawItems) : rawItems;

    const items: Record<string, unknown>[] = normalizedRawItems.map((item, index) => {
      if (item && typeof item === 'object') {
        return { ...item, _sort_order: index } as Record<string, unknown>;
      }
      return item as Record<string, unknown>;
    });

    if (items.length > 0 && items[0] && typeof items[0] === 'object') {
      const sample: Record<string, unknown> = {};
      for (const item of items) {
        if (item && typeof item === 'object') {
          for (const [k, v] of Object.entries(item)) {
            if (sample[k] === undefined || (sample[k] === null && v !== null)) {
              sample[k] = v;
            }
          }
        }
      }
      let existingCols: string[] = [];
      let colTypes: Record<string, string> = {};

      try {
        await pool.query(`SELECT 1 FROM \`${tableName}\` LIMIT 1`);
        const [cols] = await pool.query<import('mysql2').RowDataPacket[]>(`SHOW COLUMNS FROM \`${tableName}\``);
        existingCols = cols.map((c) => c.Field as string);
        colTypes = Object.fromEntries(cols.map((c) => [c.Field as string, (c.Type as string).toLowerCase()]));

        for (const k of Object.keys(sample)) {
          if (!existingCols.includes(k)) {
            let type = 'TEXT';
            const val = sample[k];
            if (typeof val === 'number') type = 'DOUBLE';
            else if (typeof val === 'boolean') type = 'BOOLEAN';
            else if (k === 'id') type = 'VARCHAR(255)';
            else if (typeof val === 'string' && (val.length > 60000 || k.toLowerCase().includes("image") || k.toLowerCase().includes("logo") || k.toLowerCase().includes("base64"))) type = 'LONGTEXT';
            await pool.query(`ALTER TABLE \`${tableName}\` ADD COLUMN \`${k}\` ${type}`);
            existingCols.push(k);
            colTypes[k] = type.toLowerCase();
          }
        }
      } catch (e: unknown) {
        const err = e as { code?: string };
        if (err.code === 'ER_NO_SUCH_TABLE') {
          const colDefs = Object.keys(sample).map(k => {
             let type = 'TEXT';
             const val = sample[k];
             if (typeof val === 'number') type = 'DOUBLE';
             else if (typeof val === 'boolean') type = 'BOOLEAN';
             if (k === 'id') type = 'VARCHAR(255) PRIMARY KEY';
             else if (typeof val === 'string' && (val.length > 60000 || k.toLowerCase().includes("image") || k.toLowerCase().includes("logo") || k.toLowerCase().includes("base64"))) type = 'LONGTEXT';
             return `\`${k}\` ${type}`;
          });

          if (!Object.keys(sample).includes('id')) {
            colDefs.unshift('`_auto_id` INT AUTO_INCREMENT PRIMARY KEY');
          }

          await pool.query(`CREATE TABLE \`${tableName}\` (${colDefs.join(', ')})`);

          const [cols] = await pool.query<import('mysql2').RowDataPacket[]>(`SHOW COLUMNS FROM \`${tableName}\``);
          existingCols = cols.map((c) => c.Field as string);
          colTypes = Object.fromEntries(cols.map((c) => [c.Field as string, (c.Type as string).toLowerCase()]));
        } else {
          logDbError("setSetting CREATE/ALTER", key, e);
          throw e;
        }
      }

      for (const item of items) {
        if (!item || typeof item !== 'object') continue;

        if (existingCols.includes('id') && (item.id === undefined || item.id === null || item.id === '')) {
          const generatedId = `id_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
          item.id = generatedId;
        }

        for (const [k, val] of Object.entries(item)) {
          if (existingCols.includes(k)) {
            const currentType = colTypes[k];
            if (typeof val === 'string') {
              if (currentType && currentType.includes('varchar') && val.length > 255) {
                const targetType = (val.length > 60000 || k.toLowerCase().includes("image") || k.toLowerCase().includes("logo") || k.toLowerCase().includes("base64")) ? 'LONGTEXT' : 'TEXT';
                await pool.query(`ALTER TABLE \`${tableName}\` MODIFY COLUMN \`${k}\` ${targetType}`);
                colTypes[k] = targetType.toLowerCase();
              } else if (currentType && currentType === 'text' && (val.length > 60000 || k.toLowerCase().includes("image") || k.toLowerCase().includes("logo") || k.toLowerCase().includes("base64"))) {
                await pool.query(`ALTER TABLE \`${tableName}\` MODIFY COLUMN \`${k}\` LONGTEXT`);
                colTypes[k] = 'longtext';
              }
            }
          }
        }
      }

      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();
        await connection.query(`DELETE FROM \`${tableName}\``);

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
          await connection.query(
            `INSERT INTO \`${tableName}\` (${keys.map(k => `\`${k}\``).join(', ')}) VALUES (${placeholders})`,
            values
          );
        }

        await connection.commit();
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } else if (items.length === 0) {
      try {
        await pool.query(`DELETE FROM \`${tableName}\``);
      } catch {
        // Ignore if table doesn't exist.
      }
    }

    return true;
  } catch (error) {
    console.warn("Database error updating setting:", key, (error as Error).message);
    logDbError("setSetting", key, error);
    return false;
  }
}
