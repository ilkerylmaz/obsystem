"use client";
import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useTranslation } from "@/lib/i18n";
import { usePathname } from "next/navigation";

function DashboardIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
}
function GradesIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
}
function ProfileIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
}

const PAGE_TITLES: Record<string, string> = {
    "/teacher/dashboard": "Dashboard",
    "/teacher/grades": "Not Girişi",
    "/teacher/profile": "Profilim",
};

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    const pathname = usePathname();

    const items = [
        { label: t.nav.dashboard, href: "/teacher/dashboard", icon: <DashboardIcon /> },
        { label: t.nav.grades, href: "/teacher/grades", icon: <GradesIcon /> },
        { label: t.nav.profile, href: "/teacher/profile", icon: <ProfileIcon /> },
    ];

    const pageTitle = PAGE_TITLES[pathname] ?? "OBS";

    return (
        <div className="flex min-h-screen bg-[var(--surface-bg)]">
            <Sidebar items={items} role="TEACHER" username="Prof. Dr. Mehmet Öz" />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar pageTitle={pageTitle} />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
