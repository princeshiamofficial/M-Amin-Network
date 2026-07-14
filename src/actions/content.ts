"use server";

import pool from "@/lib/db";
import fs from "fs";
import path from "path";
import { cookies, headers } from "next/headers";
import { createHash } from "crypto";

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

/**
 * Internal function to fetch settings bypassing authentication checks.
 */
async function getSettingInternal(key: string): Promise<unknown> {
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
    // Use console.warn instead of console.error to prevent Next.js RSC Error Overlay
    console.warn("Database error fetching setting:", key, (error as Error).message);
    logDbError("getSetting", key, error);
    return null;
  }
}

/**
 * Fetch a setting with strict access control based on key and authorization.
 */
export async function getSetting(key: string): Promise<unknown> {
  const restrictedKeys = [
    "admin_auth", "user", "users", "admin_users", 
    "security_logs", "complaints", "job_applications", 
    "payments", "tickets", "claims", "package_requests", 
    "contact_messages", "subscribers"
  ];
  if (restrictedKeys.includes(key)) {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return key.endsWith("s") || key === "packages_list" ? [] : null;
    }
  }
  return getSettingInternal(key);
}

/**
 * Internal function to update or insert a setting bypassing authentication checks.
 */
async function setSettingInternal(key: string, data: unknown): Promise<boolean> {
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
    const normalizedRawItems = tableName === "promo_offers" ? normalizePromoOfferItems(rawItems) : rawItems;
    
    // Inject sort order to preserve insertion sequence in DB queries
    const items: Record<string, unknown>[] = normalizedRawItems.map((item, index) => {
      if (item && typeof item === 'object') {
        return { ...item, _sort_order: index } as Record<string, unknown>;
      }
      return item as Record<string, unknown>;
    });

    console.log("SERVER content.ts: setSetting key =", key, "tableName =", tableName, "items count =", items.length);
    if (tableName === "quick_actions") {
      console.log("SERVER quick_actions first 3 items:", items.slice(0, 3).map(i => ({ id: i.id, label: i.label, _sort_order: i._sort_order })));
    }

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
        // Check columns
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
             return `\`${k}\` ${type}`;
          });
          
          if (!Object.keys(sample).includes('id')) {
            colDefs.unshift('`_auto_id` INT AUTO_INCREMENT PRIMARY KEY');
          }
          
          await pool.query(`CREATE TABLE \`${tableName}\` (${colDefs.join(', ')})`);
          
          // Re-populate cols info after table creation
          const [cols] = await pool.query<import('mysql2').RowDataPacket[]>(`SHOW COLUMNS FROM \`${tableName}\``);
          existingCols = cols.map((c) => c.Field as string);
          colTypes = Object.fromEntries(cols.map((c) => [c.Field as string, (c.Type as string).toLowerCase()]));
        } else {
          logDbError("setSetting CREATE/ALTER", key, e);
          throw e;
        }
      }
      
      // Perform dynamic upgrades (VARCHAR -> TEXT) and missing ID injection
      for (const item of items) {
        if (!item || typeof item !== 'object') continue;
        
        // 1. If table has an 'id' column but item does not have a non-empty 'id' key
        if (existingCols.includes('id') && (item.id === undefined || item.id === null || item.id === '')) {
          const generatedId = `id_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
          item.id = generatedId;
        }

        // 2. Upgrade VARCHAR columns to TEXT dynamically if value exceeds 255 characters
        for (const [k, val] of Object.entries(item)) {
          if (existingCols.includes(k)) {
            const currentType = colTypes[k];
            if (currentType && currentType.includes('varchar') && typeof val === 'string' && val.length > 255) {
              await pool.query(`ALTER TABLE \`${tableName}\` MODIFY COLUMN \`${k}\` TEXT`);
              colTypes[k] = 'text';
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
        // Ignore if table doesn't exist
      }
    }
    
    return true;
  } catch (error) {
    // Use console.warn instead of console.error to prevent Next.js RSC Error Overlay
    console.warn("Database error updating setting:", key, (error as Error).message);
    logDbError("setSetting", key, error);
    return false;
  }
}

/**
 * Update or insert a setting with strict access control based on key and authorization.
 */
export async function setSetting(key: string, data: unknown): Promise<boolean> {
  const authenticated = await isAdminAuthenticated();
  console.log(`[setSetting] key=${key} authenticated=${authenticated}`);
  
  const restrictedKeys = [
    "admin_auth", "user", "users", "admin_users", 
    "security_logs", "complaints", "job_applications", 
    "payments", "tickets", "claims", "package_requests", 
    "contact_messages", "subscribers"
  ];
  
  if (restrictedKeys.includes(key)) {
    if (!authenticated) {
      console.warn(`[setSetting] Blocked unauthorized edit on restricted key: ${key}`);
      return false;
    }
  } else {
    if (!authenticated) {
      const tableName = key.startsWith("") ? key.replace("", "") : key;
      try {
        const [rows] = await pool.query<import('mysql2').RowDataPacket[]>(
          `SELECT COUNT(*) as count FROM \`${tableName}\``
        );
        const count = rows[0]?.count || 0;
        if (count > 0) {
          console.warn(`[setSetting] Blocked unauthorized edit on key: ${key} (table contains ${count} rows)`);
          return false;
        }
      } catch {
        // Table doesn't exist yet, allow creation
      }
    }
  }
  
  return setSettingInternal(key, data);
}

