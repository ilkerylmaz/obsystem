"use client";
import React from "react";
import { StatCard } from "@/components/ui/StatCard";
import { useTranslation } from "@/lib/i18n";

const recentStudents = [
    { id: 1, name: "Ahmet Yılmaz", no: "2021050034", dept: "Bilg. Müh.", date: "2025-02-28" },
    { id: 2, name: "Fatma Çelik", no: "2021050035", dept: "Bilg. Müh.", date: "2025-02-25" },
    { id: 3, name: "Mehmet Kara", no: "2021050036", dept: "Bilg. Müh.", date: "2025-02-20" },
];

const recentTeachers = [
    { id: 1, name: "Prof. Dr. Mehmet Öz", dept: "Bilg. Müh.", date: "2025-01-15" },
    { id: 2, name: "Doç. Dr. Ayşe Kaya", dept: "Matematik", date: "2025-01-10" },
];

function UsersIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>; }
function TeacherIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>; }
function BookIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>; }

export default function AdminDashboard() {
    const { t } = useTranslation();
    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="page-title">{t.dashboard.admin.title}</h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">2024-2025 Güz Dönemi sistem özeti</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard title={t.dashboard.admin.totalStudents} value="1.248" icon={<UsersIcon />} color="blue" description="Aktif öğrenci" />
                <StatCard title={t.dashboard.admin.totalTeachers} value="86" icon={<TeacherIcon />} color="green" description="Akademik personel" />
                <StatCard title={t.dashboard.admin.totalLessons} value="142" icon={<BookIcon />} color="purple" description="Açık ders" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Son öğrenciler */}
                <div className="obs-card">
                    <div className="px-5 py-4 border-b border-[var(--surface-border)]">
                        <h3 className="section-title">{t.dashboard.admin.recentStudents}</h3>
                    </div>
                    <div className="divide-y divide-[var(--surface-border)]">
                        {recentStudents.map((s) => (
                            <div key={s.id} className="px-5 py-3 flex items-center gap-3 hover:bg-primary-50 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm shrink-0">
                                    {s.name[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{s.name}</p>
                                    <p className="text-xs text-[var(--text-muted)]">{s.no} — {s.dept}</p>
                                </div>
                                <span className="text-xs text-[var(--text-muted)]">{s.date}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Son öğretmenler */}
                <div className="obs-card">
                    <div className="px-5 py-4 border-b border-[var(--surface-border)]">
                        <h3 className="section-title">{t.dashboard.admin.recentTeachers}</h3>
                    </div>
                    <div className="divide-y divide-[var(--surface-border)]">
                        {recentTeachers.map((t2) => (
                            <div key={t2.id} className="px-5 py-3 flex items-center gap-3 hover:bg-primary-50 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm shrink-0">
                                    {t2.name.split(" ").filter(w => /^[A-ZÇĞİÖŞÜ]/.test(w)).pop()?.[0] ?? "Ö"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{t2.name}</p>
                                    <p className="text-xs text-[var(--text-muted)]">{t2.dept}</p>
                                </div>
                                <span className="text-xs text-[var(--text-muted)]">{t2.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
