"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useTranslation } from "@/lib/i18n";

const teacherOptions = [
    { id: 1, name: "Prof. Dr. Mehmet Öz" },
    { id: 2, name: "Doç. Dr. Ayşe Kaya" },
    { id: 3, name: "Dr. Sara Arslan" },
    { id: 4, name: "Doç. Dr. Ali Çelik" },
];

const initialLessons = [
    { id: 1, code: "BIL301", name: "Veri Yapıları", teacherId: 1, semester: "2024-2025 Güz", credits: 4, students: 42 },
    { id: 2, code: "BIL101", name: "Programlamaya Giriş", teacherId: 1, semester: "2024-2025 Güz", credits: 4, students: 68 },
    { id: 3, code: "MAT201", name: "Diferansiyel Denklemler", teacherId: 2, semester: "2024-2025 Güz", credits: 3, students: 55 },
    { id: 4, code: "FIZ101", name: "Fizik I", teacherId: 4, semester: "2024-2025 Güz", credits: 4, students: 60 },
    { id: 5, code: "ING101", name: "İngilizce I", teacherId: 3, semester: "2024-2025 Güz", credits: 2, students: 90 },
    { id: 6, code: "BIL302", name: "Algoritmalar", teacherId: 1, semester: "2024-2025 Güz", credits: 4, students: 35 },
];

type Lesson = typeof initialLessons[0];

export default function AdminLessonsPage() {
    const { t } = useTranslation();
    const [lessons, setLessons] = useState(initialLessons);
    const [search, setSearch] = useState("");
    const [addOpen, setAddOpen] = useState(false);
    const [assignLesson, setAssignLesson] = useState<Lesson | null>(null);
    const [form, setForm] = useState({ code: "", name: "", teacherId: "1", semester: "2024-2025 Güz", credits: "3" });
    const [assignTeacherId, setAssignTeacherId] = useState("1");

    const filtered = lessons.filter(
        (l) =>
            l.code.toLowerCase().includes(search.toLowerCase()) ||
            l.name.toLowerCase().includes(search.toLowerCase())
    );

    function getTeacherName(id: number) {
        return teacherOptions.find((t2) => t2.id === id)?.name ?? "—";
    }

    function handleAdd() {
        setLessons((prev) => [
            ...prev,
            {
                id: Date.now(),
                code: form.code,
                name: form.name,
                teacherId: Number(form.teacherId),
                semester: form.semester,
                credits: Number(form.credits),
                students: 0,
            },
        ]);
        setAddOpen(false);
        setForm({ code: "", name: "", teacherId: "1", semester: "2024-2025 Güz", credits: "3" });
    }

    function handleAssign() {
        if (!assignLesson) return;
        setLessons((prev) =>
            prev.map((l) =>
                l.id === assignLesson.id ? { ...l, teacherId: Number(assignTeacherId) } : l
            )
        );
        setAssignLesson(null);
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h2 className="page-title">{t.admin.lessons.title}</h2>
                    <p className="text-sm text-[var(--text-muted)] mt-1">{filtered.length} ders</p>
                </div>
                <div className="flex items-center gap-3">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t.common.search}
                        icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                        className="w-52"
                    />
                    <Button
                        variant="primary"
                        onClick={() => setAddOpen(true)}
                        icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>}
                    >
                        {t.admin.lessons.add}
                    </Button>
                </div>
            </div>

            <div className="obs-card overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="border-b border-[var(--surface-border)] bg-[var(--surface-muted)]">
                            {[t.admin.lessons.code, "Ders Adı", t.admin.lessons.teacher, t.admin.lessons.semester, t.admin.lessons.credits, "Öğrenci", t.common.actions].map((h) => (
                                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide whitespace-nowrap">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={7} className="text-center py-10 text-[var(--text-muted)]">{t.common.noData}</td></tr>
                        ) : filtered.map((l, idx) => (
                            <tr key={l.id} className={`border-b border-[var(--surface-border)] last:border-none hover:bg-primary-50 transition-colors ${idx % 2 === 1 ? "bg-[var(--surface-muted)]/40" : ""}`}>
                                <td className="px-4 py-3 font-mono font-semibold text-primary-700">{l.code}</td>
                                <td className="px-4 py-3 font-medium">{l.name}</td>
                                <td className="px-4 py-3 text-[var(--text-secondary)]">{getTeacherName(l.teacherId)}</td>
                                <td className="px-4 py-3"><Badge variant="info" size="sm">{l.semester}</Badge></td>
                                <td className="px-4 py-3"><Badge variant="gray" size="sm">{l.credits} AKTS</Badge></td>
                                <td className="px-4 py-3 font-medium text-[var(--text-secondary)]">{l.students}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1">
                                        <Button variant="secondary" size="sm" onClick={() => { setAssignLesson(l); setAssignTeacherId(String(l.teacherId)); }}>
                                            {t.admin.lessons.assignTeacher}
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Ders Ekle Modal */}
            <Modal open={addOpen} onClose={() => setAddOpen(false)} title={t.admin.lessons.add} size="md"
                footer={<><Button variant="outline" onClick={() => setAddOpen(false)}>{t.common.cancel}</Button><Button variant="primary" onClick={handleAdd}>{t.common.save}</Button></>}
            >
                <div className="grid grid-cols-2 gap-3">
                    <Input label={t.admin.lessons.code} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="BIL999" />
                    <Input label="Ders Adı" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ders Adı" />
                    <Input label={t.admin.lessons.semester} value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} placeholder="2024-2025 Güz" />
                    <Input label={t.admin.lessons.credits} type="number" value={form.credits} onChange={(e) => setForm({ ...form, credits: e.target.value })} min={1} max={8} />
                    <Select label={t.admin.lessons.teacher} value={form.teacherId} onChange={(e) => setForm({ ...form, teacherId: e.target.value })} wrapperClassName="col-span-2">
                        {teacherOptions.map((t2) => <option key={t2.id} value={t2.id}>{t2.name}</option>)}
                    </Select>
                </div>
            </Modal>

            {/* Öğretmen Ata Modal */}
            <Modal open={!!assignLesson} onClose={() => setAssignLesson(null)} title={`${assignLesson?.code} — ${t.admin.lessons.assignTeacher}`} size="sm"
                footer={<><Button variant="outline" onClick={() => setAssignLesson(null)}>{t.common.cancel}</Button><Button variant="primary" onClick={handleAssign}>{t.common.assign}</Button></>}
            >
                <div className="space-y-3">
                    <p className="text-sm text-[var(--text-muted)]">Bu derse atanacak öğretmeni seçin.</p>
                    <Select label="Öğretmen" value={assignTeacherId} onChange={(e) => setAssignTeacherId(e.target.value)}>
                        {teacherOptions.map((t2) => <option key={t2.id} value={t2.id}>{t2.name}</option>)}
                    </Select>
                </div>
            </Modal>
        </div>
    );
}
