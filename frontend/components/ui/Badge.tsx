"use client";
import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "success" | "warning" | "danger" | "info" | "gray";
    size?: "sm" | "md";
}

const variantClasses = {
    default: "bg-primary-100 text-primary-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-700",
    info: "bg-sky-100 text-sky-800",
    gray: "bg-gray-100 text-gray-600",
};

const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
};

export function Badge({ children, variant = "default", size = "md" }: BadgeProps) {
    return (
        <span
            className={`
        inline-flex items-center font-semibold rounded-full leading-none
        ${variantClasses[variant]} ${sizeClasses[size]}
      `}
        >
            {children}
        </span>
    );
}

/** Harf notuna göre otomatik renk seçer */
export function GradeBadge({ grade }: { grade: string | null }) {
    if (!grade) return <span className="text-[var(--text-muted)] text-xs">—</span>;
    const map: Record<string, BadgeProps["variant"]> = {
        AA: "success", BA: "success", BB: "success",
        CB: "info", CC: "info",
        DC: "warning", DD: "warning",
        FF: "danger", NA: "danger",
    };
    return <Badge variant={map[grade] ?? "gray"}>{grade}</Badge>;
}

/** Devamsızlık durumu badge'i */
export function AbsenceBadge({ count, max = 14 }: { count: number; max?: number }) {
    const pct = count / max;
    const variant: BadgeProps["variant"] =
        pct >= 1 ? "danger" : pct >= 0.6 ? "warning" : "success";
    return <Badge variant={variant}>{count} / {max}</Badge>;
}
