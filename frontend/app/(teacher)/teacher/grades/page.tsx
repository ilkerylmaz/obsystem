"use client";
import React, { useState } from "react";
import { Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/i18n";

const courses = [
    { id: 1, code: "BIL301", name: "Veri Yapıları" },
    { id: 2, code: "BIL101", name: "Programlamaya Giriş" },
    { id: 3, code: "BIL302", name: "Algoritmalar" },
];

const studentsByCourse: Record<number, { id: number; no: string; name: string; midterm: string; final: string; makeup: string }[]> = {
    1: [
        { id: 1, no: "2021050034", name: "Ahmet Yılmaz", midterm: "75", final: "82", makeup: "" },
        { id: 2, no: "2021050035", name: "Fatma Çelik", midterm: "60", final: "55", makeup: "" },
        { id: 3, no: "2021050036", name: "Mehmet Kara", midterm: "90", final: "88", makeup: "" },
        { id: 4, no: "2021050037", name: "Zeynep Arslan", midterm: "45", final: "30", makeup: "65" },
    ],
    2: [
        { id: 5, no: "2022050001", name: "Ali Demir", midterm: "70", final: "75", makeup: "" },
        { id: 6, no: "2022050002", name: "Elif Öz", midterm: "85", final: "90", makeup: "" },
    ],
    3: [
        { id: 7, no: "2020050010", name: "Burak Şahin", midterm: "55", final: "60", makeup: "" },
    ],
};

export default function GradesPage() {
    const { t } = useTranslation();
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [grades, setGrades] = useState<typeof studentsByCourse[1]>([]);

    function handleCourseChange(id: number) {
        setSelectedCourse(id);
        setGrades(JSON.parse(JSON.stringify(studentsByCourse[id] ?? [])));
    }

    function updateGrade(idx: number, field: "midterm" | "final" | "makeup", value: string) {
        const next = [...grades];
        next[idx] = { ...next[idx], [field]: value };
        setGrades(next);
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="page-title">{t.grades.title}</h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">Öğrencilere not girebilirsiniz</p>
            </div>

            {/* Ders seçimi */}
            <div className="obs-card p-5">
                <Select
                    label={t.grades.selectCourse}
                    value={selectedCourse ?? ""}
                    onChange={(e) => handleCourseChange(Number(e.target.value))}
                    wrapperClassName="max-w-sm"
                >
                    <option value="">— Ders Seçin —</option>
                    {courses.map((c) => (
                        <option key={c.id} value={c.id}>{c.code} — {c.name}</option>
                    ))}
                </Select>
            </div>

            {/* Not tablosu */}
            {selectedCourse && (
                <div className="obs-card">
                    <div className="px-5 py-4 border-b border-[var(--surface-border)] flex items-center justify-between">
                        <h3 className="section-title">
                            {courses.find((c) => c.id === selectedCourse)?.code} — Öğrenci Listesi
                            <span className="ml-2 text-xs font-normal text-[var(--text-muted)]">({grades.length} öğrenci)</span>
                        </h3>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => alert("Notlar kaydedildi! (TODO: API bağlantısı)")}
                            icon={
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            }
                        >
                            {t.grades.saveGrades}
                        </Button>
                    </div>

                    {grades.length === 0 ? (
                        <div className="px-5 py-10 text-center text-[var(--text-muted)] text-sm">{t.grades.noStudents}</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="border-b border-[var(--surface-border)] bg-[var(--surface-muted)]">
                                        {[t.grades.studentNo, t.grades.student, t.grades.midterm, t.grades.final, t.grades.makeup].map((h) => (
                                            <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {grades.map((s, idx) => (
                                        <tr key={s.id} className={`border-b border-[var(--surface-border)] last:border-none ${idx % 2 === 1 ? "bg-[var(--surface-muted)]/40" : ""}`}>
                                            <td className="px-4 py-3 font-mono text-xs text-primary-700">{s.no}</td>
                                            <td className="px-4 py-3 font-medium">{s.name}</td>
                                            {(["midterm", "final", "makeup"] as const).map((field) => (
                                                <td key={field} className="px-4 py-3">
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={100}
                                                        value={s[field]}
                                                        onChange={(e) => updateGrade(idx, field, e.target.value)}
                                                        placeholder="—"
                                                        className="w-20 rounded border border-[var(--surface-border)] px-2 py-1 text-sm text-center
                              focus:outline-none focus:ring-2 focus:ring-primary-400 hover:border-primary-300 transition-colors"
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
