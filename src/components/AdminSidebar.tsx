"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getSetting } from "@/actions/content";
import {
  AdminPermissionFlags,
  expandAdminRoute,
  hasAnyAdminPermission,
  isSuperAdminRole,
  normalizeAdminPermissions,
  normalizeAdminRoute,
} from "@/lib/admin-permissions";
import {
  LayoutGrid,
  Package,
  Tag,
  MapPin,
  FileText,
  Users,
  Receipt,
  LifeBuoy,
  Mail,
  AlertTriangle,
  Briefcase,
  UserCog,
  MessageSquare,
  HelpCircle,
  Type,
  Globe,
  Info,
  Settings,
  Lock,
  BarChart3,
  LogOut,
  PanelTop,
  Zap,
  Film,
  Star
} from "lucide-react";

interface AdminSidebarRole {
  id?: string;
  name: string;
  status?: string;
  pageAccess: {
    route: string;
    permissions?: Partial<AdminPermissionFlags>;
  }[];
}

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSignOut: () => void;
  isCollapsed?: boolean;
  userRole?: string;
  rolePermissions?: AdminSidebarRole[];
}

type LogoVariant = "horizontal" | "square";

const getLogoUrl = (value: unknown, variant: LogoVariant = "horizontal"): string | null => {
  const preferredKey = variant === "square" ? "squareUrl" : "horizontalUrl";
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record[preferredKey] === "string") return record[preferredKey];
    if (typeof record.url === "string") return record.url;
  }
  if (Array.isArray(value)) {
    const firstLogo = value.find((item) => item && typeof item === "object" && "url" in item);
    if (firstLogo && typeof firstLogo === "object" && "url" in firstLogo && typeof firstLogo.url === "string") {
      return firstLogo.url;
    }
  }
  return null;
};

