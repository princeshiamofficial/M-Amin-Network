"use server";

import { cookies, headers } from "next/headers";
import { randomUUID } from "crypto";
import { broadcastMaintenance } from "@/lib/wsServer";
import {
  getSettingInternal,
  getSettingTableRowCount,
  hashPasswordServer,
  normalizeBooleanValue,
  passwordMatchesInput,
  setSettingInternal,
} from "@/lib/content-service";

const ADMIN_SESSION_COOKIE = "admin_session";
const LEGACY_ADMIN_SESSION_TOKEN = "secure_admin_logged_in_token_713";
const ADMIN_SESSION_MAX_AGE = 60 * 60 * 2;
const ADMIN_PASSWORD_MIN_LENGTH = 8;
const ADMIN_PASSWORD_MAX_LENGTH = 16;

function createAdminSessionVersion(): string {
  return randomUUID();
}

function getAdminSessionVersion(auth: Record<string, unknown> | null): string {
  if (!auth) return "";
  const version = auth.sessionVersion ?? auth.session_version;
  return typeof version === "string" ? version.trim() : "";
}

function createAdminSessionCookieValue(sessionVersion: string): string {
  return `${LEGACY_ADMIN_SESSION_TOKEN}:${sessionVersion}`;
}

async function setAdminSessionCookie(sessionVersion: string): Promise<void> {
  const cookieStore = await cookies();
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1");
  const secure = process.env.NODE_ENV === "production" && !isLocalhost;

  cookieStore.set(ADMIN_SESSION_COOKIE, createAdminSessionCookieValue(sessionVersion), {
    httpOnly: true,
    secure,
    sameSite: "strict",
    maxAge: ADMIN_SESSION_MAX_AGE,
    path: "/",
  });
}

