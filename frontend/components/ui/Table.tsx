"use client";
import React from "react";

interface Column<T> {
    key: string;
    header: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyExtractor: (row: T) => string | number;
    emptyText?: string;
    loading?: boolean;
}

export function Table<T extends Record<string, unknown>>({
    columns,
    data,
    keyExtractor,
    emptyText = "Veri bulunamadı.",
    loading = false,
}: TableProps<T>) {
    return (
        <div className="w-full overflow-x-auto rounded-md border border-[var(--surface-border)]">
            <table className="w-full border-collapse bg-white text-sm">
                <thead>
                    <tr className="bg-[var(--surface-muted)] border-b border-[var(--surface-border)]">
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className={`
                  text-left px-4 py-3 font-semibold text-[var(--text-secondary)]
                  text-xs uppercase tracking-wide whitespace-nowrap
                  ${col.className ?? ""}
                `}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-12 text-[var(--text-muted)]">
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Yükleniyor...
                                </div>
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-12 text-[var(--text-muted)]">
                                {emptyText}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, idx) => (
                            <tr
                                key={keyExtractor(row)}
                                className={`
                  border-b border-[var(--surface-border)] last:border-none
                  transition-colors duration-100 hover:bg-primary-50
                  ${idx % 2 === 1 ? "bg-[var(--surface-muted)]/40" : ""}
                `}
                            >
                                {columns.map((col) => (
                                    <td key={col.key} className={`px-4 py-3 text-[var(--text-primary)] ${col.className ?? ""}`}>
                                        {col.render
                                            ? col.render(row)
                                            : String(row[col.key] ?? "—")}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
