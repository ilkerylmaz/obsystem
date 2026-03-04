"use client";
import React from "react";
import { useTranslation } from "@/lib/i18n";

// Haftalık ders programı verisi: { day (0=Pzt), hour, code, name, room }
const schedule = [
    { id: 1, day: 0, startHour: 9, endHour: 11, code: "BIL301", name: "Veri Yapıları", room: "A101", color: "blue" },
    { id: 2, day: 1, startHour: 13, endHour: 15, code: "MAT201", name: "Diferansiyel Denkl.", room: "B203", color: "green" },
    { id: 3, day: 2, startHour: 10, endHour: 12, code: "FIZ101", name: "Fizik I", room: "C301", color: "amber" },
    { id: 4, day: 3, startHour: 9, endHour: 11, code: "ING101", name: "İngilizce I", room: "D102", color: "purple" },
    { id: 5, day: 4, startHour: 14, endHour: 16, code: "BIL101", name: "Programlamaya Giriş", room: "A201", color: "red" },
    { id: 6, day: 2, startHour: 14, endHour: 16, code: "BIL302", name: "Algoritmalar", room: "A102", color: "blue" },
];

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const colorMap: Record<string, string> = {
    blue: "bg-primary-100 border-primary-400 text-primary-800",
    green: "bg-green-100  border-green-400  text-green-800",
    amber: "bg-amber-100  border-amber-400  text-amber-800",
    purple: "bg-purple-100 border-purple-400 text-purple-800",
    red: "bg-red-100    border-red-400    text-red-800",
};

export default function SchedulePage() {
    const { t } = useTranslation();
    const days = t.schedule.days; // ["Pazartesi", ...]

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="page-title">{t.schedule.title}</h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">2024-2025 Güz Dönemi</p>
            </div>

            <div className="obs-card overflow-x-auto">
                <div className="min-w-[700px]">
                    {/* Header — günler */}
                    <div className="grid border-b border-[var(--surface-border)]" style={{ gridTemplateColumns: "60px repeat(5, 1fr)" }}>
                        <div className="p-3 text-center text-xs text-[var(--text-muted)]">Saat</div>
                        {days.map((d) => (
                            <div key={d} className="p-3 text-center text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide border-l border-[var(--surface-border)]">
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Saat dilimleri */}
                    {HOURS.map((hour) => (
                        <div
                            key={hour}
                            className="grid border-b border-[var(--surface-border)] last:border-none"
                            style={{ gridTemplateColumns: "60px repeat(5, 1fr)", minHeight: "64px" }}
                        >
                            {/* Saat label */}
                            <div className="p-2 text-right text-xs text-[var(--text-muted)] pr-3 pt-3 border-r border-[var(--surface-border)]">
                                {hour.toString().padStart(2, "0")}:00
                            </div>

                            {/* 5 gün */}
                            {days.map((_, dayIdx) => {
                                const lesson = schedule.find(
                                    (s) => s.day === dayIdx && s.startHour === hour
                                );
                                return (
                                    <div key={dayIdx} className="border-l border-[var(--surface-border)] p-1.5 relative">
                                        {lesson ? (
                                            <div
                                                className={`rounded border-l-2 px-2 py-1.5 h-full ${colorMap[lesson.color] ?? colorMap.blue}`}
                                                style={{ minHeight: `${(lesson.endHour - lesson.startHour) * 64 - 12}px` }}
                                            >
                                                <p className="font-mono text-[11px] font-bold">{lesson.code}</p>
                                                <p className="text-[11px] leading-tight mt-0.5">{lesson.name}</p>
                                                <p className="text-[10px] mt-1 opacity-70">{lesson.room} • {lesson.startHour}:00–{lesson.endHour}:00</p>
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
