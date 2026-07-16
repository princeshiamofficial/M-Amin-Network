export type AdminPermissionKey = "view" | "add" | "edit" | "delete" | "approve" | "export" | "manage";

export type AdminPermissionFlags = Record<AdminPermissionKey, boolean>;

export interface AdminRouteAccess {
  route: string;
  permissions?: Partial<AdminPermissionFlags>;
}

export const EMPTY_ADMIN_PERMISSIONS: AdminPermissionFlags = {
  view: false,
  add: false,
  edit: false,
  delete: false,
  approve: false,
  export: false,
  manage: false,
};

export const FULL_ADMIN_PERMISSIONS: AdminPermissionFlags = {
  view: true,
  add: true,
  edit: true,
  delete: true,
  approve: true,
  export: true,
  manage: true,
};

const ADMIN_ROUTE_EXPANSIONS: Record<string, string[]> = {
  "/admin/users": ["/admin/manage-user"],
  "/admin/users-roles": ["/admin/manage-user", "/admin/user-role"],
  "/admin/roles": ["/admin/user-role"],
  "/admin/services": ["/admin/multimedia"],
  "/admin/services-hub": ["/admin/multimedia"],
  "/admin/coverage": ["/admin/coverage-areas"],
  "/admin/contact": ["/admin/contact-messages"],
  "/admin/about": ["/admin/about-page"],
  "/admin/layout": ["/admin/topbar-footer"],
  "/admin/support": ["/admin/support-page"],
};

export function toAdminBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value !== "string") return false;

  const normalized = value.trim().toLowerCase();
  return Boolean(normalized && !["0", "false", "no", "off", "null", "undefined"].includes(normalized));
}

export function cleanAdminRoute(route: string | null | undefined): string {
  const cleaned = String(route || "")
    .trim()
    .split("?")[0]
    .split("#")[0];

  if (cleaned.length > 1 && cleaned.endsWith("/")) {
    return cleaned.slice(0, -1);
  }

  return cleaned;
}

export function normalizeAdminRoute(route: string | null | undefined): string {
  const cleaned = cleanAdminRoute(route);
  if (cleaned.startsWith("/admin/page-headers/")) return "/admin/page-headers";

  const expansion = ADMIN_ROUTE_EXPANSIONS[cleaned];
  return expansion?.[0] || cleaned;
}

export function expandAdminRoute(route: string | null | undefined): string[] {
  const cleaned = cleanAdminRoute(route);
  if (cleaned.startsWith("/admin/page-headers/")) return ["/admin/page-headers"];

  return ADMIN_ROUTE_EXPANSIONS[cleaned] || [normalizeAdminRoute(cleaned)];
}

export function normalizeAdminPermissions(value: unknown): AdminPermissionFlags {
  const record = value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : {};

  const add = toAdminBoolean(record.add);
  const edit = toAdminBoolean(record.edit);
  const deletePermission = toAdminBoolean(record.delete);
  const approve = toAdminBoolean(record.approve);
  const exportPermission = toAdminBoolean(record.export);
  const manage = toAdminBoolean(record.manage);

  return {
    view: toAdminBoolean(record.view) || add || edit || deletePermission || approve || exportPermission || manage,
    add,
    edit,
    delete: deletePermission,
    approve,
    export: exportPermission,
    manage,
  };
}

export function mergeAdminPermissions(
  current: Partial<AdminPermissionFlags> | undefined,
  next: Partial<AdminPermissionFlags> | undefined
): AdminPermissionFlags {
  return {
    view: Boolean(current?.view || next?.view),
    add: Boolean(current?.add || next?.add),
    edit: Boolean(current?.edit || next?.edit),
    delete: Boolean(current?.delete || next?.delete),
    approve: Boolean(current?.approve || next?.approve),
    export: Boolean(current?.export || next?.export),
    manage: Boolean(current?.manage || next?.manage),
  };
}

export function hasAnyAdminPermission(permissions: Partial<AdminPermissionFlags> | undefined): boolean {
  return Boolean(
    permissions?.view ||
    permissions?.add ||
    permissions?.edit ||
    permissions?.delete ||
    permissions?.approve ||
    permissions?.export ||
    permissions?.manage
  );
}

export function isSuperAdminRole(role: string | null | undefined): boolean {
  const normalized = String(role || "").trim().toLowerCase();
  return normalized === "super administrator" || normalized === "super admin";
}
