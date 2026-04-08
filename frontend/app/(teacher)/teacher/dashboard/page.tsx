"use client";
import React, {useEffect, useMemo, useState} from "react";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/lib/i18n";
import {getTeacherInfoById} from "@/app/services/teacherService";
import {useAuth} from "@/hooks/useAuth";
import {Teacher} from "@/types/Teacher";
import {convertSegmentPathToStaticExportFilename} from "next/dist/shared/lib/segment-cache/segment-value-encoding";

const courseBreakdown = [
    { id: 1, code: "BIL301", name: "Veri Yapıları", students: 42, semester: "2024-2025 Güz" },
    { id: 2, code: "BIL101", name: "Programlamaya Giriş", students: 68, semester: "2024-2025 Güz" },
    { id: 3, code: "BIL302", name: "Algoritmalar", students: 35, semester: "2024-2025 Güz" },
];

const totalStudents = courseBreakdown.reduce((s, c) => s + c.students, 0);

function BookIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
}
function UsersIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
}

export default function TeacherDashboard() {
    const { t } = useTranslation();
    const {userId, role} = useAuth();
    const [infos, setInfos] = useState<Teacher>();
    useEffect(() => {
        if(!userId) return;
        getTeacherInfoById(userId).then((res) => {
            setInfos(res);

        })
    },[userId])

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="page-title">{t.dashboard.teacher.title}</h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">Hoş geldiniz, {infos?.title} {infos?.fullName}.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard title={t.dashboard.teacher.totalCourses} value={courseBreakdown.length} icon={<BookIcon />} color="blue" description="Bu dönem" />
                <StatCard title={t.dashboard.teacher.totalStudents} value={totalStudents} icon={<UsersIcon />} color="green" description="Toplam kayıtlı öğrenci" />
            </div>

            <div className="obs-card">
                <div className="px-5 py-4 border-b border-[var(--surface-border)]">
                    <h3 className="section-title">{t.dashboard.teacher.breakdown}</h3>
                </div>
                <div className="divide-y divide-[var(--surface-border)]">
                    {courseBreakdown.map((c) => {
                        const pct = Math.round((c.students / totalStudents) * 100);
                        return (
                            <div key={c.id} className="px-5 py-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <span className="font-mono font-semibold text-sm text-primary-700">{c.code}</span>
                                        <span className="ml-2 text-sm text-[var(--text-primary)]">{c.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant="info" size="sm">{c.semester}</Badge>
                                        <span className="text-sm font-bold text-[var(--text-primary)]">{c.students} öğrenci</span>
                                    </div>
                                </div>
                                {/* Progress bar */}
                                <div className="h-1.5 rounded-full bg-primary-100 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-primary-500 transition-all duration-500"
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                                <p className="text-xs text-[var(--text-muted)] mt-1">{pct}% toplam içinde</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