function hashPasswordServer(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export async function verifyAdminLoginAction(usernameInput: string, passwordInput: string): Promise<{ success: boolean; error?: string }> {
  try {
    const savedAuth = (await getSettingInternal("admin_auth")) as Record<string, string> | null;
    if (!savedAuth) {
      return { success: false, error: "System credentials not found." };
    }

    const cleanUser = usernameInput.trim().toLowerCase();
    const validEmail = savedAuth.email.toLowerCase();
    const validUsername = savedAuth.username ? savedAuth.username.toLowerCase() : validEmail;

    const hashedInput = hashPasswordServer(passwordInput);
    const isPasswordValid = hashedInput === savedAuth.password;

    if ((cleanUser === validUsername || cleanUser === validEmail) && isPasswordValid) {
      const cookieStore = await cookies();
      const headersList = await headers();
      const host = headersList.get("host") || "";
      const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1");
      const secure = process.env.NODE_ENV === "production" && !isLocalhost;

      cookieStore.set("admin_session", "secure_admin_logged_in_token_713", {
        httpOnly: true,
        secure,
        sameSite: "strict",
        maxAge: 60 * 60 * 2, // 2 hours
        path: "/",
      });
      return { success: true };
    }
    return { success: false, error: "Invalid username or password." };
  } catch {
    return { success: false, error: "Server authentication error." };
  }
}

export async function logoutAdminAction(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "", {
      maxAge: 0,
      path: "/",
    });
    return true;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get("admin_session")?.value === "secure_admin_logged_in_token_713";
  } catch {
    return false;
  }
}

export async function submitComplaintAction(newComplaint: Record<string, unknown>): Promise<{ success: boolean; ref?: string }> {
  try {
    const raw = await getSettingInternal("complaints");
    const complaintsArr = Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
    
    const generatedRef = `CMP-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const complaintToSave = {
      ...newComplaint,
      id: generatedRef,
      date: new Date().toLocaleString(),
      status: "Pending"
    };
    
    complaintsArr.push(complaintToSave);
    const success = await setSettingInternal("complaints", complaintsArr);
    return { success, ref: generatedRef };
  } catch (error) {
    console.error("submitComplaintAction error:", error);
    return { success: false };
  }
}

export async function submitJobApplicationAction(
  applyForm: Record<string, unknown>,
  workExperiences: Record<string, unknown>[],
  position: string
): Promise<{ success: boolean; id?: string }> {
  try {
    const raw = await getSettingInternal("job_applications");
    const applicationsArr = Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
    
    const generatedId = `APP-${Date.now().toString().slice(-6)}`;
    const newApplication = {
      id: generatedId,
      position,
      ...applyForm,
      workExperiences,
      dateApplied: new Date().toLocaleString()
    };
    
    applicationsArr.push(newApplication);
    const success = await setSettingInternal("job_applications", applicationsArr);
    return { success, id: generatedId };
  } catch (error) {
    console.error("submitJobApplicationAction error:", error);
    return { success: false };
  }
}

export async function submitPackageRequestAction(
  requestInfo: Record<string, unknown>
): Promise<{ success: boolean; id?: string }> {
  try {
    const raw = await getSettingInternal("package_requests");
    const requestsArr = Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];

    const generatedId = `REQ-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRequest = {
      id: generatedId,
      ...requestInfo,
      status: "Pending",
      date: new Date().toLocaleString()
    };

    requestsArr.unshift(newRequest);
    const success = await setSettingInternal("package_requests", requestsArr);
    return { success, id: generatedId };
  } catch (error) {
    console.error("submitPackageRequestAction error:", error);
    return { success: false };
  }
}

export async function submitPaymentAction(
  paymentInfo: {
    clientId: string;
    name: string;
    phone: string;
    planName: string;
    speed: string;
    amount: number;
    gateway: string;
    dueDate: string;
  }
): Promise<{ success: boolean; txnId?: string }> {
  try {
    const raw = await getSettingInternal("payments");
    const paymentsArr = Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
    
    const generatedTxn = `TXN-${paymentInfo.gateway.toUpperCase()}-${Date.now().toString().slice(-6)}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newPayment = {
      id: generatedTxn,
      clientId: paymentInfo.clientId,
      name: paymentInfo.name,
      phone: paymentInfo.phone,
      planName: paymentInfo.planName,
      speed: paymentInfo.speed,
      amount: paymentInfo.amount,
      gateway: paymentInfo.gateway,
      date: new Date().toLocaleString(),
      dueDate: paymentInfo.dueDate,
      paidDate: new Date().toLocaleString()
    };
    
    paymentsArr.push(newPayment);
    const success = await setSettingInternal("payments", paymentsArr);
    return { success, txnId: generatedTxn };
  } catch (error) {
    console.error("submitPaymentAction error:", error);
    return { success: false };
  }
}

export async function submitClaimAction(
  claimForm: {
    name: string;
    phone: string;
    address: string;
  },
  promoInfo: {
    code: string;
    title: string;
  }
): Promise<{ success: boolean; id?: string }> {
  try {
    const raw = await getSettingInternal("claims");
    const claimsArr = Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
    
    const generatedId = `CLM-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newClaim = {
      id: generatedId,
      name: claimForm.name,
      phone: claimForm.phone,
      address: claimForm.address,
      promoCode: promoInfo.code,
      promoTitle: promoInfo.title,
      date: new Date().toLocaleString(),
      status: "Pending"
    };
    
    claimsArr.push(newClaim);
    const success = await setSettingInternal("claims", claimsArr);
    return { success, id: generatedId };
  } catch (error) {
    console.error("submitClaimAction error:", error);
    return { success: false };
  }
}

