"use client";
import React, { use, useState } from "react";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Input";
import { useTranslation } from "@/lib/i18n";
import { useLesson } from "@/app/context/lessonContext";


const available = [
    { id: 6, code: "BIL302", name: "Algoritmalar" },
    { id: 7, code: "MAT301", name: "Sayısal Analiz" },
    { id: 8, code: "BIL401", name: "Yapay Zeka" },
];

export default function CoursesPage() {
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);
    const { lessons } = useLesson();
    const [selected, setSelected] = useState("");

    const enrolled = lessons.map((l, i) => ({
        id: i + 1,
        code: l.courseCode ?? "—",
        name: l.lessonName ?? "—",
        teacher: l.teacherFullName ?? "—",
        semester: l.semesterName ?? "_",
        credits: l.ects ?? l.credit ?? 0,
    }))


    const columns = [
        { key: "code", header: t.courses.code, className: "font-mono font-semibold text-primary-700" },
        { key: "name", header: "Ders Adı" },
        { key: "teacher", header: t.courses.teacher },
        { key: "semester", header: t.courses.semester },
        {
            key: "credits",
            header: t.courses.credits,
            render: (r: typeof enrolled[0]) => (
                <Badge variant="info" size="sm">{r.credits} AKTS</Badge>
            ),
        },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="page-title">{t.courses.title}</h2>
                    <p className="text-sm text-[var(--text-muted)] mt-1">{enrolled.length} ders kayıtlı</p>
                </div>
                <Button
                    variant="primary"
                    onClick={() => setModalOpen(true)}
                    icon={
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    }
                >
                    {t.courses.register}
                </Button>
            </div>

            <div className="obs-card">
                <Table
                    columns={columns as Parameters<typeof Table>[0]["columns"]}
                    data={enrolled as Record<string, unknown>[]}
                    keyExtractor={(r) => (r as typeof enrolled[0]).id}
                    emptyText={t.common.noData}
                />
            </div>

            {/* Kayıt Modal */}
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={t.courses.registerModal}
                size="md"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setModalOpen(false)}>{t.common.cancel}</Button>
                        <Button variant="primary" onClick={() => setModalOpen(false)}>{t.courses.registerBtn}</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-sm text-[var(--text-muted)]">
                        Kayıt olmak istediğiniz dersi aşağıdan seçin. Danışman onayından sonra kaydınız tamamlanacaktır.
                    </p>
                    <Select
                        label={t.courses.selectCourse}
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                    >
                        <option value="">— Ders Seçin —</option>
                        {available.map((c) => (
                            <option key={c.id} value={String(c.id)}>
                                {c.code} — {c.name}
                            </option>
                        ))}
                    </Select>
                </div>
            </Modal>
        </div>
    );
}
