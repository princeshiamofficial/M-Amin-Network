"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getSetting } from "@/actions/content";
import { usePathname } from "next/navigation";
import {
  EMPTY_ADMIN_PERMISSIONS,
  FULL_ADMIN_PERMISSIONS,
  AdminPermissionFlags,
  expandAdminRoute,
  hasAnyAdminPermission,
  isSuperAdminRole,
  mergeAdminPermissions,
  normalizeAdminPermissions,
  normalizeAdminRoute,
} from "@/lib/admin-permissions";

export interface PageAccess {
  page: string;
  route: string;
  permissions: AdminPermissionFlags;
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  status?: string;
  pageAccess: PageAccess[];
}

interface AdminSecurityContextType {
  userRole: string;
  username: string;
  rolePermissions: AdminRole[];
  permissionsLoaded: boolean;
  canAdd: (route?: string) => boolean;
  canEdit: (route?: string) => boolean;
  canDelete: (route?: string) => boolean;
  hasAccess: (route?: string) => boolean;
}

const AdminSecurityContext = createContext<AdminSecurityContextType | null>(null);

export function AdminSecurityProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string>("Super Administrator");
  const [username, setUsername] = useState<string>("admin");
  const [rolePermissions, setRolePermissions] = useState<AdminRole[]>([]);
  const [permissionsLoaded, setPermissionsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedRole = localStorage.getItem("admin_user_role") || "Super Administrator";
    const storedUsername = localStorage.getItem("admin_username") || "admin";
    setUserRole(storedRole);
    setUsername(storedUsername);

    getSetting("admin_roles")
      .then((res) => {
        if (Array.isArray(res)) {
          const mappedRoles: AdminRole[] = res.map((roleItem) => {
            const r = roleItem as Record<string, unknown>;
            const rawAccess = Array.isArray(r.pageAccess) ? r.pageAccess : [];
            const accessByRoute = new Map<string, PageAccess>();

            rawAccess.forEach((accessItem) => {
              const a = accessItem as Record<string, unknown>;
              const permissions = normalizeAdminPermissions(a.permissions);
              expandAdminRoute(String(a.route || "")).forEach((route) => {
                if (!route) return;

                const normalizedRoute = normalizeAdminRoute(route);
                const previous = accessByRoute.get(normalizedRoute);
                accessByRoute.set(normalizedRoute, {
                  page: previous?.page || String(a.page || ""),
                  route: normalizedRoute,
                  permissions: previous
                    ? mergeAdminPermissions(previous.permissions, permissions)
                    : permissions,
                });
              });
            });

            return {
              id: String(r.id || ""),
              name: String(r.name || ""),
              description: String(r.description || ""),
              status: String(r.status || "Active"),
              pageAccess: Array.from(accessByRoute.values()),
            };
          });
          setRolePermissions(mappedRoles);
        }
        setPermissionsLoaded(true);
      })
      .catch(() => {
        setPermissionsLoaded(true);
      });
  }, []);

  const getMatchingRole = () => {
    const roleKey = userRole.trim().toLowerCase();
    return rolePermissions.find((role) => (
      role.name.trim().toLowerCase() === roleKey ||
      role.id.trim().toLowerCase() === roleKey
    ));
  };

  const getPermissionsForRoute = (route?: string): AdminPermissionFlags => {
    if (isSuperAdminRole(userRole)) {
      return FULL_ADMIN_PERMISSIONS;
    }

    const targetRoute = normalizeAdminRoute(route || pathname || "/admin/dashboard");
    const matchingRole = getMatchingRole();
    if (matchingRole) {
      if (matchingRole.status?.trim().toLowerCase() === "inactive") {
        return EMPTY_ADMIN_PERMISSIONS;
      }

      const pageAccess = matchingRole.pageAccess.find((access) => normalizeAdminRoute(access.route) === targetRoute);
      if (pageAccess) {
        return pageAccess.permissions;
      }
    }

    return EMPTY_ADMIN_PERMISSIONS;
  };

  const canAdd = (route?: string) => getPermissionsForRoute(route).add;
  const canEdit = (route?: string) => getPermissionsForRoute(route).edit;
  const canDelete = (route?: string) => getPermissionsForRoute(route).delete;
  
  const hasAccess = (route?: string) => {
    if (isSuperAdminRole(userRole)) return true;
    const perms = getPermissionsForRoute(route);
    return hasAnyAdminPermission(perms);
  };

  return (
    <AdminSecurityContext.Provider
      value={{
        userRole,
        username,
        rolePermissions,
        permissionsLoaded,
        canAdd,
        canEdit,
        canDelete,
        hasAccess,
      }}
    >
      {children}
    </AdminSecurityContext.Provider>
  );
}

export function useAdminSecurity() {
  const context = useContext(AdminSecurityContext);
  if (!context) {
    throw new Error("useAdminSecurity must be used within an AdminSecurityProvider");
  }
  return context;
}
