"use client";
import React, {useEffect, useState} from "react";
import {AbsenceBadge, GradeBadge} from "@/components/ui/Badge";
import {useTranslation} from "@/lib/i18n";
import {getStudentNotesById} from "@/app/services/notelistService";
import {Notelist} from "@/types/Notelist";
import {useAuth} from "@/hooks/useAuth";
import {NotelistStatus} from "@/app/enum/NotelistStatus";

const transcriptData = [
    {
        semester: "2024-2025 Güz",
        courses: [
            { id: 1, code: "BIL301", midterm: 75, final: 82, makeup: null, average: 79.4, grade: "BB", status: "GEÇTİ", absences: 3 },
            { id: 2, code: "MAT201", midterm: 60, final: 55, makeup: null, average: 56.5, grade: "DC", status: "GEÇTİ", absences: 8 },
            { id: 3, code: "FIZ101", midterm: 40, final: 45, makeup: 65, average: 55.0, grade: "DD", status: "GEÇTİ", absences: 5 },
            { id: 4, code: "ING101", midterm: 90, final: 95, makeup: null, average: 93.0, grade: "AA", status: "GEÇTİ", absences: 1 },
        ],
    },
    {
        semester: "2023-2024 Bahar",
        courses: [
            { id: 5, code: "BIL101", midterm: 88, final: 92, makeup: null, average: 90.4, grade: "AA", status: "GEÇTİ", absences: 0 },
            { id: 6, code: "MAT101", midterm: 55, final: 40, makeup: null, average: 45.5, grade: "FF", status: "KALDI", absences: 15 },
        ],
    },
];

function Num({ v }: { v: number | null }) {
    if (v === null) return <span className="text-[var(--text-muted)]">—</span>;
    return <span>{v}</span>;
}

export default function TranscriptPage() {
    const { t } = useTranslation();
    const {userId, loading} = useAuth();
    const [notes, setNotes] = useState<Notelist[]>([]);
    useEffect(() => {
        if(!userId) return;
        getStudentNotesById(userId).then((data) => {
            const normalizedList = Array.isArray(data) ? data : (data ? [data] : [])
            setNotes(normalizedList);
            console.log(normalizedList)
        })
            .catch((err) => console.log(err));
    },[userId])
    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="page-title">{t.transcript.title}</h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">Tüm dönemler</p>
            </div>

            {notes.map((sem) => (
                <div key={sem.semesterName} className="obs-card">
                    <div className="px-5 py-4 border-b border-[var(--surface-border)] bg-[var(--surface-muted)]">
                        <h3 className="section-title">{sem.semesterName}</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--surface-border)]">
                                    {[t.transcript.course, t.transcript.midterm, t.transcript.final, t.transcript.makeup, t.transcript.average, t.transcript.grade, t.transcript.status, t.transcript.absences].map((h) => (
                                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sem.notes.map((c, idx) => (
                                    <tr
                                        key={c.id}
                                        className={`border-b border-[var(--surface-border)] last:border-none hover:bg-primary-50 transition-colors ${idx % 2 === 1 ? "bg-[var(--surface-muted)]/40" : ""}`}
                                    >
                                        <td className="px-4 py-3 font-mono font-semibold text-primary-700">{c.courseCode}</td>
                                        <td className="px-4 py-3">{c.midtermNote}</td>
                                        <td className="px-4 py-3">{c.finalNote}</td>
                                        <td className="px-4 py-3"><Num v={c.makeupExam!} /></td>
                                        <td className="px-4 py-3 font-medium">{c.average?.toFixed(1) ?? "—"}</td>
                                        <td className="px-4 py-3"><GradeBadge grade={c.grade!} /></td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs font-semibold ${c.status === NotelistStatus.FAILED ? "text-red-600" : "text-green-600" }`}>
                                                {c.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3"><AbsenceBadge count={c.absenteeismCount!} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}
