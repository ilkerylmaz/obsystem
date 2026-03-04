"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    icon?: React.ReactNode;
    wrapperClassName?: string;
}

export function Input({
    label,
    error,
    hint,
    icon,
    wrapperClassName = "",
    className = "",
    id,
    ...rest
}: InputProps) {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className={`flex flex-col gap-1 ${wrapperClassName}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium text-[var(--text-secondary)]"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                        {icon}
                    </span>
                )}
                <input
                    id={inputId}
                    className={`
            w-full rounded-md border bg-white px-3 py-2 text-sm
            text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
            transition-colors duration-150
            focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400
            disabled:bg-[var(--surface-muted)] disabled:cursor-not-allowed
            ${error
                            ? "border-red-400 focus:ring-red-300"
                            : "border-[var(--surface-border)] hover:border-primary-300"
                        }
            ${icon ? "pl-9" : ""}
            ${className}
          `}
                    {...rest}
                />
            </div>
            {error && (
                <p className="text-xs text-red-600 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
            {hint && !error && (
                <p className="text-xs text-[var(--text-muted)]">{hint}</p>
            )}
        </div>
    );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    wrapperClassName?: string;
    children: React.ReactNode;
}

export function Select({
    label,
    error,
    wrapperClassName = "",
    className = "",
    id,
    children,
    ...rest
}: SelectProps) {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
        <div className={`flex flex-col gap-1 ${wrapperClassName}`}>
            {label && (
                <label
                    htmlFor={selectId}
                    className="text-sm font-medium text-[var(--text-secondary)]"
                >
                    {label}
                </label>
            )}
            <select
                id={selectId}
                className={`
          w-full rounded-md border bg-white px-3 py-2 text-sm
          text-[var(--text-primary)]
          transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400
          ${error
                        ? "border-red-400"
                        : "border-[var(--surface-border)] hover:border-primary-300"
                    }
          ${className}
        `}
                {...rest}
            >
                {children}
            </select>
            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    );
}
