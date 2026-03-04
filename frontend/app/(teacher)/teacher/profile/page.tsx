"use client";
import React from "react";
import { Badge } from "@/components/ui/Badge";
import { useTranslation } from "@/lib/i18n";

const teacher = {
    fullname: "Prof. Dr. Mehmet Öz",
    email: "mehmet.oz@universite.edu.tr",
    department: "Bilgisayar Mühendisliği",
    title: "Profesör",
    joinedAt: "2012-09-01",
};

const courses = [
    { id: 1, code: "BIL301", name: "Veri Yapıları", semester: "Güz", students: 42 },
    { id: 2, code: "BIL101", name: "Programlamaya Giriş", semester: "Güz", students: 68 },
    { id: 3, code: "BIL302", name: "Algoritmalar", semester: "Güz", students: 35 },
];

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-3 border-b border-[var(--surface-border)] last:border-none">
            <span className="sm:w-44 shrink-0 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">{label}</span>
            <span className="text-sm font-medium text-[var(--text-primary)]">{value}</span>
        </div>
    );
}

export default function TeacherProfilePage() {
    const { t } = useTranslation();
    return (
        <div className="space-y-6 animate-fade-in max-w-2xl">
            <div>
                <h2 className="page-title">{t.teacherProfile.title}</h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">Kişisel bilgileriniz ve ders listeniz</p>
            </div>

            {/* Avatar card */}
            <div className="obs-card p-5 flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-2xl shrink-0">
                    {teacher.fullname.split(" ").filter(w => /^[A-ZÇĞİÖŞÜ]/.test(w)).pop()?.[0] ?? "Ö"}
                </div>
                <div>
                    <p className="text-lg font-bold text-[var(--text-primary)]">{teacher.fullname}</p>
                    <p className="text-sm text-[var(--text-muted)]">{teacher.department}</p>
                    <div className="mt-2 flex gap-2">
                        <Badge variant="success" size="sm">Öğretmen</Badge>
                        <Badge variant="gray" size="sm">{teacher.title}</Badge>
                    </div>
                </div>
            </div>

            {/* Bilgiler */}
            <div className="obs-card px-5">
                <InfoRow label={t.teacherProfile.fullname} value={teacher.fullname} />
                <InfoRow label="E-posta" value={teacher.email} />
                <InfoRow label={t.teacherProfile.department} value={teacher.department} />
                <InfoRow label="Ünvan" value={teacher.title} />
                <InfoRow label="Başlangıç" value={teacher.joinedAt} />
            </div>

            {/* Dersler */}
            <div className="obs-card">
                <div className="px-5 py-4 border-b border-[var(--surface-border)]">
                    <h3 className="section-title">{t.teacherProfile.courses}</h3>
                </div>
                <div className="divide-y divide-[var(--surface-border)]">
                    {courses.map((c) => (
                        <div key={c.id} className="px-5 py-4 flex items-center justify-between hover:bg-primary-50 transition-colors">
                            <div>
                                <span className="font-mono font-semibold text-sm text-primary-700">{c.code}</span>
                                <span className="ml-2 text-sm text-[var(--text-primary)]">{c.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="gray" size="sm">{c.semester}</Badge>
                                <span className="text-sm font-bold text-[var(--text-secondary)]">{c.students} öğrenci</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
