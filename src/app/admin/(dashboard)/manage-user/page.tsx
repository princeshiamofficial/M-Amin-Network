"use client";

import { toast } from "sonner";
import React, { useEffect, useMemo, useState } from "react";
import { getSetting, setSetting } from "@/actions/content";
import { useRouter } from "next/navigation";
import { useAdminSecurity } from "@/hooks/useAdminSecurity";
import Image from "next/image";
import {
  PlusCircle,
  UserX,
  UserCheck,
  AlertTriangle,
  MoreVertical,
  Edit,
  Trash2,
  Search,
  X,
  KeyRound,
  Eye,
  EyeOff,
  UserCog,
  Edit3,
  UploadCloud,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

interface AdminUser {
  id: string;
  username: string;
  role: string;
  email: string;
  lastLogin: string;
  status: "Active" | "Banned";
  avatarUrl?: string;
  password?: string;
  phone?: string;
  address?: string;
  companyName?: string;
}

interface AdminRole {
  id: string;
  name: string;
  color?: string;
}

const defaultAdminUsers: AdminUser[] = [
  { id: "USR-1", username: "admin", role: "Super Administrator", email: "admin@maminnetwork.test", lastLogin: "7/3/2026, 10:30 AM", status: "Active" },
  { id: "USR-2", username: "moderator_support", role: "Support Staff", email: "support@maminnetwork.test", lastLogin: "7/2/2026, 04:15 PM", status: "Active" },
];

const defaultAdminRoles: AdminRole[] = [
  { id: "ROLE-1", name: "Super Administrator", color: "#3b82f6" },
  { id: "ROLE-2", name: "Support Staff", color: "#10b981" },
];

const emptyUser: AdminUser = {
  id: "",
  username: "",
  role: "Support Staff",
  email: "",
  lastLogin: "Never",
  status: "Active",
  avatarUrl: "",
  password: "password",
  phone: "",
  address: "",
  companyName: "Color Hut",
};

const avatarColors = ["#2563eb", "#7c3aed", "#059669", "#ea580c", "#dc2626", "#0891b2"];

function getInitials(name: string): string {
  if (!name) return "??";
  return name.slice(0, 2).toUpperCase();
}

function getAvatarBg(username: string): string {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

function getContrastTextColor(hexcolor: string): string {
  if (!hexcolor || hexcolor === "transparent") return "#1e293b";
  const rhex = hexcolor.replace("#", "");
  if (rhex.length !== 6) return "#ffffff";
  const r = parseInt(rhex.substr(0, 2), 16);
  const g = parseInt(rhex.substr(2, 2), 16);
  const b = parseInt(rhex.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#0f172a" : "#ffffff";
}

function statusValue(value: unknown): "Active" | "Banned" {
  return value === "Banned" ? "Banned" : "Active";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function textValue(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function normalizeUsers(value: unknown): AdminUser[] {
  if (!Array.isArray(value)) return defaultAdminUsers;

  const users = value.filter(isRecord).map((item, index) => ({
    id: textValue(item.id, `USR-${index + 1}`),
    username: textValue(item.username, "admin_user"),
    role: textValue(item.role, "Support Staff"),
    email: textValue(item.email),
    lastLogin: textValue(item.lastLogin, "Never"),
    status: statusValue(item.status),
    avatarUrl: textValue(item.avatarUrl, ""),
    password: textValue(item.password, "password"),
    phone: textValue(item.phone, ""),
    address: textValue(item.address, ""),
    companyName: textValue(item.companyName, "Color Hut"),
  }));

  return users.length ? users : defaultAdminUsers;
}

function normalizeRoles(value: unknown): AdminRole[] {
  if (!Array.isArray(value)) return defaultAdminRoles;

  const roles = value.filter(isRecord).map((item, index) => ({
    id: textValue(item.id, `ROLE-${index + 1}`),
    name: textValue(item.name, index === 0 ? "Super Administrator" : "Support Staff"),
    color: textValue(item.color, index === 0 ? "#3b82f6" : "#10b981"),
  })).filter((role) => role.name.trim());

  return roles.length ? roles : defaultAdminRoles;
}

function nextUserId(users: AdminUser[]): string {
  const numbers = users
    .map((user) => Number(user.id.replace("USR-", "")))
    .filter((value) => Number.isFinite(value));

  return `USR-${Math.max(0, ...numbers) + 1}`;
}

export default function ManageUserPage() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [adminRoles, setAdminRoles] = useState<AdminRole[]>(defaultAdminRoles);
  
  // Dialog Open/Close States
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditInfoOpen, setIsEditInfoOpen] = useState(false);
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isSetAvatarOpen, setIsSetAvatarOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  // Selected item tracking
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Form Fields States
  const [addForm, setAddForm] = useState<AdminUser>(emptyUser);
  const [editInfoForm, setEditInfoForm] = useState({ username: "", email: "", phone: "", address: "", companyName: "" });
  const [editRoleValue, setEditRoleValue] = useState("");
  const [passwordForm, setPasswordForm] = useState({ password: "", confirmPassword: "" });
  const [avatarFormValue, setAvatarFormValue] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Active" | "Banned">("Active");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { canAdd, canEdit, canDelete } = useAdminSecurity();
  const allowAdd = canAdd("/admin/manage-user");
  const allowEdit = canEdit("/admin/manage-user");
  const allowDelete = canDelete("/admin/manage-user");

  const roleNames = useMemo(() => adminRoles.map((role) => role.name), [adminRoles]);

  const roleColorsMap = useMemo(() => {
    return new Map(adminRoles.map((r) => [r.name, r.color || "#6b7280"]));
  }, [adminRoles]);

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return adminUsers
      .filter((user) => {
        const matchesSearch = !query || user.username.toLowerCase().includes(query) || user.email.toLowerCase().includes(query) || user.role.toLowerCase().includes(query);
        const matchesStatus = statusFilter === "all" || user.status === statusFilter;
        return matchesSearch && matchesStatus;
      });
  }, [adminUsers, searchTerm, statusFilter]);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      router.replace("/admin");
      return;
    }

    setAuth(true);
    Promise.all([getSetting("admin_users"), getSetting("admin_roles")]).then(async ([savedUsers, savedRoles]) => {
      const users = normalizeUsers(savedUsers);
      const roles = normalizeRoles(savedRoles);
      setAdminUsers(users);
      setAdminRoles(roles);
      setAddForm((current) => ({ ...current, role: roles[1]?.name || roles[0]?.name || "Support Staff" }));

      if (!savedUsers) await setSetting("admin_users", users);
    }).catch(() => {
      setAdminUsers(defaultAdminUsers);
      setAdminRoles(defaultAdminRoles);
      toast("Manage user data loaded with defaults.");
    });
  }, [router]);

  const persistUsers = async (users: AdminUser[]) => {
    setAdminUsers(users);
    const success = await setSetting("admin_users", users);
    if (!success) toast("Unable to save user changes.");
    return success;
  };

  const openCreateModal = () => {
    setAddForm(emptyUser);
    setIsAddUserOpen(true);
  };

  const resetForm = () => {
    setSelectedUser(null);
    setAddForm(emptyUser);
    setIsAddUserOpen(false);
    setIsEditInfoOpen(false);
    setIsEditRoleOpen(false);
    setIsChangePasswordOpen(false);
    setIsSetAvatarOpen(false);
    setDeleteTarget(null);
  };

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast("File too large. Please select an image smaller than 5MB.");
      return;
    }
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      toast("Invalid file type. Only JPG, PNG, WEBP, GIF allowed.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-user-avatar", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        if (isAddUserOpen) {
          setAddForm((curr) => ({ ...curr, avatarUrl: data.url }));
        } else {
          setAvatarFormValue(data.url);
        }
        toast("Image uploaded successfully.");
      } else {
        toast(data.error || "Upload failed.");
      }
    } catch {
      toast("Upload error occurred.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Actions click triggers
  const triggerEditInfo = (user: AdminUser) => {
    setSelectedUser(user);
    setEditInfoForm({
      username: user.username,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
      companyName: user.companyName || "Color Hut",
    });
    setIsEditInfoOpen(true);
  };

  const triggerEditRole = (user: AdminUser) => {
    setSelectedUser(user);
    setEditRoleValue(user.role);
    setIsEditRoleOpen(true);
  };

  const triggerChangePassword = (user: AdminUser) => {
    setSelectedUser(user);
    setPasswordForm({ password: "", confirmPassword: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setIsChangePasswordOpen(true);
  };

  const triggerSetAvatar = (user: AdminUser) => {
    setSelectedUser(user);
    setAvatarFormValue(user.avatarUrl || "");
    setIsSetAvatarOpen(true);
  };

  // Submit Operations
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.username.trim() || !addForm.email.trim() || !addForm.role.trim()) {
      toast("Please complete username, email, and role.");
      return;
    }
    setIsSaving(true);
    const newUser: AdminUser = {
      id: nextUserId(adminUsers),
      username: addForm.username.trim(),
      email: addForm.email.trim(),
      role: addForm.role,
      lastLogin: "Never",
      status: "Active",
      phone: addForm.phone?.trim() || "",
      address: addForm.address?.trim() || "",
      companyName: addForm.companyName?.trim() || "Color Hut",
      password: addForm.password || "password",
      avatarUrl: addForm.avatarUrl?.trim() || "",
    };
    const updated = [...adminUsers, newUser];
    const success = await persistUsers(updated);
    setIsSaving(false);
    if (success) {
      toast("User Added. New user has been added.");
      setIsAddUserOpen(false);
      setAddForm(emptyUser);
    }
  };

  const handleEditInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    if (!editInfoForm.username.trim() || !editInfoForm.email.trim()) {
      toast("Name and Email are required.");
      return;
    }
    setIsSaving(true);
    const updated = adminUsers.map((u) => {
      if (u.id === selectedUser.id) {
        return {
          ...u,
          username: editInfoForm.username.trim(),
          email: editInfoForm.email.trim(),
          phone: editInfoForm.phone.trim(),
          address: editInfoForm.address.trim(),
          companyName: editInfoForm.companyName.trim(),
        };
      }
      return u;
    });
    const success = await persistUsers(updated);
    setIsSaving(false);
    if (success) {
      toast("User Info Updated. User's information has been updated.");
      setIsEditInfoOpen(false);
      setSelectedUser(null);
    }
  };

  const handleEditRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setIsSaving(true);
    const updated = adminUsers.map((u) => {
      if (u.id === selectedUser.id) {
        return { ...u, role: editRoleValue };
      }
      return u;
    });
    const success = await persistUsers(updated);
    setIsSaving(false);
    if (success) {
      toast("Role Updated. User role has been updated.");
      setIsEditRoleOpen(false);
      setSelectedUser(null);
    }
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    if (!passwordForm.password || passwordForm.password !== passwordForm.confirmPassword) {
      toast("Passwords must match.");
      return;
    }
    if (passwordForm.password.length < 6) {
      toast("Password must be at least 6 characters.");
      return;
    }
    setIsSaving(true);
    const updated = adminUsers.map((u) => {
      if (u.id === selectedUser.id) {
        return { ...u, password: passwordForm.password };
      }
      return u;
    });
    const success = await persistUsers(updated);
    setIsSaving(false);
    if (success) {
      toast("Password Updated. Password for user has been updated successfully.");
      setIsChangePasswordOpen(false);
      setSelectedUser(null);
    }
  };

  const handleSetAvatarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setIsSaving(true);
    const updated = adminUsers.map((u) => {
      if (u.id === selectedUser.id) {
        return { ...u, avatarUrl: avatarFormValue.trim() || undefined };
      }
      return u;
    });
    const success = await persistUsers(updated);
    setIsSaving(false);
    if (success) {
      toast("Avatar Updated. User's avatar has been set.");
      setIsSetAvatarOpen(false);
      setSelectedUser(null);
    }
  };

  const deleteUser = async () => {
    if (!deleteTarget || !allowDelete) return;
    if (deleteTarget.id === "USR-1") {
      toast("Primary Super Administrator cannot be deleted.");
      return;
    }

    const updated = adminUsers.filter((user) => user.id !== deleteTarget.id);
    const success = await persistUsers(updated);
    if (success) {
      toast(`User Deleted. User ${deleteTarget.username} has been successfully deleted.`);
      setDeleteTarget(null);
    }
  };

  const toggleBanUser = async (user: AdminUser) => {
    if (!allowEdit) return;
    if (user.id === "USR-1") {
      toast("Primary Super Administrator cannot be banned.");
      return;
    }

    const updated: AdminUser[] = adminUsers.map((item) => (
      item.id === user.id ? { ...item, status: item.status === "Banned" ? "Active" : "Banned" } : item
    ));
    const changedUser = updated.find((item) => item.id === user.id);
    const success = await persistUsers(updated);
    if (success && changedUser) {
      toast(changedUser.status === "Banned" ? `User Banned. ${user.username} has been banned.` : `User Unbanned. ${user.username} has been unbanned.`);
    }
  };

  if (!auth) return null;

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Users Card Directory */}
      <div className="shadow-xl border border-slate-200 bg-white rounded-lg">
        {/* Sticky Header Panel */}
        <div className="sticky top-[4.5rem] z-20 bg-white/95 backdrop-blur-sm border-b border-slate-100 p-5 rounded-t-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-bold text-slate-900">All Users</h2>
            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
              <div className="relative flex-grow w-full sm:w-auto sm:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs font-semibold text-slate-700 outline-none focus:border-brand-blue sm:w-56"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "all" | "Active" | "Banned")}
                className="h-10 rounded-md border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 outline-none focus:border-brand-blue"
              >
                <option value="Active">Active</option>
                <option value="Banned">Banned</option>
                <option value="all">All Users</option>
              </select>
              {allowAdd && (
                <button
                  onClick={openCreateModal}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white px-4 text-xs font-extrabold cursor-pointer shadow-sm transition-colors"
                >
                  <PlusCircle className="h-4 w-4 text-white" />
                  Add New User
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-black uppercase text-slate-400">
                <th className="pl-6 py-3 w-[50px]">SL</th>
                <th className="py-3 w-[80px]">Avatar</th>
                <th className="py-3 min-w-[150px]">Name</th>
                <th className="py-3 min-w-[200px]">Email</th>
                <th className="py-3 min-w-[120px]">Role</th>
                <th className="py-3 min-w-[100px]">Status</th>
                <th className="py-3 min-w-[150px]">Last Login</th>
                {(allowEdit || allowDelete) && <th className="pr-6 py-3 text-right min-w-[80px]">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user, index) => {
                const badgeColor = roleColorsMap.get(user.role) || "#6b7280";
                const textColor = getContrastTextColor(badgeColor);

                return (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="pl-6 py-4 font-mono text-slate-400">{index + 1}</td>
                    <td className="py-4">
                      {user.avatarUrl ? (
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200 shadow-sm">
                          <Image
                            src={user.avatarUrl}
                            alt={user.username}
                            width={40}
                            height={40}
                            unoptimized
                            className="object-cover h-full w-full"
                          />
                        </div>
                      ) : (
                        <div
                          className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-white text-[11px] shadow-sm border border-slate-200"
                          style={{ backgroundColor: getAvatarBg(user.username) }}
                        >
                          {getInitials(user.username)}
                        </div>
                      )}
                    </td>
                    <td className="py-4 font-semibold text-slate-900">{user.username}</td>
                    <td className="py-4 text-slate-500 font-mono">{user.email}</td>
                    <td className="py-4">
                      <span
                        style={{ backgroundColor: badgeColor, color: textColor }}
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4">
                      {user.status === "Banned" ? (
                        <span className="inline-flex items-center rounded-full bg-red-500/20 text-red-700 px-2.5 py-0.5 text-[10px] font-bold">
                          Banned
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-green-500/20 text-green-700 px-2.5 py-0.5 text-[10px] font-bold">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-slate-500">{user.lastLogin}</td>
                    {(allowEdit || allowDelete) && (
                      <td className="pr-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="h-9 w-9 inline-flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer transition-colors outline-none">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 bg-white border border-slate-200 rounded-lg p-1 shadow-md z-[999] animate-in fade-in slide-in-from-top-1">
                            <DropdownMenuLabel>Actions for {user.username}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                              {allowEdit && (
                                <>
                                  <DropdownMenuItem
                                    onSelect={() => triggerEditInfo(user)}
                                    className="cursor-pointer"
                                  >
                                    <Edit3 className="mr-2 h-4 w-4 text-slate-400" /> Edit Info
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    disabled={user.id === "USR-1"}
                                    onSelect={() => toggleBanUser(user)}
                                    className={`cursor-pointer ${
                                      user.status === "Banned"
                                        ? "text-emerald-600 focus:text-emerald-700"
                                        : "text-red-600 focus:text-red-700"
                                    }`}
                                  >
                                    {user.status === "Banned" ? (
                                      <UserCheck className="mr-2 h-4 w-4" />
                                    ) : (
                                      <UserX className="mr-2 h-4 w-4" />
                                    )}
                                    {user.status === "Banned" ? "Unban User" : "Ban User"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onSelect={() => triggerSetAvatar(user)}
                                    className="cursor-pointer"
                                  >
                                    <UserCog className="mr-2 h-4 w-4 text-slate-400" /> Set Avatar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onSelect={() => triggerChangePassword(user)}
                                    className="cursor-pointer"
                                  >
                                    <KeyRound className="mr-2 h-4 w-4 text-slate-400" /> Change Password
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onSelect={() => triggerEditRole(user)}
                                    className="cursor-pointer"
                                  >
                                    <Edit className="mr-2 h-4 w-4 text-slate-400" /> Edit Role
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuGroup>
                            {allowDelete && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  disabled={user.id === "USR-1"}
                                  onSelect={() => setDeleteTarget(user)}
                                  className="cursor-pointer text-red-600 focus:text-red-700"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete User
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    )}
                  </tr>
                );
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-xs font-semibold text-slate-400">
                    No users match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <form onSubmit={handleAddSubmit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl space-y-4 text-left relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={resetForm}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer w-7 h-7 rounded-full hover:bg-slate-50 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-orange-500" />
                Add New User
              </h3>
              <p className="text-xs text-slate-500">Configure basic details and grant page-level permissions.</p>
            </div>

            <div className="space-y-3 py-2 max-h-[60vh] overflow-y-auto pr-1">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Name</label>
                <input
                  value={addForm.username}
                  onChange={(e) => setAddForm({ ...addForm, username: e.target.value })}
                  required
                  className="w-full h-10 px-3 border border-slate-200 rounded-md text-xs font-medium outline-none focus:border-brand-blue bg-white"
                  placeholder="Enter name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Email Address</label>
                <input
                  type="email"
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                  required
                  className="w-full h-10 px-3 border border-slate-200 rounded-md text-xs font-medium outline-none focus:border-brand-blue bg-white"
                  placeholder="Enter email"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Phone</label>
                <input
                  value={addForm.phone}
                  onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                  className="w-full h-10 px-3 border border-slate-200 rounded-md text-xs font-medium outline-none focus:border-brand-blue bg-white"
                  placeholder="Phone number"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Assigned Role</label>
                <select
                  value={addForm.role}
                  onChange={(e) => setAddForm({ ...addForm, role: e.target.value })}
                  className="w-full h-10 px-3 border border-slate-200 rounded-md text-xs font-medium outline-none focus:border-brand-blue bg-white cursor-pointer"
                >
                  {roleNames.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <input
                  type="password"
                  value={addForm.password}
                  onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
                  className="w-full h-10 px-3 border border-slate-200 rounded-md text-xs font-medium outline-none focus:border-brand-blue bg-white"
                  placeholder="password"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Avatar Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50 gap-2 shrink-0"
                  >
                    <UploadCloud className="h-4 w-4" />
                    {isUploading ? "Uploading..." : "Upload File"}
                  </button>
                  <input
                    value={addForm.avatarUrl}
                    onChange={(e) => setAddForm({ ...addForm, avatarUrl: e.target.value })}
                    className="flex-grow h-10 px-3 border border-slate-200 rounded-md text-xs font-medium outline-none focus:border-brand-blue bg-white"
                    placeholder="Or enter image URL"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex h-9 items-center justify-center rounded-md bg-orange-500 hover:bg-orange-600 text-white px-4 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Info Dialog */}
      {isEditInfoOpen && selectedUser && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <form onSubmit={handleEditInfoSubmit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl space-y-4 text-left relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={resetForm}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer w-7 h-7 rounded-full hover:bg-slate-50 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Edit3 className="mr-2 h-5 w-5 text-orange-500" />
                Edit User Information
              </h3>
              <p className="text-xs text-slate-500">
                Update details for {selectedUser.username} ({selectedUser.email}).
              </p>
            </div>

            <div className="space-y-3 py-2 max-h-[60vh] overflow-y-auto pr-1">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Name</label>
                <input
                  value={editInfoForm.username}
                  onChange={(e) => setEditInfoForm({ ...editInfoForm, username: e.target.value })}
                  required
                  className="w-full h-10 px-3 border border-slate-200 rounded-md text-xs font-medium outline-none focus:border-brand-blue bg-white"
                  placeholder="Enter name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Email</label>
                <input
                  type="email"
                  value={editInfoForm.email}
                  onChange={(e) => setEditInfoForm({ ...editInfoForm, email: e.target.value })}
                  required
                  className="w-full h-10 px-3 border border-slate-200 rounded-md text-xs font-medium outline-none focus:border-brand-blue bg-white"
                  placeholder="Enter email"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Phone</label>
                <input
                  value={editInfoForm.phone}
                  onChange={(e) => setEditInfoForm({ ...editInfoForm, phone: e.target.value })}
                  className="w-full h-10 px-3 border border-slate-200 rounded-md text-xs font-medium outline-none focus:border-brand-blue bg-white"
                  placeholder="Phone"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex h-9 items-center justify-center rounded-md bg-slate-900 hover:bg-slate-800 text-white px-4 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Role Dialog */}
      {isEditRoleOpen && selectedUser && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <form onSubmit={handleEditRoleSubmit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl space-y-4 text-left relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={resetForm}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer w-7 h-7 rounded-full hover:bg-slate-50 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Edit className="h-5 w-5 text-orange-500" />
                Edit User Role
              </h3>
              <p className="text-xs text-slate-500">
                Change the role for {selectedUser.username} ({selectedUser.email}).
              </p>
            </div>

            <div className="space-y-4 py-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Role</label>
                <select
                  value={editRoleValue}
                  onChange={(e) => setEditRoleValue(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-md text-xs font-medium outline-none focus:border-brand-blue bg-white cursor-pointer"
                >
                  {roleNames.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex h-9 items-center justify-center rounded-md bg-slate-900 hover:bg-slate-800 text-white px-4 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Change Password Dialog */}
      {isChangePasswordOpen && selectedUser && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <form onSubmit={handleChangePasswordSubmit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl space-y-4 text-left relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={resetForm}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer w-7 h-7 rounded-full hover:bg-slate-50 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <KeyRound className="mr-2 h-5 w-5 text-orange-500" />
                Change Password for {selectedUser.username}
              </h3>
              <p className="text-xs text-slate-500">
                Enter a new password for {selectedUser.email}. The user will need to use this new password to log in.
              </p>
            </div>

            <div className="space-y-4 py-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordForm.password}
                    onChange={(e) => setPasswordForm({ ...passwordForm, password: e.target.value })}
                    required
                    className="w-full h-10 pl-3 pr-10 border border-slate-200 rounded-md text-xs font-medium outline-none focus:border-brand-blue bg-white"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    required
                    className="w-full h-10 pl-3 pr-10 border border-slate-200 rounded-md text-xs font-medium outline-none focus:border-brand-blue bg-white"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex h-9 items-center justify-center rounded-md bg-slate-900 hover:bg-slate-800 text-white px-4 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Set Avatar Dialog */}
      {isSetAvatarOpen && selectedUser && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <form onSubmit={handleSetAvatarSubmit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl space-y-4 text-left relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={resetForm}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer w-7 h-7 rounded-full hover:bg-slate-50 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <UserCog className="mr-2 h-5 w-5 text-orange-500" />
                Set Avatar for {selectedUser.username}
              </h3>
              <p className="text-xs text-slate-500">
                Manage the profile picture for {selectedUser.email}.
              </p>
            </div>

            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4">
                {avatarFormValue ? (
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border border-slate-200">
                    <Image
                      src={avatarFormValue}
                      alt="Avatar preview"
                      width={80}
                      height={80}
                      unoptimized
                      className="object-cover h-full w-full"
                    />
                  </div>
                ) : (
                  <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center border border-dashed border-slate-300">
                    <UserCog className="h-10 w-10 text-slate-400" />
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-slate-700">Preview</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Please provide a valid image URL below.</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Avatar Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50 gap-2 shrink-0"
                  >
                    <UploadCloud className="h-4 w-4" />
                    {isUploading ? "Uploading..." : "Upload File"}
                  </button>
                  <input
                    value={avatarFormValue}
                    onChange={(e) => setAvatarFormValue(e.target.value)}
                    className="flex-grow h-10 px-3 border border-slate-200 rounded-md text-xs font-medium outline-none focus:border-brand-blue bg-white"
                    placeholder="Or enter image URL"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex h-9 items-center justify-center rounded-md bg-slate-900 hover:bg-slate-800 text-white px-4 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold text-slate-900">Are you sure?</h3>
            </div>
            <p className="text-xs font-semibold text-slate-500">
              You are about to delete the user &quot;<span className="font-semibold text-slate-700">{deleteTarget.username}</span>&quot;. They will no longer be able to log in.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className="inline-flex h-9 items-center justify-center rounded-md bg-red-600 hover:bg-red-700 text-white px-4 text-xs font-semibold transition-colors cursor-pointer shadow-sm shadow-red-600/10"
              >
                Yes, Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
