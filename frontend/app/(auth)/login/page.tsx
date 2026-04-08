"use client";
import React, { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { setToken } from "@/lib/Auth";
import { AuthResponse } from "@/types/User";

const ROLE_PREFIX = "ROLE_";

function normalizeRole(rawRole: string): string | null {
    const cleanedRole = rawRole.trim().toUpperCase().replace(ROLE_PREFIX, "");
    if (["ADMIN", "TEACHER", "STUDENT"].includes(cleanedRole)) {
        return cleanedRole.toLowerCase();
    }
    return null;
}

function getFirstRole(rawRoles: unknown): string | null {
    if (Array.isArray(rawRoles)) {
        const firstRole = rawRoles.find((value): value is string => typeof value === "string" && value.trim().length > 0);
        return firstRole ?? null;
    }

    if (typeof rawRoles === "string" && rawRoles.trim().length > 0) {
        return rawRoles.split(",")[0]?.trim() ?? null;
    }

    return null;
}

// İkon
function LockIcon() {
    return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    );
}
function UserIcon() {
    return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );
}

export default function LoginPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await api.post<AuthResponse>("/api/auth/login", {
                username,
                password
            });

            const payload: any = (res as any).data ?? res;
            const token = payload?.token;
            const roleRaw = payload?.roles;

            const firstRole = getFirstRole(roleRaw);
            const role = firstRole ? normalizeRole(firstRole) : null;

            if (!token || !role) throw new Error("Eksik login cevabı (token/role)");

            setToken(token);
            document.cookie = `token=${token}; Path=/; Max-Age=86400; SameSite=Lax`;

            router.replace(`/${role}/dashboard`);
            router.refresh();


        } catch (err: any) {
            console.error("Giriş hatası:", err);
            setError(err.message || t.login.error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex bg-[var(--surface-bg)]">
            {/* Sol panel — görsel */}
            <div className="hidden lg:flex flex-col justify-between w-[45%] bg-primary-800 p-12 relative overflow-hidden">
                {/* Arka plan şekilleri */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-700/50 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-900/60 rounded-full translate-y-1/2 -translate-x-1/3" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            </svg>
                        </div>
                        <span className="text-white font-bold text-xl">OBS</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white leading-tight">
                        Akademik<br />Yönetim<br />Sistemi
                    </h2>
                    <p className="text-primary-200 mt-4 text-sm leading-relaxed">
                        Öğrenci, öğretmen ve yöneticiler için<br />güçlü bir akademik bilgi platformu.
                    </p>
                </div>
                {/* Feature cards */}
                <div className="relative z-10 space-y-3">
                    {[
                        { icon: "📚", text: "Ders programı ve kayıt yönetimi" },
                        { icon: "📊", text: "Not ve devamsızlık takibi" },
                        { icon: "🎓", text: "Transkript ve akademik geçmiş" },
                    ].map((f) => (
                        <div key={f.text} className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
                            <span className="text-lg">{f.icon}</span>
                            <span className="text-primary-100 text-sm">{f.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sağ panel — form */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-[400px]">
                    {/* Mobil logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-primary-700 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                            </svg>
                        </div>
                        <span className="font-bold text-primary-800 text-lg">OBS</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                            {t.login.title}
                        </h1>
                        <p className="text-[var(--text-muted)] mt-1.5 text-sm">
                            {t.login.subtitle}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label={t.common.username}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={t.login.usernamePlaceholder}
                            icon={<UserIcon />}
                            required
                            autoComplete="username"
                        />
                        <Input
                            label={t.common.password}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t.login.passwordPlaceholder}
                            icon={<LockIcon />}
                            required
                            autoComplete="current-password"
                        />

                        {error && (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-md px-3 py-2.5 text-sm">
                                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            loading={loading}
                            className="w-full mt-2"
                        >
                            {t.login.button}
                        </Button>

                        <div className="text-center">
                            <button
                                type="button"
                                className="text-sm text-primary-600 hover:text-primary-800 hover:underline transition-colors"
                            >
                                {t.login.forgotPassword}
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-xs text-[var(--text-muted)] mt-10">
                        © 2025 Öğrenci Bilgi Sistemi
                    </p>
                </div>
            </div>
        </div>
    );
}
