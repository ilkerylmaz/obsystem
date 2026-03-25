"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { useTranslation } from "@/lib/i18n";
import { useStudent } from "@/app/context/studentContext";


function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-3 border-b border-[var(--surface-border)] last:border-none">
            <span className="sm:w-44 shrink-0 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">{label}</span>
            <span className="text-sm text-[var(--text-primary)] font-medium">{value}</span>
        </div>
    );
}

export default function StudentProfilePage() {
    const { t } = useTranslation();
    const { studentInfo } = useStudent();
    const [editOpen, setEditOpen] = useState(false);
    const [form, setForm] = useState({ fullname: studentInfo?.fullName, telephone: studentInfo?.telephone });

    return (
        <div className="space-y-6 animate-fade-in max-w-2xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="page-title">{t.profile.title}</h2>
                    <p className="text-sm text-[var(--text-muted)] mt-1">Kişisel bilgilerinizi görüntüleyin</p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditOpen(true)}
                    icon={
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    }
                >
                    {t.common.edit}
                </Button>
            </div>

            {/* Avatar + temel bilgi */}
            <div className="obs-card p-5 flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-primary-700 flex items-center justify-center text-white font-bold text-2xl shrink-0">
                    {studentInfo?.fullName?.[0]}
                </div>
                <div>
                    <p className="text-lg font-bold text-[var(--text-primary)]">{studentInfo?.fullName}</p>
                    <p className="text-sm text-[var(--text-muted)]">{studentInfo?.departmentName}</p>
                    <div className="mt-2">
                        <Badge variant="info" size="sm">Öğrenci</Badge>
                    </div>
                </div>
            </div>

            {/* Detay bilgiler */}
            <div className="obs-card px-5">
                <InfoRow label={t.profile.studentNo} value={studentInfo?.studentNo || ""} />
                <InfoRow label={t.profile.fullname} value={studentInfo?.fullName || ""} />
                <InfoRow label={t.profile.email} value={studentInfo?.email || ""} />
                <InfoRow label={t.profile.phone} value={studentInfo?.telephone || ""} />
                <InfoRow label={t.profile.advisor} value={studentInfo?.advisorFullName || ""} />
                <InfoRow label="Bölüm" value={studentInfo?.departmentName || ""} />
                <InfoRow label="Kayıt Tarihi" value={studentInfo?.createdAt || ""} />
            </div>

            {/* Edit Modal */}
            <Modal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                title={t.profile.editTitle}
                size="sm"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setEditOpen(false)}>{t.common.cancel}</Button>
                        <Button variant="primary" onClick={() => setEditOpen(false)}>{t.common.save}</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <Input
                        label={t.profile.fullname}
                        value={form.fullname}
                        onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                    />
                    <Input
                        label={t.profile.phone}
                        value={form.telephone}
                        onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                    />
                    <p className="text-xs text-[var(--text-muted)]">
                        E-posta ve öğrenci numarası değiştirilemez. Değişiklik için öğrenci işleri ile iletişime geçin.
                    </p>
                </div>
            </Modal>
        </div>
    );
}
