"use client";
import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { useTranslation } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import { getStudentInfo } from "../services/studentService";
import { useAuth } from "@/hooks/useAuth";
import { StudentProvider } from "../context/studentContext";
import LessonProvider, { LessonItem } from "../context/lessonContext";

import { getStudentLessonsById } from "../services/lessonService";
type StudentInfo = {
    studentNo?: string;
    fullName?: string;
    email?: string;
    telephone?: string;
    departmentName?: string;
    advisorFullName?: string;
    enrollmentYear?: number;
    classYear?: number;
    createdAt?: string;
}



function DashboardIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
}
function CoursesIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
}
function TranscriptIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
}
function ScheduleIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
}
function ProfileIcon() {
    return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
}

const PAGE_TITLES: Record<string, string> = {
    "/student/dashboard": "Dashboard",
    "/student/courses": "Derslerim",
    "/student/transcript": "Not Listesi",
    "/student/schedule": "Ders Programı",
    "/student/profile": "Profilim",
};

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    const { t } = useTranslation();
    const pathname = usePathname();
    const { userId, role, loading } = useAuth();
    const items = [
        { label: t.nav.dashboard, href: "/student/dashboard", icon: <DashboardIcon /> },
        { label: t.nav.courses, href: "/student/courses", icon: <CoursesIcon /> },
        { label: t.nav.transcript, href: "/student/transcript", icon: <TranscriptIcon /> },
        { label: t.nav.schedule, href: "/student/schedule", icon: <ScheduleIcon /> },
        { label: t.nav.profile, href: "/student/profile", icon: <ProfileIcon /> },
    ];

    const pageTitle = PAGE_TITLES[pathname] ?? "OBS";

    const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
    const [lessons, setLessons] = useState<LessonItem[]>([]);

    useEffect(() => {
        if (!userId) return;
        getStudentLessonsById(userId).then((data) => {
            const list = Array.isArray(data) ? data : data?.data ?? [];
            setLessons(list ?? []);

            console.log(list.count());
        });
    }, [userId]);

    useEffect(() => {
        if (!userId) return;
        getStudentInfo(userId)
            .then(data => {
                const info = Array.isArray(data) ? data[0] : data;
                setStudentInfo(info ?? null);
            });
        console.log(studentInfo)
    }, [userId]);

    return (
        <LessonProvider lessons={lessons}>
            <StudentProvider studentInfo={studentInfo ?? null}>
                <div className="flex min-h-screen bg-[var(--surface-bg)]">
                    <Sidebar items={items} role={(role as "STUDENT" | "TEACHER" | "ADMIN") || "STUDENT"} username={studentInfo?.fullName} />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <Navbar pageTitle={pageTitle} />
                        <main className="flex-1 overflow-y-auto p-6">
                            {children}
                        </main>
                    </div>
                </div>
            </StudentProvider>
        </LessonProvider>
    );
}
