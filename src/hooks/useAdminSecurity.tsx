"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getSetting } from "@/actions/content";

export interface PageAccess {
  page: string;
  route: string;
  permissions: {
    view?: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
    approve?: boolean;
    export?: boolean;
    manage?: boolean;
  };
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  pageAccess: PageAccess[];
}

interface AdminSecurityContextType {
  userRole: string;
  username: string;
  rolePermissions: AdminRole[];
  permissionsLoaded: boolean;
  canAdd: (route: string) => boolean;
  canEdit: (route: string) => boolean;
  canDelete: (route: string) => boolean;
  hasAccess: (route: string) => boolean;
}

const AdminSecurityContext = createContext<AdminSecurityContextType | null>(null);

export function AdminSecurityProvider({ children }: { children: React.ReactNode }) {
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
          // Map properties explicitly to satisfy TypeScript compiler
          const mappedRoles: AdminRole[] = res.map((roleItem) => {
            const r = roleItem as Record<string, unknown>;
            const rawAccess = Array.isArray(r.pageAccess) ? r.pageAccess : [];
            const pageAccess: PageAccess[] = rawAccess.map((accessItem) => {
              const a = accessItem as Record<string, unknown>;
              const p = (a.permissions && typeof a.permissions === "object" ? a.permissions : {}) as Record<string, unknown>;
              return {
                page: String(a.page || ""),
                route: String(a.route || ""),
                permissions: {
                  view: p.view === true,
                  add: p.add === true,
                  edit: p.edit === true,
                  delete: p.delete === true,
                  approve: p.approve === true,
                  export: p.export === true,
                  manage: p.manage === true,
                },
              };
            });

            return {
              id: String(r.id || ""),
              name: String(r.name || ""),
              description: String(r.description || ""),
              pageAccess,
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

  const getPermissionsForRoute = (route: string) => {
    if (userRole === "Super Administrator") {
      return { view: true, add: true, edit: true, delete: true, approve: true, export: true, manage: true };
    }
    const matchingRole = rolePermissions.find((r) => r.name === userRole);
    if (matchingRole) {
      let pageAccess = matchingRole.pageAccess.find((p) => p.route === route);
      if (!pageAccess && route.startsWith("/admin/page-headers/")) {
        pageAccess = matchingRole.pageAccess.find((p) => p.route === "/admin/page-headers");
      }
      if (pageAccess) {
        return pageAccess.permissions;
      }
    }
    // Default to no permissions for other roles if not explicitly defined
    return { view: false, add: false, edit: false, delete: false, approve: false, export: false, manage: false };
  };

  const canAdd = (route: string) => getPermissionsForRoute(route).add;
  const canEdit = (route: string) => getPermissionsForRoute(route).edit;
  const canDelete = (route: string) => getPermissionsForRoute(route).delete;
  
  const hasAccess = (route: string) => {
    if (userRole === "Super Administrator") return true;
    const perms = getPermissionsForRoute(route);
    return !!(perms.view || perms.add || perms.edit || perms.delete || perms.approve || perms.export || perms.manage);
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
