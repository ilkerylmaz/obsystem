"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useTranslation } from "@/lib/i18n";

const initialStudents = [
    { id: 1, no: "2021050034", name: "Ahmet Yılmaz", email: "ahmet@uni.edu.tr", phone: "0532 111 11 11", advisor: "Prof. Dr. Mehmet Öz", active: true },
    { id: 2, no: "2021050035", name: "Fatma Çelik", email: "fatma@uni.edu.tr", phone: "0533 222 22 22", advisor: "Doç. Dr. Ayşe Kaya", active: true },
    { id: 3, no: "2021050036", name: "Mehmet Kara", email: "mehmet@uni.edu.tr", phone: "0534 333 33 33", advisor: "Prof. Dr. Mehmet Öz", active: false },
    { id: 4, no: "2021050037", name: "Zeynep Arslan", email: "zeynep@uni.edu.tr", phone: "0535 444 44 44", advisor: "Dr. Sara Arslan", active: true },
    { id: 5, no: "2021050038", name: "Ali Demir", email: "ali@uni.edu.tr", phone: "0536 555 55 55", advisor: "Doç. Dr. Ayşe Kaya", active: true },
];

const teachers = ["Prof. Dr. Mehmet Öz", "Doç. Dr. Ayşe Kaya", "Dr. Sara Arslan"];

type Student = typeof initialStudents[0];

export default function AdminStudentsPage() {
    const { t } = useTranslation();
    const [students, setStudents] = useState(initialStudents);
    const [search, setSearch] = useState("");
    const [addOpen, setAddOpen] = useState(false);
    const [editStudent, setEditStudent] = useState<Student | null>(null);
    const [form, setForm] = useState({ no: "", name: "", email: "", phone: "", advisor: teachers[0] });

    const filtered = students.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.no.includes(search) ||
            s.email.toLowerCase().includes(search.toLowerCase())
    );

    function handleDelete(id: number) {
        if (confirm("Bu öğrenciyi silmek istediğinizden emin misiniz?")) {
            setStudents((prev) => prev.filter((s) => s.id !== id));
        }
    }

    function handleAdd() {
        setStudents((prev) => [
            ...prev,
            { id: Date.now(), no: form.no, name: form.name, email: form.email, phone: form.phone, advisor: form.advisor, active: true },
        ]);
        setAddOpen(false);
        setForm({ no: "", name: "", email: "", phone: "", advisor: teachers[0] });
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h2 className="page-title">{t.admin.students.title}</h2>
                    <p className="text-sm text-[var(--text-muted)] mt-1">{filtered.length} öğrenci</p>
                </div>
                <div className="flex items-center gap-3">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t.common.search}
                        icon={
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        }
                        className="w-52"
                    />
                    <Button
                        variant="primary"
                        onClick={() => setAddOpen(true)}
                        icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>}
                    >
                        {t.admin.students.add}
                    </Button>
                </div>
            </div>

            <div className="obs-card overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="border-b border-[var(--surface-border)] bg-[var(--surface-muted)]">
                            {[t.admin.students.studentNo, t.admin.students.fullname, t.admin.students.email, t.admin.students.phone, t.admin.students.advisor, t.admin.students.status, t.common.actions].map((h) => (
                                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide whitespace-nowrap">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={7} className="text-center py-10 text-[var(--text-muted)]">{t.common.noData}</td></tr>
                        ) : filtered.map((s, idx) => (
                            <tr key={s.id} className={`border-b border-[var(--surface-border)] last:border-none hover:bg-primary-50 transition-colors ${idx % 2 === 1 ? "bg-[var(--surface-muted)]/40" : ""}`}>
                                <td className="px-4 py-3 font-mono text-xs text-primary-700 font-semibold">{s.no}</td>
                                <td className="px-4 py-3 font-medium">{s.name}</td>
                                <td className="px-4 py-3 text-[var(--text-secondary)]">{s.email}</td>
                                <td className="px-4 py-3 text-[var(--text-secondary)]">{s.phone}</td>
                                <td className="px-4 py-3 text-[var(--text-secondary)]">{s.advisor}</td>
                                <td className="px-4 py-3">
                                    <Badge variant={s.active ? "success" : "gray"} size="sm">
                                        {s.active ? t.common.active : t.common.passive}
                                    </Badge>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="sm" onClick={() => setEditStudent(s)}>
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(s.id)}>
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16" /></svg>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Öğrenci Ekle Modal */}
            <Modal open={addOpen} onClose={() => setAddOpen(false)} title={t.admin.students.add} size="md"
                footer={<><Button variant="outline" onClick={() => setAddOpen(false)}>{t.common.cancel}</Button><Button variant="primary" onClick={handleAdd}>{t.common.save}</Button></>}
            >
                <div className="grid grid-cols-2 gap-3">
                    <Input label={t.admin.students.studentNo} value={form.no} onChange={(e) => setForm({ ...form, no: e.target.value })} placeholder="2025050001" />
                    <Input label={t.admin.students.fullname} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ad Soyad" />
                    <Input label={t.admin.students.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ornek@uni.edu.tr" type="email" />
                    <Input label={t.admin.students.phone} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="0532 000 00 00" />
                    <Select label={t.admin.students.advisor} value={form.advisor} onChange={(e) => setForm({ ...form, advisor: e.target.value })} wrapperClassName="col-span-2">
                        {teachers.map((t2) => <option key={t2} value={t2}>{t2}</option>)}
                    </Select>
                </div>
            </Modal>

            {/* Düzenle Modal */}
            <Modal open={!!editStudent} onClose={() => setEditStudent(null)} title="Öğrenci Düzenle" size="md"
                footer={<><Button variant="outline" onClick={() => setEditStudent(null)}>{t.common.cancel}</Button><Button variant="primary" onClick={() => setEditStudent(null)}>{t.common.save}</Button></>}
            >
                {editStudent && (
                    <div className="grid grid-cols-2 gap-3">
                        <Input label={t.admin.students.studentNo} defaultValue={editStudent.no} disabled />
                        <Input label={t.admin.students.fullname} defaultValue={editStudent.name} />
                        <Input label={t.admin.students.email} defaultValue={editStudent.email} type="email" />
                        <Input label={t.admin.students.phone} defaultValue={editStudent.phone} />
                    </div>
                )}
            </Modal>
        </div>
    );
}
