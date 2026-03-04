"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useTranslation } from "@/lib/i18n";

const initialTeachers = [
    { id: 1, name: "Prof. Dr. Mehmet Öz", email: "mehmet.oz@uni.edu.tr", dept: "Bilg. Müh.", courses: 3, active: true },
    { id: 2, name: "Doç. Dr. Ayşe Kaya", email: "ayse.kaya@uni.edu.tr", dept: "Matematik", courses: 2, active: true },
    { id: 3, name: "Dr. Sara Arslan", email: "sara.arslan@uni.edu.tr", dept: "Yabancı Dil", courses: 1, active: true },
    { id: 4, name: "Doç. Dr. Ali Çelik", email: "ali.celik@uni.edu.tr", dept: "Fizik", courses: 2, active: false },
];

type Teacher = typeof initialTeachers[0];

export default function AdminTeachersPage() {
    const { t } = useTranslation();
    const [teachers, setTeachers] = useState(initialTeachers);
    const [search, setSearch] = useState("");
    const [addOpen, setAddOpen] = useState(false);
    const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
    const [form, setForm] = useState({ name: "", email: "", dept: "" });

    const filtered = teachers.filter(
        (t2) =>
            t2.name.toLowerCase().includes(search.toLowerCase()) ||
            t2.email.toLowerCase().includes(search.toLowerCase()) ||
            t2.dept.toLowerCase().includes(search.toLowerCase())
    );

    function handleAdd() {
        setTeachers((prev) => [...prev, { id: Date.now(), name: form.name, email: form.email, dept: form.dept, courses: 0, active: true }]);
        setAddOpen(false);
        setForm({ name: "", email: "", dept: "" });
    }

    function handleDelete(id: number) {
        if (confirm("Bu öğretmeni silmek istediğinizden emin misiniz?")) {
            setTeachers((prev) => prev.filter((t2) => t2.id !== id));
        }
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <h2 className="page-title">{t.admin.teachers.title}</h2>
                    <p className="text-sm text-[var(--text-muted)] mt-1">{filtered.length} öğretmen</p>
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
                        {t.admin.teachers.add}
                    </Button>
                </div>
            </div>

            {/* Kart görünümü */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.length === 0 ? (
                    <p className="col-span-full text-center py-10 text-[var(--text-muted)]">{t.common.noData}</p>
                ) : filtered.map((teacher) => (
                    <div key={teacher.id} className="obs-card p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                                {teacher.name.split(" ").filter(w => /^[A-ZÇĞİÖŞÜ]/.test(w)).pop()?.[0] ?? "Ö"}
                            </div>
                            <Badge variant={teacher.active ? "success" : "gray"} size="sm">
                                {teacher.active ? t.common.active : t.common.passive}
                            </Badge>
                        </div>
                        <p className="font-semibold text-sm text-[var(--text-primary)] leading-tight">{teacher.name}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{teacher.dept}</p>
                        <p className="text-xs text-[var(--text-secondary)] mt-1">{teacher.email}</p>
                        <div className="mt-3 pt-3 border-t border-[var(--surface-border)] flex items-center justify-between">
                            <span className="text-xs text-[var(--text-muted)]">{teacher.courses} ders</span>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="sm" onClick={() => setEditTeacher(teacher)}>
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50" onClick={() => handleDelete(teacher.id)}>
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16" /></svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Ekle Modal */}
            <Modal open={addOpen} onClose={() => setAddOpen(false)} title={t.admin.teachers.add} size="sm"
                footer={<><Button variant="outline" onClick={() => setAddOpen(false)}>{t.common.cancel}</Button><Button variant="primary" onClick={handleAdd}>{t.common.save}</Button></>}
            >
                <div className="space-y-3">
                    <Input label="Ad Soyad" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Prof. Dr. Ad Soyad" />
                    <Input label="E-posta" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ornek@uni.edu.tr" />
                    <Input label="Bölüm" value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })} placeholder="Bilgisayar Mühendisliği" />
                </div>
            </Modal>

            {/* Düzenle Modal */}
            <Modal open={!!editTeacher} onClose={() => setEditTeacher(null)} title="Öğretmen Düzenle" size="sm"
                footer={<><Button variant="outline" onClick={() => setEditTeacher(null)}>{t.common.cancel}</Button><Button variant="primary" onClick={() => setEditTeacher(null)}>{t.common.save}</Button></>}
            >
                {editTeacher && (
                    <div className="space-y-3">
                        <Input label="Ad Soyad" defaultValue={editTeacher.name} />
                        <Input label="E-posta" type="email" defaultValue={editTeacher.email} />
                        <Input label="Bölüm" defaultValue={editTeacher.dept} />
                    </div>
                )}
            </Modal>
        </div>
    );
}
