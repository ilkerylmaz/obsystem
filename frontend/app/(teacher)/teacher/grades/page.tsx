"use client";
import React, { useEffect, useState } from "react";
import { Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";
import { getTeacherDashboardStats, getStudentsByTeacherLesson, updateGrades } from "@/app/services/teacherService";

export default function GradesPage() {
    const { t } = useTranslation();
    const { userId } = useAuth();
    const [courses, setCourses] = useState<any[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [grades, setGrades] = useState<any[]>([]);
    const [loadingSave, setLoadingSave] = useState(false);

    useEffect(() => {
        if (!userId) return;
        // Fetch courses for the teacher
        getTeacherDashboardStats(userId).then(res => {
            const data = res.data || res;
            if (data?.courses) {
                setCourses(data.courses);
            }
        });
    }, [userId]);

    function handleCourseChange(teacherLessonId: number) {
        setSelectedCourse(teacherLessonId);
        if (!teacherLessonId) {
            setGrades([]);
            return;
        }

        getStudentsByTeacherLesson(teacherLessonId).then(res => {
            const data = res.data || res;
            if (Array.isArray(data)) {
                setGrades(data);
            } else {
                setGrades([]);
            }
        });
    }

    function updateGradeRow(idx: number, field: "midtermNote" | "finalNote" | "makeupExam", value: string) {
        const next = [...grades];
        next[idx] = { ...next[idx], [field]: value === "" ? null : Number(value) };
        setGrades(next);
    }

    const saveGrades = async () => {
        if (!grades.length) return;
        setLoadingSave(true);

        try {
            const payload = grades.map(g => ({
                noteListId: g.noteListId,
                midtermNote: g.midtermNote,
                finalNote: g.finalNote,
                makeupExam: g.makeupExam
            }));

            await updateGrades(payload);
            alert("Notlar başarıyla kaydedildi!");
        } catch (error) {
            console.error(error);
            alert("Notlar kaydedilirken bir hata oluştu.");
        } finally {
            setLoadingSave(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="page-title">{t.grades.title}</h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">Sınıf listesinden öğrencilere not verebilir veya güncelleyebilirsiniz.</p>
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
                        <option key={c.teacherLessonId} value={c.teacherLessonId}>
                            {c.courseCode} — {c.lessonName}
                        </option>
                    ))}
                </Select>
            </div>

            {/* Not tablosu */}
            {selectedCourse && (
                <div className="obs-card">
                    <div className="px-5 py-4 border-b border-[var(--surface-border)] flex items-center justify-between">
                        <h3 className="section-title">
                            {courses.find((c) => c.teacherLessonId === selectedCourse)?.courseCode} — Öğrenci Listesi
                            <span className="ml-2 text-xs font-normal text-[var(--text-muted)]">({grades.length} öğrenci)</span>
                        </h3>
                        <Button
                            variant="primary"
                            size="sm"
                            loading={loadingSave}
                            onClick={saveGrades}
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
                                        <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">{t.grades.studentNo}</th>
                                        <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">{t.grades.student}</th>
                                        <th className="text-center px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">{t.grades.midterm}</th>
                                        <th className="text-center px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">{t.grades.final}</th>
                                        <th className="text-center px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">{t.grades.makeup}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {grades.map((s, idx) => (
                                        <tr key={s.noteListId} className={`border-b border-[var(--surface-border)] last:border-none ${idx % 2 === 1 ? "bg-[var(--surface-muted)]/40" : ""}`}>
                                            <td className="px-4 py-3 font-mono text-xs text-primary-700">{s.studentNo}</td>
                                            <td className="px-4 py-3 font-medium">{s.name} {s.surname}</td>
                                            {(["midtermNote", "finalNote", "makeupExam"] as const).map((field) => (
                                                <td key={field} className="px-4 py-3 text-center">
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={100}
                                                        value={s[field] ?? ""}
                                                        onChange={(e) => updateGradeRow(idx, field, e.target.value)}
                                                        placeholder="—"
                                                        className="w-20 rounded border border-[var(--surface-border)] px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-400 hover:border-primary-300 transition-colors"
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
