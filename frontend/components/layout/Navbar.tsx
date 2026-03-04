"use client";
import React from "react";
import { useTranslation } from "@/lib/i18n";

interface NavbarProps {
    pageTitle: string;
}

export function Navbar({ pageTitle }: NavbarProps) {
    const { lang, setLang } = useTranslation();

    return (
        <header className="h-14 shrink-0 flex items-center justify-between px-6 bg-white border-b border-[var(--surface-border)] sticky top-0 z-20">
            {/* Page title */}
            <h1 className="text-base font-semibold text-[var(--text-primary)] tracking-tight">
                {pageTitle}
            </h1>

            {/* Right controls */}
            <div className="flex items-center gap-3">
                {/* Language toggle */}
                <div className="flex items-center bg-[var(--surface-muted)] rounded-md p-0.5 border border-[var(--surface-border)]">
                    <button
                        onClick={() => setLang("tr")}
                        className={`px-2.5 py-1 rounded text-xs font-semibold transition-all duration-150 ${lang === "tr"
                                ? "bg-primary-700 text-white shadow-sm"
                                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                            }`}
                    >
                        TR
                    </button>
                    <button
                        onClick={() => setLang("en")}
                        className={`px-2.5 py-1 rounded text-xs font-semibold transition-all duration-150 ${lang === "en"
                                ? "bg-primary-700 text-white shadow-sm"
                                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                            }`}
                    >
                        EN
                    </button>
                </div>

                {/* Notification bell (placeholder) */}
                <button className="relative rounded-md p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500"></span>
                </button>
            </div>
        </header>
    );
}
