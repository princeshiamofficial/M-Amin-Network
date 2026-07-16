"use server";

import { cookies, headers } from "next/headers";
import { broadcastMaintenance } from "@/lib/wsServer";
import {
  getSettingInternal,
  getSettingTableRowCount,
  hashPasswordServer,
  normalizeBooleanValue,
  passwordMatchesInput,
  setSettingInternal,
} from "@/lib/content-service";

/**
 * Fetch a setting with strict access control based on key and authorization.
 */
export async function getSetting(key: string): Promise<unknown> {
  const restrictedKeys = [
    "admin_auth", "user", "users", "admin_users", "admin_roles",
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
 * Update or insert a setting with strict access control based on key and authorization.
 */
export async function setSetting(key: string, data: unknown): Promise<boolean> {
  const authenticated = await isAdminAuthenticated();
  console.log(`[setSetting] key=${key} authenticated=${authenticated}`);
  
  const restrictedKeys = [
    "admin_auth", "user", "users", "admin_users", "admin_roles",
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
      const count = await getSettingTableRowCount(key);
      if (count !== null && count > 0) {
        console.warn(`[setSetting] Blocked unauthorized edit on key: ${key} (table contains ${count} rows)`);
        return false;
      }
    }
  }
  
  const success = await setSettingInternal(key, data);
  if (success && key === "system_config") {
    try {
      const config = data as { 
        maintenanceMode?: boolean | number; 
        maintenanceMessage?: string;
        popupEnabled?: boolean | number | string;
        popupImage?: string;
      };
      broadcastMaintenance({
        isMaintenance: normalizeBooleanValue(config.maintenanceMode),
        maintenanceMessage: config.maintenanceMessage || "",
        popupEnabled: normalizeBooleanValue(config.popupEnabled, true),
        popupImage: config.popupImage || "/popup.webp"
      });
    } catch (e) {
      console.warn("WebSocket broadcast failed:", e);
    }
  }
  return success;
}

export async function verifyAdminLoginAction(usernameInput: string, passwordInput: string): Promise<{ success: boolean; error?: string; username?: string; role?: string }> {
  try {
    const savedAuth = (await getSettingInternal("admin_auth")) as Record<string, string> | null;
    if (!savedAuth) {
      return { success: false, error: "System credentials not found." };
    }

    const cleanUser = usernameInput.trim().toLowerCase();
    const hashedInput = hashPasswordServer(passwordInput);

    let matchedUsername = "";
    let matchedRole = "";
    let matchedUserId = "";

    const savedUsers = (await getSettingInternal("admin_users")) as Record<string, unknown>[] | null;
    const userList = Array.isArray(savedUsers) ? savedUsers : [];
    const matchedUser = userList.find(u => {
      const uName = String(u.username || "").trim().toLowerCase();
      const uEmail = String(u.email || "").trim().toLowerCase();
      return uName === cleanUser || uEmail === cleanUser;
    });

    if (matchedUser && passwordMatchesInput(matchedUser.password, passwordInput, hashedInput)) {
      if (matchedUser.status === "Banned") {
        return { success: false, error: "This administrative user account is banned." };
      }

      matchedUsername = String(matchedUser.username || "");
      matchedRole = String(matchedUser.role || "Support Staff");
      matchedUserId = String(matchedUser.id || "");
    }

    const validEmail = savedAuth.email.toLowerCase();
    const validUsername = savedAuth.username ? savedAuth.username.toLowerCase() : validEmail;

    if (!matchedUsername && (cleanUser === validUsername || cleanUser === validEmail)) {
      if (passwordMatchesInput(savedAuth.password, passwordInput, hashedInput)) {
        matchedUsername = "admin";
        matchedRole = "Super Administrator";
      } else {
        return { success: false, error: "Invalid credentials." };
      }
    } else if (!matchedUsername) {
      if (matchedUser) {
        return { success: false, error: "Invalid credentials." };
      }
      return { success: false, error: "Invalid credentials." };
    }

    if (matchedUsername) {
        // Update lastLogin in admin_users
        try {
          const savedUsers = (await getSettingInternal("admin_users")) as Record<string, unknown>[] | null;
          const userList = Array.isArray(savedUsers) ? savedUsers : [];
          const matchedUser = userList.find(u => {
            if (matchedUserId && String(u.id || "") === matchedUserId) return true;
            const uName = String(u.username || "").trim().toLowerCase();
            const uEmail = String(u.email || "").trim().toLowerCase();
            return uName === matchedUsername.toLowerCase() || uEmail === matchedUsername.toLowerCase();
          });
          if (matchedUser) {
            matchedUser.lastLogin = new Date().toLocaleString("en-US", { hour12: true });
            await setSettingInternal("admin_users", userList);
          }
        } catch (e) {
          console.warn("Failed to update admin user lastLogin:", e);
        }

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

        return { success: true, username: matchedUsername, role: matchedRole };
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

export async function verifyPortalLoginAction(clientIdInput: string, passwordInput: string): Promise<{ success: boolean; error?: string; subscriber?: Record<string, unknown> }> {
  try {
    const raw = await getSettingInternal("subscribers");
    const subscribersArr = Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
    
    const idKey = clientIdInput.toLowerCase().trim();
    const matchedSub = subscribersArr.find(
      s => (s.userId && (s.userId as string).toLowerCase().trim() === idKey) || (s.id as string).toLowerCase().trim() === idKey
    );

    if (!matchedSub) {
      return { success: false, error: "Subscriber profile not found." };
    }

    if (matchedSub.password && matchedSub.password !== passwordInput) {
      return { success: false, error: "Incorrect password." };
    }

    return { success: true, subscriber: matchedSub };
  } catch {
    return { success: false, error: "Server portal login error." };
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

    // Also add to claims so it appears on /admin/applications
    try {
      const claimsRaw = await getSettingInternal("claims");
      const claimsArr = Array.isArray(claimsRaw) ? (claimsRaw as Record<string, unknown>[]) : [];
      claimsArr.unshift({
        id: generatedId,
        name: requestInfo.name,
        phone: requestInfo.phone,
        address: requestInfo.address,
        promoCode: requestInfo.referralCode || "",
        promoTitle: `${requestInfo.planName} (${requestInfo.speed})`,
        date: new Date().toLocaleString(),
        status: "Pending"
      });
      await setSettingInternal("claims", claimsArr);
    } catch (e) {
      console.error("Failed to sync package request to claims:", e);
    }

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

export async function requestPasswordResetAction(emailInput: string): Promise<{ success: boolean; error?: string; code?: string }> {
  try {
    const cleanEmail = emailInput.trim().toLowerCase();
    
    // Check primary admin
    const savedAuth = (await getSettingInternal("admin_auth")) as Record<string, string> | null;
    let emailFound = false;
    if (savedAuth && savedAuth.email && savedAuth.email.toLowerCase() === cleanEmail) {
      emailFound = true;
    }
    
    // Check sub-admins
    if (!emailFound) {
      const savedUsers = (await getSettingInternal("admin_users")) as Record<string, unknown>[] | null;
      const userList = Array.isArray(savedUsers) ? savedUsers : [];
      const matchedUser = userList.find(u => String(u.email || "").trim().toLowerCase() === cleanEmail);
      if (matchedUser) {
        emailFound = true;
      }
    }
    
    if (emailFound) {
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      return { success: true, code: resetCode };
    }
    
    return { success: false, error: "No administrator account registered with this email address." };
  } catch {
    return { success: false, error: "An error occurred during password reset check." };
  }
}

export async function resetPasswordAction(emailInput: string, newPasswordInput: string): Promise<{ success: boolean; error?: string }> {
  try {
    const cleanEmail = emailInput.trim().toLowerCase();
    const hashed = hashPasswordServer(newPasswordInput);
    
    // Check primary admin
    const savedAuth = (await getSettingInternal("admin_auth")) as Record<string, string> | null;
    if (savedAuth && savedAuth.email && savedAuth.email.toLowerCase() === cleanEmail) {
      savedAuth.password = hashed;
      await setSettingInternal("admin_auth", savedAuth);
      return { success: true };
    }
    
    // Check sub-admins
    const savedUsers = (await getSettingInternal("admin_users")) as Record<string, unknown>[] | null;
    const userList = Array.isArray(savedUsers) ? savedUsers : [];
    let updated = false;
    const updatedUsers = userList.map(u => {
      if (String(u.email || "").trim().toLowerCase() === cleanEmail) {
        updated = true;
        return { ...u, password: hashed };
      }
      return u;
    });
    
    if (updated) {
      // Also update primary credentials just in case since sub-admins share auth checks
      if (savedAuth) {
        savedAuth.password = hashed;
        await setSettingInternal("admin_auth", savedAuth);
      }
      await setSettingInternal("admin_users", updatedUsers);
      return { success: true };
    }
    
    return { success: false, error: "User account not found." };
  } catch {
    return { success: false, error: "Failed to reset password." };
  }
}

