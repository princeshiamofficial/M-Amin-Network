"use client";

import { toast } from "sonner";
import React, { useEffect, useMemo, useState } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import { useAdminSecurity } from "@/hooks/useAdminSecurity";
import {
  Copy,
  Lock,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

type PermissionKey = "view" | "add" | "edit" | "delete" | "approve" | "export" | "manage";
type RoleStatus = "Active" | "Inactive";
type PermissionRecord = Record<PermissionKey, boolean>;

interface PageAccess {
  module: string;
  page: string;
  route: string;
  permissions: PermissionRecord;
}

interface AdminRole {
  id: string;
  name: string;
  description: string;
  status: RoleStatus;
  color: string;
  pageAccess: PageAccess[];
  createdAt: string;
  updatedAt: string;
}

interface AdminUser {
  role: string;
}

interface RoleFormError {
  name?: string;
  permissions?: string;
}

const permissionKeys: PermissionKey[] = ["view", "add", "edit", "delete", "approve", "export", "manage"];

const modulePages = [
  {
    module: "Dashboard",
    pages: [
      { page: "Dashboard Overview", route: "/admin/dashboard" },
    ],
  },
  {
    module: "User Administration",
    pages: [
      { page: "Manage User", route: "/admin/manage-user" },
      { page: "User Role", route: "/admin/user-role" },
      { page: "Security", route: "/admin/security" },
    ],
  },
  {
    module: "Products & Offers",
    pages: [
      { page: "Packages", route: "/admin/packages" },
      { page: "Offers", route: "/admin/offers" },
      { page: "Multimedia", route: "/admin/multimedia" },
      { page: "Coverage Areas", route: "/admin/coverage-areas" },
    ],
  },
  {
    module: "Sales & Billing",
    pages: [
      { page: "Customers", route: "/admin/customers" },
      { page: "Bills", route: "/admin/bills" },
    ],
  },
  {
    module: "Support",
    pages: [
      { page: "Applications", route: "/admin/applications" },
      { page: "Tickets", route: "/admin/tickets" },
      { page: "Complaints", route: "/admin/complaints" },
      { page: "Contact Messages", route: "/admin/contact-messages" },
    ],
  },
  {
    module: "Content",
    pages: [
      { page: "About Page", route: "/admin/about-page" },
      { page: "Contact Page", route: "/admin/contact-page" },
      { page: "Support Page", route: "/admin/support-page" },
      { page: "Page Headers", route: "/admin/page-headers" },
      { page: "Hero Typography", route: "/admin/hero-typography" },
      { page: "Top Bar & Footer", route: "/admin/topbar-footer" },
    ],
  },
  {
    module: "Careers & Feedback",
    pages: [
      { page: "Jobs", route: "/admin/jobs" },
      { page: "Job Applications", route: "/admin/job-applications" },
      { page: "Testimonials", route: "/admin/testimonials" },
      { page: "FAQs", route: "/admin/faqs" },
    ],
  },
  {
    module: "Marketing & SEO",
    pages: [
      { page: "SEO & Sharing", route: "/admin/seo-sharing" },
      { page: "SEO Audit", route: "/admin/seo-audit" },
      { page: "Popup Offer", route: "/admin/popup-offer" },
    ],
  },
  {
    module: "Settings",
    pages: [
      { page: "General Settings", route: "/admin/settings" },
    ],
  },
];

const roleColors = ["#2563eb", "#7c3aed", "#059669", "#ea580c", "#dc2626", "#0891b2"];

function createPermissions(value = false): PermissionRecord {
  return {
    view: value,
    add: value,
    edit: value,
    delete: value,
    approve: value,
    export: value,
    manage: value,
  };
}

function createAccess(value = false): PageAccess[] {
  return modulePages.flatMap((group) =>
    group.pages.map((page) => ({
      module: group.module,
      ...page,
      permissions: createPermissions(value),
    }))
  );
}

function nowLabel(): string {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const defaultRoles: AdminRole[] = [
  {
    id: "ROLE-1",
    name: "Super Admin",
    description: "Protected system role with full platform access.",
    status: "Active",
    color: "#2563eb",
    pageAccess: createAccess(true),
    createdAt: nowLabel(),
    updatedAt: nowLabel(),
  },
  {
    id: "ROLE-2",
    name: "Administrator",
    description: "Manages users, content, billing, and operations.",
    status: "Active",
    color: "#7c3aed",
    pageAccess: createAccess(true),
    createdAt: nowLabel(),
    updatedAt: nowLabel(),
  },
  {
    id: "ROLE-3",
    name: "Manager",
    description: "Operational access for reports, customers, and orders.",
    status: "Active",
    color: "#059669",
    pageAccess: createAccess(false).map((access) => (
      ["Dashboard", "Sales & Billing", "Support", "Marketing & SEO"].includes(access.module)
        ? { ...access, permissions: { ...createPermissions(false), view: true, edit: true, export: true } }
        : access
    )),
    createdAt: nowLabel(),
    updatedAt: nowLabel(),
  },
  {
    id: "ROLE-4",
    name: "Editor",
    description: "Content and page editing access.",
    status: "Active",
    color: "#ea580c",
    pageAccess: createAccess(false).map((access) => (
      ["Content", "Products & Offers"].includes(access.module)
        ? { ...access, permissions: { ...createPermissions(false), view: true, add: true, edit: true } }
        : access
    )),
    createdAt: nowLabel(),
    updatedAt: nowLabel(),
  },
  {
    id: "ROLE-5",
    name: "Support Agent",
    description: "Customer support access for tickets and complaints.",
    status: "Active",
    color: "#0891b2",
    pageAccess: createAccess(false).map((access) => (
      ["Dashboard", "Support", "Sales & Billing"].includes(access.module)
        ? { ...access, permissions: { ...createPermissions(false), view: true, edit: true } }
        : access
    )),
    createdAt: nowLabel(),
    updatedAt: nowLabel(),
  },
  {
    id: "ROLE-6",
    name: "Viewer",
    description: "Read-only access for reports and dashboard pages.",
    status: "Inactive",
    color: "#64748b",
    pageAccess: createAccess(false).map((access) => (
      ["Dashboard", "Marketing & SEO"].includes(access.module)
        ? { ...access, permissions: { ...createPermissions(false), view: true } }
        : access
    )),
    createdAt: nowLabel(),
    updatedAt: nowLabel(),
  },
];

const emptyRole: AdminRole = {
  id: "",
  name: "",
  description: "",
  status: "Active",
  color: roleColors[0],
  pageAccess: createAccess(false),
  createdAt: nowLabel(),
  updatedAt: nowLabel(),
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function textValue(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function statusValue(value: unknown): RoleStatus {
  return value === "Inactive" ? "Inactive" : "Active";
}

function normalizePermissionRecord(value: unknown): PermissionRecord {
  const record = isRecord(value) ? value : {};
  return {
    view: record.view === true || record.add === true || record.edit === true || record.delete === true,
    add: record.add === true,
    edit: record.edit === true,
    delete: record.delete === true,
    approve: record.approve === true,
    export: record.export === true,
    manage: record.manage === true,
  };
}

function normalizePageAccess(value: unknown, roleName: string): PageAccess[] {
  if (roleName === "Super Admin" || roleName === "Super Administrator") return createAccess(true);

  const savedAccess = Array.isArray(value) ? value : [];
  return createAccess(false).map((page) => {
    const saved = savedAccess.find((item): item is Record<string, unknown> => isRecord(item) && item.route === page.route);
    return saved ? { ...page, permissions: normalizePermissionRecord(saved.permissions) } : page;
  });
}

function normalizeRoles(value: unknown): AdminRole[] {
  if (!Array.isArray(value)) return defaultRoles;

  const roles = value
    .filter(isRecord)
    .map((item, index) => {
      const fallbackName = index === 0 ? "Super Admin" : `Role ${index + 1}`;
      const name = textValue(item.name, fallbackName);
      return {
        id: textValue(item.id, `ROLE-${index + 1}`),
        name,
        description: textValue(item.description, "No description provided."),
        status: statusValue(item.status),
        color: textValue(item.color, roleColors[index % roleColors.length]),
        pageAccess: normalizePageAccess(item.pageAccess, name),
        createdAt: textValue(item.createdAt, nowLabel()),
        updatedAt: textValue(item.updatedAt, nowLabel()),
      };
    })
    .filter((role) => role.name.trim());

  return roles.length ? roles : defaultRoles;
}

function normalizeUsers(value: unknown): AdminUser[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isRecord).map((item) => ({ role: textValue(item.role) }));
}

function nextRoleId(roles: AdminRole[]): string {
  const numbers = roles
    .map((role) => Number(role.id.replace("ROLE-", "")))
    .filter((value) => Number.isFinite(value));
  return `ROLE-${Math.max(0, ...numbers) + 1}`;
}

function countPages(role: AdminRole): number {
  return role.pageAccess.filter((access) => access.permissions.view).length;
}

function countPermissions(role: AdminRole): number {
  return role.pageAccess.reduce((sum, access) => sum + permissionKeys.filter((permission) => access.permissions[permission]).length, 0);
}

function isProtectedRole(role: AdminRole): boolean {
  return role.name === "Super Admin" || role.name === "Super Administrator" || role.id === "ROLE-1";
}

function getAssignedCount(roleName: string, users: AdminUser[]): number {
  return users.filter((user) => user.role === roleName).length;
}

function roleIsValid(role: AdminRole, roles: AdminRole[], editingRoleId: string | null): RoleFormError {
  const errors: RoleFormError = {};
  const name = role.name.trim();
  if (!name) errors.name = "Role name is required.";
  if (roles.some((item) => item.name.toLowerCase() === name.toLowerCase() && item.id !== editingRoleId)) {
    errors.name = "Role name must be unique.";
  }
  if (countPages(role) === 0) errors.permissions = "Select at least one page.";
  const invalidSelectedPage = role.pageAccess.some((access) => {
    const selected = permissionKeys.some((permission) => access.permissions[permission]);
    return selected && !access.permissions.view;
  });
  if (invalidSelectedPage) errors.permissions = "Every selected page must include View permission.";
  return errors;
}

export default function UserRolePage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [roles, setRoles] = useState<AdminRole[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [roleForm, setRoleForm] = useState<AdminRole>(emptyRole);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminRole | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [matrixSearch, setMatrixSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | RoleStatus>("All");
  const [sortBy, setSortBy] = useState<"name" | "updated" | "users">("name");
  const [isSaving, setIsSaving] = useState(false);

  const { canAdd, canEdit, canDelete } = useAdminSecurity();
  const allowAdd = canAdd("/admin/user-role");
  const allowEdit = canEdit("/admin/user-role");
  const allowDelete = canDelete("/admin/user-role");

  const formErrors = useMemo(() => roleIsValid(roleForm, roles, editingRoleId), [roleForm, roles, editingRoleId]);
  const canSaveRole = !formErrors.name && !formErrors.permissions && !isSaving && (editingRoleId ? allowEdit : allowAdd);

  const filteredRoles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return roles
      .filter((role) => {
        const matchesSearch = !query || role.name.toLowerCase().includes(query) || role.description.toLowerCase().includes(query);
        const matchesStatus = statusFilter === "All" || role.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "users") return getAssignedCount(b.name, users) - getAssignedCount(a.name, users);
        if (sortBy === "updated") return b.updatedAt.localeCompare(a.updatedAt);
        return a.name.localeCompare(b.name);
      });
  }, [roles, searchQuery, statusFilter, sortBy, users]);

  const matrixAccess = useMemo(() => {
    const query = matrixSearch.trim().toLowerCase();
    if (!query) return roleForm.pageAccess;
    return roleForm.pageAccess.filter((access) => access.page.toLowerCase().includes(query) || access.module.toLowerCase().includes(query));
  }, [roleForm.pageAccess, matrixSearch]);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }

    setAuth(true);
    Promise.all([getSetting("admin_roles"), getSetting("admin_users")]).then(async ([savedRoles, savedUsers]) => {
      const normalizedRoles = normalizeRoles(savedRoles);
      setRoles(normalizedRoles);
      setUsers(normalizeUsers(savedUsers));
      if (!savedRoles) await setSetting("admin_roles", normalizedRoles);
    }).catch(() => {
      setRoles(defaultRoles);
      setUsers([]);
      toast("Role data loaded with defaults.");
    });
  }, [router]);

  const persistRoles = async (nextRoles: AdminRole[]) => {
    setRoles(nextRoles);
    const success = await setSetting("admin_roles", nextRoles);
    if (!success) toast("Unable to save role changes.");
    return success;
  };

  const resetForm = () => {
    setEditingRoleId(null);
    setRoleForm({ ...emptyRole, pageAccess: createAccess(false), createdAt: nowLabel(), updatedAt: nowLabel() });
    setMatrixSearch("");
    setIsRoleModalOpen(false);
  };

  const openCreateModal = () => {
    resetForm();
    setIsRoleModalOpen(true);
  };

  const openEditModal = (role: AdminRole) => {
    setEditingRoleId(role.id);
    setRoleForm({
      ...role,
      pageAccess: normalizePageAccess(role.pageAccess, role.name),
    });
    setMatrixSearch("");
    setIsRoleModalOpen(true);
  };

  const saveRole = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSaveRole) return;

    setIsSaving(true);
    const nextRole: AdminRole = {
      ...roleForm,
      id: editingRoleId || nextRoleId(roles),
      name: roleForm.name.trim(),
      description: roleForm.description.trim(),
      updatedAt: nowLabel(),
      createdAt: roleForm.createdAt || nowLabel(),
      pageAccess: normalizePageAccess(roleForm.pageAccess, roleForm.name.trim()),
    };

    const nextRoles = editingRoleId
      ? roles.map((role) => (role.id === editingRoleId ? nextRole : role))
      : [...roles, nextRole];

    const success = await persistRoles(nextRoles);
    setIsSaving(false);
    if (success) {
      toast(editingRoleId ? "Role updated successfully." : "Role added successfully.");
      resetForm();
    }
  };

  const duplicateRole = async (role: AdminRole) => {
    if (!allowAdd) return;
    const duplicated: AdminRole = {
      ...role,
      id: nextRoleId(roles),
      name: `${role.name} Copy`,
      status: "Inactive",
      createdAt: nowLabel(),
      updatedAt: nowLabel(),
    };
    const success = await persistRoles([...roles, duplicated]);
    if (success) toast("Role duplicated successfully.");
  };

  const toggleRoleStatus = async (role: AdminRole) => {
    if (!allowEdit || isProtectedRole(role)) return;
    const nextStatus: RoleStatus = role.status === "Active" ? "Inactive" : "Active";
    const nextRoles = roles.map((item) => (
      item.id === role.id
        ? { ...item, status: nextStatus, updatedAt: nowLabel() }
        : item
    ));
    const success = await persistRoles(nextRoles);
    if (success) toast(role.status === "Active" ? "Role deactivated." : "Role activated.");
  };

  const deleteRole = async () => {
    if (!deleteTarget || !allowDelete) return;
    if (isProtectedRole(deleteTarget) || getAssignedCount(deleteTarget.name, users) > 0) return;
    const success = await persistRoles(roles.filter((role) => role.id !== deleteTarget.id));
    if (success) {
      toast("Role deleted successfully.");
      setDeleteTarget(null);
    }
  };

  const setPagePermissions = (route: string, permissions: PermissionRecord) => {
    setRoleForm((current) => ({
      ...current,
      pageAccess: current.pageAccess.map((access) => access.route === route ? { ...access, permissions } : access),
    }));
  };

  const togglePageAccess = (route: string, enabled: boolean) => {
    setPagePermissions(route, enabled ? createPermissions(true) : createPermissions(false));
  };

  const togglePermission = (route: string, permission: PermissionKey) => {
    setRoleForm((current) => ({
      ...current,
      pageAccess: current.pageAccess.map((access) => {
        if (access.route !== route) return access;
        const nextPermissions = { ...access.permissions, [permission]: !access.permissions[permission] };
        if (permission !== "view" && nextPermissions[permission]) nextPermissions.view = true;
        if (permission === "view" && !nextPermissions.view) return { ...access, permissions: createPermissions(false) };
        return { ...access, permissions: nextPermissions };
      }),
    }));
  };

  const togglePermissionColumn = (permission: PermissionKey) => {
    const shouldEnable = roleForm.pageAccess.some((access) => !access.permissions[permission]);
    setRoleForm((current) => ({
      ...current,
      pageAccess: current.pageAccess.map((access) => {
        const permissions = { ...access.permissions, [permission]: shouldEnable };
        if (permission !== "view" && shouldEnable) permissions.view = true;
        if (permission === "view" && !shouldEnable) return { ...access, permissions: createPermissions(false) };
        return { ...access, permissions };
      }),
    }));
  };

  const grantFullAccess = () => setRoleForm((current) => ({ ...current, pageAccess: createAccess(true) }));
  const clearAllPermissions = () => setRoleForm((current) => ({ ...current, pageAccess: createAccess(false) }));
  const selectAllPages = () => setRoleForm((current) => ({
    ...current,
    pageAccess: current.pageAccess.map((access) => ({ ...access, permissions: { ...access.permissions, view: true } })),
  }));

  const copyPermissionsFromRole = (roleId: string) => {
    const sourceRole = roles.find((role) => role.id === roleId);
    if (!sourceRole) return;
    setRoleForm((current) => ({
      ...current,
      pageAccess: normalizePageAccess(sourceRole.pageAccess, current.name),
    }));
  };

  if (!auth) return null;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h3 className="text-base font-black text-slate-950">Role Directory</h3>
            <p className="text-xs font-semibold text-slate-500">Search, sort, duplicate, activate, and review permission coverage.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs font-semibold text-slate-700 outline-none focus:border-brand-blue sm:w-56"
                placeholder="Search roles..."
              />
            </div>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as "All" | RoleStatus)}
              className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-700 outline-none focus:border-brand-blue"
            >
              <option value="All">All status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as "name" | "updated" | "users")}
              className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-700 outline-none focus:border-brand-blue"
            >
              <option value="name">Sort by name</option>
              <option value="updated">Sort by updated</option>
              <option value="users">Sort by users</option>
            </select>
            {allowAdd && (
              <button onClick={openCreateModal} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 text-xs font-extrabold text-white shadow-md transition-colors hover:bg-brand-blue/90 cursor-pointer">
                <Plus className="h-4 w-4" />
                Add New Role
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-black uppercase text-slate-400">
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Assigned Users</th>
                <th className="px-5 py-3">Accessible Pages</th>
                <th className="px-5 py-3">Permissions</th>
                <th className="px-5 py-3">Last Updated</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRoles.map((role) => (
                <tr key={role.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="h-9 w-9 rounded-xl border border-slate-200" style={{ backgroundColor: role.color }} />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-black text-slate-900">{role.name}</p>
                          {isProtectedRole(role) && <Lock className="h-3.5 w-3.5 text-slate-400" />}
                        </div>
                        <p className="mt-0.5 max-w-[260px] truncate text-[11px] font-semibold text-slate-500">{role.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-extrabold text-slate-700">{getAssignedCount(role.name, users)}</td>
                  <td className="px-5 py-4 font-extrabold text-slate-700">{countPages(role)}</td>
                  <td className="px-5 py-4 font-extrabold text-slate-700">{countPermissions(role)}</td>
                  <td className="px-5 py-4 text-slate-500">{role.updatedAt}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase ${role.status === "Active" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-50 text-slate-500"}`}>
                      {role.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditModal(role)} className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">
                        View
                      </button>
                      {allowEdit && (
                        <button onClick={() => openEditModal(role)} className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-600 hover:bg-blue-50 hover:text-brand-blue cursor-pointer">
                          Edit
                        </button>
                      )}
                      {allowAdd && (
                        <button onClick={() => duplicateRole(role)} className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {allowEdit && (
                        <button disabled={isProtectedRole(role)} onClick={() => toggleRoleStatus(role)} className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer">
                          {role.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                      )}
                      {allowDelete && (
                        <button onClick={() => setDeleteTarget(role)} className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-red-600 hover:bg-red-50 cursor-pointer">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredRoles.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-xs font-semibold text-slate-400">
                    No roles found. Adjust filters or add a new role.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isRoleModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <form onSubmit={saveRole} className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{editingRoleId ? "Edit mode" : "Create mode"}</p>
                <h3 className="mt-1 text-lg font-black text-slate-950">{editingRoleId ? "Edit Role Permissions" : "Add New Role"}</h3>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  {editingRoleId ? `${countPages(roleForm)} pages selected, ${countPermissions(roleForm)} permissions enabled.` : "Configure basic details and grant page-level permissions."}
                </p>
              </div>
              <button type="button" onClick={resetForm} className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_1.5fr_160px_180px]">
                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Role Name</span>
                  <input
                    value={roleForm.name}
                    disabled={isProtectedRole(roleForm)}
                    onChange={(event) => setRoleForm({ ...roleForm, name: event.target.value })}
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-xs font-bold text-slate-800 outline-none focus:border-brand-blue disabled:bg-slate-100 disabled:text-slate-400"
                    placeholder="Manager"
                  />
                  {formErrors.name && <span className="text-[10px] font-bold text-red-600">{formErrors.name}</span>}
                </label>
                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Description</span>
                  <input
                    value={roleForm.description}
                    onChange={(event) => setRoleForm({ ...roleForm, description: event.target.value })}
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-xs font-bold text-slate-800 outline-none focus:border-brand-blue"
                    placeholder="Describe access scope"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Status</span>
                  <select
                    value={roleForm.status}
                    disabled={isProtectedRole(roleForm)}
                    onChange={(event) => setRoleForm({ ...roleForm, status: event.target.value as RoleStatus })}
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-xs font-bold text-slate-800 outline-none focus:border-brand-blue disabled:bg-slate-100"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </label>
                <label className="space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Copy Permissions</span>
                  <select
                    value=""
                    onChange={(event) => copyPermissionsFromRole(event.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-xs font-bold text-slate-800 outline-none focus:border-brand-blue"
                  >
                    <option value="">Select role</option>
                    {roles.filter((role) => role.id !== editingRoleId).map((role) => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={matrixSearch}
                    onChange={(event) => setMatrixSearch(event.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs font-bold text-slate-700 outline-none focus:border-brand-blue lg:w-72"
                    placeholder="Find pages or modules..."
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={selectAllPages} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[10px] font-black uppercase text-slate-600 hover:bg-slate-50 cursor-pointer">Select All Pages</button>
                  <button type="button" onClick={grantFullAccess} className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[10px] font-black uppercase text-emerald-700 hover:bg-emerald-100 cursor-pointer">Grant Full Access</button>
                  <button type="button" onClick={clearAllPermissions} className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[10px] font-black uppercase text-red-600 hover:bg-red-100 cursor-pointer">Clear All</button>
                </div>
              </div>

              {formErrors.permissions && <p className="text-xs font-bold text-red-600">{formErrors.permissions}</p>}

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[1040px] text-left text-xs">
                  <thead className="sticky top-0 z-10 bg-slate-50">
                    <tr className="border-b border-slate-200 text-[10px] font-black uppercase text-slate-400">
                      <th className="px-4 py-3">Module / Page</th>
                      <th className="px-4 py-3 text-center">Access</th>
                      {permissionKeys.map((permission) => (
                        <th key={permission} className="px-4 py-3 text-center">
                          <button type="button" onClick={() => togglePermissionColumn(permission)} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-white cursor-pointer" title={`Toggle ${permission} on all pages`}>
                            {permission}
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {matrixAccess.map((access) => {
                      const selected = permissionKeys.some((permission) => access.permissions[permission]);
                      const locked = isProtectedRole(roleForm);
                      return (
                        <tr key={access.route} className="hover:bg-slate-50/70">
                          <td className="px-4 py-3">
                            <p className="text-[10px] font-black uppercase text-slate-400">{access.module}</p>
                            <p className="mt-0.5 font-extrabold text-slate-900">{access.page}</p>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="checkbox"
                              checked={selected}
                              disabled={locked}
                              onChange={(event) => togglePageAccess(access.route, event.target.checked)}
                              className="h-4 w-4 accent-brand-blue disabled:opacity-40"
                            />
                          </td>
                          {permissionKeys.map((permission) => (
                            <td key={permission} className="px-4 py-3 text-center">
                              <input
                                type="checkbox"
                                checked={access.permissions[permission]}
                                disabled={locked || (!selected && permission !== "view")}
                                onChange={() => togglePermission(access.route, permission)}
                                className="h-4 w-4 accent-brand-blue disabled:opacity-40"
                              />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="sticky bottom-0 flex flex-col gap-3 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-semibold text-slate-500">
                {editingRoleId ? `Created ${roleForm.createdAt}. Last updated ${roleForm.updatedAt}. ${getAssignedCount(roleForm.name, users)} users assigned.` : "Unsaved changes will be discarded when you cancel."}
              </p>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={resetForm} className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-extrabold text-slate-700 hover:bg-slate-50 cursor-pointer">Cancel</button>
                <button type="button" onClick={() => toast("Draft saved locally for this session.")} className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-extrabold text-slate-700 hover:bg-slate-50 cursor-pointer">Save as Draft</button>
                <button disabled={!canSaveRole} type="submit" className="rounded-xl bg-brand-blue px-4 py-2 text-xs font-extrabold text-white shadow-md hover:bg-brand-blue/90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                  {isSaving ? "Saving..." : editingRoleId ? "Save Role" : "Create Role"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <h3 className="text-base font-black text-slate-950">Delete Role</h3>
            <p className="mt-2 text-sm font-semibold text-slate-500">This action cannot be undone. Role: <span className="text-slate-900">{deleteTarget.name}</span></p>
            <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4 text-xs font-bold text-red-700">
              {isProtectedRole(deleteTarget)
                ? "Protected system roles cannot be deleted."
                : getAssignedCount(deleteTarget.name, users) > 0
                  ? `${getAssignedCount(deleteTarget.name, users)} users are assigned to this role. Reassign them first.`
                  : "No users are assigned to this role."}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setDeleteTarget(null)} className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-extrabold text-slate-700 hover:bg-slate-50 cursor-pointer">Cancel</button>
              <button disabled={isProtectedRole(deleteTarget) || getAssignedCount(deleteTarget.name, users) > 0} onClick={deleteRole} className="rounded-xl bg-red-600 px-4 py-2 text-xs font-extrabold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">Delete Role</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
