"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { removeToken } from "@/lib/Auth";
import { useRouter } from "next/navigation";

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}

interface SidebarProps {
    items: NavItem[];
    role: "STUDENT" | "TEACHER" | "ADMIN";
    username?: string;
}

const roleColors = {
    STUDENT: { badge: "bg-sky-500", label: "Öğrenci" },
    TEACHER: { badge: "bg-emerald-500", label: "Öğretmen" },
    ADMIN: { badge: "bg-violet-500", label: "Admin" },
};

export function Sidebar({ items, role, username }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();
    const rc = roleColors[role];

    function handleLogout() {
        removeToken();
        document.cookie = "token=; Max-Age=0; path=/";
        router.push("/login");
    }

    return (
        <aside
            className={`
        flex flex-col h-screen sticky top-0 shrink-0
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[64px]" : "w-[240px]"}
      `}
            style={{ background: "var(--sidebar-bg)" }}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                </div>
                {!collapsed && (
                    <span className="text-white font-bold text-sm tracking-wide leading-tight">
                        OBS<br /><span className="text-white/50 font-normal text-[11px]">Bilgi Sistemi</span>
                    </span>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={`ml-auto rounded-md p-1 text-white/50 hover:text-white hover:bg-white/10 transition-colors ${collapsed ? "" : ""}`}
                    aria-label="Sidebar'ı daralt"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={collapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                    </svg>
                </button>
            </div>

            {/* Role badge */}
            {!collapsed && (
                <div className="px-4 pt-3 pb-1">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold text-white px-2 py-0.5 rounded-full ${rc.badge}/80`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        {rc.label}
                    </span>
                </div>
            )}

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-3 px-2">
                <ul className="space-y-0.5">
                    {items.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    title={collapsed ? item.label : undefined}
                                    className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-md
                    text-sm font-medium transition-all duration-150
                    ${isActive
                                            ? "bg-white/12 text-white"
                                            : "text-white/60 hover:text-white hover:bg-white/7"
                                        }
                  `}
                                >
                                    <span className="shrink-0 w-5 h-5">{item.icon}</span>
                                    {!collapsed && <span>{item.label}</span>}
                                    {isActive && !collapsed && (
                                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User & Logout */}
            <div className="px-3 py-3 border-t border-white/10">
                <div className="flex items-center gap-3 px-2 py-2">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                        {username?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">{username ?? "Kullanıcı"}</p>
                            <p className="text-white/40 text-[11px]">{rc.label}</p>
                        </div>
                    )}
                </div>
                <button
                    onClick={handleLogout}
                    className={`
            mt-1 w-full flex items-center gap-3 px-3 py-2 rounded-md
            text-sm text-white/50 hover:text-white hover:bg-red-500/20
            transition-colors duration-150
          `}
                    title={t.common.logout}
                >
                    <svg className="shrink-0 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {!collapsed && <span>{t.common.logout}</span>}
                </button>
            </div>
        </aside>
    );
}