async function setLegacyAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const isLocalhost = host.includes("localhost") || host.includes("127.0.0.1");
  const secure = process.env.NODE_ENV === "production" && !isLocalhost;

  cookieStore.set(ADMIN_SESSION_COOKIE, LEGACY_ADMIN_SESSION_TOKEN, {
    httpOnly: true,
    secure,
    sameSite: "strict",
    maxAge: ADMIN_SESSION_MAX_AGE,
    path: "/",
  });
}

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
    const defaultAuth: Record<string, string> = {
      username: "admin",
      email: "admin@mamin.net",
      password: "password",
      role: "Super Administrator",
    };

    const defaultUsers: Record<string, unknown>[] = [
      { id: "USR-1", username: "admin", name: "admin", role: "Super Administrator", role_id: "ROLE-1", email: "admin@maminnetwork.test", status: "Active", avatarUrl: "", avatar_url: "", password: "password", phone: "", address: "", companyName: "M-Amin Network", company_name: "M-Amin Network", is_banned: false, _sort_order: 0 },
      { id: "USR-2", username: "moderator_support", name: "moderator_support", role: "Support Staff", role_id: "ROLE-2", email: "support@maminnetwork.test", status: "Active", avatarUrl: "", avatar_url: "", password: "password", phone: "", address: "", companyName: "M-Amin Network", company_name: "M-Amin Network", is_banned: false, _sort_order: 1 }
    ];

    let savedAuth = (await getSettingInternal("admin_auth")) as Record<string, string> | null;
    if (!savedAuth || typeof savedAuth !== "object" || !savedAuth.password) {
      savedAuth = defaultAuth;
      await setSettingInternal("admin_auth", defaultAuth);
    }

    let savedUsers = (await getSettingInternal("admin_users")) as Record<string, unknown>[] | null;
    if (!Array.isArray(savedUsers) || savedUsers.length === 0) {
      savedUsers = defaultUsers;
      await setSettingInternal("admin_users", defaultUsers);
    }

    const cleanUser = usernameInput.trim().toLowerCase();
    const hashedInput = hashPasswordServer(passwordInput);

    let matchedUsername = "";
    let matchedRole = "";
    let matchedUserId = "";

    const userList = Array.isArray(savedUsers) ? savedUsers : [];
    const primaryAdminUser = userList.find(u => {
      const id = String(u.id || "");
      const uName = String(u.username || u.name || "").trim().toLowerCase();
      return id === "USR-1" || uName === "admin";
    });
    const validEmail = String(savedAuth.email || "").trim().toLowerCase();
    const validUsername = savedAuth.username ? savedAuth.username.trim().toLowerCase() : validEmail;
    const primaryAuthAliases = new Set(
      [
        validEmail,
        validUsername,
      ].filter(Boolean)
    );
    const primaryManagedAliases = new Set(
      [
        String(primaryAdminUser?.username || primaryAdminUser?.name || "").trim().toLowerCase(),
        String(primaryAdminUser?.email || "").trim().toLowerCase(),
      ].filter(Boolean)
    );
    const primaryAliases = new Set(
      [
        ...primaryAuthAliases,
        ...primaryManagedAliases,
      ].filter(Boolean)
    );

    if (primaryAliases.has(cleanUser)) {
      const primaryAuthMatches = primaryAuthAliases.has(cleanUser)
        && passwordMatchesInput(savedAuth.password, passwordInput, hashedInput);
      const primaryManagedMatches = Boolean(
        primaryManagedAliases.has(cleanUser)
        && primaryAdminUser
        && passwordMatchesInput(primaryAdminUser.password, passwordInput, hashedInput)
      );

      if (!primaryAuthMatches && !primaryManagedMatches) {
        return { success: false, error: "Invalid credentials." };
      }

      matchedUsername = primaryManagedMatches && primaryAdminUser
        ? String(primaryAdminUser.username || primaryAdminUser.name || "admin")
        : savedAuth.username || "admin";
      matchedRole = primaryManagedMatches && primaryAdminUser
        ? String(primaryAdminUser.role || "Super Administrator")
        : "Super Administrator";
      matchedUserId = String(primaryAdminUser?.id || "USR-1");
    }

    const matchedUser = userList.find(u => {
      const uName = String(u.username || "").trim().toLowerCase();
      const uEmail = String(u.email || "").trim().toLowerCase();
      return uName === cleanUser || uEmail === cleanUser;
    });

    if (!matchedUsername && matchedUser && passwordMatchesInput(matchedUser.password, passwordInput, hashedInput)) {
      if (matchedUser.status === "Banned") {
        return { success: false, error: "This administrative user account is banned." };
      }

      matchedUsername = String(matchedUser.username || "");
      matchedRole = String(matchedUser.role || "Support Staff");
      matchedUserId = String(matchedUser.id || "");
    }

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

        let sessionVersion = getAdminSessionVersion(savedAuth);
        if (!sessionVersion) {
          sessionVersion = createAdminSessionVersion();
          const sessionSaved = await setSettingInternal("admin_auth", {
            ...savedAuth,
            sessionVersion,
          });
          if (!sessionSaved) {
            sessionVersion = "";
          }
        }

        if (sessionVersion) {
          await setAdminSessionCookie(sessionVersion);
        } else {
          await setLegacyAdminSessionCookie();
        }

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
    cookieStore.set(ADMIN_SESSION_COOKIE, "", {
      maxAge: 0,
      path: "/",
    });
    return true;
  } catch {
    return false;
  }
}

