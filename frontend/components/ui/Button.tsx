"use client";
import React from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    icon?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
    primary:
        "bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900 shadow-card",
    secondary:
        "bg-primary-100 text-primary-800 hover:bg-primary-200 active:bg-primary-300",
    danger:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-card",
    ghost:
        "bg-transparent text-primary-700 hover:bg-primary-50 active:bg-primary-100",
    outline:
        "bg-white border border-[var(--surface-border)] text-[var(--text-primary)] hover:bg-[var(--surface-muted)] active:bg-primary-50",
};

const sizeClasses: Record<Size, string> = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-2.5 text-base gap-2",
};

export function Button({
    variant = "primary",
    size = "md",
    loading = false,
    icon,
    children,
    className = "",
    disabled,
    ...rest
}: ButtonProps) {
    return (
        <button
            className={`
        inline-flex items-center justify-center font-medium rounded-md
        transition-all duration-150 cursor-pointer select-none
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-400 focus-visible:outline-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}
      `}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? (
                <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    />
                </svg>
            ) : icon ? (
                <span className="shrink-0">{icon}</span>
            ) : null}
            {children}
        </button>
    );
}