export default function AdminSidebar({ activeTab, setActiveTab, onSignOut, isCollapsed = false, userRole = "Super Administrator", rolePermissions = [] }: AdminSidebarProps) {
  const [siteLogo, setSiteLogo] = React.useState<string>("/logo.png");
  const [squareLogo, setSquareLogo] = React.useState<string>("/xlogo.png");

  React.useEffect(() => {
    getSetting("site_logo").then(savedLogo => {
      const logoUrl = getLogoUrl(savedLogo, "horizontal");
      const compactLogoUrl = getLogoUrl(savedLogo, "square");
      if (logoUrl) setSiteLogo(logoUrl);
      if (compactLogoUrl) setSquareLogo(compactLogoUrl);
    });
  }, []);

  // Route lookup table
  const tabUrls: Record<string, string> = {
    "Overview": "/admin/dashboard",
    "Packages": "/admin/packages",
    "Offers": "/admin/offers",
    "Multimedia": "/admin/multimedia",
    "Coverage Areas": "/admin/coverage-areas",
    "Applications": "/admin/applications",
    "Customers": "/admin/customers",
    "Bills": "/admin/bills",
    "Tickets": "/admin/tickets",
    "Contact Messages": "/admin/contact-messages",
    "Complaints": "/admin/complaints",
    "Jobs": "/admin/jobs",
    "Job Applications": "/admin/job-applications",
    "Testimonials": "/admin/testimonials",
    "FAQs": "/admin/faqs",
    "Why Choose": "/admin/why-choose",
    "Hero Typography": "/admin/hero-typography",
    "Packages Header": "/admin/page-headers/packages",
    "Offers Header": "/admin/page-headers/offers",
    "Multimedia Header": "/admin/page-headers/multimedia",
    "Careers Header": "/admin/page-headers/careers",
    "SEO & Sharing": "/admin/seo-sharing",
    "About Page": "/admin/about-page",
    "Contact Page": "/admin/contact-page",
    "Support Page": "/admin/support-page",
    "Popup Offer Page": "/admin/popup-offer",
    "Top Bar & Footer": "/admin/topbar-footer",
    "Settings": "/admin/settings",
    "Manage User": "/admin/manage-user",
    "User Role": "/admin/user-role",
    "Security": "/admin/security",
    "SEO Audit": "/admin/seo-audit",
  };

  const isAllowed = (itemName: string) => {
    if (isSuperAdminRole(userRole)) return true;
    const route = tabUrls[itemName];
    if (!route) return true;
    if (route === "/admin/dashboard") return true;

    const roleKey = userRole.trim().toLowerCase();
    const matchingRole = rolePermissions.find((role) => (
      role.name.trim().toLowerCase() === roleKey ||
      String(role.id || "").trim().toLowerCase() === roleKey
    ));

    if (matchingRole && Array.isArray(matchingRole.pageAccess)) {
      if (matchingRole.status?.trim().toLowerCase() === "inactive") return false;

      const targetRoute = normalizeAdminRoute(route);
      const access = matchingRole.pageAccess.find((pageAccess) => (
        expandAdminRoute(pageAccess.route).some((candidateRoute) => normalizeAdminRoute(candidateRoute) === targetRoute)
      ));
      if (access && access.permissions) {
        return hasAnyAdminPermission(normalizeAdminPermissions(access.permissions));
      }
    }
    return false;
  };

  // Navigation groupings using Lucide React icons
  const menuGroups = [
    {
      title: "Dashboard",
      items: [
        {
          name: "Overview",
          icon: <LayoutGrid className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Catalog",
      items: [
        {
          name: "Packages",
          icon: <Package className="w-4 h-4" />,
        },
        {
          name: "Offers",
          icon: <Tag className="w-4 h-4" />,
        },
        {
          name: "Multimedia",
          icon: <Film className="w-4 h-4" />,
        },
        {
          name: "Coverage Areas",
          icon: <MapPin className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Operations",
      items: [
        {
          name: "Applications",
          icon: <FileText className="w-4 h-4" />,
        },
        {
          name: "Customers",
          icon: <Users className="w-4 h-4" />,
        },
        {
          name: "Bills",
          icon: <Receipt className="w-4 h-4" />,
        },
        {
          name: "Tickets",
          icon: <LifeBuoy className="w-4 h-4" />,
        },
        {
          name: "Contact Messages",
          icon: <Mail className="w-4 h-4" />,
        },
        {
          name: "Complaints",
          icon: <AlertTriangle className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Careers",
      items: [
        {
          name: "Jobs",
          icon: <Briefcase className="w-4 h-4" />,
        },
        {
          name: "Job Applications",
          icon: <UserCog className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Content",
      items: [
        {
          name: "Testimonials",
          icon: <MessageSquare className="w-4 h-4" />,
        },
        {
          name: "FAQs",
          icon: <HelpCircle className="w-4 h-4" />,
        },
        {
          name: "Why Choose",
          icon: <Star className="w-4 h-4" />,
        },
        {
          name: "Hero Typography",
          icon: <Type className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Pages",
      items: [
        {
          name: "SEO & Sharing",
          icon: <Globe className="w-4 h-4" />,
        },
        {
          name: "About Page",
          icon: <Info className="w-4 h-4" />,
        },
        {
          name: "Contact Page",
          icon: <Mail className="w-4 h-4" />,
        },
        {
          name: "Popup Offer Page",
          icon: <Zap className="w-4 h-4" />,
        },
        {
          name: "Top Bar & Footer",
          icon: <PanelTop className="w-4 h-4" />,
        },
        {
          name: "Settings",
          icon: <Settings className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Access",
      items: [
        {
          name: "Manage User",
          icon: <UserCog className="w-4 h-4" />,
        },
        {
          name: "User Role",
          icon: <UserCog className="w-4 h-4" />,
        },
        {
          name: "Security",
          icon: <Lock className="w-4 h-4" />,
        },
        {
          name: "SEO Audit",
          icon: <BarChart3 className="w-4 h-4" />,
        },
      ],
    },
  ];

  return (
    <aside className={`shrink-0 bg-[#071120] border-r border-[#1e293b]/60 flex flex-col h-screen overflow-hidden transition-all duration-300 ${
      isCollapsed ? "w-20" : "w-72"
    }`}>
      <div className={`sticky top-0 z-20 flex items-center justify-center py-5 border-b border-[#1e293b]/65 bg-black transition-all ${
        isCollapsed ? "px-4" : "px-6"
      }`}>
        {isCollapsed ? (
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center p-1.5 shadow-md shrink-0">
            <Image src={squareLogo} alt="M Amin Network" width={28} height={28} className="h-7 w-7 object-contain" />
          </div>
        ) : (
          <Image
            src={siteLogo}
            alt="M-Amin Network"
            width={180}
            height={56}
            className="h-14 w-[180px] object-contain"
            style={{ filter: "invert(1) hue-rotate(180deg)" }}
            priority
          />
        )}
      </div>

      {/* Navigation Group Items List */}
      <div className="flex-1 px-3 py-4 space-y-5 overflow-y-auto admin-sidebar-scroll">
        {menuGroups.map((group) => {
          // Filter items within this group
          const visibleItems = group.items.filter((item) => isAllowed(item.name));
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.title} className="space-y-1.5">
              {!isCollapsed && (
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block px-3 mb-1">
                  {group.title}
                </span>
              )}
              <div className="space-y-0.5">
                {visibleItems.map((item) => {
                  const isActive = activeTab === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setActiveTab(item.name)}
                      title={isCollapsed ? item.name : undefined}
                      className={`w-full flex items-center gap-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide cursor-pointer ${
                        isCollapsed ? "justify-center px-0" : "px-3.5 text-left"
                      } ${
                        isActive
                          ? "bg-[#0c1e35] text-white border border-[#1e293b]/80 shadow-md shadow-black/10"
                          : "text-slate-400 hover:text-slate-200 hover:bg-[#0c1e35]/35"
                      }`}
                    >
                      <span className={isActive ? "text-brand-cyan" : "text-slate-400"}>
                        {item.icon}
                      </span>
                      {!isCollapsed && <span>{item.name}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer Area */}
      <div className="p-4 border-t border-[#1e293b]/55 bg-[#050b16]/40 space-y-2">

        {/* View Public Site Action */}
        <Link
          href="/"
          title={isCollapsed ? "View public site" : undefined}
          className={`w-full flex items-center gap-2.5 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#0c1e35]/35 text-[11px] font-semibold tracking-wide transition-colors ${
            isCollapsed ? "justify-center px-0" : "px-3"
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-slate-400" />
          {!isCollapsed && <span>View public site</span>}
        </Link>

        {/* Sign Out Action */}
        <button
          onClick={onSignOut}
          title={isCollapsed ? "Sign out" : undefined}
          className={`w-full flex items-center gap-2.5 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 text-[11px] font-semibold tracking-wide transition-colors cursor-pointer text-left ${
            isCollapsed ? "justify-center px-0" : "px-3"
          }`}
        >
          <LogOut className="w-3.5 h-3.5" />
          {!isCollapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}

