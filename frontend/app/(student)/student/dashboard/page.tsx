"use client";
import React, { useEffect, useState } from "react";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/lib/i18n";
import { useDateTime } from "@/hooks/useDateTime";
import { useStudent } from "@/app/context/studentContext";
import { getStudentLessonsById } from "@/app/services/lessonService";
import { useAuth } from "@/hooks/useAuth";
// Mock dataf
const upcoming = [
    { id: 1, course: "BIL301 — Veri Yapıları", day: "Pazartesi", time: "09:00 – 10:50", room: "A101", teacher: "Prof. Dr. Mehmet Öz" },
    { id: 2, course: "MAT201 — Diferansiyel Denklemler", day: "Salı", time: "13:00 – 14:50", room: "B203", teacher: "Doç. Dr. Ayşe Kaya" },
    { id: 3, course: "FIZ101 — Fizik I", day: "Çarşamba", time: "10:00 – 11:50", room: "C301", teacher: "Doç. Dr. Ali Çelik" },
];



function BookOpenIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
}
function StarIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>;
}
function ExclamIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
}

export default function StudentDashboard() {
    const { time, date, day, hour } = useDateTime();
    const { studentInfo } = useStudent();
    const { t } = useTranslation();
    const { userId, role, loading } = useAuth();
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!userId) return;
        getStudentLessonsById(userId).then((data) => {
            const list = Array.isArray(data) ? data : data?.data ?? [];
            setCount(list.length);
        });
    }, [userId]);
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Hoşgeldin */}
            <div>
                <h2 className="page-title">{t.dashboard.student.title}</h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">Hoş geldiniz, {studentInfo?.fullName} Bugün {day}, {date}.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                    title={t.dashboard.student.enrolled}
                    value={count}
                    icon={<BookOpenIcon />}
                    color="blue"
                    description="Bu dönem aktif ders"
                />
                <StatCard
                    title={t.dashboard.student.gpa}
                    value="3.12"
                    icon={<StarIcon />}
                    color="green"
                    description="Genel ağırlıklı ortalama"
                />
                <StatCard
                    title={t.dashboard.student.absences}
                    value="2"
                    icon={<ExclamIcon />}
                    color="amber"
                    description="Ders sınıra yaklaşıyor"
                />
            </div>

            {/* Upcoming classes */}
            <div className="obs-card">
                <div className="px-5 py-4 border-b border-[var(--surface-border)] flex items-center justify-between">
                    <h3 className="section-title">{t.dashboard.student.upcoming}</h3>
                    <Badge variant="info" size="sm">Bu Hafta</Badge>
                </div>
                <div className="divide-y divide-[var(--surface-border)]">
                    {upcoming.map((u) => (
                        <div key={u.id} className="px-5 py-4 flex items-center gap-4 hover:bg-primary-50 transition-colors">
                            <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm text-[var(--text-primary)] truncate">{u.course}</p>
                                <p className="text-xs text-[var(--text-muted)] mt-0.5">{u.teacher}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-xs font-semibold text-[var(--text-secondary)]">{u.day}</p>
                                <p className="text-xs text-[var(--text-muted)]">{u.time}</p>
                                <Badge variant="gray" size="sm">{u.room}</Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