export async function updateAdminAccountAction(input: {
  email: string;
  currentPassword?: string;
  newPassword?: string;
}): Promise<{
  success: boolean;
  error?: string;
  sessionsRotated?: boolean;
  auth?: {
    email: string;
    username: string;
    lastPasswordChanged: string;
    lastLogin: string;
  };
}> {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) {
      return { success: false, error: "Your admin session expired. Please log in again." };
    }

    const savedAuth = (await getSettingInternal("admin_auth")) as Record<string, string> | null;
    if (!savedAuth) {
      return { success: false, error: "System credentials not found." };
    }

    const cleanEmail = input.email.trim().toLowerCase();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    const currentPassword = input.currentPassword || "";
    const newPassword = (input.newPassword || "").trim();
    const previousEmail = String(savedAuth.email || "").trim().toLowerCase();
    const credentialsChanged = previousEmail !== cleanEmail || Boolean(newPassword);
    const updatedAuth: Record<string, string> = {
      ...savedAuth,
      username: savedAuth.username || "admin",
      email: cleanEmail,
      lastLogin: savedAuth.lastLogin || new Date().toLocaleString(),
      lastPasswordChanged: savedAuth.lastPasswordChanged || "",
    };

    if (newPassword) {
      if (!currentPassword) {
        return { success: false, error: "Please enter your current password to proceed." };
      }
      const currentHashed = hashPasswordServer(currentPassword);
      if (!passwordMatchesInput(savedAuth.password, currentPassword, currentHashed)) {
        return { success: false, error: "The current password you entered is incorrect." };
      }
      if (newPassword.length < ADMIN_PASSWORD_MIN_LENGTH) {
        return { success: false, error: `New password must be at least ${ADMIN_PASSWORD_MIN_LENGTH} characters long.` };
      }
      if (newPassword.length > ADMIN_PASSWORD_MAX_LENGTH) {
        return { success: false, error: `New password cannot be more than ${ADMIN_PASSWORD_MAX_LENGTH} characters long.` };
      }
      updatedAuth.password = hashPasswordServer(newPassword);
      updatedAuth.lastPasswordChanged = new Date().toLocaleString();
    } else {
      updatedAuth.password = savedAuth.password;
    }

    if (credentialsChanged) {
      updatedAuth.sessionVersion = createAdminSessionVersion();
    }

    const authSaved = await setSettingInternal("admin_auth", updatedAuth);
    if (!authSaved) {
      return { success: false, error: "Unable to save primary admin credentials." };
    }

    if (credentialsChanged) {
      await setAdminSessionCookie(updatedAuth.sessionVersion);
    }

    try {
      const savedUsers = (await getSettingInternal("admin_users")) as Record<string, unknown>[] | null;
      const userList = Array.isArray(savedUsers) ? savedUsers : [];
      const oldEmail = String(savedAuth.email || "").trim().toLowerCase();
      let matched = false;
      const updatedUsers = userList.map((user) => {
        const username = String(user.username || user.name || "").trim().toLowerCase();
        const email = String(user.email || "").trim().toLowerCase();
        const id = String(user.id || "");
        const isPrimaryAdmin = id === "USR-1" || username === "admin" || email === oldEmail;

        if (!isPrimaryAdmin) return user;
        matched = true;
        return {
          ...user,
          username: user.username || "admin",
          name: user.name || "admin",
          email: cleanEmail,
          password: newPassword ? updatedAuth.password : user.password,
        };
      });

      if (matched) {
        await setSettingInternal("admin_users", updatedUsers);
      }
    } catch (error) {
      console.warn("Failed to sync managed admin credentials:", error);
    }

    return {
      success: true,
      sessionsRotated: credentialsChanged,
      auth: {
        email: updatedAuth.email,
        username: updatedAuth.username,
        lastPasswordChanged: updatedAuth.lastPasswordChanged,
        lastLogin: updatedAuth.lastLogin,
      },
    };
  } catch (error) {
    console.error("updateAdminAccountAction error:", error);
    return { success: false, error: "An error occurred while updating account credentials." };
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
    const cookieValue = cookieStore.get(ADMIN_SESSION_COOKIE)?.value || "";
    if (!cookieValue) return false;

    const savedAuth = (await getSettingInternal("admin_auth")) as Record<string, unknown> | null;
    const sessionVersion = getAdminSessionVersion(savedAuth);
    if (!sessionVersion) {
      return cookieValue === LEGACY_ADMIN_SESSION_TOKEN;
    }

    return cookieValue === createAdminSessionCookieValue(sessionVersion);
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

    if (success) {
      const name = String(newComplaint.name || "Customer");
      const category = String(newComplaint.category || "General");
      createNotification({
        type: "complaint",
        title: `New complaint from ${name}: ${category}`,
        message: `Complaint registered by ${name} - Category: ${category}`,
        link: "/admin/complaints",
        metadata: { ref: generatedRef, category }
      }).catch(() => {});
    }
    
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

    if (success) {
      const name = String(applyForm.applicantName || applyForm.name || "Applicant");
      createNotification({
        type: "job_application",
        title: `New job application from ${name}`,
        message: `${name} applied for ${position}`,
        link: "/admin/job-applications",
        metadata: { id: generatedId, position }
      }).catch(() => {});
    }
    
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

    if (success) {
      const name = String(requestInfo.name || "Customer");
      const plan = String(requestInfo.planName || "Package");
      createNotification({
        type: "package_request",
        title: `New package request from ${name}`,
        message: `${name} requested ${plan}`,
        link: "/admin/applications",
        metadata: { id: generatedId, planName: plan }
      }).catch(() => {});
    }

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

    if (success) {
      createNotification({
        type: "payment",
        title: `Payment of ৳${paymentInfo.amount} received via ${paymentInfo.gateway}`,
        message: `Payment from ${paymentInfo.name} - ${paymentInfo.planName}`,
        link: "/admin/bills",
        metadata: { txnId: generatedTxn, amount: paymentInfo.amount, gateway: paymentInfo.gateway }
      }).catch(() => {});
    }
    
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

    if (success) {
      createNotification({
        type: "claim",
        title: `New claim from ${claimForm.name}`,
        message: `${claimForm.name} claimed ${promoInfo.title}`,
        link: "/admin/applications",
        metadata: { id: generatedId, code: promoInfo.code }
      }).catch(() => {});
    }
    
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
    const newPassword = newPasswordInput.trim();
    if (newPassword.length < ADMIN_PASSWORD_MIN_LENGTH) {
      return { success: false, error: `Password must be at least ${ADMIN_PASSWORD_MIN_LENGTH} characters long.` };
    }
    if (newPassword.length > ADMIN_PASSWORD_MAX_LENGTH) {
      return { success: false, error: `Password cannot be more than ${ADMIN_PASSWORD_MAX_LENGTH} characters long.` };
    }

    const hashed = hashPasswordServer(newPassword);
    
    // Check primary admin
    const savedAuth = (await getSettingInternal("admin_auth")) as Record<string, string> | null;
    if (savedAuth && savedAuth.email && savedAuth.email.toLowerCase() === cleanEmail) {
      savedAuth.password = hashed;
      savedAuth.sessionVersion = createAdminSessionVersion();
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
        savedAuth.sessionVersion = createAdminSessionVersion();
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

export async function createNotification(data: {
  type: string;
  title: string;
  message?: string;
  link?: string;
  metadata?: Record<string, unknown>;
}): Promise<{ success: boolean; id?: string }> {
  try {
    const id = `NOTIF-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const notification = {
      id,
      type: data.type,
      title: data.title,
      message: data.message || data.title,
      link: data.link || "",
      metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      read: false,
      date: new Date().toLocaleString(),
      _sort_order: Date.now()
    };

    const raw = await getSettingInternal("notifications");
    const notifications = Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
    notifications.unshift(notification);
    const success = await setSettingInternal("notifications", notifications);
    return { success, id };
  } catch (error) {
    console.error("createNotification error:", error);
    return { success: false };
  }
}

export async function getNotifications(): Promise<Record<string, unknown>[]> {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) return [];
    const raw = await getSettingInternal("notifications");
    return Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
  } catch {
    return [];
  }
}

export async function markNotificationAsRead(id: string): Promise<boolean> {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) return false;
    const raw = await getSettingInternal("notifications");
    const notifications = Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    return await setSettingInternal("notifications", updated);
  } catch {
    return false;
  }
}

export async function markAllNotificationsAsRead(): Promise<boolean> {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) return false;
    const raw = await getSettingInternal("notifications");
    const notifications = Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
    const updated = notifications.map((n) => ({ ...n, read: true }));
    return await setSettingInternal("notifications", updated);
  } catch {
    return false;
  }
}

export async function deleteNotification(id: string): Promise<boolean> {
  try {
    const authenticated = await isAdminAuthenticated();
    if (!authenticated) return false;
    const raw = await getSettingInternal("notifications");
    const notifications = Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
    const filtered = notifications.filter((n) => n.id !== id);
    return await setSettingInternal("notifications", filtered);
  } catch {
    return false;
  }
}

