"use client";
import React, { useEffect, useState } from "react";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { getTeacherEnrollmentsById, putTeacherEnrollmentsById } from "@/app/services/enrollmentService";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";

export default function EnrollmentRequestsPage() {
    const { userId } = useAuth();
    const [requests, setRequests] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [reviewStatus, setReviewStatus] = useState<"APPROVED" | "REJECTED">("APPROVED");
    const [reviewNote, setReviewNote] = useState("");

    const fetchRequests = () => {
        if (!userId) return;
        getTeacherEnrollmentsById(userId)
            .then(data => {
                const list = Array.isArray(data) ? data : data?.data ?? [];
                setRequests(list);
            })
            .catch(err => console.error("Kayıtlar alınırken hata:", err));
    };

    useEffect(() => {
        fetchRequests();
    }, [userId]);

    const handleAction = (request: any, status: "APPROVED" | "REJECTED") => {
        setSelectedRequest(request);
        setReviewStatus(status);
        setReviewNote(status === "APPROVED" ? "Onaylandı" : "");
        setModalOpen(true);
    };

    const submitReview = async () => {
        if (!userId || !selectedRequest) return;
        try {
            await putTeacherEnrollmentsById(userId, selectedRequest.requestId, reviewStatus, reviewNote);
            alert(`İstek başarıyla ${reviewStatus === "APPROVED" ? "Onaylandı" : "Reddedildi"}.`);
            setModalOpen(false);
            fetchRequests();
        } catch (error) {
            alert("İşlem sırasında hata oluştu. " + error);
        }
    };

    const columns = [
        { key: "studentNo", header: "Öğrenci No", className: "font-mono font-semibold" },
        {
            key: "courseCode",
            header: "Ders",
            render: (r: any) => `${r.courseCode} - ${r.lessonName}`
        },
        { key: "semesterName", header: "Dönem" },
        { key: "requestNote", header: "Öğrenci Notu" },
        {
            key: "actions",
            header: "İşlem",
            render: (r: any) => (
                <div className="flex items-center gap-2">
                    <Button variant="primary" size="sm" onClick={() => handleAction(r, "APPROVED")}>Kabul Et</Button>
                    <Button variant="danger" size="sm" onClick={() => handleAction(r, "REJECTED")}>Reddet</Button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="page-title">Kayıt Kabul (Danışman Onayı)</h2>
                    <p className="text-sm text-[var(--text-muted)] mt-1">{requests.length} bekleyen istek listeleniyor</p>
                </div>
            </div>

            <div className="obs-card">
                <Table
                    columns={columns as any}
                    data={requests}
                    keyExtractor={(r) => r.requestId}
                    emptyText="Onay bekleyen kayıt talebi bulunmuyor."
                />
            </div>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={reviewStatus === "APPROVED" ? "Talebi Onayla" : "Talebi Reddet"}
                size="md"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setModalOpen(false)}>İptal</Button>
                        <Button variant={reviewStatus === "APPROVED" ? "primary" : "danger"} onClick={submitReview}>
                            {reviewStatus === "APPROVED" ? "Onayla" : "Reddet"}
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-sm text-[var(--text-muted)]">
                        {selectedRequest?.courseCode} - {selectedRequest?.lessonName} dersini alan {selectedRequest?.studentNo} numaralı öğrenci için işlemi gerçekleştiriyorsunuz.
                    </p>
                    <Input
                        label="İnceleme Notu / Açıklama"
                        placeholder="Örn: Mezuniyetine engel değil, onaylandı..."
                        value={reviewNote}
                        onChange={(e) => setReviewNote(e.target.value)}
                        required={reviewStatus === "REJECTED"}
                    />
                </div>
            </Modal>
        </div>
    );
}
