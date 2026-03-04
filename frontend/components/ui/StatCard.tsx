"use client";
import React from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color?: "blue" | "green" | "amber" | "red" | "purple";
    description?: string;
    trend?: { value: string; positive: boolean };
}

const colorMap = {
    blue: { bg: "bg-primary-100", text: "text-primary-700", icon: "text-primary-600" },
    green: { bg: "bg-green-100", text: "text-green-700", icon: "text-green-600" },
    amber: { bg: "bg-amber-100", text: "text-amber-700", icon: "text-amber-600" },
    red: { bg: "bg-red-100", text: "text-red-700", icon: "text-red-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-700", icon: "text-purple-600" },
};

export function StatCard({
    title,
    value,
    icon,
    color = "blue",
    description,
    trend,
}: StatCardProps) {
    const c = colorMap[color];
    return (
        <div className="obs-card p-5 flex items-start gap-4 animate-fade-in hover:shadow-md transition-shadow duration-200">
            <div className={`shrink-0 rounded-xl p-3 ${c.bg}`}>
                <span className={`block w-6 h-6 ${c.icon}`}>{icon}</span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">{title}</p>
                <p className={`text-2xl font-bold mt-0.5 ${c.text}`}>{value}</p>
                {description && (
                    <p className="text-xs text-[var(--text-muted)] mt-1">{description}</p>
                )}
                {trend && (
                    <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${trend.positive ? "text-green-600" : "text-red-500"}`}>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={trend.positive ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                        </svg>
                        {trend.value}
                    </div>
                )}
            </div>
        </div>
    );
}
