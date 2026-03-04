"use client";
import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useTranslation } from "@/lib/i18n";
import { usePathname } from "next/navigation";

function DashboardIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
}
function StudentsIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}
function TeachersIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
}
function LessonsIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
}

const PAGE_TITLES: Record<string, string> = {
    "/admin/dashboard": "Dashboard",
    "/admin/students": "Öğrenci Yönetimi",
    "/admin/teachers": "Öğretmen Yönetimi",
    "/admin/lessons": "Ders Yönetimi",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    const pathname = usePathname();

    const items = [
        { label: t.nav.dashboard, href: "/admin/dashboard", icon: <DashboardIcon /> },
        { label: t.nav.students, href: "/admin/students", icon: <StudentsIcon /> },
        { label: t.nav.teachers, href: "/admin/teachers", icon: <TeachersIcon /> },
        { label: t.nav.lessons, href: "/admin/lessons", icon: <LessonsIcon /> },
    ];

    const pageTitle = PAGE_TITLES[pathname] ?? "OBS";

    return (
        <div className="flex min-h-screen bg-[var(--surface-bg)]">
            <Sidebar items={items} role="ADMIN" username="Sistem Admin" />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar pageTitle={pageTitle} />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
